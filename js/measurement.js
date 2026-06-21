(function(){
  const FALLBACK_COLORS=['#38bdf8','#f97316','#a78bfa','#34d399','#f472b6','#facc15','#fb7185','#22d3ee'];
  let app,map,Lref,btn,listEl,active=false,pendingMarker=null,nextId=1,colorIdx=0;
  let measurements=[];

  function esc(v){return app&&app.esc?app.esc(v):String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function t(key){return app&&app.t?app.t(key):key;}
  function colorFor(idx){const colors=(app&&app.palette)||FALLBACK_COLORS;return colors[idx%colors.length];}
  function markerIcon(color){
    return Lref.divIcon({
      className:'',
      html:'<div class="sys-dot" style="width:12px;height:12px;background:'+color+';color:'+color+'"></div>',
      iconSize:[12,12],
      iconAnchor:[6,6]
    });
  }
  function labelIcon(text,color){
    return Lref.divIcon({
      className:'',
      html:'<div class="measure-line-label" style="border-left:2px solid '+color+'">'+esc(text)+'</div>',
      iconSize:[118,24],
      iconAnchor:[59,12]
    });
  }
  function bearing(a,b){
    const lat1=a.lat*Math.PI/180,lat2=b.lat*Math.PI/180;
    const dLon=(b.lng-a.lng)*Math.PI/180;
    const y=Math.sin(dLon)*Math.cos(lat2);
    const x=Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    return (Math.atan2(y,x)*180/Math.PI+360)%360;
  }
  function midpoint(a,b){return Lref.latLng((a.lat+b.lat)/2,(a.lng+b.lng)/2);}
  function metrics(m){
    const km=map.distance(m.start,m.end)/1000;
    const br=bearing(m.start,m.end);
    return {km,br,label:km.toFixed(km>=100?0:2)+' km · '+br.toFixed(0)+'°'};
  }
  function setVisible(m,visible){
    m.visible=visible;
    const opacity=visible?1:.18;
    m.line.setStyle({opacity:visible?.95:0,fillOpacity:0});
    m.startMarker.setOpacity(opacity);
    m.endMarker.setOpacity(opacity);
    m.labelMarker.setOpacity(visible?1:0);
  }
  function updateMeasurement(m){
    const data=metrics(m);
    m.line.setLatLngs([m.start,m.end]);
    m.labelMarker.setLatLng(midpoint(m.start,m.end));
    m.labelMarker.setIcon(labelIcon(data.label,m.color));
    m.distanceKm=data.km;
    m.bearingDeg=data.br;
    renderList();
  }
  function createMeasurement(start,end,opts){
    opts=opts||{};
    const color=opts.color||colorFor(colorIdx++);
    const m={
      id:opts.id||nextId++,
      color,
      start:Lref.latLng(start),
      end:Lref.latLng(end),
      visible:opts.visible!==false
    };
    m.line=Lref.polyline([m.start,m.end],{color,weight:2.3,opacity:.95,dashArray:'8,6'}).addTo(map);
    m.startMarker=Lref.marker(m.start,{icon:markerIcon(color),draggable:true,zIndexOffset:520}).addTo(map);
    m.endMarker=Lref.marker(m.end,{icon:markerIcon(color),draggable:true,zIndexOffset:520}).addTo(map);
    m.labelMarker=Lref.marker(midpoint(m.start,m.end),{interactive:false,keyboard:false,zIndexOffset:510}).addTo(map);
    m.startMarker.on('drag',e=>{m.start=e.target.getLatLng();updateMeasurement(m);});
    m.endMarker.on('drag',e=>{m.end=e.target.getLatLng();updateMeasurement(m);});
    measurements.push(m);
    updateMeasurement(m);
    setVisible(m,m.visible);
    return m;
  }
  function removeMeasurement(id){
    const idx=measurements.findIndex(m=>m.id===id);
    if(idx<0) return;
    const m=measurements[idx];
    [m.line,m.startMarker,m.endMarker,m.labelMarker].forEach(layer=>map.removeLayer(layer));
    measurements.splice(idx,1);
    renderList();
  }
  function clearPending(){
    if(pendingMarker){map.removeLayer(pendingMarker);pendingMarker=null;}
  }
  function onMapClick(e){
    if(!pendingMarker){
      pendingMarker=Lref.marker(e.latlng,{icon:markerIcon(colorFor(colorIdx)),draggable:true,zIndexOffset:525}).addTo(map);
      app.flash(t('measureEndHint'));
      return;
    }
    const start=pendingMarker.getLatLng();
    clearPending();
    createMeasurement(start,e.latlng);
    app.flash(t('measureAgainHint'));
  }
  function activate(){
    active=true;
    btn.classList.add('active');
    map.on('click',onMapClick);
    if(app.closePanel) app.closePanel();
    app.flash(t('measureStartHint'));
  }
  function deactivate(){
    active=false;
    btn.classList.remove('active');
    map.off('click',onMapClick);
    clearPending();
  }
  function renderList(){
    if(!listEl) return;
    listEl.innerHTML='';
    measurements.forEach(m=>{
      const data=metrics(m);
      const row=document.createElement('div');
      row.className='tool-item';
      row.innerHTML='<div class="tool-item-top">'+
        '<div class="tool-swatch" style="background:'+m.color+';color:'+m.color+'"></div>'+
        '<div class="tool-item-main"><b>'+esc(t('measurement'))+' '+m.id+'</b><span>'+data.km.toFixed(data.km>=100?0:2)+' km · '+data.br.toFixed(0)+'°</span></div>'+
        '<div class="tool-actions"><button class="iconbtn" data-act="vis">'+(m.visible?t('hide'):t('vis'))+'</button><button class="iconbtn" data-act="del">'+t('del')+'</button></div>'+
        '</div>';
      row.querySelector('[data-act="vis"]').onclick=()=>{setVisible(m,!m.visible);renderList();};
      row.querySelector('[data-act="del"]').onclick=()=>removeMeasurement(m.id);
      listEl.appendChild(row);
    });
  }
  function clear(){
    [...measurements].forEach(m=>removeMeasurement(m.id));
    clearPending();
  }
  function exportState(){
    return measurements.map(m=>({
      start:{lat:m.start.lat,lng:m.start.lng},
      end:{lat:m.end.lat,lng:m.end.lng},
      color:m.color,
      visible:m.visible
    }));
  }
  function restoreState(items){
    clear();
    (items||[]).forEach(item=>{
      if(!item.start||!item.end) return;
      createMeasurement(item.start,item.end,{color:item.color,visible:item.visible});
    });
    renderList();
  }
  function init(api){
    app=api; map=api.map; Lref=window.L; btn=document.querySelector('#measureBtn'); listEl=document.querySelector('#measurementList');
    app.registerTool('measurement',{activate,deactivate});
    btn.onclick=()=>app.toggleTool('measurement');
    renderList();
  }

  window.ArtilleryMeasurement={init,exportState,restoreState,renderList,clear};
})();
