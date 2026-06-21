(function(){
  const STORAGE_KEY='arm_firms_key';
  const STORAGE_DAYS='arm_firms_days';
  const SOURCE='VIIRS_SNPP_NRT';
  const AREA='27,41,65,62';
  let app,map,Lref,btn,listEl,layer,visible=true,expanded=false,loading=false,status='',hotspots=[];

  function esc(v){return app&&app.esc?app.esc(v):String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function t(key){return app&&app.t?app.t(key):key;}
  function tf(key,arg){const value=t(key);return typeof value==='function'?value(arg):value;}
  function getKey(){return localStorage.getItem(STORAGE_KEY)||'';}
  function getDays(){const days=Number(localStorage.getItem(STORAGE_DAYS)||'1');return Math.max(1,Math.min(5,days||1));}
  function setStatus(message){status=message;renderList();}
  function csvUrl(key,days){
    return 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/'+
      encodeURIComponent(key)+'/'+SOURCE+'/'+AREA+'/'+days;
  }
  function parseCsv(text){
    const rows=[];
    let row=[],field='',quoted=false;
    for(let i=0;i<text.length;i++){
      const ch=text[i],next=text[i+1];
      if(ch==='"'){
        if(quoted&&next==='"'){field+='"';i++;}
        else quoted=!quoted;
      }else if(ch===','&&!quoted){
        row.push(field);field='';
      }else if((ch==='\n'||ch==='\r')&&!quoted){
        if(ch==='\r'&&next==='\n') i++;
        row.push(field);
        if(row.some(Boolean)) rows.push(row);
        row=[];field='';
      }else{
        field+=ch;
      }
    }
    row.push(field);
    if(row.some(Boolean)) rows.push(row);
    if(rows.length<2) return [];
    const headers=rows[0].map(h=>h.trim());
    return rows.slice(1).map(values=>{
      const item={};
      headers.forEach((h,i)=>item[h]=values[i]);
      return item;
    });
  }
  function markerRadius(item){
    const frp=Number(item.frp||0);
    if(!Number.isFinite(frp)) return 5;
    return Math.max(4,Math.min(11,4+Math.sqrt(frp)/2));
  }
  function confidenceColor(item){
    const raw=String(item.confidence||'').toLowerCase();
    if(raw==='h'||raw==='high') return '#ef4444';
    if(raw==='n'||raw==='nominal') return '#f97316';
    if(raw==='l'||raw==='low') return '#facc15';
    return '#fb923c';
  }
  function popupHtml(item){
    const time=String(item.acq_time||'').padStart(4,'0');
    const formattedTime=time.slice(0,2)+':'+time.slice(2);
    return '<div class="event-popup"><b>'+esc(t('eventHotspot'))+'</b>'+
      '<div>'+esc(item.acq_date||'')+' '+esc(formattedTime)+' '+esc(t('eventUtc'))+'</div>'+
      '<div>'+esc(t('eventConfidence'))+': '+esc(item.confidence||'-')+'</div>'+
      '<div>'+esc(t('eventFrp'))+': '+esc(item.frp||'-')+'</div>'+
      '<div>'+esc(t('eventSatellite'))+': '+esc([item.satellite,item.instrument].filter(Boolean).join(' / ')||'-')+'</div>'+
      '<div class="event-disclaimer">'+esc(t('eventDisclaimer'))+'</div></div>';
  }
  function renderMarkers(items){
    layer.clearLayers();
    hotspots=items.filter(item=>Number.isFinite(Number(item.latitude))&&Number.isFinite(Number(item.longitude)));
    hotspots.forEach(item=>{
      const lat=Number(item.latitude),lng=Number(item.longitude);
      Lref.circleMarker([lat,lng],{
        radius:markerRadius(item),
        color:'#7f1d1d',
        weight:1,
        opacity:.95,
        fillColor:confidenceColor(item),
        fillOpacity:.76
      }).bindPopup(popupHtml(item),{maxWidth:260}).addTo(layer);
    });
    if(visible&&!map.hasLayer(layer)) layer.addTo(map);
  }
  async function loadHotspots(){
    const key=getKey().trim();
    const days=getDays();
    if(!key){
      expanded=true;
      app.flash(t('eventsNoKey'));
      renderList();
      return;
    }
    loading=true;
    setStatus(t('eventsLoading'));
    try{
      const res=await fetch(csvUrl(key,days),{cache:'no-store'});
      if(!res.ok) throw new Error('firms '+res.status);
      const items=parseCsv(await res.text());
      renderMarkers(items);
      setStatus(hotspots.length?tf('eventsLoaded',hotspots.length):t('eventsEmpty'));
    }catch(e){
      setStatus(t('eventsError'));
    }finally{
      loading=false;
      renderList();
    }
  }
  function clearLayer(){
    hotspots=[];
    layer.clearLayers();
    status='';
    renderList();
  }
  function setVisible(next){
    visible=next;
    if(visible){
      layer.addTo(map);
    }else if(map.hasLayer(layer)){
      map.removeLayer(layer);
    }
    renderList();
  }
  function syncButton(){
    if(!btn) return;
    btn.classList.toggle('active',expanded);
    btn.setAttribute('aria-expanded',expanded?'true':'false');
  }
  function scrollToPanel(){
    if(!listEl) return;
    setTimeout(()=>listEl.scrollIntoView({block:'nearest',behavior:'smooth'}),20);
  }
  function openEvents(){
    expanded=true;
    renderList();
    syncButton();
    if(app.openPanel) app.openPanel();
    scrollToPanel();
  }
  function renderConfig(){
    const days=getDays();
    const options=[1,2,3,4,5].map(d=>'<option value="'+d+'"'+(d===days?' selected':'')+'>'+esc(tf('eventsDayOption',d))+'</option>').join('');
    return '<div class="events-config">'+
      '<label>'+esc(t('eventsKeyLabel'))+'</label>'+
      '<input id="eventsKeyInput" type="password" autocomplete="off" placeholder="'+esc(t('eventsKeyPlaceholder'))+'" value="'+esc(getKey())+'">'+
      '<div class="events-row">'+
        '<div><label>'+esc(t('eventsDaysLabel'))+'</label><select id="eventsDaysSelect">'+options+'</select></div>'+
        '<div><label>'+esc(t('eventsAreaLabel'))+'</label><input value="'+esc(t('eventsAreaWestRussia'))+'" disabled></div>'+
      '</div>'+
      '<div class="legend-note">'+esc(t('eventsHint'))+'</div>'+
      '<div class="events-actions"><button class="btn accent" id="eventsLoadBtn" type="button">'+esc(t('eventsButtonLoad'))+'</button>'+
      '<button class="btn ghost" id="eventsClearBtn" type="button">'+esc(t('eventsButtonClear'))+'</button></div>'+
      '</div>';
  }
  function renderList(){
    if(!listEl) return;
    listEl.innerHTML='';
    const row=document.createElement('div');
    row.className='tool-item events-tool';
    row.innerHTML='<div class="tool-item-top">'+
      '<div class="tool-swatch event-swatch"></div>'+
      '<div class="tool-item-main"><b>'+esc(t('eventsTitle'))+'</b><span>'+esc(status||t('eventsHint'))+'</span></div>'+
      '<div class="tool-actions"><button class="iconbtn" data-act="toggle">'+(expanded?'-':'+')+'</button></div>'+
      '</div>'+(expanded?renderConfig():'');
    row.querySelector('[data-act="toggle"]').onclick=()=>{
      expanded=!expanded;
      renderList();
      syncButton();
      if(expanded) scrollToPanel();
    };
    listEl.appendChild(row);
    if(!expanded) return;
    const keyInput=row.querySelector('#eventsKeyInput');
    const daysSelect=row.querySelector('#eventsDaysSelect');
    const loadBtn=row.querySelector('#eventsLoadBtn');
    const clearBtn=row.querySelector('#eventsClearBtn');
    keyInput.onchange=()=>localStorage.setItem(STORAGE_KEY,keyInput.value.trim());
    keyInput.oninput=()=>localStorage.setItem(STORAGE_KEY,keyInput.value.trim());
    daysSelect.onchange=()=>localStorage.setItem(STORAGE_DAYS,daysSelect.value);
    loadBtn.disabled=loading;
    loadBtn.onclick=loadHotspots;
    clearBtn.onclick=clearLayer;
    if(hotspots.length){
      const summary=document.createElement('div');
      summary.className='tool-item events-summary';
      summary.innerHTML='<div class="tool-item-top">'+
        '<div class="tool-swatch event-swatch"></div>'+
        '<div class="tool-item-main"><b>'+esc(t('eventsSource'))+'</b><span>'+esc(tf('eventsLoaded',hotspots.length))+'</span></div>'+
        '<div class="tool-actions"><button class="iconbtn" data-act="vis">'+esc(visible?t('eventsButtonHide'):t('eventsButtonShow'))+'</button><button class="iconbtn" data-act="del">'+esc(t('del'))+'</button></div>'+
        '</div>';
      summary.querySelector('[data-act="vis"]').onclick=()=>setVisible(!visible);
      summary.querySelector('[data-act="del"]').onclick=clearLayer;
      listEl.appendChild(summary);
    }
  }
  function init(api){
    app=api;map=api.map;Lref=window.L;btn=document.querySelector('#eventsBtn');listEl=document.querySelector('#eventsList');
    layer=Lref.layerGroup();
    btn.setAttribute('aria-controls','eventsList');
    btn.setAttribute('aria-expanded','false');
    btn.onclick=openEvents;
    renderList();
    syncButton();
  }

  window.ArtilleryEvents={init,renderList,clear:clearLayer};
})();
