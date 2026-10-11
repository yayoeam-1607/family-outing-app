import test from 'node:test';
import assert from 'node:assert/strict';
import { migrateCatalogue } from '../catalog-migration.js';
import { validateState, collection, deleteSpot, searchResults, allSpots } from '../store.js';
import { legacyState as initialState } from './legacy-fixture.js';

// 移行アルゴリズム専用の人工データ。実在施設として本番登録しない。
function fixtureCatalogue() {
  const template = validateState(initialState()).spots[0];
  return Array.from({length:100},(_,i)=>({...structuredClone(template),id:`place-test-${i}`,name:`移行テスト ${i}`,sample:false,source:'builtin'}));
}
test('v1→v2:ユーザー・お気に入り・履歴を維持し旧施設を通常候補から除く',()=>{
 const state=initialState();
 const user={...state.spots[0],id:'user-123',name:'家族の登録場所',sample:false};state.spots.push(user);
 state.favorites=[1,'user-123'];state.visits=[{id:'visit-a',spotId:1,date:'2026-01-01',rating:5,comment:'旧施設の記録',intention:'また行きたい'},{id:'visit-b',spotId:'user-123',date:'2026-01-02',rating:4,comment:'実際の思い出',intention:'どちらでも'}];
 const before=JSON.stringify(state);
 const migrated=validateState(migrateCatalogue(validateState(state),fixtureCatalogue(),1));
 assert.equal(migrated.version,2);assert.equal(migrated.spots.length,101);assert.equal(migrated.archivedSpots.length,10);
 assert.equal(migrated.spots.find(s=>s.id==='user-123').name,user.name);
 assert.deepEqual(migrated.favorites,state.favorites);assert.deepEqual(migrated.visits,state.visits);
 assert.equal(collection(migrated,'favorites').length,2);
 assert.equal(allSpots(migrated).find(s=>s.id===1).name,state.spots[0].name);
 assert.equal(JSON.stringify(state),before);
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(migrated))),migrated);
});
test('繰り返し移行は編集・削除を復活させず、新しい初期施設は追加する',()=>{
 let next=validateState(migrateCatalogue(validateState(initialState()),fixtureCatalogue(),1));
 next=deleteSpot(next,'place-test-0');next.spots[0].description='家族の編集内容';
 const updated=validateState(migrateCatalogue(next,fixtureCatalogue(),2));
 assert.equal(updated.spots.length,99);assert.equal(updated.spots[0].description,'家族の編集内容');assert.equal(updated.archivedSpots.length,10);
 assert.deepEqual(updated.removedBuiltinIds,['place-test-0']);
 assert.deepEqual(migrateCatalogue(updated,fixtureCatalogue(),2),updated);
});
test('不完全なカタログ・重複ID・ユーザーIDとの衝突で元データは変わらない',()=>{
 const state=validateState(initialState()),catalog=fixtureCatalogue();const before=JSON.stringify(state);
 assert.throws(()=>migrateCatalogue(state,catalog.slice(1),1));
 assert.throws(()=>migrateCatalogue(state,[...catalog.slice(1),catalog[1]],1));
 state.spots.push({...catalog[0],source:'user'});assert.throws(()=>migrateCatalogue(state,catalog,1));
 state.spots.pop();assert.equal(JSON.stringify(state),before);
});
test('絞り込みと移動手段別の近い順を適用する',()=>{
 const state=validateState(initialState());state.spots=[
 {...state.spots[0],id:'outdoor',type:'outdoor',rainy:false,travel:{car:50,train:20}},
 {...state.spots[1],id:'mall',category:'ショッピングモール',rainy:true,travel:{car:10,train:50}},
 ];state.visits=[{spotId:'outdoor'}];
 const c={transport:'car',sort:'distance',focus:'any'};
 assert.deepEqual(searchResults(state,c,false).map(s=>s.id),['mall','outdoor']);
 assert.deepEqual(searchResults(state,{...c,transport:'train'},false).map(s=>s.id),['outdoor','mall']);
 for(const focus of ['rainy','shopping','unvisited']) assert.deepEqual(searchResults(state,{...c,focus},false).map(s=>s.id),['mall']);
 assert.deepEqual(searchResults(state,{...c,focus:'outdoor'},false).map(s=>s.id),['outdoor']);
});
