// Survey estimates reported by USC Public Exchange, October 2025 report.
// 2021–2025 collection months and some survey instruments differ; see the on-page methodology.
const foodHistory=[
  {year:2021,all:17,low:28,households:553000,month:'December'},
  {year:2022,all:24,low:37,households:802000,month:'July'},
  {year:2023,all:30,low:44,households:986000,month:'July'},
  {year:2024,all:25,low:41,households:852000,month:'October'},
  {year:2025,all:24,low:35,households:814000,month:'October'}
];
let foodGroup='all',foodYear=2025;
const foodTrend=document.querySelector('#foodTrend');
function renderFood(){
  const row=foodHistory.find(d=>d.year===foodYear);
  const rate=row[foodGroup];
  document.querySelector('#foodSelectedYear').textContent=row.month+' '+row.year;
  document.querySelector('#foodSelectedRate').textContent=rate+'%';
  document.querySelector('#foodSelectedCount').textContent=foodGroup==='all'?'≈ '+row.households.toLocaleString('en-US')+' households':'Households under 300% of FPL';
  const text=foodGroup==='all'
    ? 'An estimated '+rate+'% of all LA County households experienced food insecurity in the previous 12 months. The report estimates approximately '+row.households.toLocaleString('en-US')+' affected households.'
    : 'Among households earning less than 300% of the federal poverty level, the report estimates '+rate+'% experienced food insecurity in the previous 12 months. This is a subgroup estimate, not an eligibility test.';
  document.querySelector('#foodObservation').textContent=text;
  foodTrend.replaceChildren();
  foodHistory.forEach(d=>{
    const btn=document.createElement('button');btn.className='foodYear';btn.type='button';btn.setAttribute('aria-pressed',String(d.year===foodYear));btn.setAttribute('aria-label',d.year+': '+d[foodGroup]+' percent');
    const value=document.createElement('span');value.className='value';value.textContent=d[foodGroup]+'%';
    const bar=document.createElement('span');bar.className='column';bar.style.height=Math.round(d[foodGroup]/50*205)+'px';
    const label=document.createElement('span');label.className='year';label.textContent=d.year;
    btn.append(value,bar,label);btn.addEventListener('click',()=>{foodYear=d.year;renderFood()});foodTrend.append(btn);
  });
  document.querySelectorAll('[data-food-group]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.foodGroup===foodGroup)));
}
document.querySelectorAll('[data-food-group]').forEach(btn=>btn.addEventListener('click',()=>{foodGroup=btn.dataset.foodGroup;renderFood()}));
renderFood();
