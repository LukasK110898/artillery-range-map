(function(){
  const SAMPLE_COUNT=72;
  let app,map,Lref,btn,panel,active=false,startMarker=null,endMarker=null,line=null,debounceTimer=null,requestId=0;

  function esc(v){return app&&app.esc?app.esc(v):String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function t(key){return app&&app.t?app.t(key):key;}
  function icon(color){
    return Lref.divIcon({className:'',html:'<div class="sys-dot" style="background:'+color+';color:'+color+'"></div>',iconSize:[14,14],iconAnchor:[7,7]});
  }
  function ensureLine(){
    if(!line) line=Lref.polyline([], {color:'#38bdf8',weight:2.5,opacity:.9}).addTo(map);
    if(startMarker&&endMarker) line.setLatLngs([startMarker.getLatLng(),endMarker.getLatLng()]);
  }
  function clearTerrain(){
    [startMarker,endMarker,line].forEach(layer=>{if(layer) map.removeLayer(layer);});
    startMarker=null;endMarker=null;line=null;
    if(panel) panel.hidden=true;
  }
  function makeMarker(latlng,color){
    return Lref.marker(latlng,{icon:icon(color),draggable:true,zIndexOffset:540}).addTo(map);
  }
  function samplePoints(a,b){
    const points=[];
    for(let i=0;i<SAMPLE_COUNT;i++){
      const f=i/(SAMPLE_COUNT-1);
      points.push(Lref.latLng(a.lat+(b.lat-a.lat)*f,a.lng+(b.lng-a.lng)*f));
    }
    return points;
  }
  function distances(points){
    let total=0;
    const out=[0];
    for(let i=1;i<points.length;i++){
      total+=map.distance(points[i-1],points[i])/1000;
      out.push(total);
    }
    return out;
  }
  async function fetchElevations(points){
    const lat=points.map(p=>p.lat.toFixed(5)).join(',');
    const lon=points.map(p=>p.lng.toFixed(5)).join(',');
    const res=await fetch('https://api.open-meteo.com/v1/elevation?latitude='+lat+'&longitude='+lon,{cache:'force-cache'});
    if(!res.ok) throw new Error('elevation '+res.status);
    const data=await res.json();
    if(!Array.isArray(data.elevation)) throw new Error('missing elevation');
    return data.elevation.map(Number);
  }
  function chartSvg(elevations,dists){
    const w=320,h=150,p=18;
    const min=Math.min(...elevations),max=Math.max(...elevations);
    const span=Math.max(1,max-min);
    const total=Math.max(1,dists[dists.length-1]);
    const pts=elevations.map((e,i)=>{
      const x=p+(dists[i]/total)*(w-p*2);
      const y=h-p-((e-min)/span)*(h-p*2);
      return [x,y];
    });
    const linePts=pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
    const fillPts=p+','+(h-p)+' '+linePts+' '+(w-p)+','+(h-p);
    return '<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(t('terrainProfile'))+'">'+
      '<line class="terrain-axis" x1="'+p+'" y1="'+(h-p)+'" x2="'+(w-p)+'" y2="'+(h-p)+'"></line>'+
      '<line class="terrain-axis" x1="'+p+'" y1="'+p+'" x2="'+p+'" y2="'+(h-p)+'"></line>'+
      '<polygon class="terrain-fill" points="'+fillPts+'"></polygon>'+
      '<polyline class="terrain-line" points="'+linePts+'"></polyline>'+
      '</svg>';
  }
  function renderPanel(content){
    panel.hidden=false;
    panel.innerHTML='<div class="floating-head"><div><div class="floating-title">'+esc(t('terrainProfile'))+'</div><div class="floating-sub">'+esc(t('terrainSource'))+'</div></div><button class="iconbtn" id="terrainClose" type="button">X</button></div>'+content;
    panel.querySelector('#terrainClose').onclick=()=>{panel.hidden=true;};
  }
  async function updateProfile(){
    if(!startMarker||!endMarker) return;
    ensureLine();
    const id=++requestId;
    renderPanel('<div class="legend-note">'+esc(t('terrainLoading'))+'</div>');
    const points=samplePoints(startMarker.getLatLng(),endMarker.getLatLng());
    const dists=distances(points);
    try{
      const elevations=await fetchElevations(points);
      if(id!==requestId) return;
      const min=Math.min(...elevations),max=Math.max(...elevations),diff=max-min;
      renderPanel('<div class="terrain-stats">'+
        '<div class="terrain-stat"><span>'+esc(t('minHeight'))+'</span><b>'+Math.round(min)+' m</b></div>'+
        '<div class="terrain-stat"><span>'+esc(t('maxHeight'))+'</span><b>'+Math.round(max)+' m</b></div>'+
        '<div class="terrain-stat"><span>'+esc(t('heightDiff'))+'</span><b>'+Math.round(diff)+' m</b></div>'+
        '</div><div class="terrain-chart">'+chartSvg(elevations,dists)+'</div>'+
        '<div class="legend-note">'+dists[dists.length-1].toFixed(2)+' km · '+SAMPLE_COUNT+' '+esc(t('samples'))+'</div>');
    }catch(e){
      if(id!==requestId) return;
      renderPanel('<div class="legend-note">'+esc(t('terrainError'))+'</div>');
    }
  }
  function scheduleProfile(){
    ensureLine();
    clearTimeout(debounceTimer);
    debounceTimer=setTimeout(updateProfile,450);
  }
  function onMapClick(e){
    if(!startMarker){
      startMarker=makeMarker(e.latlng,'#38bdf8');
      startMarker.on('drag',scheduleProfile);
      app.flash(t('terrainEndHint'));
      return;
    }
    if(!endMarker){
      endMarker=makeMarker(e.latlng,'#facc15');
      endMarker.on('drag',scheduleProfile);
      ensureLine();
      updateProfile();
      app.flash(t('terrainReadyHint'));
      return;
    }
    clearTerrain();
    startMarker=makeMarker(e.latlng,'#38bdf8');
    startMarker.on('drag',scheduleProfile);
    app.flash(t('terrainEndHint'));
  }
  function activate(){
    active=true;
    btn.classList.add('active');
    map.on('click',onMapClick);
    if(app.closePanel) app.closePanel();
    app.flash(t('terrainStartHint'));
  }
  function deactivate(){
    active=false;
    btn.classList.remove('active');
    map.off('click',onMapClick);
  }
  function init(api){
    app=api; map=api.map; Lref=window.L; btn=document.querySelector('#terrainBtn'); panel=document.querySelector('#terrainPanel');
    app.registerTool('terrain',{activate,deactivate});
    btn.onclick=()=>app.toggleTool('terrain');
  }

  window.ArtilleryTerrain={init,clear:clearTerrain};
})();
