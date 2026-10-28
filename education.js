// The education research dataset remains pending; this is a sourced opportunity guide.
(() => {
  const target=document.querySelector('#education-preview');
  if(!target)return;
  target.insertAdjacentHTML('beforeend', `
    <section class="educationHub" aria-labelledby="educationHubHeading">
      <div class="educationHubIntro"><div><span class="kicker">Education / Community opportunity guide</span><h2 id="educationHubHeading">Learning belongs to everyone.</h2><p>Free and low-cost pathways to learning already exist around Los Angeles. Start with the resources below, then check each provider's current calendar and eligibility.</p></div><a class="educationHubFinder" href="?view=finder">Explore the resource map ↗</a></div>
      <div class="educationHubStats"><div><strong>Public libraries</strong><span>Local events, reading, digital skills and adult literacy</span></div><div><strong>College support</strong><span>SMC tutoring and STEM learning for currently enrolled students</span></div><div><strong>Online learning</strong><span>Library-card learning portals and self-paced resources</span></div></div>
      <div class="educationHubControls" role="group" aria-label="Filter education resources"><button type="button" data-edu-filter="all" aria-pressed="true">All opportunities</button><button type="button" data-edu-filter="community" aria-pressed="false">Open to the public</button><button type="button" data-edu-filter="student" aria-pressed="false">SMC students</button><button type="button" data-edu-filter="online" aria-pressed="false">Online learning</button></div>
      <div class="educationHubCards" id="educationHubCards"></div>
      <div class="educationHubResearch"><h3>What's next for education data?</h3><p>This page is a curated service guide, not yet a quantitative study. Future research could compare neighborhood educational resources, transit access, and digital inclusion using published indicators. We will only publish comparable metrics after checking their source, population, geography and reporting dates.</p><a href="https://la.myneighborhooddata.org/data/" target="_blank" rel="noopener noreferrer">Neighborhood Data for Social Change ↗</a></div>
    </section>
  `);
  const opportunities=[
    {type:'community',name:'Santa Monica Public Library',tag:'Community · Free library access',description:'Events, reading materials and digital-literacy workshops at Santa Monica branches.',link:'https://www.santamonica.gov/categories/programs/library',action:'Browse library programs'},
    {type:'community',name:'LA Public Library Adult Literacy',tag:'Community · Adult learning',description:'Literacy support at participating library branches, including Venice and West Los Angeles. Contact a center to schedule assistance.',link:'https://www.lapl.org/literacy/locations',action:'Find a literacy center'},
    {type:'community',name:'LA FamilySource Centers',tag:'Community · Learning & family support',description:'City-supported centers with social, educational, employment and family services. Availability varies by site.',link:'https://communityinvestment.lacity.gov/familysource-centers',action:'Find a FamilySource Center'},
    {type:'student',name:'SMC Tutoring Centers',tag:'SMC students · Academic support',description:'Free tutoring for students currently enrolled in SMC courses. Subject areas and schedules vary.',link:'https://www.smc.edu/student-support/academic-support/tutoring-centers/',action:'Explore SMC tutoring'},
    {type:'student',name:'SMC STEM Resources',tag:'SMC students · STEM pathway',description:'STEM tutoring, peer mentorship, math preparation and opportunities for current SMC students.',link:'https://www.smc.edu/student-support/academic-support/counseling/special-support-programs/stem/student-resources.php',action:'Explore STEM resources'},
    {type:'student',name:'SMC Math Tutoring Lab',tag:'SMC students · Mathematics',description:'Free math tutoring for currently enrolled SMC students taking math classes.',link:'https://www.smc.edu/student-support/academic-support/tutoring-centers/math-lab/',action:'Explore math tutoring'},
    {type:'online',name:'LAPL LinkedIn Learning',tag:'Online · Library card required',description:'Technology, business and creative skills courses; eligible library card holders can access the catalog.',link:'https://www.lapl.org/hi/node/59313',action:'Check online access'},
    {type:'online',name:'SMC Self-Paced Math Modules',tag:'Online · Math preparation',description:'Free self-paced math preparation modules linked by Santa Monica College STEM staff.',link:'https://www.smc.edu/student-support/academic-support/counseling/special-support-programs/stem/student-resources.php',action:'View math resources'}
  ];
  const holder=document.querySelector('#educationHubCards');
  function draw(filter){
    holder.replaceChildren();
    opportunities.filter(o=>filter==='all'||o.type===filter).forEach(o=>{
      const card=document.createElement('article');card.className='educationHubCard';
      const label=document.createElement('span');label.textContent=o.tag;
      const heading=document.createElement('h3');heading.textContent=o.name;
      const desc=document.createElement('p');desc.textContent=o.description;
      const link=document.createElement('a');link.href=o.link;link.target='_blank';link.rel='noopener noreferrer';link.textContent=o.action+' ↗';
      card.append(label,heading,desc,link);holder.append(card);
    });
  }
  document.querySelectorAll('[data-edu-filter]').forEach(button=>button.addEventListener('click',()=>{
    const active=button.dataset.eduFilter;
    document.querySelectorAll('[data-edu-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.eduFilter===active)));
    draw(active);
  }));
  draw('all');
})();
