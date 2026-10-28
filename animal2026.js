// 2026 year-to-date animal data: live public Long Beach source, dated offline snapshot fallback.
(() => {
  if(document.documentElement.dataset.view!=='animal')return;
  const scope=document.querySelector('.research');
  if(!scope||typeof outcomes==='undefined')return;
  const coverage=scope.querySelector('.researchHeader p');
  if(coverage)coverage.textContent='City of Long Beach · 2024–2026 YTD · Official public records';
  // Verified via the official data API on October 28, 2026 (events through October 26).
  const snapshot={
    DOG:{ADOPTION:609,DIED:7,DISPOSAL:2,DUPLICATE:2,EUTHANASIA:80,RESCUE:298,'RETURN TO OWNER':308,TRANSFER:8,TRANSPORT:3},
    CAT:{ADOPTION:721,'COMMUNITY CAT':231,DIED:71,DISPOSAL:3,DUPLICATE:5,EUTHANASIA:517,MISSING:3,RESCUE:782,'RETURN TO OWNER':56,TRANSFER:12,'TRAP, NEUTER, RELEASE':1}
  };
  outcomes.DOG[2026]={...snapshot.DOG};
  outcomes.CAT[2026]={...snapshot.CAT};
  const yearButtons=document.querySelector('.research .toggle[aria-label="Outcome year"]');
  const newButton=document.createElement('button');
  newButton.type='button';newButton.dataset.year='2026';newButton.textContent='2026 YTD';newButton.setAttribute('aria-pressed','true');
  yearButtons.append(newButton);
  newButton.addEventListener('click',()=>{year='2026';renderOutcomes()});
  const status=document.createElement('div');
  status.className='animal2026Status';
  status.innerHTML='<strong>2026 is available.</strong> <span id="animal26StatusText">Showing official 2026 year-to-date snapshot through October 26, 2026; checking for updates…</span> <a href="https://data.longbeach.gov/explore/dataset/animal-shelter-intakes-and-outcomes/" target="_blank" rel="noopener noreferrer">Public dataset ↗</a>';
  const firstPanel=scope.querySelector('.panel');
  firstPanel.before(status);
  const comparison=document.createElement('article');comparison.className='animal2026Compare';
  comparison.innerHTML='<div class="kicker">2026 / Additional research</div><h3>Who entered the shelter in 2026?</h3><p>Counted by intake date. The figures below are year-to-date and cannot be interpreted as final annual totals.</p><div class="animal26Grid"><div><span>Dogs admitted</span><strong id="animal26DogTotal">—</strong><small id="animal26DogStray">Reading official source…</small></div><div><span>Cats admitted</span><strong id="animal26CatTotal">—</strong><small id="animal26CatStray">Reading official source…</small></div><div><span>Data period</span><strong id="animal26LastDate" class="animal26Date">2026 YTD</strong><small>Annual comparison requires matching time periods.</small></div></div><p class="animal26Foot">Source: City of Long Beach open data, grouped by <code>intake_date</code> and <code>intake_type</code>. This section does not estimate citywide shelter capacity, adoption eligibility or animal welfare outcomes.</p>';
  firstPanel.after(comparison);
  year='2026';renderOutcomes();
  const statText=document.querySelector('#animal26StatusText');
  const api='https://data.longbeach.gov/api/explore/v2.1/catalog/datasets/animal-shelter-intakes-and-outcomes/records';
  async function query(parameters){
    const url=new URL(api);
    Object.entries(parameters).forEach(([key,value])=>url.searchParams.set(key,value));
    const res=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(12000)});
    if(!res.ok)throw new Error('Official dataset not accessible');
    return res.json();
  }
  async function update(){
    const whereOut="outcome_date >= date'2026-01-01' and outcome_date < date'2027-01-01'";
    const whereIn="intake_date >= date'2026-01-01' and intake_date < date'2027-01-01'";
    const [latest,byOutcome,byIntake]=await Promise.all([
      query({select:'max(intake_date) as last_intake,max(outcome_date) as last_outcome',limit:1}),
      query({select:'animal_type,outcome_type,count(*) as n',where:whereOut,group_by:'animal_type,outcome_type',limit:100}),
      query({select:'animal_type,intake_type,count(*) as n',where:whereIn,group_by:'animal_type,intake_type',limit:100})
    ]);
    for(const type of ['DOG','CAT']){
      const rows=byOutcome.results.filter(row=>row.animal_type===type&&row.outcome_type);
      if(!rows.length)throw new Error('Missing expected category');
      outcomes[type][2026]=Object.fromEntries(rows.map(r=>[r.outcome_type,Number(r.n)]));
      const intakeRows=byIntake.results.filter(r=>r.animal_type===type);
      const count=intakeRows.reduce((sum,r)=>sum+Number(r.n),0);
      const stray=intakeRows.find(r=>r.intake_type==='STRAY')?.n||0;
      document.querySelector('#animal26'+(type==='DOG'?'Dog':'Cat')+'Total').textContent=count.toLocaleString('en-US');
      document.querySelector('#animal26'+(type==='DOG'?'Dog':'Cat')+'Stray').textContent=count?(100*stray/count).toFixed(1)+'% of intakes recorded as stray':'No 2026 intakes recorded';
    }
    const last=String(latest.results?.[0]?.last_outcome||'').slice(0,10);
    const formatted=last?new Date(last+'T12:00:00Z').toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric',year:'numeric'}):'date unknown';
    document.querySelector('#animal26LastDate').textContent=formatted;
    statText.textContent='Live official query · 2026 partial-year records through '+formatted+'. Records can be revised.';
    if(year==='2026')renderOutcomes();
  }
  update().catch(()=>{statText.textContent='Showing verified October 26, 2026 snapshot. Live refresh is unavailable; figures may have changed.';document.querySelector('#animal26DogTotal').textContent='—';document.querySelector('#animal26CatTotal').textContent='—'});
})();
