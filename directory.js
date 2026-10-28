// Directory links point to official organizations; availability is intentionally not mirrored.
const shelters=[
  {name:'Santa Monica Animal Shelter',area:'Santa Monica',region:'Westside',kind:'City shelter',address:'1640 9th St, Santa Monica, CA 90404',phone:'310-458-8595',adopt:'https://www.santamonica.gov/categories/services/animal-services',foster:null,lat:34.016377,lng:-118.486003},
  {name:'West Los Angeles Animal Services',area:'West Los Angeles',region:'Westside',kind:'City shelter',address:'11361 W Pico Blvd, Los Angeles, CA 90064',phone:'888-452-7381',adopt:'https://www.laanimalservices.com/about-adoption',foster:'https://www.laanimalservices.com/about-fostering',lat:34.034625,lng:-118.439974},
  {name:'spcaLA South Bay Pet Adoption Center',area:'Hawthorne',region:'South Bay',kind:'Nonprofit adoption center',address:'12910 Yukon Ave, Hawthorne, CA 90250',phone:'310-676-1149',adopt:'https://spcala.com/locations/southbay/',foster:'https://spcala.com/volunteer/foster/',lat:33.915431,lng:-118.335092},
  {name:'Carson / Gardena Animal Care Center',area:'Gardena',region:'South Bay',kind:'LA County care center',address:'216 W Victoria St, Gardena, CA 90248',phone:'310-523-9566',adopt:'https://animalcare.lacounty.gov/dacc-search/',foster:'https://animalcare.lacounty.gov/foster-caretaker/',lat:33.864620,lng:-118.277158},
  {name:'Chesterfield Square / South LA',area:'South Los Angeles',region:'Central / South LA',kind:'City shelter',address:'1850 W 60th St, Los Angeles, CA 90047',phone:'888-452-7381',adopt:'https://www.laanimalservices.com/about-adoption',foster:'https://www.laanimalservices.com/about-fostering',lat:33.985167,lng:-118.310507},
  {name:'Pasadena Humane',area:'Pasadena',region:'San Gabriel Valley',kind:'Nonprofit shelter',address:'361 S Raymond Ave, Pasadena, CA 91105',phone:'626-792-7151',adopt:'https://pasadenahumane.org/adopt/view-pets/',foster:'https://pasadenahumane.org/get-involved/foster-a-pet/',lat:34.139559,lng:-118.148895},
  {name:'Burbank Animal Shelter',area:'Burbank',region:'San Fernando Valley',kind:'City shelter',address:'1150 N Victory Pl, Burbank, CA 91502',phone:'818-238-3340',adopt:'https://www.burbankca.gov/web/parks-recreation/burbank-animal-shelter-homepage',foster:null,lat:34.186469,lng:-118.322678},
  {name:'Long Beach Animal Care Services',area:'Long Beach',region:'Long Beach',kind:'City shelter',address:'7700 E Spring St, Long Beach, CA 90815',phone:'562-570-7387',adopt:'https://www.longbeach.gov/acs/our-animals/adoptions/dogs/',foster:'https://www.longbeach.gov/acs/our-animals/foster/',lat:33.810351,lng:-118.084430}
];
let program='all';
const list=document.querySelector('#shelterList'),search=document.querySelector('#shelterSearch'),counter=document.querySelector('#shelterCount');
let shelterMap=null,markerLayer=null;
const mapMarkers=new Map();
function safeLink(label,url,cls=''){const a=document.createElement('a');a.textContent=label;a.href=url;a.className=cls;a.target='_blank';a.rel='noopener noreferrer';return a}
function createPopup(s){
  const wrap=document.createElement('div');wrap.className='mapPopup';
  const heading=document.createElement('strong');heading.textContent=s.name;
  const address=document.createElement('span');address.textContent=s.address;
  const phone=document.createElement('a');phone.textContent='Call '+s.phone;phone.href='tel:'+s.phone.replace(/[^\d+]/g,'');
  const links=document.createElement('div');links.className='mapPopupLinks';links.append(safeLink('Adopt ↗',s.adopt));
  if(s.foster)links.append(safeLink('Foster ↗',s.foster));
  wrap.append(heading,address,phone,links);return wrap;
}
function initializeMap(){
  const holder=document.querySelector('#shelterMap');
  if(typeof L==='undefined'){
    holder.querySelector('.mapFallback').textContent='The map tiles are not available in this browser. You can still use the verified address and directions links below.';
    return;
  }
  try{
    holder.replaceChildren();
    shelterMap=L.map(holder,{scrollWheelZoom:false,zoomControl:true}).setView([34.02,-118.33],10);
    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',{maxZoom:16,attribution:'Map service: <a href="https://www.usgs.gov/programs/national-geospatial-program/national-map" target="_blank" rel="noopener noreferrer">USGS The National Map</a>'}).addTo(shelterMap);
    markerLayer=L.layerGroup().addTo(shelterMap);
  }catch(error){
    shelterMap=null;
    holder.textContent='Interactive map is unavailable. The shelter directory and directions links below still work.';
  }
}
function updateMap(filtered){
  if(!shelterMap||!markerLayer)return;
  markerLayer.clearLayers();mapMarkers.clear();
  const points=[];
  filtered.forEach(s=>{
    const marker=L.marker([s.lat,s.lng],{
      title:s.name,
      icon:L.divIcon({className:'customMapPin',html:'<span aria-hidden="true">♥</span>',iconSize:[33,38],iconAnchor:[16,35],popupAnchor:[0,-30]})
    }).bindPopup(createPopup(s),{maxWidth:270});
    marker.addTo(markerLayer);mapMarkers.set(s.name,marker);points.push([s.lat,s.lng]);
  });
  if(points.length===1)shelterMap.setView(points[0],12);
  else if(points.length>1)shelterMap.fitBounds(points,{padding:[35,35],maxZoom:11});
  else shelterMap.setView([34.02,-118.33],10);
}
function renderDirectory(){
  const term=search.value.trim().toLowerCase();
  const filtered=shelters.filter(s=>(program!=='foster'||s.foster)&&[s.name,s.area,s.region,s.address,s.kind].join(' ').toLowerCase().includes(term));
  counter.textContent=filtered.length+' verified organization'+(filtered.length===1?'':'s')+' · Los Angeles region · Official links';
  list.replaceChildren();updateMap(filtered);
  filtered.forEach(s=>{
    const card=document.createElement('article');card.className='shelterCard';
    const top=document.createElement('div');top.className='shelterCardTop';
    const title=document.createElement('div');const reg=document.createElement('div');reg.className='shelterRegion';reg.textContent=s.region;
    const h=document.createElement('h3');h.textContent=s.name;title.append(reg,h);
    const kind=document.createElement('span');kind.className='shelterType';kind.textContent=s.kind;top.append(title,kind);
    const info=document.createElement('div');info.className='shelterInfo';
    const address=document.createElement('span');address.textContent='⌖  '+s.address;
    const phone=safeLink('☎  '+s.phone,'tel:'+s.phone.replace(/[^\d+]/g,''));
    info.append(address,phone);
    const links=document.createElement('div');links.className='shelterLinks';
    links.append(safeLink('View adoptable pets ↗',s.adopt,'main'));
    if(s.foster)links.append(safeLink('Foster program ↗',s.foster));
    const maps='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.address);
    links.append(safeLink('Map & directions ↗',maps));
    if(shelterMap){
      const show=document.createElement('button');show.className='locateMap';show.type='button';show.textContent='Show on map ⌖';
      show.addEventListener('click',()=>{
        shelterMap.setView([s.lat,s.lng],13);
        mapMarkers.get(s.name)?.openPopup();
        document.querySelector('.mapShell').scrollIntoView({behavior:'smooth',block:'center'});
      });
      links.append(show);
    }
    card.append(top,info,links);list.append(card);
  });
  if(!filtered.length){const empty=document.createElement('div');empty.className='emptyResults';empty.textContent='No matching organizations in this curated directory. Try another city or clear the search.';list.append(empty)}
}
search.addEventListener('input',renderDirectory);
document.querySelectorAll('[data-program]').forEach(button=>button.addEventListener('click',()=>{
  program=button.dataset.program;
  document.querySelectorAll('[data-program]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.program===program)));
  renderDirectory();
}));
initializeMap();
renderDirectory();
document.querySelector('#resetMap').addEventListener('click',()=>{
  search.value='';program='all';
  document.querySelectorAll('[data-program]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.program==='all')));
  renderDirectory();document.querySelector('.mapShell').scrollIntoView({behavior:'smooth',block:'center'});
});
