// Lens Guide: transparent local, rule-based retrieval over the curated directory.
// No text is sent to an LLM and no chat history is stored remotely.
(() => {
  const providers=window.communityLensResources||[];
  const categories={
    animal:['animal','dog','cat','pet','shelter','adopt','foster','puppy','rescue','动物','宠物','领养','寄养','狗','猫','收容'],
    food:['food','pantry','hungry','groceries','meal','food bank','食品','食物','领取','饭','吃','粮','食物银行'],
    housing:['housing','rent','homeless','shelter bed','evict','lease','tenant','住','租房','住房','无家可归','流浪','庇护'],
    education:['education','school','learn','library','tutor','course','class','college','stem','scholarship','literacy','training','study','教育','课程','学习','学校','图书馆','辅导','奖学金','免费课','培训']
  };
  const places=['Santa Monica','Venice','Culver City','West Los Angeles','Inglewood','Pasadena','Hawthorne','Gardena','Long Beach','Burbank','Mar Vista'];
  const zipNames=[...new Set(providers.map(p=>p.address.match(/\b\d{5}\b/)?.[0]).filter(Boolean))];
  const root=document.createElement('aside');root.className='lensAssist';root.setAttribute('aria-label','Community Lens Guide');
  root.innerHTML=`
    <button class="lensAssistLauncher" type="button" aria-label="Open Lens Guide chat" aria-expanded="false"><span class="lensAssistSpark">✳</span><span>Ask Lens Guide</span></button>
    <div class="lensAssistPanel" hidden>
      <div class="lensAssistHeader"><div><span>✳</span><div><strong>Lens Guide</strong><small>Resource search assistant · Beta</small></div></div><button class="lensAssistClose" type="button" aria-label="Close chat">×</button></div>
      <div class="lensAssistMessages" id="lensAssistMessages" aria-live="polite"></div>
      <div class="lensAssistSuggestions"><button type="button" data-suggest="Find free food in Santa Monica">Free food nearby</button><button type="button" data-suggest="Find free learning opportunities">Free classes</button><button type="button" data-suggest="Where can I foster a dog?">Foster a dog</button><button type="button" data-suggest="Explain animal shelter statistics">Explain data</button></div>
      <form class="lensAssistForm"><label class="srOnly" for="lensAssistInput">Ask about community resources</label><input id="lensAssistInput" type="text" maxlength="250" placeholder="Ask about a resource or city…" autocomplete="off" required><button type="submit" aria-label="Send message">↗</button></form>
      <p class="lensAssistDisclaimer">Currently a guided search of curated sources, not a generative AI model. It cannot confirm real-time availability. Please don't enter sensitive personal information.</p>
    </div>`;
  document.body.append(root);
  const launcher=root.querySelector('.lensAssistLauncher');
  const panel=root.querySelector('.lensAssistPanel');
  const history=root.querySelector('.lensAssistMessages');
  const entry=root.querySelector('#lensAssistInput');
  function open(){
    panel.hidden=false;
    launcher.setAttribute('aria-expanded','true');
    entry.focus();
  }
  function close(){panel.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus()}
  launcher.addEventListener('click',()=>panel.hidden?open():close());
  root.querySelector('.lensAssistClose').addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close()});
  function message(kind,text,items=[]){
    const bubble=document.createElement('div');bubble.className='lensBubble '+kind;
    const content=document.createElement('p');content.textContent=text;bubble.append(content);
    if(items.length){
      const links=document.createElement('div');links.className='lensMessageLinks';
      items.forEach(item=>{
        const a=document.createElement('a');a.textContent=item.name+' ↗';a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';
        links.append(a);
      });
      bubble.append(links);
    }
    history.append(bubble);history.scrollTop=history.scrollHeight;
  }
  function matchIntent(input){
    const q=input.toLowerCase();
    const words=Object.entries(categories).map(([key,keys])=>({key,score:keys.reduce((n,k)=>n+(q.includes(k)?1:0),0)})).sort((a,b)=>b.score-a.score);
    return words[0]?.score?words[0].key:null;
  }
  function findPlace(input){
    const lower=input.toLowerCase();
    const city=places.find(p=>lower.includes(p.toLowerCase()));
    if(city)return city;
    const zip=zipNames.find(z=>new RegExp('\\b'+z+'\\b').test(input));
    return zip||null;
  }
  function respond(text){
    const lower=text.toLowerCase(),category=matchIntent(text),location=findPlace(text),wantsFoster=/foster|寄养/.test(lower);
    if(/explain|meaning|statistics|what is|define|数据|解释|什么意思|口径/.test(lower)){
      if(category==='animal'){
        message('assistant','Shelter intake counts admissions; outcomes count recorded exits such as adoption, return to owner, transfer or euthanasia. These are different event dates, not a live count of animals still in care. Long Beach, City of LA and LA County use separate reporting systems.',[{name:'Long Beach record-level data',url:'https://data.longbeach.gov/explore/dataset/animal-shelter-intakes-and-outcomes/'},{name:'LA County animal statistics',url:'https://animalcare.lacounty.gov/animal-statistics/'}]);return;
      }
      if(category==='housing'){
        message('assistant','The Point-in-Time Count estimates how many people experience homelessness on one selected night. It does not measure everyone who was unhoused during a full year or the number of available beds.',[{name:'LAHSA official count methodology and data',url:'https://www.lahsa.org/news?article=1078-2026+Greater+Los+Angeles+Homeless+Count+Data'}]);return;
      }
      if(category==='food'){
        message('assistant','Food insecurity is an estimated share of households with unreliable access to sufficient food over a survey period. It is not a live tally of residents requesting meals.',[{name:'USC LA County food research',url:'https://public-exchange.org/usc/project/feeding-la/food-reports/'}]);return;
      }
      if(category==='education'){
        message('assistant','Enrollment and access indicators describe different things. A school enrollment count does not by itself prove student performance or equal opportunity. Compare a single academic year and a clearly defined geography.',[{name:'California DataQuest',url:'https://www.cde.ca.gov/ds/ad/edtop.asp'}]);return;
      }
    }
    const online=/online|virtual|远程|网课|线上/.test(lower);
    let matching=providers.filter(p=>(!category||p.category===category)&&(!wantsFoster||p.extra?.label==='Foster program'));
    if(location){
      const exact=matching.filter(p=>/^\d{5}$/.test(location)?p.address.includes(location):p.area.toLowerCase().includes(location.toLowerCase()));
      if(exact.length)matching=exact;
    }
    if(online){
      if(category==='education'||!category){
        message('assistant','For free online learning, start with library-card programs or SMC academic resources. These have official access conditions.',[
          {name:'LAPL online learning',url:'https://www.lapl.org/hi/node/59313'},
          {name:'SMC STEM learning',url:'https://www.smc.edu/student-support/academic-support/counseling/special-support-programs/stem/student-resources.php'}
        ]);
        return;
      }
    }
    if(/emergency|immediate danger|危急|危险|急救|自杀/.test(lower)){
      message('assistant','If there is immediate danger, call 911. For mental health crises in the U.S., call or text 988. For non-emergency LA community service referrals, dial 2-1-1.');
      return;
    }
    if(!category&&!location){
      message('assistant','I can help find local animal shelters, food pantries, housing access points and free learning services. Tell me a need and a city, e.g. “food in Santa Monica” or “free classes in Venice”.');
      return;
    }
    if(!matching.length){
      message('assistant','I could not match a curated provider for that combination. Try another city or browse the official regional directories.',[{name:'211 LA directory',url:'https://211la.org/'},{name:'Full resource map',url:'?view=finder'}]);
      return;
    }
    const title={animal:'animal rescue',food:'food support',housing:'housing support',education:'learning opportunities'};
    const intro='I found '+matching.length+' curated resource'+(matching.length===1?'s':'')+(category?' for '+title[category]:'')+(location?' around '+location:'')+'. Here are useful starting points; please verify current services with each provider.';
    const ranked=matching.slice(0,4);
    message('assistant',intro,ranked.map(p=>({name:p.name+' · '+p.area,url:p.url})));
    if(category==='education')message('assistant','For more learning pathways, open the dedicated Education page. SMC tutoring is limited to currently enrolled students; public libraries have broader access.',[{name:'Education opportunities',url:'?view=education'}]);
    if(wantsFoster)message('assistant','Foster requirements, animal availability and program acceptance depend on the shelter. Use the official foster links in the resource directory.',[{name:'Open full directory',url:'?view=finder'}]);
  }
  function submit(text){
    if(!text.trim())return;
    message('user',text.trim());
    respond(text.trim());
  }
  root.querySelector('.lensAssistForm').addEventListener('submit',e=>{e.preventDefault();const t=entry.value;entry.value='';submit(t)});
  root.querySelectorAll('[data-suggest]').forEach(button=>button.addEventListener('click',()=>submit(button.dataset.suggest)));
  message('assistant','Hi! I can guide you through verified LA community resources. What do you need help finding? You can ask in English or 中文.');
})();
