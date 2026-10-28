// Community Resource Finder: curated public organizations. This is not a real-time
// service availability feed. Links point to the provider's own site.
(() => {
  const host = document.querySelector('#daily-teaser');
  if (!host) return;
  host.insertAdjacentHTML('afterend', `
    <section class="finderTeaser" id="finder-teaser">
      <div><div class="kicker">Community Resource Finder / New</div><h2>Finding help should be simpler.</h2><p>Search official organizations across animal rescue, food assistance, housing support, and free learning opportunities. Explore the map, contact a provider, or follow their official links.</p><a href="?view=finder">Find local resources ↗</a></div>
      <div class="finderTeaserVisual"><span>01 · Choose a need</span><span>02 · Find an organization</span><span>03 · Check the official source</span></div>
    </section>
    <section class="finderPage" id="community-finder">
      <div class="finderHero"><div class="finderHeroContent"><div class="kicker">Community Resource Finder / Los Angeles</div><h1>Help is closer<br>than you think.</h1><p>A curated starting point for local organizations and official directories. Choose a topic, search a city or ZIP code, and confirm details with the provider.</p><div class="finderQuickLinks"><a href="?view=animal">Animal research ↗</a><a href="?view=food">Food access data ↗</a><a href="?view=housing">Housing research ↗</a></div></div><div class="finderHeroPhoto"><span>Los Angeles · Photo: <a href="https://unsplash.com/photos/city-skyline-during-night-time-nskeft4t1KA" target="_blank" rel="noopener noreferrer">Jesus Curiel / Unsplash ↗</a></span></div></div>
      <form class="zipLocator" id="zipLocator"><div class="zipLocatorIntro"><span class="zipLocatorIcon" aria-hidden="true">⌖</span><div><strong>Find resources near a ZIP Code</strong><p>Enter any U.S. ZIP Code to sort our LA-area providers by estimated straight-line distance.</p></div></div><label class="zipLocatorField"><span class="srOnly">Five-digit ZIP code</span><input id="nearbyZip" type="text" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="e.g. 90404" autocomplete="postal-code" required></label><button id="nearbyFind" type="submit">Find nearby ↗</button><button type="button" id="nearbyReset" class="zipReset">Reset distance</button><p class="zipStatus" id="zipStatus" role="status" aria-live="polite">Distances are estimates from ZIP centroids, not driving times.</p></form>
      <div class="finderControls"><label class="finderField"><span>Search provider name or city</span><input id="resourceSearch" type="search" placeholder="Try Santa Monica, Venice, shelter…" autocomplete="off"></label><label class="finderField"><span>Community issue</span><select id="resourceCategory"><option value="all">All four issues</option><option value="animal">Animal welfare</option><option value="food">Food assistance</option><option value="housing">Housing support</option><option value="education">Education & learning</option></select></label><button type="button" id="resourceClear">Clear filters</button></div>
      <p class="finderHint">ZIP distance mode sorts the currently listed providers and adjusts the map. Search and category filters still work together. Providers may serve areas beyond their street address.</p>
      <div class="resourceFinderLayout"><div class="resourceFinderLeft"><div class="resourceFinderCount" id="resourceCount" aria-live="polite">Loading resources…</div><div id="resourceResults" class="resourceResults"></div></div><div class="resourceFinderMapShell"><div class="resourceFinderMapHeader"><strong>Explore the map</strong><small>Approximate street-address pins · Confirm directions before visiting</small></div><div id="resourceMap" aria-label="Map of listed community service locations"><p class="resourceMapFallback">The map is loading. The directory below works independently.</p></div><div class="resourceMapLegend"><span>● Animal</span><span>● Food</span><span>● Housing</span><span>● Learning</span></div></div></div>
      <div class="finderDirectoryPanel"><h2>Need a wider search?</h2><p>These official directories cover many more organizations than the curated sample on our map.</p><div class="finderOfficialLinks"><a href="https://www.wsfb.org/our-services/need-food-help/" target="_blank" rel="noopener noreferrer">Westside food pantries ↗</a><a href="https://www.lafoodbank.org/find-food/pantry-locator/" target="_blank" rel="noopener noreferrer">LA Food Bank locator ↗</a><a href="https://211la.org/" target="_blank" rel="noopener noreferrer">211 LA · Many services ↗</a><a href="https://communityinvestment.lacity.gov/familysource-centers" target="_blank" rel="noopener noreferrer">LA FamilySource Centers ↗</a><a href="https://www.lapl.org/literacy/locations" target="_blank" rel="noopener noreferrer">Free literacy services ↗</a></div></div>
      <p class="resourceFinderNotice"><strong>Before you go:</strong> Distances are straight-line estimates from ZIP centroids using <a href="https://docs.zippopotam.us/docs/getting-started/" target="_blank" rel="noopener noreferrer">Zippopotam.us / GeoNames</a>, not driving routes. Provider pins are approximate. Service hours, eligibility, appointments, pet availability and food distributions change; check official sources. Community Lens is an independent student project and does not operate services or collect applications. For general LA County referrals call <a href="tel:211">2-1-1</a>. In an emergency call 911.</p>
    </section>
  `);
  const shelterResources = (typeof shelters !== 'undefined' ? shelters : []).map(s => ({
    name:s.name, category:'animal', area:s.area, address:s.address, phone:s.phone,
    url:s.adopt, extra:s.foster ? {label:'Foster program',url:s.foster} : null,
    lat:s.lat,lng:s.lng, description:s.foster ? 'Animal adoption and foster program information.' : 'Animal shelter or adoption center. Check the official website for current listings.'
  }));
  const otherResources = [
    {name:'Church on Pearl Pantry',category:'food',area:'Santa Monica',address:'1520 Pearl St, Santa Monica, CA 90405',phone:'310-310-1384',url:'https://www.wsfb.org/our-services/need-food-help/',lat:34.0093,lng:-118.4780,description:'Westside Food Bank-listed local pantry. Verify distribution schedule and access requirements before visiting.'},
    {name:'SMC Bodega / Basic Needs',category:'food',area:'Santa Monica',address:'Santa Monica College, 1900 Pico Blvd, Santa Monica, CA 90405',phone:'310-434-3100',url:'https://www.smc.edu/student-support/health-wellbeing/basic-needs/food-security-programs.php',lat:34.0160,lng:-118.4701,description:'Food and basic-needs assistance for eligible SMC students. Campus pin is approximate; see official site for the pantry entrance.'},
    {name:'Virginia Avenue Park Mobile Pantry',category:'food',area:'Santa Monica',address:'2200 Virginia Ave, Santa Monica, CA 90404',phone:'310-828-6016',url:'https://www.wsfb.org/our-services/need-food-help/',lat:34.0239,lng:-118.4674,description:'Westside Food Bank mobile pantry location. Confirm the current distribution day before traveling.'},
    {name:'Nourish LA',category:'food',area:'Mar Vista',address:'3200 Sawtelle Blvd, Los Angeles, CA 90066',phone:'424-855-0880',url:'https://www.nourish.la/',extra:{label:'Westside pantry listing',url:'https://www.wsfb.org/our-services/need-food-help/'},lat:34.0229,lng:-118.4328,description:'Community food distribution; verify current date and requirements with the organizer.'},
    {name:'Mar Vista Family Center Pantry',category:'food',area:'Culver City',address:'5075 S Slauson Ave, Culver City, CA 90230',phone:'310-391-7366',url:'https://www.wsfb.org/our-services/need-food-help/',lat:33.9935,lng:-118.4100,description:'Westside Food Bank partner pantry; check the official listing for distribution details.'},
    {name:'Faith Tabernacle Church Pantry',category:'food',area:'West Los Angeles',address:'2147 Purdue Ave, Los Angeles, CA 90025',phone:'310-473-3135',url:'https://www.wsfb.org/our-services/need-food-help/',lat:34.0367,lng:-118.4481,description:'Westside Food Bank-listed pantry. Call to confirm eligibility and the next distribution.'},
    {name:'St. Mark Parish Pantry',category:'food',area:'Venice',address:'940 Coeur D’Alene Ave, Venice, CA 90291',phone:'310-821-5058',url:'https://www.wsfb.org/our-services/need-food-help/',lat:33.9980,lng:-118.4601,description:'Community pantry listed by Westside Food Bank. Verify hours with the provider.'},
    {name:'Food Pantry LAX',category:'food',area:'Inglewood',address:'355 E Beach St, Inglewood, CA 90302',phone:'310-677-5597',url:'https://foodpantrylax.org/',lat:33.9732,lng:-118.3480,description:'Food pantry serving the Inglewood area; confirm distribution schedule before arrival.'},
    {name:'Westside Food Bank',category:'food',area:'Santa Monica',address:'1710 22nd St, Santa Monica, CA 90404',phone:'310-828-6016',url:'https://www.wsfb.org/our-services/need-food-help/',lat:34.0223,lng:-118.4680,description:'Food bank warehouse and partner referral organization—not necessarily a direct public pantry. Use its official pantry directory.'},
    {name:'St. Joseph Center',category:'housing',area:'Venice',address:'204 Hampton Dr, Venice, CA 90291',phone:'310-396-6468',url:'https://stjosephctr.org/contact/',lat:33.9920,lng:-118.4744,description:'Housing and community support organization. Contact the center to learn which services or intake pathways apply.'},
    {name:'The People Concern / Access Center',category:'housing',area:'Santa Monica',address:'503 Olympic Blvd, Santa Monica, CA 90401',phone:'310-450-4050',url:'https://thepeopleconcern.org/get-help/',lat:34.0101,lng:-118.4917,description:'Westside access center for people experiencing homelessness. Contact the provider for intake; interim housing is referral-based.'},
    {name:'Upward Bound House',category:'housing',area:'Santa Monica',address:'1104 Washington Ave, Santa Monica, CA 90403',phone:'310-458-7779',url:'https://www.upwardboundhouse.org/our-programs',lat:34.0232,lng:-118.4900,description:'Programs supporting families experiencing homelessness. Contact the organization to learn about its referral process.'},
    {name:'Venice Public Library / Adult Literacy',category:'education',area:'Venice',address:'501 S Venice Blvd, Venice, CA 90291',phone:'310-821-1769',url:'https://www.lapl.org/branches/venice',extra:{label:'Literacy services',url:'https://www.lapl.org/literacy/locations'},lat:33.9919,lng:-118.4581,description:'Public library and adult literacy resources. Contact the branch about programs and appointments.'},
    {name:'Santa Monica Main Library',category:'education',area:'Santa Monica',address:'601 Santa Monica Blvd, Santa Monica, CA 90401',phone:'310-458-8600',url:'https://www.santamonica.gov/places/libraries/main-library',extra:{label:'Library programs',url:'https://www.santamonica.gov/categories/programs/library'},lat:34.0179,lng:-118.4924,description:'Public library with free learning resources, reading materials and digital literacy opportunities.'},
    {name:'Santa Monica Fairview Branch Library',category:'education',area:'Santa Monica',address:'2101 Ocean Park Blvd, Santa Monica, CA 90405',phone:'310-458-8600',url:'https://www.santamonica.gov/library-locations-and-hours',lat:34.0115,lng:-118.4670,description:'Neighborhood library. Check programs, opening hours and library card access on the city website.'},
    {name:'West Los Angeles Regional Library',category:'education',area:'West Los Angeles',address:'11360 Santa Monica Blvd, Los Angeles, CA 90025',phone:'310-575-8323',url:'https://www.lapl.org/branches/west-los-angeles',extra:{label:'Online learning',url:'https://www.lapl.org/'},lat:34.0451,lng:-118.4544,description:'Public library with online learning and literacy services; some online resources require a library card.'},
    {name:'SMC STEM Tutoring / Learning Resources',category:'education',area:'Santa Monica',address:'Santa Monica College, 1900 Pico Blvd, Santa Monica, CA 90405',phone:null,url:'https://www.smc.edu/student-support/academic-support/tutoring-centers/',extra:{label:'STEM resources',url:'https://www.smc.edu/student-support/academic-support/counseling/special-support-programs/stem/student-resources.php'},lat:34.0160,lng:-118.4701,description:'Free tutoring for currently enrolled SMC students. Check specific lab locations and schedules on the official site.'},
    {name:'LAPL Robertson Adult Literacy Center',category:'education',area:'West Los Angeles',address:'1719 S Robertson Blvd, Los Angeles, CA 90035',phone:'213-228-7037',url:'https://www.lapl.org/literacy/locations',lat:34.0475,lng:-118.3847,description:'Adult literacy support through the Los Angeles Public Library system. Contact the literacy team for appointments.'}
  ];
  const resources = [...shelterResources,...otherResources];
  window.communityLensResources = resources;
  const labels = {animal:'Animal welfare',food:'Food assistance',housing:'Housing support',education:'Education & learning'};
  const symbols = {animal:'♥',food:'●',housing:'⌂',education:'✦'};
  const search = document.querySelector('#resourceSearch');
  const category = document.querySelector('#resourceCategory');
  const results = document.querySelector('#resourceResults');
  const count = document.querySelector('#resourceCount');
  const zipInput = document.querySelector('#nearbyZip');
  const zipStatus = document.querySelector('#zipStatus');
  const zipButton = document.querySelector('#nearbyFind');
  const zipFallback = {
    '90404':[34.0269,-118.4739], '90405':[34.0095,-118.4715],
    '90401':[34.0177,-118.4935], '90291':[33.9936,-118.4630],
    '90064':[34.0358,-118.4286], '90230':[33.9968,-118.3950],
    '90066':[34.0039,-118.4298], '90025':[34.0452,-118.4458],
    '90250':[33.9164,-118.3526], '90815':[33.7925,-118.1150]
  };
  let near=null;
  let map=null, layer=null;
  const markerByName = new Map();
  function link(label,url,primary=false){
    const a=document.createElement('a');a.textContent=label;a.href=url;
    if(primary)a.className='primary';
    if(!url.startsWith('tel:')){a.target='_blank';a.rel='noopener noreferrer'}
    return a;
  }
  function directions(address){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address)}
  function initializeMap(){
    if(document.documentElement.dataset.view!=='finder')return;
    const holder=document.querySelector('#resourceMap');
    if(typeof L==='undefined'){holder.textContent='Interactive map unavailable. Use the provider cards for addresses and directions.';return}
    try{
      holder.replaceChildren();
      map=L.map(holder,{scrollWheelZoom:false}).setView([34.02,-118.33],10);
      L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',{maxZoom:16,attribution:'Map: <a href="https://www.usgs.gov/programs/national-geospatial-program/national-map">USGS The National Map</a>'}).addTo(map);
      layer=L.layerGroup().addTo(map);
    }catch(err){map=null;holder.textContent='Map unavailable. The resource directory and directions remain available.'}
  }
  function milesBetween(latA,lngA,latB,lngB){
    const toRadians=n=>n*Math.PI/180;
    const dLat=toRadians(latB-latA),dLng=toRadians(lngB-lngA);
    const a=Math.sin(dLat/2)**2+Math.cos(toRadians(latA))*Math.cos(toRadians(latB))*Math.sin(dLng/2)**2;
    return 3958.8*2*Math.asin(Math.min(1,Math.sqrt(a)));
  }
  function populateMap(items){
    if(!map||!layer)return;
    layer.clearLayers();markerByName.clear();
    const positions=[];
    items.forEach(item=>{
      if(!Number.isFinite(item.lat)||!Number.isFinite(item.lng))return;
      const pin=L.divIcon({className:'',html:'<div class="resourcePin '+item.category+'"><span>'+symbols[item.category]+'</span></div>',iconSize:[30,35],iconAnchor:[15,30]});
      const card=document.createElement('div');card.className='resourcePopup';
      const title=document.createElement('strong');title.textContent=item.name;
      const address=document.createElement('p');address.textContent=item.address;
      card.append(title,address,link('Official site ↗',item.url));
      const marker=L.marker([item.lat,item.lng],{icon:pin,title:item.name}).bindPopup(card);
      marker.addTo(layer);markerByName.set(item.name,marker);positions.push([item.lat,item.lng]);
    });
    if(near){
      const home=L.circleMarker([near.lat,near.lng],{radius:8,color:'#283e5c',weight:3,fillColor:'#fff',fillOpacity:1}).bindPopup('Approximate center of ZIP '+near.zip);
      home.addTo(layer);positions.push([near.lat,near.lng]);
    }
    if(near&&positions.length>1)map.fitBounds(positions,{padding:[42,42],maxZoom:12});
    else if(positions.length>1)map.fitBounds(positions,{padding:[37,37],maxZoom:11});
    else if(positions.length===1)map.setView(positions[0],12);
    else map.setView([34.02,-118.33],10);
  }
  function render(){
    const q=search.value.trim().toLowerCase(), selected=category.value;
    const filtered=resources.filter(r=>(selected==='all'||r.category===selected)&&[r.name,r.area,r.address,r.description].join(' ').toLowerCase().includes(q));
    if(near)filtered.sort((a,b)=>milesBetween(near.lat,near.lng,a.lat,a.lng)-milesBetween(near.lat,near.lng,b.lat,b.lng));
    count.textContent=filtered.length+' curated provider'+(filtered.length===1?'':'s')+(near?' · Nearest first from '+near.zip+' (straight-line)':' · Official links · LA region');
    results.replaceChildren();populateMap(filtered);
    filtered.forEach(r=>{
      const article=document.createElement('article');article.className='resourceResult';
      const top=document.createElement('div');top.className='resourceResultTop';
      const badge=document.createElement('span');badge.className='resourceBadge '+r.category;badge.textContent=labels[r.category];
      const area=document.createElement('small');area.textContent=r.area;area.style.color='#6f7a7b';
      top.append(badge,area);
      const h=document.createElement('h3');h.textContent=r.name;
      const desc=document.createElement('p');desc.textContent=r.description;
      if(near){
        const distance=document.createElement('p');
        distance.className='resourceDistance';
        distance.textContent='⌖ About '+milesBetween(near.lat,near.lng,r.lat,r.lng).toFixed(1)+' mi away · straight-line estimate';
        article.append(distance);
      }
      const addr=document.createElement('address');addr.textContent=r.address;
      const actions=document.createElement('div');actions.className='resourceActions';
      actions.append(link('Official website ↗',r.url,true),link('Directions ↗',directions(r.address)));
      if(r.phone)actions.append(link('Call '+r.phone,'tel:'+r.phone.replace(/[^\d+]/g,'')));
      if(r.extra)actions.append(link(r.extra.label+' ↗',r.extra.url));
      if(map&&markerByName.has(r.name)){
        const b=document.createElement('button');b.type='button';b.textContent='Show on map ⌖';
        b.addEventListener('click',()=>{map.setView([r.lat,r.lng],13);markerByName.get(r.name).openPopup();document.querySelector('.resourceFinderMapShell').scrollIntoView({behavior:'smooth',block:'center'})});
        actions.append(b);
      }
      article.append(top,h,desc,addr,actions);results.append(article);
    });
    if(!filtered.length){const empty=document.createElement('div');empty.className='resourceEmpty';empty.textContent='No matching providers in this curated sample. Try a broader location or use the official directories below.';results.append(empty)}
  }
  search.addEventListener('input',render);
  category.addEventListener('change',render);
  document.querySelector('#resourceClear').addEventListener('click',()=>{search.value='';category.value='all';render();search.focus()});
  document.querySelector('#nearbyReset').addEventListener('click',()=>{near=null;zipInput.value='';zipStatus.textContent='Distance sorting cleared. Showing the full directory.';render()});
  document.querySelector('#zipLocator').addEventListener('submit',async event=>{
    event.preventDefault();
    const zip=zipInput.value.trim();
    if(!/^\d{5}$/.test(zip)){zipStatus.textContent='Please enter a valid five-digit ZIP code.';return}
    zipButton.disabled=true;
    zipStatus.textContent='Finding the approximate center of ZIP '+zip+'…';
    try{
      let coords=null,place='';
      try{
        const controller=new AbortController();
        const timer=setTimeout(()=>controller.abort(),6500);
        try{
          const response=await fetch('https://api.zippopotam.us/us/'+zip,{signal:controller.signal});
          if(response.ok){
            const data=await response.json(),first=data.places?.[0];
            if(first&&Number.isFinite(Number(first.latitude))&&Number.isFinite(Number(first.longitude))){
              coords=[Number(first.latitude),Number(first.longitude)];
              place=first['place name']||'';
            }
          }
        }finally{clearTimeout(timer)}
      }catch(err){/* Recoverable: known local ZIP centroids are available below. */}
      if(!coords&&zipFallback[zip]){coords=zipFallback[zip];place='LA area'}
      if(!coords){zipStatus.textContent='This ZIP could not be located right now. Try another ZIP or browse the official directory links.';return}
      near={lat:coords[0],lng:coords[1],zip};
      search.value='';
      zipStatus.textContent='Showing nearest listed providers for '+zip+(place?' ('+place+')':'')+'. Distances are approximate straight-line miles.';
      render();
    }finally{zipButton.disabled=false}
  });
  initializeMap();
  render();
})();
