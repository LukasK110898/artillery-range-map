(function(){
  const CAPITAL_KEY='arm_capitals_visible';
  const INFRA_KEY='arm_infra_visible';
  let app,map,Lref,capitalLayer,infraLayer,capitalToggle,infraToggle;

  const CAPITALS=[
    {name:'Kyiv',country:'Ukraine',flag:'🇺🇦',lat:50.4501,lng:30.5234},
    {name:'Moscow',country:'Russia',flag:'🇷🇺',lat:55.7558,lng:37.6173},
    {name:'Minsk',country:'Belarus',flag:'🇧🇾',lat:53.9006,lng:27.5590},
    {name:'Warsaw',country:'Poland',flag:'🇵🇱',lat:52.2297,lng:21.0122},
    {name:'Chisinau',country:'Moldova',flag:'🇲🇩',lat:47.0105,lng:28.8638},
    {name:'Bucharest',country:'Romania',flag:'🇷🇴',lat:44.4268,lng:26.1025},
    {name:'Bratislava',country:'Slovakia',flag:'🇸🇰',lat:48.1486,lng:17.1077},
    {name:'Budapest',country:'Hungary',flag:'🇭🇺',lat:47.4979,lng:19.0402},
    {name:'Vilnius',country:'Lithuania',flag:'🇱🇹',lat:54.6872,lng:25.2797},
    {name:'Riga',country:'Latvia',flag:'🇱🇻',lat:56.9496,lng:24.1052},
    {name:'Tallinn',country:'Estonia',flag:'🇪🇪',lat:59.4370,lng:24.7536},
    {name:'Helsinki',country:'Finland',flag:'🇫🇮',lat:60.1699,lng:24.9384},
    {name:'Stockholm',country:'Sweden',flag:'🇸🇪',lat:59.3293,lng:18.0686},
    {name:'Berlin',country:'Germany',flag:'🇩🇪',lat:52.5200,lng:13.4050},
    {name:'Ankara',country:'Turkiye',flag:'🇹🇷',lat:39.9334,lng:32.8597},
    {name:'Tbilisi',country:'Georgia',flag:'🇬🇪',lat:41.7151,lng:44.8271}
  ];

  const INFRA=[
    {name:'Odesa',kind:'port',lat:46.4825,lng:30.7233,desc:{de:'Schwarzmeer-Hafenregion mit grosser Bedeutung fuer Handel und Logistik.',en:'Black Sea port region with major trade and logistics relevance.'}},
    {name:'Chornomorsk',kind:'port',lat:46.3017,lng:30.6569,desc:{de:'Hafenstadt im Raum Odesa; wichtiger Seeverkehrs- und Umschlagpunkt.',en:'Port city in the Odesa area; important maritime and cargo region.'}},
    {name:'Pivdennyi / Yuzhne',kind:'port',lat:46.6221,lng:31.1013,desc:{de:'Hafen- und Industriegebiet am Schwarzen Meer.',en:'Black Sea port and industrial area.'}},
    {name:'Izmail',kind:'port',lat:45.3500,lng:28.8370,desc:{de:'Donau-Hafenregion fuer Flusslogistik und Exportverkehr.',en:'Danube port region for river logistics and export traffic.'}},
    {name:'Reni',kind:'port',lat:45.4567,lng:28.2792,desc:{de:'Donau-Hafenstadt im Suedwesten der Ukraine.',en:'Danube port city in southwestern Ukraine.'}},
    {name:'Novorossiysk',kind:'port',lat:44.7239,lng:37.7683,desc:{de:'Schwarzmeer-Hafenregion mit Energie- und Umschlaginfrastruktur.',en:'Black Sea port region with energy and cargo infrastructure.'}},
    {name:'Ust-Luga',kind:'port',lat:59.6670,lng:28.2870,desc:{de:'Baltische Hafen- und Terminalregion.',en:'Baltic port and terminal region.'}},
    {name:'Primorsk',kind:'port',lat:60.3650,lng:28.6130,desc:{de:'Baltische Hafenregion fuer Energie- und Seeverkehr.',en:'Baltic port region for energy and maritime traffic.'}},
    {name:'Tuapse',kind:'refinery',lat:44.1047,lng:39.0778,desc:{de:'Raffinerie- und Hafenstadt an der Schwarzmeerkueste.',en:'Refinery and port city on the Black Sea coast.'}},
    {name:'Ryazan',kind:'refinery',lat:54.6292,lng:39.7364,desc:{de:'Raffineriestadt und regionaler Industrieknoten.',en:'Refinery city and regional industrial hub.'}},
    {name:'Kirishi',kind:'refinery',lat:59.4497,lng:32.0087,desc:{de:'Raffinerie- und Industriegebiet im Nordwesten Russlands.',en:'Refinery and industrial area in northwestern Russia.'}},
    {name:'Volgograd',kind:'refinery',lat:48.7080,lng:44.5133,desc:{de:'Raffinerie-, Industrie- und Verkehrsknoten an der Wolga.',en:'Refinery, industrial, and transport hub on the Volga.'}},
    {name:'Nizhnekamsk',kind:'refinery',lat:55.6310,lng:51.8144,desc:{de:'Petrochemie- und Raffinerieregion in Tatarstan.',en:'Petrochemical and refinery region in Tatarstan.'}},
    {name:'Omsk',kind:'refinery',lat:54.9885,lng:73.3242,desc:{de:'Grosse Raffinerie- und Industrieregion in Westsibirien.',en:'Major refinery and industrial region in western Siberia.'}},
    {name:'Kremenchuk',kind:'refinery',lat:49.0680,lng:33.4204,desc:{de:'Ukrainische Raffinerie- und Industriestadt am Dnipro.',en:'Ukrainian refinery and industrial city on the Dnipro.'}},
    {name:'Dnipro',kind:'industrial',lat:48.4647,lng:35.0462,desc:{de:'Grosses Industrie-, Verkehrs- und Logistikzentrum.',en:'Major industrial, transport, and logistics center.'}},
    {name:'Zaporizhzhia',kind:'energy',lat:47.8388,lng:35.1396,desc:{de:'Industrie- und Energieregion am Dnipro.',en:'Industrial and energy region on the Dnipro.'}},
    {name:'Lviv',kind:'logistics',lat:49.8397,lng:24.0297,desc:{de:'Westukrainischer Logistik- und Verkehrsknoten.',en:'Western Ukrainian logistics and transport hub.'}}
  ];

  function esc(v){return app&&app.esc?app.esc(v):String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function t(key){return app&&app.t?app.t(key):key;}
  function currentLang(){return document.documentElement.lang==='en'?'en':'de';}
  function capitalVisible(){return localStorage.getItem(CAPITAL_KEY)!=='false';}
  function infraVisible(){return localStorage.getItem(INFRA_KEY)!=='false';}
  function icon(html,className,size){
    return Lref.divIcon({className:'',html:'<div class="'+className+'">'+html+'</div>',iconSize:[size,size],iconAnchor:[size/2,size/2]});
  }
  function kindLabel(kind){return t(kind)||kind;}
  function capitalPopup(item){
    return '<div class="place-popup"><b>'+esc(item.flag+' '+item.name)+'</b><div>'+esc(t('capital'))+' · '+esc(item.country)+'</div></div>';
  }
  function infraPopup(item){
    const lang=currentLang();
    return '<div class="place-popup"><b>'+esc(item.name)+'</b>'+
      '<div><span class="place-chip place-chip-'+esc(item.kind)+'">'+esc(kindLabel(item.kind))+'</span></div>'+
      '<p>'+esc((item.desc&&item.desc[lang])||item.desc.de||'')+'</p>'+
      '<div class="place-note">'+esc(t('infraApprox'))+'</div></div>';
  }
  function renderCapitals(){
    capitalLayer.clearLayers();
    CAPITALS.forEach(item=>{
      Lref.marker([item.lat,item.lng],{
        icon:icon('<span>'+esc(item.flag)+'</span>','capital-marker',26),
        keyboard:false,
        zIndexOffset:220
      }).bindPopup(capitalPopup(item),{maxWidth:260}).addTo(capitalLayer);
    });
  }
  function renderInfra(){
    infraLayer.clearLayers();
    INFRA.forEach(item=>{
      Lref.marker([item.lat,item.lng],{
        icon:icon('<span>'+esc(kindLabel(item.kind).slice(0,1))+'</span>','infra-marker infra-'+item.kind,22),
        keyboard:false,
        zIndexOffset:210
      }).bindPopup(infraPopup(item),{maxWidth:285}).addTo(infraLayer);
    });
  }
  function syncLayers(){
    if(capitalToggle){
      capitalToggle.checked=capitalVisible();
      if(capitalToggle.checked&&!map.hasLayer(capitalLayer)) capitalLayer.addTo(map);
      if(!capitalToggle.checked&&map.hasLayer(capitalLayer)) map.removeLayer(capitalLayer);
    }
    if(infraToggle){
      infraToggle.checked=infraVisible();
      if(infraToggle.checked&&!map.hasLayer(infraLayer)) infraLayer.addTo(map);
      if(!infraToggle.checked&&map.hasLayer(infraLayer)) map.removeLayer(infraLayer);
    }
  }
  function refresh(){
    if(!capitalLayer||!infraLayer) return;
    renderCapitals();
    renderInfra();
    syncLayers();
  }
  function init(api){
    app=api;map=api.map;Lref=window.L;
    capitalToggle=document.querySelector('#capitalToggle');
    infraToggle=document.querySelector('#infraToggle');
    capitalLayer=Lref.layerGroup();
    infraLayer=Lref.layerGroup();
    if(capitalToggle) capitalToggle.onchange=e=>{localStorage.setItem(CAPITAL_KEY,e.target.checked?'true':'false');syncLayers();};
    if(infraToggle) infraToggle.onchange=e=>{localStorage.setItem(INFRA_KEY,e.target.checked?'true':'false');syncLayers();};
    refresh();
  }

  window.ArtilleryPlaces={init,refresh};
})();
