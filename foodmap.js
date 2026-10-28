// Dedicated food-access map, filtered by approximate ZIP centroid distance.
(() => {
  if(document.documentElement.dataset.view!=='food')return;
  const chapter=document.querySelector('#food');
  const existing=chapter?.querySelector('.foodResources');
  if(!existing)return;
  const food=(window.communityLensResources||[]).filter(r=>r.category==='food');
  existing.insertAdjacentHTML('beforebegin',`
    <section class="foodMapModule" aria-labelledby="foodMapTitle">
      <div class="foodMapHeading"><div class="kicker">Community resources / On the map</div><h3 id="foodMapTitle">Where can I find food nearby?</h3><p>Browse Westside pantries and student programs, then check their official pages for changing hours and eligibility.</p></div>
      <form id="foodZipForm" class="foodMapForm"><label for="foodZipInput">Enter a ZIP code</label><input id="foodZipInput" type="text" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="90404" required autocomplete="postal-code"><button type="submit">Show nearby ↗</button><button type="button" id="foodZipClear">Clear</button><div id="foodZipStatus" role="status" aria-live="polite">Map shows curated LA-area food providers.</div></form>
      <div class="foodMapLayout"><div id="foodMap" role="region" aria-label="Interactive map of Westside food assistance providers"><p>Loading the map…</p></div><div class="foodMapList"><strong id="foodMapCount">Food assistance locations</strong><div id="foodMapResults"></div></div></div>
      <p class="foodMapNotice">Blue circle = ZIP Code center. Distances are straight-line estimates, not driving routes. Map pins represent approximate addresses and may include food bank offices that do not distribute food directly. <a href="https://www.wsfb.org/our-services/need-food-help/" target="_blank" rel="noopener noreferrer">Check Westside Food Bank's current pantry directory ↗</a>.</p>
    </section>
  `);
  const input=document.querySelector('#foodZipInput');
  const status=document.querySelector('#foodZipStatus');
  const list=document.querySelector('#foodMapResults');
  let map,markers,origin=null;
  const pins=new Map();
  if(typeof L!=='undefined'){
    try{
      document.querySelector('#foodMap').replaceChildren();
      map=L.map('foodMap',{scrollWheelZoom:false}).setView([34.02,-118.44],11);
      L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',{maxZoom:16,attribution:'<a href="https://www.usgs.gov/programs/national-geospatial-program/national-map">USGS map</a>'}).addTo(map);
      markers=L.layerGroup().addTo(map);
    }catch(error){map=null;document.querySelector('#foodMap').textContent='Map tiles are unavailable. Official addresses and directions remain below.'}
  }else document.querySelector('#foodMap').textContent='Map unavailable. Use the provider list below.';
  function miles(a,b){
    const rad=v=>v*Math.PI/180;
    const d1=rad(b.lat-a.lat),d2=rad(b.lng-a.lng);
    const x=Math.sin(d1/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(d2/2)**2;
    return 3958.8*2*Math.asin(Math.min(1,Math.sqrt(x)));
  }
  function aLink(label,href){
    const a=document.createElement('a');a.textContent=label;a.href=href;
    if(!href.startsWith('tel:')){a.target='_blank';a.rel='noopener noreferrer'}
    return a;
  }
  function draw(){
    const items=[...food];
    if(origin)items.sort((a,b)=>miles(origin,a)-miles(origin,b));
    list.replaceChildren();pins.clear();
    document.querySelector('#foodMapCount').textContent=items.length+' listed food resources'+(origin?' · nearest first':'');
    const bounds=[];
    if(markers)markers.clearLayers();
    items.forEach(item=>{
      const card=document.createElement('article');card.className='foodMapItem';
      const h=document.createElement('h4');h.textContent=item.name;
      const p=document.createElement('p');p.textContent=item.address;
      card.append(h,p);
      if(origin){const d=document.createElement('span');d.className='foodDistance';d.textContent='Approx. '+miles(origin,item).toFixed(1)+' mi · straight line';card.append(d)}
      const actions=document.createElement('div');actions.className='foodMapActions';
      actions.append(aLink('Official source ↗',item.url),aLink('Directions ↗','https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(item.address)));
      if(item.phone)actions.append(aLink('Call ↗','tel:'+item.phone.replace(/[^\d+]/g,'')));
      card.append(actions);
      if(markers&&Number.isFinite(item.lat)){
        const marker=L.circleMarker([item.lat,item.lng],{radius:7,color:'#e7faf4',weight:2,fillColor:'#b27755',fillOpacity:1});
        const popup=document.createElement('div');const title=document.createElement('strong');title.textContent=item.name;
        const address=document.createElement('p');address.textContent=item.address;
        popup.append(title,address,aLink('Official source ↗',item.url));marker.bindPopup(popup);marker.addTo(markers);
        bounds.push([item.lat,item.lng]);pins.set(item.name,marker);
        const show=document.createElement('button');show.type='button';show.textContent='On map ⌖';show.addEventListener('click',()=>{map.setView([item.lat,item.lng],13);marker.openPopup();document.querySelector('#foodMap').scrollIntoView({behavior:'smooth',block:'center'})});actions.append(show);
      }
      list.append(card);
    });
    if(origin&&markers){L.circleMarker([origin.lat,origin.lng],{radius:9,color:'#234e7c',weight:3,fillColor:'#fff',fillOpacity:1}).bindPopup('ZIP center '+origin.zip).addTo(markers);bounds.push([origin.lat,origin.lng])}
    if(map&&bounds.length>1)map.fitBounds(bounds,{padding:[27,27],maxZoom:12});
  }
  document.querySelector('#foodZipForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const zip=input.value.trim();if(!/^\d{5}$/.test(zip)){status.textContent='Please enter a five-digit ZIP code.';return}
    status.textContent='Looking up ZIP '+zip+'…';
    const fallback={'90404':[34.0269,-118.4739],'90405':[34.0095,-118.4715],'90291':[33.9936,-118.4630],'90025':[34.0452,-118.4458],'90230':[33.9968,-118.3950]};
    let coords=null;
    try{
      const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),6500);
      try{const r=await fetch('https://api.zippopotam.us/us/'+zip,{signal:controller.signal});if(r.ok){const data=await r.json();const p=data.places?.[0];if(p)coords=[Number(p.latitude),Number(p.longitude)]}}
      finally{clearTimeout(timer)}
    }catch(error){/* Offline fallback where known. */}
    if(!coords||!coords.every(Number.isFinite))coords=fallback[zip];
    if(!coords){status.textContent='Unable to locate that ZIP. Try another or use the official directories.';return}
    origin={lat:coords[0],lng:coords[1],zip};
    status.textContent='Sorted from ZIP '+zip+' · approximate straight-line miles.';draw();
  });
  document.querySelector('#foodZipClear').addEventListener('click',()=>{origin=null;input.value='';status.textContent='Showing all listed food providers.';draw()});
  draw();
})();
