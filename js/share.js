(function(){
  let app,btn;

  function encodeState(state){
    const json=JSON.stringify(state);
    const bytes=new TextEncoder().encode(json);
    let bin='';
    bytes.forEach(b=>bin+=String.fromCharCode(b));
    return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }
  function decodeState(value){
    const padded=value.replace(/-/g,'+').replace(/_/g,'/')+'==='.slice((value.length+3)%4);
    const bin=atob(padded);
    const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  function hasState(){
    return new URLSearchParams(window.location.search).has('share');
  }
  function readState(){
    const raw=new URLSearchParams(window.location.search).get('share');
    if(!raw) return null;
    try{return decodeState(raw);}
    catch(e){return null;}
  }
  function buildState(){
    return {
      v:1,
      map:app.exportMapState(),
      systems:app.exportSystemsState(),
      measurements:window.ArtilleryMeasurement&&window.ArtilleryMeasurement.exportState?window.ArtilleryMeasurement.exportState():[]
    };
  }
  function buildUrl(){
    const url=new URL(window.location.href);
    url.searchParams.set('share',encodeState(buildState()));
    return url.toString();
  }
  async function copyUrl(url){
    if(navigator.clipboard){
      await navigator.clipboard.writeText(url);
      return true;
    }
    return false;
  }
  function restore(api){
    const state=readState();
    if(!state) return false;
    if(state.map) api.restoreMapState(state.map);
    if(state.systems) api.restoreSystemsState(state.systems);
    if(window.ArtilleryMeasurement&&window.ArtilleryMeasurement.restoreState){
      window.ArtilleryMeasurement.restoreState(state.measurements||[]);
    }
    return true;
  }
  function init(api){
    app=api; btn=document.querySelector('#shareBtn');
    btn.onclick=async()=>{
      const url=buildUrl();
      window.history.replaceState(null,'',url);
      try{
        await copyUrl(url);
        app.flash(app.t('shareCopied'));
      }catch(e){
        app.flash(app.t('shareReady'));
      }
    };
  }

  window.ArtilleryShare={init,hasState,restore,buildUrl,readState};
})();
