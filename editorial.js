// Source-first editorial reading rooms; links are dated references, not an automatic news feed.
(() => {
  const content={
    animal:{
      selector:'.research',photo:'./images/animal-photo.jpg',credit:'Judy Beth Morris',creditUrl:'https://unsplash.com/photos/a-close-up-of-a-dog-wearing-a-bandana-wAznrwYNw_g',
      headline:'The lives behind the numbers.',
      description:'A chart records an outcome. The animal behind it still has a story. Read about adoption and foster programs while checking the limits of administrative records.',
      items:[
        {kind:'2026 · Program update',title:'Long Beach Animal Care Services invites new foster caregivers',desc:'Official notice explaining how residents can help dogs, kittens and other animals through fostering.',url:'https://www.longbeach.gov/acs/news/foster/'},
        {kind:'Official dataset · Updated records',title:'Animal Shelter Intakes and Outcomes',desc:'Explore the underlying city records behind the 2024, 2025 and 2026 charts.',url:'https://data.longbeach.gov/explore/dataset/animal-shelter-intakes-and-outcomes/'},
        {kind:'Official guide · Adoption',title:'Long Beach Animal Adoption Information',desc:'Read how the city handles shelter adoptions and check the current process.',url:'https://www.longbeach.gov/acs/our-animals/adoptions/'},
        {kind:'May 2025 · City of LA news',title:'LA Animal Services: Shelter overcrowding alert',desc:'The Los Angeles city department reported pressure on kennel space and called for community support. This is a dated announcement, not a current occupancy count.',url:'https://www.laanimalservices.com/la-animal-services-faces-critical-overcrowding-immediate-help-needed-save-lives'},
        {kind:'LA County · Official annual and monthly reporting',title:'County Animal Care & Control: Animal statistics',desc:'Compare year-end and monthly reports from county-operated centers. Coverage is distinct from the City of LA and Long Beach.',url:'https://animalcare.lacounty.gov/animal-statistics/'},
        {kind:'LA County · Agency perspective',title:'More Than a Number: Shelter populations and their limits',desc:'County agency explanation of why admissions, animal health, housing and available capacity must be considered together.',url:'https://animalcare.lacounty.gov/news/more-than-a-number-why-words-matter-when-we-talk-about-animal-shelter-populations/'}
      ],more:'https://www.longbeach.gov/acs/news/',moreLabel:'Browse the Long Beach Animal Care newsroom'
    },
    food:{
      selector:'.foodChapter',photo:'./images/food-photo.jpg',credit:'Unsplash volunteer-work collection (individual photographer unverified)',creditUrl:'https://unsplash.com/s/photos/volunteer-work',
      headline:'Food access, safety and dignity.',
      description:'Food insecurity and food safety are related but different: one concerns reliable access to food, while the other concerns preventing foodborne illness.',
      items:[
        {kind:'Research · December 2025',title:'USC: Food insecurity remains high in LA County',desc:'A local research summary explaining why food insecurity varies across households.',url:'https://public-exchange.org/usc/news/food-insecurity-remains-high-lacounty/'},
        {kind:'Public health · Updated 2026',title:'FDA: Investigations of Foodborne Illness Outbreaks',desc:'Current official investigations; dates and affected products are maintained by FDA.',url:'https://www.fda.gov/food/outbreaks-foodborne-illness/investigations-foodborne-illness-outbreaks'},
        {kind:'Evidence-based guidance · CDC',title:'Preventing Food Poisoning',desc:'Practical food safety prevention: clean, separate, cook and chill.',url:'https://www.cdc.gov/food-safety/prevention/'},
        {kind:'Research · USDA',title:'Food Security in the United States',desc:'National statistics and definitions; this is national context, not LA County live data.',url:'https://ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/key-statistics-graphics'}
      ],more:'https://public-exchange.org/usc/project/feeding-la/food-reports/',moreLabel:'Explore the USC food research library'
    },
    housing:{
      selector:'.housingChapter',photo:'./images/housing-photo.jpg',credit:'Alex Simpson',creditUrl:'https://unsplash.com/photos/a-street-lined-with-palm-trees-and-houses-kXjHy-apeaA',
      headline:'A home is more than an address.',
      description:'A point-in-time count is one lens on housing instability. Read the agencies’ own reports and learn about real access points for housing help.',
      items:[
        {kind:'2026 · Official release',title:'LAHSA: 2026 Homeless Count results',desc:'Official interpretation and limitations of the county’s point-in-time count.',url:'https://www.lahsa.org/news/?article=1079-2026-homeless-count-reveals-bottleneck-stymied-progress'},
        {kind:'2026 · Data and supporting tables',title:'Greater Los Angeles Homeless Count Data',desc:'Regional reports and source documents for comparing homelessness estimates.',url:'https://www.lahsa.org/news?article=1078-2026+Greater+Los+Angeles+Homeless+Count+Data'},
        {kind:'Service guide · Westside',title:'The People Concern: Find Help',desc:'Access center directions, entry pathways and housing support referrals.',url:'https://thepeopleconcern.org/get-help/'}
      ],more:'https://www.lahsa.org/newsroom/',moreLabel:'Browse latest LAHSA newsroom updates'
    },
    education:{
      selector:'.educationPreview',photo:'./images/education-photo.jpg',credit:'Sir. Simo',creditUrl:'https://unsplash.com/photos/a-person-studies-at-a-desk-in-the-library-mzAh9viZGAM',
      headline:'Who gets the chance to learn?',
      description:'Access can depend on schedules, location, program eligibility and digital tools. These sources help distinguish new opportunities from completed research.',
      items:[
        {kind:'2026 · College news',title:'Santa Monica College Newsroom',desc:'Official updates about programs, student support and campus learning opportunities.',url:'https://www.smc.edu/news/'},
        {kind:'2026 · Community event',title:'LA Public Library: Adult Walk-in Tutoring',desc:'A listed community library program; follow the event page for up-to-date dates and access.',url:'https://www.lapl.org/index.php/events/walk-tutoring-bo-gay'},
        {kind:'Ongoing · Academic resources',title:'SMC Tutoring Centers',desc:'Subject-specific tutoring support for currently enrolled students.',url:'https://www.smc.edu/student-support/academic-support/tutoring-centers/'},
        {kind:'Data research · Neighborhoods',title:'Neighborhood Data for Social Change',desc:'Explore regional indicators and choose appropriate geographic comparisons for future education analysis.',url:'https://la.myneighborhooddata.org/data/'}
      ],more:'https://www.lapl.org/events',moreLabel:'Browse current LA Public Library events'
    }
  };
  Object.entries(content).forEach(([key,d])=>{
    const parent=document.querySelector(d.selector);if(!parent)return;
    const section=document.createElement('section');section.className='issueEditorial';section.dataset.issue=key;
    section.innerHTML=`
      <div class="issueEditorialVisual">
        <div class="issueEditorialPhoto"><img src="${d.photo}" alt="Documentary-style real photograph illustrating ${key}" loading="lazy"><span>Illustrative photograph · <a href="${d.creditUrl}" target="_blank" rel="noopener noreferrer">${d.credit} / Unsplash ↗</a></span></div>
        <div class="issueEditorialStory"><span class="kicker">A closer look / Photo essay</span><h2>${d.headline}</h2><p>${d.description}</p><p class="issueEditorialCaveat">Photograph is illustrative, not a depiction of the specific people or organizations discussed.</p></div>
      </div>
      <div class="issueEditorialTop"><div><span class="kicker">Reading room / News & research</span><h2>Beyond the numbers.</h2><p>Selected trustworthy articles, reports and public guidance. Publication dates and coverage vary; this is a curated reading list, not a real-time news feed.</p></div><a href="${d.more}" target="_blank" rel="noopener noreferrer">${d.moreLabel} ↗</a></div>
      <div class="issueEditorialCards"></div>`;
    d.items.forEach(item=>{
      const article=document.createElement('article');article.className='issueEditorialCard';
      const tag=document.createElement('span');tag.textContent=item.kind;
      const h=document.createElement('h3');h.textContent=item.title;
      const desc=document.createElement('p');desc.textContent=item.desc;
      const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Read original source ↗';
      article.append(tag,h,desc,a);section.querySelector('.issueEditorialCards').append(article);
    });
    if(key==='education')parent.append(section);
    else{
      const intro=parent.querySelector('.researchHeader')||parent.querySelector('.foodPanel');
      if(intro?.nextElementSibling)intro.nextElementSibling.before(section);else parent.prepend(section);
    }
  });
  const daily=document.querySelector('#daily');
  if(daily){
    // Add the public Google Form URL here after the owner finishes its
    // consent form and independently verifies the unsubscribe workflow.
    const signupUrl='https://docs.google.com/forms/d/e/1FAIpQLSfY50Oc4DjlID0DBADbVVoJFd037XXs7OwPph3QXRrWa6UbQw/viewform';
    const block=document.createElement('section');block.className='digestPreview';
    block.innerHTML=`
      <div><span class="kicker">Daily digest / Email</span><h2>A thoughtful brief, delivered to your inbox.</h2><p>Get a short daily guide across animal welfare, food access, housing and education. Each edition points to sources and distinguishes today's updates from older reports. You can unsubscribe anytime.</p><div class="digestPreviewActions"><a href="mailto:?subject=Community%20Lens%20Daily%20Brief&body=Explore%20the%20latest%20Community%20Lens%20brief%3A%20https%3A%2F%2Fshelter-stories-yixiao-2026.zhangyixiao929.chatgpt.site%2F%3Fview%3Dtoday">Share today's brief by email ↗</a><span class="digestSignupStatus">Email signup is not active yet. No addresses are collected here.</span></div></div><div class="digestMini"><span>THE DAILY LENS</span><strong>Animal welfare · Food access<br>Housing · Education</strong><small>Source-led reading, delivered with your consent</small></div>`;
    if(signupUrl){
      const signup=document.createElement('a');signup.href=signupUrl;signup.target='_blank';signup.rel='noopener noreferrer';signup.textContent='Subscribe to the daily digest ↗';
      block.querySelector('.digestPreviewActions').prepend(signup);
      block.querySelector('.digestSignupStatus').textContent='Opt-in form opens in Google Forms · unsubscribe in every email';
    }
    daily.append(block);
  }
})();

// Publication-quality guardrails: methodology, small-screen navigation,
// honest source labels and accessible, recoverable photography.
(() => {
  const isHome=document.documentElement.dataset.view==='home';
  const sourceRows=[
    {issue:'Animal welfare',region:'Long Beach daily records; separate LA city and county reports',cadence:'Event-date records / county fiscal-year reports',url:'https://data.longbeach.gov/explore/dataset/animal-shelter-intakes-and-outcomes/',other:'https://animalcare.lacounty.gov/animal-statistics/',note:'Different shelter systems are not combined into an invented regional total.'},
    {issue:'Food access',region:'Los Angeles County',cadence:'USC October 2025 household survey; not a daily estimate',url:'https://public-exchange.org/usc/wp-content/uploads/sites/2/2025/12/Food-Nutrition-Insecurity-in-LA-County-October-2025.pdf',other:'https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us',note:'24% refers to households reporting food insecurity over the past year, not today’s food distribution count.'},
    {issue:'Housing',region:'Greater Los Angeles / LA County',cadence:'2026 annual Point-in-Time Count',url:'https://www.lahsa.org/news/?article=1079-2026-homeless-count-reveals-bottleneck-stymied-progress',other:'https://www.lahsa.org/data-refresh',note:'73,040 countywide and 45,194 in the City of LA are estimates for one night; changes were not statistically significant.'},
    {issue:'Education',region:'Los Angeles County public schools',cadence:'2025–26 academic-year enrollment',url:'https://www.ed-data.org/county/los-angeles/',other:'https://www.cde.ca.gov/ds/ad/edtop.asp',note:'1,242,816 is enrolled students, not an achievement, equity, or daily service metric.'}
  ];
  function sourceCard(row,index){
    const card=document.createElement('article');card.className='evidenceCard';
    const number=document.createElement('span');number.className='evidenceIndex';number.textContent=String(index+1).padStart(2,'0')+' / SOURCE RECORD';
    const heading=document.createElement('h3');heading.textContent=row.issue;
    const region=document.createElement('p');region.innerHTML='<strong>Coverage</strong> '+row.region;
    const cadence=document.createElement('p');cadence.innerHTML='<strong>Period</strong> '+row.cadence;
    const caveat=document.createElement('p');caveat.className='evidenceCaveat';caveat.textContent=row.note;
    const links=document.createElement('div');links.className='evidenceLinks';
    [[row.url,'Primary source ↗'],[row.other,'Compare / methodology ↗']].forEach(([url,label])=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;links.append(a)});
    card.append(number,heading,region,cadence,caveat,links);return card;
  }
  if(isHome){
    const section=document.createElement('section');section.id='evidence-desk';section.className='evidenceDesk';
    section.innerHTML='<div class="kicker">Research notes / Open methods</div><div class="evidenceDeskIntro"><div><h2>Show the source. Explain the limit.</h2><p>Every Community Lens chapter separates <strong>where</strong> a statistic applies, <strong>when</strong> it was measured, and <strong>what</strong> it cannot prove. These are the four source records behind the current brief.</p></div><a href="?view=today">See the dated briefing ↗</a></div>';
    const grid=document.createElement('div');grid.className='evidenceGrid';sourceRows.forEach((row,i)=>grid.append(sourceCard(row,i)));section.append(grid);
    const target=document.querySelector('.aboutPortal')||document.querySelector('#photography');target?.before(section);
    const process=document.createElement('section');process.id='case-study';process.className='caseStudy';
    process.innerHTML='<div class="caseStudyHeading"><div><span class="kicker">Behind the project / Case study</span><h2>From civic records to useful decisions.</h2><p>Community Lens is an independent project by Yixiao Zhang. The goal is to make public information understandable while retaining the uncertainty that comes with it.</p></div><a href="#evidence-desk">Review source records ↑</a></div><div class="caseStudySteps"><article><span>01 / RESEARCH</span><h3>Frame the question</h3><p>Choose a specific public-interest question and the geographic area it actually covers.</p></article><article><span>02 / DATA</span><h3>Check the record</h3><p>Separate live event records, annual estimates, and school-year snapshots before interpreting results.</p></article><article><span>03 / DESIGN</span><h3>Tell the story</h3><p>Build responsive visuals, comparisons, reading lists, and plain-language explanations.</p></article><article><span>04 / ACTION</span><h3>Connect people</h3><p>Link to official research and public-service directories so a reader can take a next step.</p></article></div><p class="caseStudyTools"><strong>Built with</strong> HTML · CSS · JavaScript · public datasets and APIs · interactive charts and maps · Google Apps Script email workflow. The on-page guide is rule-based; no language-model service is connected.</p>';
    section.after(process);
  }
  const today=document.querySelector('#daily');
  if(today){
    const methods=document.createElement('section');methods.className='dailyMethodBar';
    methods.innerHTML='<div><span class="kicker">A note on these four numbers</span><h2>Four measures. Four reporting clocks.</h2><p>Animal figures refresh from an official event-record API when available. Housing is an annual estimate, food access uses a dated research estimate, and education is school-year enrollment. None should be read as four real-time counters.</p></div><a href="https://www.lahsa.org/data-refresh" target="_blank" rel="noopener noreferrer">Explore the 2026 housing methodology ↗</a>';
    today.querySelector('.dailyCards')?.before(methods);
  }
  // All images are real source-linked photos. If an external image fails, give
  // an accessible text fallback rather than a broken-image glyph or a repeat.
  function showPhotoFallback(img){const box=img.parentElement;if(!box||box.classList.contains('photoUnavailable'))return;box.classList.add('photoUnavailable');img.hidden=true;const text=document.createElement('span');text.className='photoFallback';text.textContent='Photograph temporarily unavailable. The story and source links remain available.';box.append(text)}
  document.addEventListener('error',event=>{if(event.target instanceof HTMLImageElement)showPhotoFallback(event.target)},true);
  document.querySelectorAll('img').forEach(img=>{
    if(img.loading!=='eager'&&!img.closest('.hero'))img.loading='lazy';
    img.decoding='async';
  });
  // Build a usable small-screen navigation instead of silently hiding chapters.
  const nav=document.querySelector('.topbar .nav');
  if(nav){
    nav.id='primary-navigation';nav.setAttribute('aria-label','Main navigation');
    const menu=document.createElement('button');menu.type='button';menu.className='mobileMenuButton';menu.setAttribute('aria-label','Open navigation');menu.setAttribute('aria-controls',nav.id);menu.setAttribute('aria-expanded','false');menu.textContent='☰ Menu';
    nav.before(menu);
    function closeMenu(){nav.classList.remove('menuOpen');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰ Menu'}
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('menuOpen');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'✕ Close':'☰ Menu'});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  }
  // Keyboard parity for the homepage topic carousel and daily animal metrics.
  const hero=document.querySelector('html[data-view="home"] .hero');
  if(hero){hero.tabIndex=0;hero.setAttribute('aria-label','Four-topic photograph carousel. Use left and right arrow keys to explore.');hero.addEventListener('keydown',e=>{if(e.target!==hero)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();hero.querySelector(e.key==='ArrowLeft'?'.heroPrev':'.heroNext')?.click()}})}
  const metrics=document.querySelector('.dailyAnimalGrid');
  if(metrics){metrics.tabIndex=0;metrics.setAttribute('aria-label','Animal outcome figures; use left and right arrows to change metric.');metrics.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();document.querySelector(e.key==='ArrowLeft'?'.metricPrev':'.metricNext')?.click()}})}
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{a.rel='noopener noreferrer'});
  const footer=document.querySelector('.foot');
  if(footer){const link=document.createElement('a');link.href='?view=today';link.textContent='Data and sources';link.className='footerSourceLink';footer.append(link)}
})();

// Progressive UI upgrades: four-topic navigation, visual daily briefing and
// explicit geographic context. Source-linked and fully functional without AI APIs.
(() => {
  const nav=document.querySelector('.nav');
  if(nav&&!nav.querySelector('a[href="?view=education"]')){
    const a=document.createElement('a');a.href='?view=education';a.textContent='Education';
    nav.querySelector('.finderNav')?.before(a);
  }
  const orb=document.querySelector('.orbLabel');
  if(orb)orb.innerHTML='<strong>01 / 04</strong>ANIMAL WELFARE<br>Explore the four lenses.';
  const homeHero=document.querySelector('html[data-view=home] .hero');
  if(homeHero){
    const slides=[
      {name:'Animal welfare',photo:'./images/animal-photo.jpg',url:'?view=animal',by:'Judy Beth Morris',source:'https://unsplash.com/photos/a-close-up-of-a-dog-wearing-a-bandana-wAznrwYNw_g'},
      {name:'Housing',photo:'./images/housing-photo.jpg',url:'?view=housing',by:'Alex Simpson',source:'https://unsplash.com/photos/a-street-lined-with-palm-trees-and-houses-kXjHy-apeaA'},
      {name:'Food access',photo:'./images/food-photo.jpg',url:'?view=food',by:'Unsplash volunteer-work collection',source:'https://unsplash.com/s/photos/volunteer-work'},
      {name:'Education',photo:'./images/education-photo.jpg',url:'?view=education',by:'Sir. Simo',source:'https://unsplash.com/photos/a-person-studies-at-a-desk-in-the-library-mzAh9viZGAM'}
    ];
    let index=0;
    const control=document.createElement('div');control.className='heroCarouselControls';
    control.innerHTML='<button type="button" class="heroPrev" aria-label="Previous topic">←</button><span class="heroCarouselLabel">Animal welfare</span><button type="button" class="heroNext" aria-label="Next topic">→</button>';
    homeHero.append(control);
    function renderHero(){const slide=slides[index];homeHero.style.setProperty('--hero-img',`url("${slide.photo}")`);orb.innerHTML=`<strong>${String(index+1).padStart(2,'0')} / 04</strong><a href="${slide.url}">${slide.name} ↗</a>`;control.querySelector('.heroCarouselLabel').textContent=slide.name;const credit=homeHero.querySelector('.heroPhotoCredit');if(credit)credit.innerHTML=`Illustrative photo: <a href="${slide.source}" target="_blank" rel="noopener noreferrer">${slide.by} / Unsplash ↗</a>`;}
    control.querySelector('.heroPrev').addEventListener('click',()=>{index=(index+3)%4;renderHero()});
    control.querySelector('.heroNext').addEventListener('click',()=>{index=(index+1)%4;renderHero()});
    let startX=0;homeHero.addEventListener('touchstart',e=>{startX=e.touches[0]?.clientX||0},{passive:true});
    homeHero.addEventListener('touchend',e=>{const diff=(e.changedTouches[0]?.clientX||0)-startX;if(Math.abs(diff)>65){index=(index+(diff<0?1:3))%4;renderHero()}},{passive:true});
    renderHero();
  }
  const previewTag=document.querySelector('.portalTopic[href="?view=education"] .tag');
  if(previewTag){previewTag.textContent='Chapter 04 · Explore ↗';previewTag.classList.remove('future')}
  const overview=document.querySelector('#topics .minihead');
  if(overview){overview.classList.add('balancedIntro');}
  const daily=document.querySelector('#daily');
  if(daily){
    const title=document.createElement('div');title.className='dailySlideIntro';
    title.innerHTML='<div><span class="kicker">Four lenses / At a glance</span><h2>One city. Four different stories.</h2><p>All four briefings are visible below. Dates and geographic coverage are different; please use the original research links.</p></div>';
    daily.querySelector('.dailyCards')?.before(title);
    const deck=daily.querySelector('.dailyCards');
    const photoMap=[
      ['https://images.unsplash.com/photo-1664998503811-e882e934ffdb?auto=format&fit=crop&w=1200&q=80','Rescue dog on a forest path','Nick Fewings','https://unsplash.com/photos/a-dog-standing-on-a-path-in-a-forest-hUNH_WA34nA'],
      ['https://images.unsplash.com/photo-1769704653624-f406958e47df?auto=format&fit=crop&w=1200&q=80','Residential buildings on a street','Pict4life','https://unsplash.com/photos/apartment-buildings-line-a-street-under-a-clear-blue-sky-P2vbqQC6nYs'],
      ['https://images.unsplash.com/photo-1659283506371-d5c45ab0f4c6?auto=format&fit=crop&w=1200&q=80','Fresh produce on a store shelf','Firda Faradiba','https://unsplash.com/photos/a-shelf-of-vegetables-GNISAgm05kQ'],
      ['https://images.unsplash.com/photo-1698620625528-be04786c9081?auto=format&fit=crop&w=1200&q=80','Woman browsing books in a library','Anastasiya Badun','https://unsplash.com/photos/a-woman-is-walking-through-a-library-full-of-books-2_U-TsNWcsE']
    ];
    // Editorial order is animal, housing, food, education; numbered headings follow that order.
    const cards=[...deck.children];
    if(cards.length===4){deck.append(cards[2],cards[1],cards[3]);}
    [...deck.children].forEach((card,i)=>{
      const [filename,alt,credit,url]=photoMap[i];
      const figure=document.createElement('figure');figure.className='briefPhoto';
      figure.innerHTML=`<img src="${filename}" alt="Illustrative photograph: ${alt}" loading="lazy"><figcaption>Illustrative photograph · <a href="${url}" target="_blank" rel="noopener noreferrer">${credit} / Unsplash ↗</a></figcaption>`;
      card.querySelector('.dailyCardTop')?.after(figure);
      const number=card.querySelector('.dailyCardTop span');if(number)number.textContent=String(i+1).padStart(2,'0')+' · '+['ANIMAL WELFARE','HOUSING','FOOD ACCESS','EDUCATION'][i];
      card.setAttribute('aria-label',`${i+1} of 4: ${['Animal welfare','Housing','Food access','Education'][i]}`);
    });
    if(cards[0]){
      const annual=document.createElement('div');annual.id='dailyAnimalAnnual';annual.className='animalAnnual';
      annual.innerHTML='<div class="kicker">Year-to-date / Same Long Beach dataset</div><p class="annualRange">Checking source coverage…</p><div class="annualGrid"><div><small>Intake records · YTD</small><strong id="annualIntakes">—</strong></div><div><small>Adoptions · YTD</small><strong id="annualAdoptions">—</strong></div><div><small>Euthanasia outcomes · YTD</small><strong id="annualEuthanasia">—</strong></div><div><small>Returned to owners · YTD</small><strong id="annualReturns">—</strong></div></div><p>Year-to-date event records are not the number of animals currently housed, or an all-time count. Intake and outcome dates use separate reporting series.</p>';
      cards[0].querySelector('.dailyAnimalGrid')?.after(annual);
    }
    const metrics=cards[0]?.querySelector('.dailyAnimalGrid');
    if(metrics){
      const controls=document.createElement('div');controls.className='metricPager';
      controls.innerHTML='<span>Daily outcomes · swipe the numbers</span><button type="button" class="metricPrev" aria-label="Previous metric">←</button><b class="metricPage">1 / 4</b><button type="button" class="metricNext" aria-label="Next metric">→</button>';
      metrics.before(controls);
      let metricIndex=0;const cells=[...metrics.children];
      function showMetric(){cells.forEach((cell,i)=>{cell.hidden=i!==metricIndex});controls.querySelector('.metricPage').textContent=`${metricIndex+1} / ${cells.length}`;}
      controls.querySelector('.metricPrev').addEventListener('click',()=>{metricIndex=(metricIndex+cells.length-1)%cells.length;showMetric()});
      controls.querySelector('.metricNext').addEventListener('click',()=>{metricIndex=(metricIndex+1)%cells.length;showMetric()});
      let x0=0;metrics.addEventListener('touchstart',e=>{x0=e.touches[0]?.clientX||0},{passive:true});metrics.addEventListener('touchend',e=>{const delta=(e.changedTouches[0]?.clientX||0)-x0;if(Math.abs(delta)>45){metricIndex=(metricIndex+(delta<0?1:cells.length-1))%cells.length;showMetric()}},{passive:true});showMetric();
    }
    const educationCard=cards[3];
    if(educationCard){
      educationCard.querySelector('.dailyStatus').textContent='Official sources · 2025–26';
      educationCard.querySelector('.dailyResearchMetric').innerHTML='<span class="educationNumeric">1,242,816</span><span>LA County 2025–26 public-school enrollment · Ed-Data county summary, not a daily figure</span>';
      educationCard.querySelector('p')?.replaceChildren(document.createTextNode('Education has published indicators and community learning programs. Explore state enrollment reporting and free LA public-library literacy services; this is not a daily student count.'));
      const sources=document.createElement('div');sources.className='dailyEducationSources';sources.innerHTML='<a target="_blank" rel="noopener noreferrer" href="https://www.ed-data.org/county/Los-Angeles/ps_Mzc%5E">Original enrollment profile · Ed-Data ↗</a><a target="_blank" rel="noopener noreferrer" href="https://www.lapl.org/index.php/literacy">LA Public Library adult literacy ↗</a>';
      educationCard.querySelector('.dailyResearchMetric')?.after(sources);
    }
    const city=document.createElement('section');city.className='regionalContext';
    city.innerHTML='<div class="kicker">Animal data / Regional context</div><h2>Los Angeles is bigger than one shelter system.</h2><p>Community Lens currently computes daily and year-to-date figures from <strong>Long Beach Animal Care Services</strong>. To explore all of Los Angeles, compare the reporting systems below. These are <strong>different agencies and jurisdictions</strong>, so their intake and outcome totals must not be casually added or interpreted as a single live shelter population.</p><div class="regionSources"><a href="https://www.laanimalservices.com/woof-report" target="_blank" rel="noopener noreferrer"><span>City of Los Angeles</span><strong>LA Animal Services</strong><small>City shelters · department reports and statistics</small><em>Official Woof Report ↗</em></a><a href="https://animalcare.lacounty.gov/animal-statistics/" target="_blank" rel="noopener noreferrer"><span>LA County service areas</span><strong>County Animal Care & Control</strong><small>County-operated care centers · annual and monthly reports</small><em>Official statistics ↗</em></a><a href="https://data.longbeach.gov/explore/dataset/animal-shelter-intakes-and-outcomes/" target="_blank" rel="noopener noreferrer"><span>City of Long Beach</span><strong>Animal Shelter Open Data</strong><small>Record-level intake and outcome dates used above</small><em>Open dataset ↗</em></a></div><p class="regionalFoot">Current shelter population (animals presently in care) is a separate census measure. We do not show an invented regional total while reporting definitions and time periods differ.</p><blockquote>“Every intake is a beginning, not the whole story. Every outcome deserves context.”</blockquote>';
    deck.after(city);
  }
  // Each editorial card uses a DIFFERENT, source-verified real photograph.
  // Unsplash free-license photo pages are attributed individually, and all are illustrative.
  const realPhotos={
    animal:[
      ['https://images.unsplash.com/photo-1709788938385-7825acfbf7cc?auto=format&fit=crop&w=1100&q=80','Shelter dog with green bandana','Judy Beth Morris','https://unsplash.com/photos/a-brown-and-white-dog-wearing-a-green-bandana-mVRZzswWA1I'],
      ['https://images.unsplash.com/photo-1725409796872-8b41e8eca929?auto=format&fit=crop&w=1100&q=80','Veterinary examination of a white kitten','Judy Beth Morris','https://unsplash.com/photos/a-white-kitten-being-examined-by-a-veterinator-5Bi6MWlWMbw'],
      ['https://images.unsplash.com/photo-1506201803590-8586d5a760e2?auto=format&fit=crop&w=1100&q=80','Volunteer carrying a shelter puppy','Chris Becker','https://unsplash.com/photos/person-carrying-white-and-black-puppy-2h5eBF8aRhM'],
      ['https://images.unsplash.com/photo-1667785273944-6457bab0e43a?auto=format&fit=crop&w=1100&q=80','People sitting with a dog','Simon Hurry','https://unsplash.com/photos/a-man-and-woman-sitting-on-a-bench-with-a-dog-W2yPIFjOcjc'],
      ['https://images.unsplash.com/photo-1594005374167-5fd900fb82c9?auto=format&fit=crop&w=1100&q=80','Rescue puppy wearing a red bandana','Madeline Bowen','https://unsplash.com/photos/brown-and-white-long-coated-dog-with-red-and-white-scarf-fMYmZseTbGw'],
      ['https://images.unsplash.com/photo-1703733568403-811720639769?auto=format&fit=crop&w=1100&q=80','Shelter dog with tongue out','Judy Beth Morris','https://unsplash.com/photos/a-close-up-of-a-dog-with-its-tongue-out-7RDiSa11Hlc']
    ],
    food:[
      ['https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1100&q=80','Food bank volunteers and donated groceries','Joel Muniz','https://unsplash.com/photos/people-standing-in-front-of-brown-cardboard-boxes-y3ZY6qFln_g'],
      ['https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=1100&q=80','Fresh vegetables in a market','Iñigo De la Maza','https://unsplash.com/photos/vegetables-and-fruits-s285sDw5Ikc'],
      ['https://images.unsplash.com/photo-1662470197298-bb36a84e7124?auto=format&fit=crop&w=1100&q=80','Prepared vegetable meal','Julia Blumberg','https://unsplash.com/photos/a-plate-of-vegetables-and-a-fork-AOYSgSsIDa8'],
      ['https://images.unsplash.com/photo-1775677073681-194049b1a7d3?auto=format&fit=crop&w=1100&q=80','Fresh produce on a vegetable stand','Rudrendu Sharma','https://unsplash.com/photos/a-vibrant-display-of-fresh-vegetables-at-a-market-6qWr1uDQz-o']
    ],
    housing:[
      ['https://images.unsplash.com/photo-1745700322085-9e24bbadcae1?auto=format&fit=crop&w=1100&q=80','Los Angeles apartment building detail','Jessica Christian','https://unsplash.com/photos/an-apartment-building-with-windows-and-balconies-rcq-BDlU0t8'],
      ['https://images.unsplash.com/photo-1652900438190-7445bec3fd00?auto=format&fit=crop&w=1100&q=80','Los Angeles apartment on a street corner','Max','https://unsplash.com/photos/an-apartment-building-on-a-city-street-corner-mQ8n18-3NCs'],
      ['https://images.unsplash.com/photo-1724113595861-93b16bc264a5?auto=format&fit=crop&w=1100&q=80','Student housing construction project','Chad Montgomery','https://unsplash.com/photos/a-crane-is-standing-in-front-of-a-building-under-construction-rjnLNuJFins']
    ],
    education:[
      ['https://images.unsplash.com/photo-1557989048-03456d01a26e?auto=format&fit=crop&w=1100&q=80','Students reading in a classroom','Yustinus Tjiuwanda','https://unsplash.com/photos/students-reading-textbooks-in-classroom-BCBGahg0MH0'],
      ['https://images.unsplash.com/photo-1758270703813-2ecf235a6462?auto=format&fit=crop&w=1100&q=80','College students listening to a lecture','Vitaly Gariev','https://unsplash.com/photos/students-listen-to-a-lecture-in-a-classroom-8c0ndhIXDzQ'],
      ['https://images.unsplash.com/photo-1747953273815-28f12a19ef0d?auto=format&fit=crop&w=1100&q=80','Students studying in a classroom','Paulo Cristovam','https://unsplash.com/photos/students-in-a-classroom-appear-to-be-studying-lHodUX-jhFM'],
      ['https://images.unsplash.com/photo-1637068302763-a8284115e920?auto=format&fit=crop&w=1100&q=80','Person standing among library shelves','Nam Hoang','https://unsplash.com/photos/a-person-standing-in-a-library-with-shelves-full-of-books-jSYr6iuCNaA']
    ]
  };
  document.querySelectorAll('.issueEditorialCards').forEach(grid=>{
    const issue=grid.closest('.issueEditorial')?.dataset.issue;
    grid.querySelectorAll('.issueEditorialCard').forEach((card,i)=>{
      const photo=realPhotos[issue]?.[i];if(!photo)return;
      const pic=document.createElement('div');pic.className='readingCardImage';
      const img=document.createElement('img');img.src=photo[0];img.alt=photo[1];img.loading='lazy';
      const credit=document.createElement('a');credit.href=photo[3];credit.target='_blank';credit.rel='noopener noreferrer';credit.className='readingPhotoCredit';credit.textContent=`Real photo · ${photo[2]} / Unsplash ↗`;
      pic.append(img,credit);
      card.prepend(pic);
      card.classList.add('readingCardVisual');
    });
  });
  const education=document.querySelector('.educationPreview');
  if(education){
    const hero=education.querySelector('.educationPreviewHero');
    const heroPhoto=hero?.querySelector('img');if(heroPhoto){heroPhoto.src='https://images.unsplash.com/photo-1767102060241-130cb9260718?auto=format&fit=crop&w=1400&q=80';heroPhoto.alt='Students studying in a modern library; illustrative real photograph';}
    const kicker=hero?.querySelector('.kicker');if(kicker)kicker.textContent='Chapter 04 / Education · Los Angeles County';
    const title=hero?.querySelector('h1');if(title)title.innerHTML='Education is a<br>community resource.';
    const lead=hero?.querySelector('p');if(lead)lead.textContent='A research-backed look at enrollment and learning opportunities across Los Angeles County. We distinguish school-year enrollment figures from day-to-day services and individual student experiences.';
    const noteText=education.querySelector('.educationPreviewNote');if(noteText)noteText.innerHTML='Education research uses school-year data, not fabricated daily learning statistics. Photo: <a href="https://unsplash.com/photos/people-studying-at-tables-in-a-modern-library-ct1NZSUSWUc" target="_blank" rel="noopener noreferrer">Fer Troulik / Unsplash ↗</a>. <a href="./">Return to the overview ↗</a>';
    const educationNumbers=document.createElement('section');educationNumbers.className='educationDataNumbers';educationNumbers.innerHTML='<div class="kicker">Verified education indicator / 2025–26</div><div class="eduNumbersGrid"><div><span>Los Angeles County public-school enrollment</span><strong>1,242,816</strong><small>Students · 2025–26 academic year · Ed-Data county profile</small></div><div><span>Reference academic year</span><strong>2025–26</strong><small>California Department of Education enrollment release</small></div></div><p>Enrollment is not graduation rate, academic achievement, school capacity, or a measure of equitable opportunity. The Ed-Data county summary and CDE DataQuest may use different inclusion rules. <a target="_blank" rel="noopener noreferrer" href="https://www.ed-data.org/county/Los-Angeles/ps_Mzc%5E">View county profile ↗</a> · <a target="_blank" rel="noopener noreferrer" href="https://www.cde.ca.gov/ds/ad/edtop.asp">CDE DataQuest ↗</a></p>';
    hero?.after(educationNumbers);
    const note=education.querySelector('.educationPreviewNote');
    const enrich=document.createElement('section');enrich.className='educationResearchStart';
    enrich.innerHTML='<div class="kicker">Education / Research foundations</div><h2>Learning opportunities are part of civic infrastructure.</h2><p>Official school data and real public programs offer two distinct lenses: educational access across communities, and places people can use today. No unsupported daily score is assigned to students or neighborhoods.</p><div class="educationPathways"><article><span>01 / Public data</span><h3>California DataQuest</h3><p>State Department of Education enrollment reporting, disaggregated by county and student groups. Compare a defined school year and geography.</p><a href="https://www.cde.ca.gov/ds/ad/edtop.asp" target="_blank" rel="noopener noreferrer">Explore 2025–26 enrollment ↗</a></article><article><span>02 / Free literacy</span><h3>LA County Library · Leamos</h3><p>Free Spanish literacy instruction for adults, with in-person and online pathways.</p><a href="https://lacountylibrary.org/leamos-literacy-program/" target="_blank" rel="noopener noreferrer">Read the official program guide ↗</a></article><article><span>03 / Adult learning</span><h3>Los Angeles Public Library</h3><p>Adult literacy and tutoring opportunities at local branches. Check current session listings before visiting.</p><a href="https://www.lapl.org/literacy" target="_blank" rel="noopener noreferrer">Find literacy support ↗</a></article><article><span>04 / School context</span><h3>California public-school directory</h3><p>The state publishes school locations and attributes for the 2025–26 year; availability and school boundaries require separate verification.</p><a href="https://data.ca.gov/@california-department-of-education/california-public-schools-2025-26" target="_blank" rel="noopener noreferrer">Explore the state dataset ↗</a></article></div>';
    note?.before(enrich);
  }
  // Site-wide visual inventory: hero, topic tile, editorial lead and daily card
  // receive separate original photos. No photo ID is assigned twice.
  const newSectionPhotos={
    animal:{topic:['https://images.unsplash.com/photo-1546460573-e6c02e39568a','Fabian Gieske','https://unsplash.com/photos/short-coated-black-dog-3nQhyFuwUkk','Portrait of a black dog'],lead:['https://images.unsplash.com/photo-1724367241603-0797a0135f63','Jane Tho','https://unsplash.com/photos/a-black-and-brown-dog-sitting-on-top-of-a-table-fljcJK9IqE0','Black and brown dog portrait']},
    food:{topic:['https://images.unsplash.com/photo-1505692794401-b371fa865622','Unsplash photographer','https://unsplash.com/photos/assorted-vegetables-wR-_faBOBcA','Market vegetables'],lead:['https://images.unsplash.com/photo-1550989460-0adf9ea622e2','Unsplash photographer','https://unsplash.com/photos/vegetable-stand-photo-pRJhn4MbsMM','Produce at a market']},
    housing:{topic:['https://images.unsplash.com/photo-1774979517612-db480ae5b587','Madeline Liu','https://unsplash.com/photos/apartment-building-with-many-balconies-and-windows-YG1U8xo_UxQ','Apartment building balconies'],lead:['https://images.unsplash.com/photo-1772617661613-700063d7647f','Phil Hearing','https://unsplash.com/photos/construction-of-new-houses-with-scaffolding-and-framing-Wd-jN-5kbSY','Residential buildings under construction']},
    education:{topic:['https://images.unsplash.com/photo-1718327453695-4d32b94c90a4','Dominic Kurniawan Suryaputra','https://unsplash.com/photos/a-large-library-filled-with-lots-of-books-vjprN8SZq14','Public library reading room'],lead:['https://images.unsplash.com/photo-1521633313183-bee6321ae965','CHUTTERSNAP','https://unsplash.com/photos/library-interior-sXyrbN3c7J4','Library interior']}
  };
  Object.entries(newSectionPhotos).forEach(([key,photos])=>{
    const topic=document.querySelector(`.portalTopic[href="?view=${key}"] .topicPhoto`);
    if(topic){const img=topic.querySelector('img');if(img){img.src=photos.topic[0]+'?auto=format&fit=crop&w=1100&q=80';img.alt=photos.topic[3];}
      const credit=document.createElement('span');credit.textContent=`Photo: ${photos.topic[1]} / Unsplash`;credit.className='topicPhotoCredit';topic.append(credit);
    }
    const visual=document.querySelector(`.issueEditorial[data-issue="${key}"] .issueEditorialPhoto`);
    if(visual){const img=visual.querySelector('img');if(img){img.src=photos.lead[0]+'?auto=format&fit=crop&w=1400&q=80';img.alt=photos.lead[3];}
      const credit=visual.querySelector('span');if(credit)credit.innerHTML=`Real illustrative photo · <a href="${photos.lead[2]}" target="_blank" rel="noopener noreferrer">${photos.lead[1]} / Unsplash ↗</a>`;
    }
  });
  // Update the overview's attribution list to match the newly assigned tile images.
  const credits=document.querySelector('#photography ul');
  if(credits){credits.innerHTML='<li>Homepage topic carousel: Judy Beth Morris (animal), Alex Simpson (housing), Unsplash volunteer-work collection (food), Sir. Simo (education). Each slideshow image links directly to its photo page.</li>';
    Object.entries(newSectionPhotos).forEach(([key,photos])=>{const li=document.createElement('li');li.innerHTML=`${key[0].toUpperCase()+key.slice(1)} topic tile — <a href="${photos.topic[2]}" target="_blank" rel="noopener noreferrer">${photos.topic[1]} / Unsplash ↗</a>`;credits.append(li);});
  }
  const guide=document.querySelector('.lensAssistDisclaimer');
  if(guide)guide.textContent='Transparent, bilingual keyword-based AI-style guide over verified resource links. No external language model is connected; it cannot guarantee current availability. Do not enter sensitive personal details.';
})();
