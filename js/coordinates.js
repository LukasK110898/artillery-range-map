(function(){
  let app,map,btn,active=false,copyHandlerBound=false;

  function esc(v){return app&&app.esc?app.esc(v):String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function t(key){return app&&app.t?app.t(key):key;}
  function formatWgs(ll){return ll.lat.toFixed(6)+', '+ll.lng.toFixed(6);}
  function utmZone(lng){return Math.floor((lng+180)/6)+1;}
  function formatUtm(ll){
    if(!window.proj4) return t('coordUnavailable');
    const zone=utmZone(ll.lng);
    const hemi=ll.lat>=0?'N':'S';
    const def='+proj=utm +zone='+zone+(hemi==='S'?' +south':'')+' +datum=WGS84 +units=m +no_defs +type=crs';
    try{
      const pt=window.proj4('EPSG:4326',def,[ll.lng,ll.lat]);
      return zone+hemi+' '+Math.round(pt[0])+'E '+Math.round(pt[1])+'N';
    }catch(e){
      return t('coordUnavailable');
    }
  }
  function formatMgrs(ll){
    if(!window.mgrs || !window.mgrs.forward) return t('coordUnavailable');
    try{return window.mgrs.forward([ll.lng,ll.lat],5);}
    catch(e){return t('coordUnavailable');}
  }
  function row(label,value){
    return '<div class="coord-row"><span>'+esc(label)+'</span><code>'+esc(value)+'</code><button class="mini-copy" type="button" data-copy="'+esc(value)+'">'+esc(t('copy'))+'</button></div>';
  }
  function onMapClick(e){
    const ll=e.latlng;
    const wgs=formatWgs(ll);
    const utm=formatUtm(ll);
    const mgrsValue=formatMgrs(ll);
    const html='<div class="coord-popup"><b>'+esc(t('coordinatesTitle'))+'</b>'+
      row('WGS84',wgs)+row('UTM',utm)+row('MGRS',mgrsValue)+'</div>';
    L.popup({maxWidth:320}).setLatLng(ll).setContent(html).openOn(map);
  }
  function bindCopyHandler(){
    if(copyHandlerBound) return;
    copyHandlerBound=true;
    document.addEventListener('click',e=>{
      const btn=e.target.closest('[data-copy]');
      if(!btn) return;
      const value=btn.getAttribute('data-copy');
      if(navigator.clipboard){
        navigator.clipboard.writeText(value).then(()=>app.flash(t('copied')));
      }else{
        app.flash(value);
      }
    });
  }
  function activate(){
    active=true;
    btn.classList.add('active');
    map.on('click',onMapClick);
    if(app.closePanel) app.closePanel();
    app.flash(t('coordHint'));
  }
  function deactivate(){
    active=false;
    btn.classList.remove('active');
    map.off('click',onMapClick);
  }
  function init(api){
    app=api; map=api.map; btn=document.querySelector('#coordsBtn');
    bindCopyHandler();
    app.registerTool('coordinates',{activate,deactivate});
    btn.onclick=()=>app.toggleTool('coordinates');
  }

  window.ArtilleryCoordinates={init};
})();
