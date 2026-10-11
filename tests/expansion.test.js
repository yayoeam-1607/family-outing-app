import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { verifiedSpots, catalogRevision } from '../catalog.js';
import { categories, regions, filterSpots, matchesRegion } from '../spots.js';
import { initialState, prepareState, searchResults, validateState } from '../store.js';
import { legacyState } from './legacy-fixture.js';

const original = JSON.parse(readFileSync(new URL('./fixtures/catalogue-v1.json', import.meta.url)));
const criteria = {weather:'any',transport:'car',travel:'any',budget:'any',stay:'any',category:'any',region:'any',tent:'any',bbq:'any',focus:'any',sort:'distance',famousPriority:'no'};
const requiredNames = ['東京ディズニーランド','東京ディズニーシー','東京ドイツ村','マザー牧場','鴨川シーワールド','ふなばしアンデルセン公園','清水公園','三井アウトレットパーク 木更津','イオンモール幕張新都心','成田ゆめ牧場','よみうりランド','サンリオピューロランド','東京ドームシティ','国営昭和記念公園','キッザニア東京','レゴランド・ディスカバリー・センター東京','東京ジョイポリス','チームラボプラネッツ TOKYO','サンシャイン水族館','上野動物園','東武動物公園','西武園ゆうえんち','ムーミンバレーパーク','鉄道博物館','国営武蔵丘陵森林公園','埼玉県こども動物自然公園','イオンレイクタウン','横浜・八景島シーパラダイス','よこはま動物園ズーラシア','横浜アンパンマンこどもミュージアム','カップヌードルミュージアム 横浜','こどもの国','さがみ湖MORI MORI','新江ノ島水族館'];

test('元の実在100件の固定IDと登録内容を保持し250件追加する',()=>{
 assert.equal(verifiedSpots.length,350);
 assert.equal(original.length,100);
 for (const old of original) {
  const current=verifiedSpots.find(s=>s.id===old.id);
  assert.ok(current,old.id);
  for(const field of Object.keys(old).filter(k=>!['category','travel'].includes(k))) assert.deepEqual(current[field],old[field],old.id+' '+field);
 }
 assert.equal(verifiedSpots.filter(s=>!original.some(o=>o.id===s.id)).length,250);
});

test('100件版の実データから更新して編集・削除・ユーザー・旧記録を保持する',()=>{
 const archived=legacyState().spots.map(s=>({...s,source:'legacy',sample:false}));
 const old={version:2,catalogRevision:1,spots:structuredClone(original),archivedSpots:archived,removedBuiltinIds:[],favorites:[original[0].id,1,'user-preserved'],visits:[{id:'visit-real',spotId:original[0].id,date:'2026-01-01',rating:5,comment:'大切な思い出',intention:'また行きたい'},{id:'visit-legacy',spotId:1,date:'2026-01-02',rating:4,comment:'旧施設の思い出',intention:'どちらでも'}]};
 old.spots[0].description='家族による編集';old.spots[0].cost=4242;
 old.spots.push({...structuredClone(original[0]),id:'user-preserved',source:'user',name:'登録した施設',description:'登録メモ'});
 const deleted=old.spots.splice(1,1)[0].id;old.removedBuiltinIds=[deleted];
 const before=JSON.stringify(old),next=prepareState(old);
 assert.equal(next.spots.length,350);assert.equal(next.catalogRevision,catalogRevision);
 assert.deepEqual(next.favorites,old.favorites);assert.deepEqual(next.visits,old.visits);
 assert.equal(next.archivedSpots.length,11);assert.ok(!next.spots.some(s=>s.id===deleted));
 assert.equal(next.spots.find(s=>s.id===original[0].id).cost,4242);
 assert.equal(next.spots.find(s=>s.id===original[0].id).description,'家族による編集');
 assert.equal(next.spots.find(s=>s.id==='user-preserved').description,'登録メモ');
 assert.equal(JSON.stringify(old),before);
 assert.deepEqual(prepareState(JSON.parse(JSON.stringify(next))),next);
});

test('旧250件の1都3県・公式URL・日帰り圏を維持する',()=>{
 assert.equal(categories.length,17);
 assert.equal(regions.length,6);
 for(const s of verifiedSpots.filter(s=>!s.id.startsWith('place-added-'))) {
  assert.ok(['東京都','千葉県','埼玉県','神奈川県'].includes(s.prefecture),s.name);
  assert.ok(categories.includes(s.category),s.name);
  assert.ok(Number.isFinite(s.cost)&&s.cost>=0,s.name);
  assert.ok(Math.min(s.travel.car,s.travel.train)<=180,s.name);
  assert.equal(typeof s.famous,'boolean');
 }
 for(const category of categories)assert.ok(verifiedSpots.some(s=>s.category===category),category);
 for(const prefecture of ['東京都','千葉県','埼玉県','神奈川県'])assert.ok(verifiedSpots.filter(s=>s.prefecture===prefecture).length>=30);
 assert.ok(verifiedSpots.filter(s=>s.category==='大型公園').length<75);
 assert.equal(verifiedSpots.find(s=>s.id==='place-tokyo-mizumoto').prefecture,'東京都');
});

test('指定された有名施設34件は全て掲載し有名タグを付ける',()=>{
 for(const name of requiredNames){
  const s=verifiedSpots.find(s=>s.name.includes(name));
  assert.ok(s,name);assert.equal(s.famous,true,name);
 }
});

test('時間の上限ごとに候補が増え、公共交通3時間超は除外する',()=>{
 for(const transport of ['car','train']) {
  let previous=[];
  for(const travel of ['30','60','90','120','180','any']) {
   const next=filterSpots({...criteria,travel,transport},verifiedSpots);
   assert.ok(previous.every(s=>next.some(n=>n.id===s.id)));
   if(travel!=='any'&&travel!=='30')assert.ok(next.length-previous.length>=25);
   previous=next;
  }
  assert.equal(previous.length,350);
 }
 const train=filterSpots({...criteria,travel:'180',transport:'train'},verifiedSpots);
 assert.ok(train.length<250);
 assert.ok(train.every(s=>s.travel.train<=180));
});

test('地域フィルタで近場・23区・都下・各県を正しく絞り込む',()=>{
 for(const region of regions){
  const result=filterSpots({...criteria,region},verifiedSpots);
  assert.ok(result.length>=10,region);
  assert.ok(result.length<150,region);
  assert.ok(result.every(s=>matchesRegion(s,region)));
 }
 const wards=filterSpots({...criteria,region:'東京23区'},verifiedSpots);
 const outer=filterSpots({...criteria,region:'東京都下'},verifiedSpots);
 assert.ok(!wards.some(s=>outer.some(o=>o.id===s.id)));
 assert.equal(wards.length+outer.length,verifiedSpots.filter(s=>s.prefecture==='東京都').length);
});

test('有名優先は条件に合う全候補を維持し有名施設を先頭へ並べる',()=>{
 const state=validateState(initialState());
 const base=searchResults(state,{...criteria,travel:'90',region:'千葉県'});
 const priority=searchResults(state,{...criteria,travel:'90',region:'千葉県',famousPriority:'yes'});
 assert.deepEqual(priority.map(s=>s.id).sort(),base.map(s=>s.id).sort());
 const firstOrdinary=priority.findIndex(s=>!s.famous);
 assert.ok(firstOrdinary>0);
 assert.ok(priority.slice(firstOrdinary).every(s=>!s.famous));
 assert.ok(priority.slice(0,firstOrdinary).every(s=>s.famous));
 const famous=searchResults(state,{...criteria,focus:'famous'});
 assert.ok(famous.every(s=>s.famous));assert.ok(famous.length>=34&&famous.length<250);
});

test('遠出・雨・屋外・買物・未訪問の目的で候補が変化する',()=>{
 const state=validateState(initialState());
 state.visits=[{id:'visit',spotId:verifiedSpots[0].id,date:'2026-01-01',rating:4,comment:'',intention:'また行きたい'}];
 const focused=focus=>searchResults(state,{...criteria,focus,travel:'180'});
 const far=focused('far'),rain=focused('rainy'),outdoor=focused('outdoor'),shopping=focused('shopping');
 assert.ok(far.length>=100&&far.every(s=>s.travel.car>60));
 assert.ok(rain.length>=30&&rain.every(s=>s.rainy));
 assert.ok(outdoor.every(s=>s.type==='outdoor'));
 assert.ok(shopping.length>=25&&shopping.every(s=>['ショッピングモール','アウトレット'].includes(s.category)));
 assert.equal(focused('unvisited').length,249);
 assert.ok(!focused('unvisited').some(s=>s.id===verifiedSpots[0].id));
});
