// ====== Systemkatalog (veröffentlichte ~Reichweitenangaben in km) ======
const CATALOG = [
  // ---------- NATO / Westen ----------
  { key:'loras', group:'NATO / Westen', name:'KNDS LORAS', cal:'155 mm / L58 · in Entwicklung (2026)', ammo:[
      {name:'Standard-HE (neue Munition)', range:60},{name:'Präzisions-/Spezialmunition', range:100} ]},
  { key:'pzh2000', group:'NATO / Westen', name:'PzH 2000', cal:'155 mm / L52', ammo:[
      {name:'Standard-HE (DM121 BT)', range:30},{name:'Base Bleed', range:40},{name:'V-LAP (RAP)', range:54},
      {name:'V-LAP + ERC (getestet)', range:67},{name:'Vulcano GLR (gelenkt)', range:70},{name:'Excalibur (gelenkt)', range:54} ]},
  { key:'rch155', group:'NATO / Westen', name:'RCH 155 (Boxer)', cal:'155 mm / L52', ammo:[
      {name:'Base Bleed', range:40},{name:'V-LAP (RAP)', range:54},{name:'Vulcano GLR (gelenkt)', range:70},{name:'Excalibur (gelenkt)', range:54} ]},
  { key:'caesar', group:'NATO / Westen', name:'CAESAR', cal:'155 mm / L52', ammo:[
      {name:'Extended-Range-HE', range:42},{name:'V-LAP (RAP)', range:55},{name:'Vulcano GLR (gelenkt)', range:70},
      {name:'Excalibur (gelenkt)', range:50},{name:'BONUS (Anti-Panzer)', range:35} ]},
  { key:'archer', group:'NATO / Westen', name:'Archer (FH77 BW)', cal:'155 mm / L52', ammo:[
      {name:'Standard-HE (Base Bleed)', range:40},{name:'Excalibur (gelenkt)', range:50},{name:'BONUS (Anti-Panzer)', range:35} ]},
  { key:'krab', group:'NATO / Westen', name:'AHS Krab (PL)', cal:'155 mm / L52', ammo:[
      {name:'Base Bleed', range:40},{name:'V-LAP (RAP)', range:50},{name:'Excalibur (gelenkt)', range:50} ]},
  { key:'zuzana2', group:'NATO / Westen', name:'Zuzana 2 (SK)', cal:'155 mm / L52', ammo:[
      {name:'Standard-HE', range:40},{name:'Extended-Range', range:50} ]},
  { key:'m777', group:'NATO / Westen', topUsed:true, name:'M777', cal:'155 mm / L39 · gezogen', ammo:[
      {name:'Standard-HE (Ladung 5)', range:24},{name:'RAP', range:30},{name:'Excalibur (gelenkt)', range:40},{name:'Vulcano (beworben)', range:60} ]},
  { key:'m109a7', group:'NATO / Westen', name:'M109A7 Paladin', cal:'155 mm / L39', ammo:[
      {name:'Standard-HE', range:24},{name:'RAP', range:30},{name:'Excalibur (gelenkt)', range:40} ]},
  { key:'himars', group:'NATO / Westen', topUsed:true, name:'M142 HIMARS', cal:'227 mm Raketenwerfer', ammo:[
      {name:'GMLRS (gelenkt)', range:84},{name:'ER-GMLRS', range:150},{name:'ATACMS (takt. Rakete)', range:300} ]},
  // ---------- Marschflugkörper / NATO ----------
  { key:'tomahawk', group:'Marschflugkörper / NATO', classKey:'cruiseMissile', name:'Tomahawk (RGM/UGM-109)', cal:'See-/U-Boot-gestützter Marschflugkörper', ammo:[
      {name:'TLAM-C/D (typische Varianten)', range:1300},{name:'Block IV/V TLAM-E', range:1600},{name:'Langreichweiten-Variante (oberer Referenzwert)', range:2500} ]},
  { key:'jassm', group:'Marschflugkörper / NATO', classKey:'cruiseMissile', name:'AGM-158 JASSM', cal:'Luftgestützter Marschflugkörper', ammo:[
      {name:'AGM-158A JASSM', range:370},{name:'AGM-158B JASSM-ER', range:1000},{name:'AGM-158D JASSM-XR', range:1800} ]},
  { key:'stormshadow', group:'Marschflugkörper / NATO', classKey:'cruiseMissile', name:'Storm Shadow / SCALP-EG', cal:'Luftgestützter Marschflugkörper', ammo:[
      {name:'Storm Shadow / SCALP-EG', range:250} ]},
  { key:'taurus', group:'Marschflugkörper / NATO', classKey:'cruiseMissile', name:'TAURUS KEPD 350', cal:'Luftgestützter Marschflugkörper', ammo:[
      {name:'KEPD 350', range:500} ]},
  // ---------- Russland ----------
  { key:'msta', group:'Russland', topUsed:true, name:'2S19 Msta-S', cal:'152 mm / L47', ammo:[
      {name:'Standard-HE', range:25},{name:'Base Bleed (OF-61)', range:29},{name:'RAP (raketenunterstützt)', range:40},{name:'Krasnopol (gelenkt)', range:20} ]},
  { key:'koalitsiya', group:'Russland', name:'2S35 Koalitsiya-SV', cal:'152 mm · neu', ammo:[
      {name:'Standard-HE', range:30},{name:'RAP', range:45},{name:'Präzisionsmunition (beansprucht)', range:70} ]},
  { key:'giatsint', group:'Russland', name:'2S5 Giatsint-S', cal:'152 mm', ammo:[
      {name:'Standard-HE', range:28},{name:'RAP', range:33} ]},
  { key:'akatsiya', group:'Russland', topUsed:true, name:'2S3 Akatsiya', cal:'152 mm', ammo:[
      {name:'Standard-HE', range:18},{name:'RAP', range:24} ]},
  { key:'pion', group:'Russland', name:'2S7 Pion / Malka', cal:'203 mm', ammo:[
      {name:'Standard-HE', range:37},{name:'RAP', range:47} ]},
  { key:'grad', group:'Russland', topUsed:true, name:'BM-21 Grad', cal:'122 mm Raketenwerfer', ammo:[
      {name:'Standard-Rakete', range:20},{name:'Extended-Range-Rakete', range:40} ]},
  { key:'smerch', group:'Russland', name:'BM-30 Smerch', cal:'300 mm Raketenwerfer', ammo:[
      {name:'Standard-Rakete', range:70},{name:'Extended-Range', range:90} ]},
  { key:'tornados', group:'Russland', name:'9A52-4 Tornado-S', cal:'300 mm Raketenwerfer', ammo:[
      {name:'Gelenkte Rakete (9M542)', range:120},{name:'Neue Rakete (beansprucht)', range:200} ]},
  // ---------- Marschflugkörper / Russland ----------
  { key:'kalibr', group:'Marschflugkörper / Russland', classKey:'cruiseMissile', name:'3M-14 Kalibr (SS-N-30A)', cal:'See-/U-Boot-gestützter Marschflugkörper', ammo:[
      {name:'Unterer Referenzwert', range:1500},{name:'Oberer Referenzwert', range:2500} ]},
  { key:'kh101', group:'Marschflugkörper / Russland', classKey:'cruiseMissile', name:'Kh-101 / Kh-102', cal:'Luftgestützter Marschflugkörper', ammo:[
      {name:'Kh-101 (konventionell)', range:2500},{name:'Kh-101/102 (oberer Referenzwert)', range:2800} ]},
  // ---------- Ukraine ----------
  { key:'bohdana', group:'Ukraine', topUsed:true, name:'2S22 Bohdana', cal:'155 mm / L52 · inländisch', ammo:[
      {name:'Standard-HE', range:42},{name:'RAP (raketenunterstützt)', range:60},{name:'Excalibur (gelenkt)', range:50} ]},
  { key:'gvozdika', group:'Ukraine', topUsed:true, name:'2S1 Gvozdika', cal:'122 mm', ammo:[
      {name:'Standard-HE', range:15},{name:'RAP', range:21} ]},
  { key:'d30', group:'Ukraine', topUsed:true, name:'D-30 (gezogen)', cal:'122 mm', ammo:[
      {name:'Standard-HE', range:15},{name:'RAP', range:21} ]},
  // ---------- Marschflugkörper / Ukraine ----------
  { key:'neptune', group:'Marschflugkörper / Ukraine', classKey:'cruiseMissile', name:'R-360 Neptune', cal:'Ukrainischer Marschflugkörper', ammo:[
      {name:'R-360 Neptune', range:280},{name:'Long Neptune', range:1000} ]},
  { key:'flamingo', group:'Marschflugkörper / Ukraine', classKey:'cruiseMissile', name:'FP-5 Flamingo', cal:'Bodengestützter Marschflugkörper', ammo:[
      {name:'Öffentlicher Referenzwert', range:3000} ]},
  { key:'palianytsia', group:'Marschflugkörper / Ukraine', classKey:'cruiseMissile', name:'Palianytsia', cal:'Ukrainischer Raketen-/Marschflugkörper-ähnlicher Flugkörper', ammo:[
      {name:'Öffentlicher Referenzwert', range:650} ]},
  { key:'peklo', group:'Marschflugkörper / Ukraine', classKey:'cruiseMissile', name:'Peklo', cal:'Ukrainischer Raketen-/Drohnenflugkörper', ammo:[
      {name:'Öffentlicher Referenzwert', range:700} ]},
];
const PALETTE = ['#38bdf8','#f97316','#a78bfa','#34d399','#f472b6','#facc15','#fb7185','#22d3ee','#c084fc','#4ade80'];
const I18N = {
  de: {
    pageTitle: 'Artillerie-Reichweitenkarte',
    menuAria: 'Menue',
    panelTitle: 'Artillerie-Reichweiten',
    panelSub: 'Reichweiten & Frontlinie · Ukraine-Theater',
    languageLabel: 'Sprache',
    mapLayers: 'Karten-Ebenen',
    occupiedFront: 'Besetztes Gebiet / Frontlinie',
    regions: 'Bundesland-/Regionsgrenzen (Europa)',
    refreshFront: 'Frontdaten live aktualisieren',
    loadingFront: 'Frontdaten werden live geladen ...',
    frontLoading: 'Lade aktuelle Frontdaten ...',
    frontOffline: 'Frontdaten derzeit nicht abrufbar (Quelle offline oder Netz blockiert). Erneut versuchen mit "Refresh".',
    frontLoaded: ds => 'Stand ' + fmtDate(ds) + ' · Quelle: <a href="https://github.com/cyterat/deepstate-map-data" target="_blank" rel="noopener">cyterat/deepstate-map-data</a> / <a href="https://deepstatemap.live/license-en.html" target="_blank" rel="noopener">DeepStateMap</a>.',
    addSystem: 'System hinzufuegen',
    add: 'Setzen',
    ownSystem: 'Eigenes System',
    newSystem: '+ Eigenes System anlegen',
    customName: 'Name (z. B. eigenes System)',
    customCal: 'Kaliber / Rohr (optional)',
    ammoAndRange: 'Munition & Reichweite (km)',
    ammo: 'Munition',
    addAmmo: '+ Munition',
    save: 'Speichern',
    cancel: 'Abbrechen',
    placed: 'Platzierte Systeme',
    artillery: 'Artillerie',
    cruiseMissiles: 'Marschflugkoerper',
    drawerCollapse: 'Platzierte Systeme einklappen',
    drawerExpand: 'Platzierte Systeme ausklappen',
    tools: 'Werkzeuge',
    terrain: 'Terrain',
    coordinates: 'Koordinaten',
    measure: 'Messen',
    share: 'Share',
    noteTitle: 'Titel',
    noteDescription: 'Beschreibung',
    noteTitlePlaceholder: 'Marker-Titel',
    noteDescriptionPlaceholder: 'Notiz / Beschreibung',
    terrainStartHint: 'Startpunkt fuer Hoehenprofil setzen',
    terrainEndHint: 'Zielpunkt fuer Hoehenprofil setzen',
    terrainReadyHint: 'Hoehenprofil wird geladen',
    terrainLoading: 'Hoehendaten werden geladen ...',
    terrainError: 'Hoehendaten konnten nicht geladen werden. Bitte spaeter erneut versuchen.',
    terrainProfile: 'Hoehenprofil',
    terrainSource: 'Open-Meteo Elevation API',
    minHeight: 'Min',
    maxHeight: 'Max',
    heightDiff: 'Differenz',
    samples: 'Messpunkte',
    coordHint: 'Karte anklicken, um Koordinaten anzuzeigen',
    coordinatesTitle: 'Koordinaten',
    coordUnavailable: 'nicht verfuegbar',
    copy: 'Copy',
    copied: 'Kopiert',
    measureStartHint: 'Startpunkt fuer Messung setzen',
    measureEndHint: 'Zielpunkt fuer Messung setzen',
    measureAgainHint: 'Messung gespeichert - naechsten Startpunkt setzen',
    measurement: 'Messung',
    shareCopied: 'Share-Link in URL gespeichert und kopiert',
    shareReady: 'Share-Link in URL gespeichert',
    empty: 'Noch nichts platziert.<br>Waehle oben ein System und tippe "Setzen".',
    rangeNote: 'Reichweiten sind veroefentlichte, ungefaehre Hersteller-/Referenzangaben (je nach Munition/Ladung/Systemvariante variabel) - ueber "Benutzerdefiniert" anpassbar. ★ markiert qualitativ haeufig berichtete bzw. besonders sichtbare Systeme. Die Front-Ebene zeigt Flaechenkontrolle aus offener OSINT-Quelle, keine praezisen Truppenpositionen.',
    footerBuild: 'Kartenkacheln: OpenStreetMap contributors und CARTO.',
    footerDeepState: 'Frontdaten: cyterat/deepstate-map-data (GPL-3.0), abgeleitet aus DeepStateMap.live.',
    footerTool: 'Tool by Lukas Knorr',
    cruiseMissile: 'Marschflugkoerper',
    operatorLabel: 'Nutzer',
    maxRangeLabel: 'Max RW',
    labelToggleTitle: 'Systembezeichnungen umschalten',
    labelModeCompact: 'KURZ',
    labelModeFull: 'DETAIL',
    labelModeOff: 'AUS',
    themeToggleTitle: 'Helle/Dunkle Darstellung umschalten',
    themeDark: 'DUNKEL',
    themeLight: 'HELL',
    vis: 'VIS',
    hide: 'HIDE',
    zoom: 'ZOOM',
    del: 'DEL',
    rangeKm: 'km Reichweite',
    rangeLabel: 'Reichweite',
    customAmmo: 'Benutzerdefiniert...',
    groupMap: {
      'NATO / Westen': 'NATO / Westen',
      'Russland': 'Russland',
      'Ukraine': 'Ukraine',
      'Marschflugkörper / NATO': 'Marschflugkoerper / NATO',
      'Marschflugkörper / Ukraine': 'Marschflugkoerper / Ukraine',
      'Marschflugkörper / Russland': 'Marschflugkoerper / Russland',
      'Eigene Systeme': 'Eigene Systeme'
    },
    operatorMap: {
      nato: 'NATO / Westen',
      russia: 'Russland',
      ukraine: 'Ukraine',
      custom: 'Eigene Systeme'
    },
    setHint: name => '"' + name + '" zum Katalog hinzugefuegt',
    placeHint: name => name + ' gesetzt - Marker zum Verschieben ziehen'
  },
  en: {
    pageTitle: 'Artillery Range Map',
    menuAria: 'Menu',
    panelTitle: 'Artillery Ranges',
    panelSub: 'Ranges and front line · Ukraine theater',
    languageLabel: 'Language',
    mapLayers: 'Map layers',
    occupiedFront: 'Occupied area / front line',
    regions: 'State / region borders (Europe)',
    refreshFront: 'Refresh front data',
    loadingFront: 'Front data is loading live ...',
    frontLoading: 'Loading current front data ...',
    frontOffline: 'Front data is currently unavailable (source offline or network blocked). Try again with "Refresh".',
    frontLoaded: ds => 'As of ' + fmtDate(ds) + ' · Source: <a href="https://github.com/cyterat/deepstate-map-data" target="_blank" rel="noopener">cyterat/deepstate-map-data</a> / <a href="https://deepstatemap.live/license-en.html" target="_blank" rel="noopener">DeepStateMap</a>.',
    addSystem: 'Add system',
    add: 'Add',
    ownSystem: 'Custom system',
    newSystem: '+ Create custom system',
    customName: 'Name (e.g. custom system)',
    customCal: 'Caliber / barrel (optional)',
    ammoAndRange: 'Ammo and range (km)',
    ammo: 'Ammo',
    addAmmo: '+ Ammo',
    save: 'Save',
    cancel: 'Cancel',
    placed: 'Placed systems',
    artillery: 'Artillery',
    cruiseMissiles: 'Cruise missiles',
    drawerCollapse: 'Collapse placed systems',
    drawerExpand: 'Expand placed systems',
    tools: 'Tools',
    terrain: 'Terrain',
    coordinates: 'Coordinates',
    measure: 'Measure',
    share: 'Share',
    noteTitle: 'Title',
    noteDescription: 'Description',
    noteTitlePlaceholder: 'Marker title',
    noteDescriptionPlaceholder: 'Note / description',
    terrainStartHint: 'Set the terrain profile start point',
    terrainEndHint: 'Set the terrain profile target point',
    terrainReadyHint: 'Loading terrain profile',
    terrainLoading: 'Loading elevation data ...',
    terrainError: 'Elevation data could not be loaded. Please try again later.',
    terrainProfile: 'Terrain profile',
    terrainSource: 'Open-Meteo Elevation API',
    minHeight: 'Min',
    maxHeight: 'Max',
    heightDiff: 'Diff',
    samples: 'samples',
    coordHint: 'Click the map to show coordinates',
    coordinatesTitle: 'Coordinates',
    coordUnavailable: 'unavailable',
    copy: 'Copy',
    copied: 'Copied',
    measureStartHint: 'Set measurement start point',
    measureEndHint: 'Set measurement target point',
    measureAgainHint: 'Measurement saved - set next start point',
    measurement: 'Measurement',
    shareCopied: 'Share link saved in URL and copied',
    shareReady: 'Share link saved in URL',
    empty: 'Nothing placed yet.<br>Choose a system above and tap "Add".',
    rangeNote: 'Ranges are published, approximate manufacturer/reference values (varying by ammunition/charge/system variant) - adjustable via "Custom". ★ marks qualitative high-use or high-visibility systems. The front layer shows area control from an open OSINT source, not precise troop positions.',
    footerBuild: 'Map tiles: OpenStreetMap contributors and CARTO.',
    footerDeepState: 'Front data: cyterat/deepstate-map-data (GPL-3.0), derived from DeepStateMap.live.',
    footerTool: 'Tool by Lukas Knorr',
    cruiseMissile: 'Cruise missile',
    operatorLabel: 'User',
    maxRangeLabel: 'Max range',
    labelToggleTitle: 'Toggle system labels',
    labelModeCompact: 'LABEL',
    labelModeFull: 'DETAIL',
    labelModeOff: 'OFF',
    themeToggleTitle: 'Toggle light/dark display',
    themeDark: 'DARK',
    themeLight: 'LIGHT',
    vis: 'VIS',
    hide: 'HIDE',
    zoom: 'ZOOM',
    del: 'DEL',
    rangeKm: 'km range',
    rangeLabel: 'Range',
    customAmmo: 'Custom...',
    groupMap: {
      'NATO / Westen': 'NATO / West',
      'Russland': 'Russia',
      'Ukraine': 'Ukraine',
      'Marschflugkörper / NATO': 'Cruise missiles / NATO',
      'Marschflugkörper / Ukraine': 'Cruise missiles / Ukraine',
      'Marschflugkörper / Russland': 'Cruise missiles / Russia',
      'Eigene Systeme': 'Custom Systems'
    },
    operatorMap: {
      nato: 'NATO / West',
      russia: 'Russia',
      ukraine: 'Ukraine',
      custom: 'Custom'
    },
    setHint: name => '"' + name + '" added to catalog',
    placeHint: name => name + ' placed - drag marker to move it'
  }
};
let currentLang = localStorage.getItem('arm_lang') || 'de';
let currentTheme = localStorage.getItem('arm_theme') === 'light' ? 'light' : 'dark';
document.body.dataset.theme = currentTheme;

// ====== Karte mit detailliertem Basemap (Städte, Straßen, Grenzen) ======
const map = L.map('map',{zoomControl:true,worldCopyJump:true,minZoom:3,maxZoom:18}).setView([48.4,33],6);
const TILE_LAYERS={
  dark:'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
};
let baseTileLayer=L.tileLayer(TILE_LAYERS[currentTheme],{
  subdomains:'abcd', maxZoom:20, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// ----- Europa Bundesland-/Regionsgrenzen (lokal eingebettet) -----
const adm1Layer = L.geoJSON(EUROPE_ADMIN1,{style:{color:'#6b7a8d',weight:0.7,opacity:0.65,dashArray:'3,3',interactive:false}});
adm1Layer.addTo(map);

// ----- Front / besetztes Gebiet (live aus offener Quelle) -----
let occLayer=null;
const FRONT_BASE='https://raw.githubusercontent.com/cyterat/deepstate-map-data/main/data/deepstatemap_data_';
function setOccupied(gj){
  if(occLayer){map.removeLayer(occLayer);occLayer=null;}
  occLayer=L.geoJSON(gj,{style:{color:'#f87171',weight:1.2,fillColor:'#ef4444',fillOpacity:.22,interactive:false}});
  if(document.querySelector('#frontToggle').checked) occLayer.addTo(map);
}
function pad(n){return String(n).padStart(2,'0');}
function fmtDate(ds){return ds.slice(6,8)+'.'+ds.slice(4,6)+'.'+ds.slice(0,4);}
async function refreshFront(){
  const st=$('#frontStatus'); st.textContent=t('frontLoading');
  for(let off=0;off<5;off++){
    const d=new Date(Date.now()-off*864e5);
    const ds=d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate());
    try{
      const r=await fetch(FRONT_BASE+ds+'.geojson',{cache:'no-store'});
      if(!r.ok) continue;
      const gj=await r.json();
      setOccupied(gj);
      st.innerHTML=t('frontLoaded')(ds);
      return true;
    }catch(e){}
  }
  st.textContent=t('frontOffline');
  return false;
}

// ====== App-Logik ======
let placed=[], nextId=1, colorIdx=0, customSystems=[];
const $=s=>document.querySelector(s);
const panel=$('#panel');
const systemDrawer=$('#systemDrawer');
let systemDrawerOpen=localStorage.getItem('arm_system_drawer') !== 'closed';
const toolRegistry={};
let activeTool=null;
let labelLayoutRaf=null;
const LABEL_MODES=['compact','full','off'];
let labelMode=LABEL_MODES.includes(localStorage.getItem('arm_label_mode'))?localStorage.getItem('arm_label_mode'):'compact';
function t(key){return (I18N[currentLang] && I18N[currentLang][key]) || I18N.de[key] || key;}
function registerTool(name,tool){toolRegistry[name]=tool;}
function setActiveTool(name){
  if(activeTool&&toolRegistry[activeTool]) toolRegistry[activeTool].deactivate();
  activeTool=name||null;
  if(activeTool&&toolRegistry[activeTool]) toolRegistry[activeTool].activate();
}
function toggleTool(name){setActiveTool(activeTool===name?null:name);}
function getGroupLabel(group){return (I18N[currentLang].groupMap && I18N[currentLang].groupMap[group]) || group;}
function displayName(sys){return (sys.topUsed?'★ ':'')+sys.name;}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
function getLabelScale(){return clamp(0.72,1.12,0.62+map.getZoom()*0.04);}
function labelSize(){const s=getLabelScale();return labelMode==='full'?{scale:s,w:154*s,h:48*s,offset:14*s}:{scale:s,w:126*s,h:24*s,offset:12*s};}
function maxRange(sys){return Math.max(...sys.ammo.map(a=>Number(a.range)||0));}
function operatorKey(sys){
  const group=sys.group||'';
  if(group.includes('NATO')) return 'nato';
  if(group.includes('Russland')) return 'russia';
  if(group.includes('Ukraine')) return 'ukraine';
  return 'custom';
}
function operatorLabel(sys){
  const key=operatorKey(sys);
  return (I18N[currentLang].operatorMap&&I18N[currentLang].operatorMap[key])||key;
}
function labelHtml(inst){
  return '<div class="range-label-inner '+(labelMode==='full'?'full':'compact')+'" style="--label-color:'+inst.color+'">'+
    '<div class="range-label-title">'+esc(displayName(inst.sys))+'</div>'+
    '<div class="range-label-meta"><span>'+esc(t('operatorLabel'))+'</span><span>'+esc(operatorLabel(inst.sys))+'</span></div>'+
    '<div class="range-label-meta"><span>'+esc(t('maxRangeLabel'))+'</span><span>'+maxRange(inst.sys)+' km</span></div>'+
    '</div>';
}
function labelTopLeft(p,pos,w,h,o){
  const map={
    right:[p.x+o,p.y-h/2],
    left:[p.x-w-o,p.y-h/2],
    top:[p.x-w/2,p.y-h-o],
    bottom:[p.x-w/2,p.y+o],
    topRight:[p.x+o,p.y-h-o],
    bottomRight:[p.x+o,p.y+o],
    topLeft:[p.x-w-o,p.y-h-o],
    bottomLeft:[p.x-w-o,p.y+o]
  };
  return map[pos]||map.right;
}
function labelIcon(inst,pos){
  const {scale,w,h,offset}=labelSize();
  const topLeft=labelTopLeft({x:0,y:0},pos,w,h,offset);
  return L.divIcon({
    className:'range-label-icon',
    html:labelHtml(inst),
    iconSize:[w,h],
    iconAnchor:[-topLeft[0],-topLeft[1]]
  });
}
function updateLabel(inst){
  if(!inst.labelMarker){
    inst.labelPos='right';
    inst.labelMarker=L.marker([inst.lat,inst.lng],{icon:labelIcon(inst,inst.labelPos),interactive:false,keyboard:false,zIndexOffset:450}).addTo(map);
  }else{
    inst.labelMarker.setLatLng([inst.lat,inst.lng]);
    inst.labelMarker.setIcon(labelIcon(inst,inst.labelPos||'right'));
  }
  inst.labelMarker.setOpacity(inst.visible&&labelMode!=='off'?1:0);
}
function overlapsAny(bounds,others){return others.some(b=>bounds.intersects(b));}
function scoreBounds(bounds,others){
  return others.reduce((sum,b)=>{
    const x=Math.max(0,Math.min(bounds.max.x,b.max.x)-Math.max(bounds.min.x,b.min.x));
    const y=Math.max(0,Math.min(bounds.max.y,b.max.y)-Math.max(bounds.min.y,b.min.y));
    return sum+x*y;
  },0);
}
function layoutLabels(){
  map.getContainer().style.setProperty('--label-scale',getLabelScale());
  const {w,h,offset}=labelSize();
  const occupied=[];
  const positions=['right','left','top','bottom','topRight','bottomRight','topLeft','bottomLeft'];
  placed.forEach(inst=>{
    if(!inst.visible||!inst.labelMarker||labelMode==='off') return;
    const p=map.latLngToLayerPoint([inst.lat,inst.lng]);
    const preferred=[inst.labelPos||'right',...positions.filter(pos=>pos!==inst.labelPos)];
    let best=preferred[0],bestBounds=null,bestScore=Infinity;
    for(const pos of preferred){
      const tl=labelTopLeft(p,pos,w,h,offset);
      const bounds=L.bounds(L.point(tl[0]-4,tl[1]-4),L.point(tl[0]+w+4,tl[1]+h+4));
      const score=scoreBounds(bounds,occupied);
      if(score<bestScore){best=pos;bestBounds=bounds;bestScore=score;}
      if(!overlapsAny(bounds,occupied)) break;
    }
    inst.labelPos=best;
    inst.labelMarker.setIcon(labelIcon(inst,best));
    if(bestBounds) occupied.push(bestBounds);
  });
}
function scheduleLabelLayout(){
  if(labelLayoutRaf) cancelAnimationFrame(labelLayoutRaf);
  labelLayoutRaf=requestAnimationFrame(()=>{labelLayoutRaf=null;layoutLabels();});
}
function labelModeText(){
  if(labelMode==='full') return t('labelModeFull');
  if(labelMode==='off') return t('labelModeOff');
  return t('labelModeCompact');
}
function updateLabelToggle(){
  const btn=$('#labelToggle');
  btn.textContent=labelModeText();
  btn.title=t('labelToggleTitle');
  btn.setAttribute('aria-label',t('labelToggleTitle'));
  btn.classList.toggle('active',labelMode!=='off');
}
function themeModeText(){return currentTheme==='light'?t('themeLight'):t('themeDark');}
function updateThemeToggle(){
  const btn=$('#themeToggle');
  btn.textContent=themeModeText();
  btn.title=t('themeToggleTitle');
  btn.setAttribute('aria-label',t('themeToggleTitle'));
  btn.setAttribute('aria-pressed',currentTheme==='light'?'true':'false');
  btn.classList.toggle('active',currentTheme==='light');
}
function applyTheme(theme){
  currentTheme=theme==='light'?'light':'dark';
  localStorage.setItem('arm_theme',currentTheme);
  document.body.dataset.theme=currentTheme;
  if(baseTileLayer) baseTileLayer.setUrl(TILE_LAYERS[currentTheme]);
  updateThemeToggle();
  placed.forEach(updateLabel);
  scheduleLabelLayout();
}
function cycleTheme(){applyTheme(currentTheme==='light'?'dark':'light');}
function updateSystemDrawerToggle(){
  systemDrawer.classList.toggle('open',systemDrawerOpen);
  const btn=$('#systemDrawerToggle');
  btn.textContent=systemDrawerOpen?'>':'<';
  btn.title=systemDrawerOpen?t('drawerCollapse'):t('drawerExpand');
  btn.setAttribute('aria-label',btn.title);
  btn.setAttribute('aria-expanded',systemDrawerOpen?'true':'false');
}
function toggleSystemDrawer(){
  systemDrawerOpen=!systemDrawerOpen;
  localStorage.setItem('arm_system_drawer',systemDrawerOpen?'open':'closed');
  updateSystemDrawerToggle();
}
function cycleLabelMode(){
  const idx=LABEL_MODES.indexOf(labelMode);
  labelMode=LABEL_MODES[(idx+1)%LABEL_MODES.length];
  localStorage.setItem('arm_label_mode',labelMode);
  updateLabelToggle();
  placed.forEach(updateLabel);
  scheduleLabelLayout();
}
function applyLanguage(lang){
  currentLang=I18N[lang]?lang:'de';
  localStorage.setItem('arm_lang', currentLang);
  const copy=I18N[currentLang];
  document.documentElement.lang=currentLang;
  document.title=copy.pageTitle;
  $('#toggle').setAttribute('aria-label', copy.menuAria);
  $('#closeBtn').textContent='X';
  document.querySelectorAll('#langToggle button').forEach(btn=>{
    const active=btn.dataset.lang===currentLang;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-pressed',active?'true':'false');
  });
  updateLabelToggle();
  updateThemeToggle();
  $('#panel .ph h1').textContent=copy.panelTitle;
  $('#panel .ph .sub').textContent=copy.panelSub;
  document.querySelectorAll('.section-label')[0].textContent=copy.mapLayers;
  document.querySelector('#frontToggle + span').textContent=copy.occupiedFront;
  document.querySelector('#adm1Toggle + span').textContent=copy.regions;
  $('#refreshBtn').textContent=copy.refreshFront;
  $('#frontStatus').textContent=copy.loadingFront;
  document.querySelectorAll('.section-label')[1].textContent=copy.addSystem;
  $('#addBtn').textContent=copy.add;
  $('#newSysBtn').textContent=copy.newSystem;
  document.querySelectorAll('.section-label')[2].textContent=copy.ownSystem;
  $('#nsName').placeholder=copy.customName;
  $('#nsCal').placeholder=copy.customCal;
  $('#builder label').textContent=copy.ammoAndRange;
  $('#addAmmoBtn').textContent=copy.addAmmo;
  $('#saveSysBtn').textContent=copy.save;
  $('#cancelSysBtn').textContent=copy.cancel;
  $('#toolsSectionLabel').textContent=copy.tools;
  $('#terrainBtn').textContent=copy.terrain;
  $('#coordsBtn').textContent=copy.coordinates;
  $('#measureBtn').textContent=copy.measure;
  $('#shareBtn').textContent=copy.share;
  $('#systemDrawerTitle').textContent=copy.placed;
  updateSystemDrawerToggle();
  $('#rangeNote').textContent=copy.rangeNote;
  $('#implementationNote').textContent=copy.footerBuild;
  $('#deepstateLicenseNote').textContent=copy.footerDeepState;
  $('#footerNote div:last-child').textContent=copy.footerTool;
  placed.forEach(updateInst);
  if(window.ArtilleryMeasurement&&window.ArtilleryMeasurement.renderList) window.ArtilleryMeasurement.renderList();
  scheduleLabelLayout();
}
function allSystems(){return [...CATALOG,...customSystems];}
function findSys(k){return allSystems().find(s=>s.key===k);}
function fillCatalog(){
  const sel=$('#catalogSelect'); sel.innerHTML='';
  const groups={};
  allSystems().forEach(s=>{const g=getGroupLabel(s.group||'Eigene Systeme');(groups[g]=groups[g]||[]).push(s);});
  const order=['NATO / Westen','Russland','Ukraine','Marschflugkörper / NATO','Marschflugkörper / Ukraine','Marschflugkörper / Russland','Eigene Systeme'];
  const translatedOrder=order.map(g=>getGroupLabel(g));
  const keys=[...translatedOrder.filter(k=>groups[k]),...Object.keys(groups).filter(k=>!translatedOrder.includes(k))];
  keys.forEach(g=>{const og=document.createElement('optgroup');og.label=g;
    groups[g].forEach(s=>{const o=document.createElement('option');o.value=s.key;o.textContent=displayName(s);og.appendChild(o);});
    sel.appendChild(og);});
}
function placeSystem(key,opts){
  opts=opts||{};
  const sys=findSys(key); if(!sys) return;
  const c=opts.lat!=null&&opts.lng!=null?L.latLng(opts.lat,opts.lng):map.getCenter();
  const color=opts.color||PALETTE[colorIdx++ % PALETTE.length];
  const id=opts.id||nextId++;
  const icon=L.divIcon({className:'',html:'<div class="sys-dot" style="background:'+color+';color:'+color+'"></div>',iconSize:[14,14],iconAnchor:[7,7]});
  const marker=L.marker(c,{icon,draggable:true}).addTo(map);
  const circle=L.circle(c,{radius:sys.ammo[0].range*1000,color,weight:1.5,opacity:.9,fillColor:color,fillOpacity:.10}).addTo(map);
  const inst={id,key,sys,ammoIdx:opts.ammoIdx||0,custom:!!opts.custom,customRange:opts.customRange||sys.ammo[0].range,color,marker,circle,lat:c.lat,lng:c.lng,visible:opts.visible!==false,labelMarker:null,labelPos:opts.labelPos||'right',title:opts.title||'',description:opts.description||''};
  placed.push(inst);
  marker.on('drag',e=>{const p=e.target.getLatLng();circle.setLatLng(p);inst.lat=p.lat;inst.lng=p.lng;if(inst.labelMarker)inst.labelMarker.setLatLng(p);scheduleLabelLayout();});
  marker.on('click',()=>marker.openPopup());
  updateInst(inst); renderList();
  if(!opts.silent) flashHint(t('placeHint')(sys.name));
  return inst;
}
function currentRange(i){return i.custom?(Number(i.customRange)||0):i.sys.ammo[i.ammoIdx].range;}
function currentAmmoName(i){return i.custom?t('customAmmo'):i.sys.ammo[i.ammoIdx].name;}
function updateInst(i){
  const r=currentRange(i);
  i.circle.setRadius(r*1000);
  i.circle.setStyle({opacity:i.visible?.9:0,fillOpacity:i.visible?.10:0});
  i.marker.setOpacity(i.visible?1:.25);
  const classLine=i.sys.classKey?t(i.sys.classKey)+'<br>':'';
  const titleLine=i.title?'<b>'+esc(i.title)+'</b><br>':'<b>'+displayName(i.sys)+'</b><br>';
  const descLine=i.description?'<div style="margin:5px 0;color:var(--muted)">'+esc(i.description)+'</div>':'';
  i.marker.bindPopup(titleLine+classLine+currentAmmoName(i)+'<br>'+t('rangeLabel')+': <b>'+r+' km</b>'+descLine);
  updateLabel(i);
  scheduleLabelLayout();
}
function removeInst(id){const k=placed.findIndex(p=>p.id===id);if(k<0)return;map.removeLayer(placed[k].marker);map.removeLayer(placed[k].circle);if(placed[k].labelMarker)map.removeLayer(placed[k].labelMarker);placed.splice(k,1);renderList();scheduleLabelLayout();}
function systemTypeKey(inst){return inst.sys.classKey==='cruiseMissile'?'cruise':'artillery';}
function systemTypeLabel(key){return key==='cruise'?t('cruiseMissiles'):t('artillery');}
function createSystemCard(inst){
    const card=document.createElement('div'); card.className='card';
    const r=currentRange(inst);
    let opts=inst.sys.ammo.map((a,idx)=>'<option value="'+idx+'" '+((!inst.custom&&idx===inst.ammoIdx)?'selected':'')+'>'+a.name+' - '+a.range+' km</option>').join('');
    opts+='<option value="custom" '+(inst.custom?'selected':'')+'>'+t('customAmmo')+'</option>';
    card.innerHTML=
      '<div class="card-top"><div class="dot" style="background:'+inst.color+';color:'+inst.color+'"></div>'+
      '<div><div class="card-name">'+displayName(inst.sys)+'</div><div class="card-cal">'+(inst.sys.cal||'')+'</div></div>'+
      '<div class="card-actions">'+
      '<button class="iconbtn" data-act="vis">'+(inst.visible?t('hide'):t('vis'))+'</button>'+
      '<button class="iconbtn" data-act="zoom">'+t('zoom')+'</button>'+
      '<button class="iconbtn" data-act="del">'+t('del')+'</button></div></div>'+
      '<label>'+t('ammo')+'</label><select data-act="ammo">'+opts+'</select>'+
      '<div class="custom-range '+(inst.custom?'show':'')+'"><input type="number" min="0" step="1" value="'+inst.customRange+'" data-act="crange"><span style="font-size:12px;color:var(--muted)">km</span></div>'+
      '<div class="note-fields"><label>'+t('noteTitle')+'</label><input data-act="title" placeholder="'+esc(t('noteTitlePlaceholder'))+'" value="'+esc(inst.title||'')+'">'+
      '<label>'+t('noteDescription')+'</label><textarea data-act="description" placeholder="'+esc(t('noteDescriptionPlaceholder'))+'">'+esc(inst.description||'')+'</textarea></div>'+
      '<div class="range-pill"><b>'+r+'</b><span>'+t('rangeKm')+'</span></div>';
    card.querySelector('[data-act="del"]').onclick=()=>removeInst(inst.id);
    card.querySelector('[data-act="zoom"]').onclick=()=>{map.setView([inst.lat,inst.lng],8);closePanel();};
    card.querySelector('[data-act="vis"]').onclick=()=>{inst.visible=!inst.visible;updateInst(inst);renderList();scheduleLabelLayout();};
    card.querySelector('[data-act="ammo"]').onchange=e=>{if(e.target.value==='custom'){inst.custom=true;}else{inst.custom=false;inst.ammoIdx=Number(e.target.value);}updateInst(inst);renderList();};
    const cr=card.querySelector('[data-act="crange"]');
    if(cr)cr.oninput=e=>{inst.customRange=e.target.value;updateInst(inst);card.querySelector('.range-pill b').textContent=currentRange(inst);};
    card.querySelector('[data-act="title"]').oninput=e=>{inst.title=e.target.value;updateInst(inst);};
    card.querySelector('[data-act="description"]').oninput=e=>{inst.description=e.target.value;updateInst(inst);};
    return card;
}
function renderList(){
  const list=$('#list'); list.innerHTML='';
  if(!placed.length){list.innerHTML='<div class="empty">'+t('empty')+'</div>';return;}
  const operatorOrder=['nato','russia','ukraine','custom'];
  const sorted=[...placed].sort((a,b)=>{
    const opDiff=operatorOrder.indexOf(operatorKey(a.sys))-operatorOrder.indexOf(operatorKey(b.sys));
    if(opDiff) return opDiff;
    const typeDiff=(systemTypeKey(a)==='artillery'?0:1)-(systemTypeKey(b)==='artillery'?0:1);
    if(typeDiff) return typeDiff;
    return displayName(a.sys).localeCompare(displayName(b.sys),currentLang);
  });
  operatorOrder.forEach(op=>{
    const opItems=sorted.filter(inst=>operatorKey(inst.sys)===op);
    if(!opItems.length) return;
    const group=document.createElement('div');
    group.className='system-group';
    group.innerHTML='<div class="system-group-title">'+esc((I18N[currentLang].operatorMap&&I18N[currentLang].operatorMap[op])||op)+'</div>';
    ['artillery','cruise'].forEach(type=>{
      const typeItems=opItems.filter(inst=>systemTypeKey(inst)===type);
      if(!typeItems.length) return;
      const title=document.createElement('div');
      title.className='system-type-title';
      title.textContent=systemTypeLabel(type);
      group.appendChild(title);
      typeItems.forEach(inst=>group.appendChild(createSystemCard(inst)));
    });
    list.appendChild(group);
  });
}
function addAmmoRow(name,range){name=name||'';range=range||'';const row=document.createElement('div');row.className='ammo-row';
  row.innerHTML='<input class="n" placeholder="'+t('ammo')+'" value="'+name+'"><input class="r" type="number" min="0" placeholder="km" value="'+range+'"><button class="iconbtn rm-ammo">X</button>';
  row.querySelector('.rm-ammo').onclick=()=>row.remove();$('#ammoRows').appendChild(row);}
function resetBuilder(){$('#nsName').value='';$('#nsCal').value='';$('#ammoRows').innerHTML='';addAmmoRow('Standard-HE','');}
$('#newSysBtn').onclick=()=>{const b=$('#builder');b.classList.toggle('show');if(b.classList.contains('show')&&!$('#ammoRows').children.length)resetBuilder();};
$('#addAmmoBtn').onclick=()=>addAmmoRow();
$('#cancelSysBtn').onclick=()=>$('#builder').classList.remove('show');
$('#saveSysBtn').onclick=()=>{
  const name=$('#nsName').value.trim();if(!name){alert('Bitte einen Namen angeben.');return;}
  const ammo=[...document.querySelectorAll('#ammoRows .ammo-row')].map(r=>({name:r.querySelector('.n').value.trim()||'Munition',range:Number(r.querySelector('.r').value)||0})).filter(a=>a.range>0);
  if(!ammo.length){alert('Bitte mindestens eine Munition mit Reichweite > 0.');return;}
  const sys={key:'custom_'+Date.now(),name,cal:$('#nsCal').value.trim()||'benutzerdefiniert',ammo};
  customSystems.push(sys);fillCatalog();$('#catalogSelect').value=sys.key;$('#builder').classList.remove('show');resetBuilder();
  flashHint(t('setHint')(name));
};
function openPanel(){panel.classList.add('open');}
function closePanel(){panel.classList.remove('open');}
function exportMapState(){
  const c=map.getCenter();
  return {lat:c.lat,lng:c.lng,zoom:map.getZoom(),theme:currentTheme};
}
function restoreMapState(state){
  if(!state) return;
  if(state.theme) applyTheme(state.theme);
  map.setView([Number(state.lat)||48.4,Number(state.lng)||33],Number(state.zoom)||6);
}
function systemSnapshot(sys){
  return {key:sys.key,group:sys.group,name:sys.name,cal:sys.cal,ammo:sys.ammo,classKey:sys.classKey,topUsed:sys.topUsed};
}
function exportSystemsState(){
  return placed.map(inst=>({
    key:inst.key,
    sys:CATALOG.some(s=>s.key===inst.key)?null:systemSnapshot(inst.sys),
    ammoIdx:inst.ammoIdx,
    custom:inst.custom,
    customRange:inst.customRange,
    color:inst.color,
    lat:inst.lat,
    lng:inst.lng,
    visible:inst.visible,
    labelPos:inst.labelPos,
    title:inst.title||'',
    description:inst.description||''
  }));
}
function clearSystems(){
  [...placed].forEach(inst=>removeInst(inst.id));
}
function restoreSystemsState(items){
  clearSystems();
  customSystems=[];
  nextId=1;colorIdx=0;
  (items||[]).forEach(item=>{
    if(item.sys&&!findSys(item.key)){
      customSystems.push(Object.assign({group:'Eigene Systeme'},item.sys));
    }
  });
  fillCatalog();
  (items||[]).forEach(item=>{
    if(!findSys(item.key)) return;
    placeSystem(item.key,{
      lat:item.lat,lng:item.lng,color:item.color,ammoIdx:item.ammoIdx,custom:item.custom,customRange:item.customRange,
      visible:item.visible,labelPos:item.labelPos,title:item.title,description:item.description,silent:true
    });
  });
  renderList();
  scheduleLabelLayout();
}
const appApi={map,palette:PALETTE,t,esc,flash:flashHint,closePanel,openPanel,registerTool,toggleTool,setActiveTool,
  exportMapState,restoreMapState,exportSystemsState,restoreSystemsState};
function initTools(){
  if(window.ArtilleryTerrain) window.ArtilleryTerrain.init(appApi);
  if(window.ArtilleryCoordinates) window.ArtilleryCoordinates.init(appApi);
  if(window.ArtilleryMeasurement) window.ArtilleryMeasurement.init(appApi);
  if(window.ArtilleryShare) window.ArtilleryShare.init(appApi);
}
$('#toggle').onclick=openPanel;$('#closeBtn').onclick=closePanel;
$('#systemDrawerToggle').onclick=toggleSystemDrawer;
$('#themeToggle').onclick=cycleTheme;
$('#addBtn').onclick=()=>placeSystem($('#catalogSelect').value);
$('#refreshBtn').onclick=()=>refreshFront();
$('#frontToggle').onchange=e=>{if(e.target.checked){if(occLayer)occLayer.addTo(map);else refreshFront();}else if(occLayer)map.removeLayer(occLayer);};
$('#adm1Toggle').onchange=e=>{if(e.target.checked)adm1Layer.addTo(map);else map.removeLayer(adm1Layer);};
document.querySelectorAll('#langToggle button').forEach(btn=>btn.onclick=()=>{applyLanguage(btn.dataset.lang);fillCatalog();renderList();});
$('#labelToggle').onclick=cycleLabelMode;
map.on('zoomend moveend',scheduleLabelLayout);
let hintT;function flashHint(m){const h=$('#hint');h.textContent=m;h.classList.add('show');clearTimeout(hintT);hintT=setTimeout(()=>h.classList.remove('show'),2600);}

// ====== Start ======
applyLanguage(currentLang);
updateSystemDrawerToggle();
fillCatalog();renderList();
initTools();
const restoredFromShare=window.ArtilleryShare&&window.ArtilleryShare.hasState&&window.ArtilleryShare.hasState()?window.ArtilleryShare.restore(appApi):false;
if(!restoredFromShare){
  placeSystem('bohdana');placeSystem('loras');
  openPanel();
}
refreshFront(); // beim Laden immer die aktuellsten Frontdaten ziehen
