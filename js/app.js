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
  { key:'m777', group:'NATO / Westen', name:'M777', cal:'155 mm / L39 · gezogen', ammo:[
      {name:'Standard-HE (Ladung 5)', range:24},{name:'RAP', range:30},{name:'Excalibur (gelenkt)', range:40},{name:'Vulcano (beworben)', range:60} ]},
  { key:'m109a7', group:'NATO / Westen', name:'M109A7 Paladin', cal:'155 mm / L39', ammo:[
      {name:'Standard-HE', range:24},{name:'RAP', range:30},{name:'Excalibur (gelenkt)', range:40} ]},
  { key:'himars', group:'NATO / Westen', name:'M142 HIMARS', cal:'227 mm Raketenwerfer', ammo:[
      {name:'GMLRS (gelenkt)', range:84},{name:'ER-GMLRS', range:150},{name:'ATACMS (takt. Rakete)', range:300} ]},
  // ---------- Russland ----------
  { key:'msta', group:'Russland', name:'2S19 Msta-S', cal:'152 mm / L47', ammo:[
      {name:'Standard-HE', range:25},{name:'Base Bleed (OF-61)', range:29},{name:'RAP (raketenunterstützt)', range:40},{name:'Krasnopol (gelenkt)', range:20} ]},
  { key:'koalitsiya', group:'Russland', name:'2S35 Koalitsiya-SV', cal:'152 mm · neu', ammo:[
      {name:'Standard-HE', range:30},{name:'RAP', range:45},{name:'Präzisionsmunition (beansprucht)', range:70} ]},
  { key:'giatsint', group:'Russland', name:'2S5 Giatsint-S', cal:'152 mm', ammo:[
      {name:'Standard-HE', range:28},{name:'RAP', range:33} ]},
  { key:'akatsiya', group:'Russland', name:'2S3 Akatsiya', cal:'152 mm', ammo:[
      {name:'Standard-HE', range:18},{name:'RAP', range:24} ]},
  { key:'pion', group:'Russland', name:'2S7 Pion / Malka', cal:'203 mm', ammo:[
      {name:'Standard-HE', range:37},{name:'RAP', range:47} ]},
  { key:'grad', group:'Russland', name:'BM-21 Grad', cal:'122 mm Raketenwerfer', ammo:[
      {name:'Standard-Rakete', range:20},{name:'Extended-Range-Rakete', range:40} ]},
  { key:'smerch', group:'Russland', name:'BM-30 Smerch', cal:'300 mm Raketenwerfer', ammo:[
      {name:'Standard-Rakete', range:70},{name:'Extended-Range', range:90} ]},
  { key:'tornados', group:'Russland', name:'9A52-4 Tornado-S', cal:'300 mm Raketenwerfer', ammo:[
      {name:'Gelenkte Rakete (9M542)', range:120},{name:'Neue Rakete (beansprucht)', range:200} ]},
  // ---------- Ukraine ----------
  { key:'bohdana', group:'Ukraine', name:'2S22 Bohdana', cal:'155 mm / L52 · inländisch', ammo:[
      {name:'Standard-HE', range:42},{name:'RAP (raketenunterstützt)', range:60},{name:'Excalibur (gelenkt)', range:50} ]},
  { key:'gvozdika', group:'Ukraine', name:'2S1 Gvozdika', cal:'122 mm', ammo:[
      {name:'Standard-HE', range:15},{name:'RAP', range:21} ]},
  { key:'d30', group:'Ukraine', name:'D-30 (gezogen)', cal:'122 mm', ammo:[
      {name:'Standard-HE', range:15},{name:'RAP', range:21} ]},
];
const PALETTE = ['#38bdf8','#f97316','#a78bfa','#34d399','#f472b6','#facc15','#fb7185','#22d3ee','#c084fc','#4ade80'];

// ====== Karte mit detailliertem dunklem Basemap (Städte, Straßen, Grenzen) ======
const map = L.map('map',{zoomControl:true,worldCopyJump:true,minZoom:3,maxZoom:18}).setView([48.4,33],6);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
  subdomains:'abcd', maxZoom:20, attribution:'© OpenStreetMap-Mitwirkende, © CARTO'
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
  const st=$('#frontStatus'); st.textContent='Lade aktuelle Frontdaten …';
  for(let off=0;off<5;off++){
    const d=new Date(Date.now()-off*864e5);
    const ds=d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate());
    try{
      const r=await fetch(FRONT_BASE+ds+'.geojson',{cache:'no-store'});
      if(!r.ok) continue;
      const gj=await r.json();
      setOccupied(gj);
      st.textContent='Stand '+fmtDate(ds)+' · Quelle: DeepStateMap (OSINT).';
      return true;
    }catch(e){}
  }
  st.textContent='Frontdaten derzeit nicht abrufbar (Quelle offline oder Netz blockiert). Erneut versuchen mit „↻".';
  return false;
}

// ====== App-Logik ======
let placed=[], nextId=1, colorIdx=0, customSystems=[];
const $=s=>document.querySelector(s);
const panel=$('#panel');
function allSystems(){return [...CATALOG,...customSystems];}
function findSys(k){return allSystems().find(s=>s.key===k);}
function fillCatalog(){
  const sel=$('#catalogSelect'); sel.innerHTML='';
  const groups={};
  allSystems().forEach(s=>{const g=s.group||'Eigene Systeme';(groups[g]=groups[g]||[]).push(s);});
  const order=['NATO / Westen','Russland','Ukraine','Eigene Systeme'];
  const keys=[...order.filter(k=>groups[k]),...Object.keys(groups).filter(k=>!order.includes(k))];
  keys.forEach(g=>{const og=document.createElement('optgroup');og.label=g;
    groups[g].forEach(s=>{const o=document.createElement('option');o.value=s.key;o.textContent=s.name;og.appendChild(o);});
    sel.appendChild(og);});
}
function placeSystem(key){
  const sys=findSys(key); if(!sys) return;
  const c=map.getCenter();
  const color=PALETTE[colorIdx++ % PALETTE.length];
  const id=nextId++;
  const icon=L.divIcon({className:'',html:'<div class="sys-dot" style="background:'+color+';color:'+color+'"></div>',iconSize:[14,14],iconAnchor:[7,7]});
  const marker=L.marker(c,{icon,draggable:true}).addTo(map);
  const circle=L.circle(c,{radius:sys.ammo[0].range*1000,color,weight:1.5,opacity:.9,fillColor:color,fillOpacity:.10}).addTo(map);
  const inst={id,key,sys,ammoIdx:0,custom:false,customRange:sys.ammo[0].range,color,marker,circle,lat:c.lat,lng:c.lng,visible:true};
  placed.push(inst);
  marker.on('drag',e=>{const p=e.target.getLatLng();circle.setLatLng(p);inst.lat=p.lat;inst.lng=p.lng;});
  marker.on('click',()=>marker.openPopup());
  updateInst(inst); renderList();
  flashHint(sys.name+' gesetzt – Marker zum Verschieben ziehen');
}
function currentRange(i){return i.custom?(Number(i.customRange)||0):i.sys.ammo[i.ammoIdx].range;}
function currentAmmoName(i){return i.custom?'Benutzerdefiniert':i.sys.ammo[i.ammoIdx].name;}
function updateInst(i){
  const r=currentRange(i);
  i.circle.setRadius(r*1000);
  i.circle.setStyle({opacity:i.visible?.9:0,fillOpacity:i.visible?.10:0});
  i.marker.setOpacity(i.visible?1:.25);
  i.marker.bindPopup('<b>'+i.sys.name+'</b><br>'+currentAmmoName(i)+'<br>Reichweite: <b>'+r+' km</b>');
}
function removeInst(id){const k=placed.findIndex(p=>p.id===id);if(k<0)return;map.removeLayer(placed[k].marker);map.removeLayer(placed[k].circle);placed.splice(k,1);renderList();}
function renderList(){
  const list=$('#list'); list.innerHTML='';
  if(!placed.length){list.innerHTML='<div class="empty">Noch nichts platziert.<br>Wähle oben ein System und tippe „Setzen".</div>';return;}
  placed.forEach(inst=>{
    const card=document.createElement('div'); card.className='card';
    const r=currentRange(inst);
    let opts=inst.sys.ammo.map((a,idx)=>'<option value="'+idx+'" '+((!inst.custom&&idx===inst.ammoIdx)?'selected':'')+'>'+a.name+' – '+a.range+' km</option>').join('');
    opts+='<option value="custom" '+(inst.custom?'selected':'')+'>Benutzerdefiniert…</option>';
    card.innerHTML=
      '<div class="card-top"><div class="dot" style="background:'+inst.color+';color:'+inst.color+'"></div>'+
      '<div><div class="card-name">'+inst.sys.name+'</div><div class="card-cal">'+(inst.sys.cal||'')+'</div></div>'+
      '<div class="card-actions">'+
      '<button class="iconbtn" data-act="vis">'+(inst.visible?'👁':'🚫')+'</button>'+
      '<button class="iconbtn" data-act="zoom">🎯</button>'+
      '<button class="iconbtn" data-act="del">🗑</button></div></div>'+
      '<label>Munition</label><select data-act="ammo">'+opts+'</select>'+
      '<div class="custom-range '+(inst.custom?'show':'')+'"><input type="number" min="0" step="1" value="'+inst.customRange+'" data-act="crange"><span style="font-size:12px;color:var(--muted)">km</span></div>'+
      '<div class="range-pill"><b>'+r+'</b><span>km Reichweite</span></div>';
    card.querySelector('[data-act="del"]').onclick=()=>removeInst(inst.id);
    card.querySelector('[data-act="zoom"]').onclick=()=>{map.setView([inst.lat,inst.lng],8);closePanel();};
    card.querySelector('[data-act="vis"]').onclick=()=>{inst.visible=!inst.visible;updateInst(inst);renderList();};
    card.querySelector('[data-act="ammo"]').onchange=e=>{if(e.target.value==='custom'){inst.custom=true;}else{inst.custom=false;inst.ammoIdx=Number(e.target.value);}updateInst(inst);renderList();};
    const cr=card.querySelector('[data-act="crange"]');
    if(cr)cr.oninput=e=>{inst.customRange=e.target.value;updateInst(inst);card.querySelector('.range-pill b').textContent=currentRange(inst);};
    list.appendChild(card);
  });
}
function addAmmoRow(name,range){name=name||'';range=range||'';const row=document.createElement('div');row.className='ammo-row';
  row.innerHTML='<input class="n" placeholder="Munition" value="'+name+'"><input class="r" type="number" min="0" placeholder="km" value="'+range+'"><button class="iconbtn rm-ammo">✕</button>';
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
  flashHint('„'+name+'" zum Katalog hinzugefügt');
};
function openPanel(){panel.classList.add('open');}
function closePanel(){panel.classList.remove('open');}
$('#toggle').onclick=openPanel;$('#closeBtn').onclick=closePanel;
$('#addBtn').onclick=()=>placeSystem($('#catalogSelect').value);
$('#refreshBtn').onclick=()=>refreshFront();
$('#frontToggle').onchange=e=>{if(e.target.checked){if(occLayer)occLayer.addTo(map);else refreshFront();}else if(occLayer)map.removeLayer(occLayer);};
$('#adm1Toggle').onchange=e=>{if(e.target.checked)adm1Layer.addTo(map);else map.removeLayer(adm1Layer);};
let hintT;function flashHint(m){const h=$('#hint');h.textContent=m;h.classList.add('show');clearTimeout(hintT);hintT=setTimeout(()=>h.classList.remove('show'),2600);}

// ====== Start ======
fillCatalog();renderList();
placeSystem('bohdana');placeSystem('loras');
openPanel();
refreshFront(); // beim Laden immer die aktuellsten Frontdaten ziehen
