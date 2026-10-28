import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join, resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const html=readFileSync(join(root,'index.html'),'utf8');
const editorial=readFileSync(join(root,'editorial.js'),'utf8');
const styles=readFileSync(join(root,'editorial.css'),'utf8');

assert.match(html,/<meta name="viewport"/,'Responsive viewport is required');
assert.match(html,/<meta name="description"/,'Public description is required');
assert.match(html,/<html lang="en"/,'Document language is required');
for(const name of ['animal','food','housing','education','today','finder']){
  assert.ok(html.includes(`?view=${name}`)||editorial.includes(`?view=${name}`),`Missing ${name} navigation`);
}
for(const asset of ['animal-photo.jpg','food-photo.jpg','housing-photo.jpg','education-photo.jpg']){
  assert.ok(existsSync(join(root,'images',asset)),`Missing local photo: ${asset}`);
}
const photoIDs=[...editorial.matchAll(/images\.unsplash\.com\/(photo-[\d-]+)/g)].map(m=>m[1]);
assert.equal(new Set(photoIDs).size,photoIDs.length,'A remotely sourced photograph was reused in more than one component');
assert.ok(photoIDs.length>=25,'Expected broad photographic variety');
assert.match(editorial,/2025–26 public-school enrollment/,'Education indicator must be dated');
assert.match(editorial,/Different shelter systems are not combined/,'Regional animal caveat must be explicit');
assert.match(editorial,/2026 annual Point-in-Time Count/,'Housing estimate must be dated');
assert.match(editorial,/the on-page guide is rule-based|on-page guide is rule-based/i,'The guide must be accurately described');
assert.match(styles,/prefers-reduced-motion/,'Reduced-motion preference is required');
assert.match(styles,/focus-visible/,'Keyboard focus visibility is required');
console.log(`PASS: six navigation destinations, 4 local hero assets, ${photoIDs.length} unique Unsplash photos, data caveats and accessibility styles. Run node --check separately for JS syntax.`);
