import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,validateState,collection,visitCount,deleteSpot} from '../store.js';
import {filterSpots} from '../spots.js';
test('バックアップが往復し不正な参照や重複を拒否する',()=>{
 const state=validateState(initialState());assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))),state);
 assert.throws(()=>validateState({...state,favorites:[999]}));
 assert.throws(()=>validateState({...state,spots:[...state.spots,state.spots[0]]}));
 assert.throws(()=>validateState({...state,spots:[{...state.spots[0],cost:-1}]}));
});
test('訪問回数・最新の再訪意向・未訪問・削除の整合性',()=>{
 const state=initialState();state.favorites=[1];
 const visit=(id,spotId,date,intention)=>({id,spotId,date,intention,rating:4,comment:'楽しかった'});
 state.visits=[visit('a',1,'2026-01-01','また行きたい'),visit('b',1,'2026-02-01','普通'),visit('c',2,'2026-01-01','また行きたい')];
 validateState(state);assert.equal(visitCount(state,1),2);
 assert.deepEqual(collection(state,'frequent').map(s=>s.id),[1,2]);
 assert.deepEqual(collection(state,'again').map(s=>s.id),[2]);
 assert.equal(collection(state,'unvisited').length,8);
 const next=deleteSpot(state,1);assert.equal(next.visits.length,1);assert.equal(next.favorites.length,0);validateState(next);
});
test('カテゴリ・テント・BBQを他の条件と組み合わせる',()=>{
 const s={...initialState().spots[0],tent:true,bbq:true};
 const c={weather:'any',travel:'30',transport:'car',budget:'0',stay:'2',category:'大型公園',tent:'yes',bbq:'yes'};
 assert.equal(filterSpots(c,[s]).length,1);assert.equal(filterSpots({...c,tent:'no'},[s]).length,0);assert.equal(filterSpots({...c,category:'BBQ'},[s]).length,0);
});
test('存在しない訪問日を拒否する',()=>{
 const state=initialState();state.visits=[{id:'x',spotId:1,date:'2026-02-30',rating:4,comment:'',intention:'普通'}];assert.throws(()=>validateState(state));
});

test('旧バックアップを新しい項目へ移行し記録を残す',()=>{
 const old=initialState();old.favorites=[1];old.visits=[{id:'old',spotId:1,date:'2026-01-01',rating:3,comment:'思い出',intention:'普通'}];
 const next=validateState(old);assert.equal(next.spots[0].area,'');assert.equal(next.spots[1].rainy,true);assert.equal(next.visits[0].intention,'どちらでも');assert.deepEqual(next.favorites,[1]);
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(next))),next);
});
test('追加項目と公式URLを検証する',()=>{
 const state=initialState();state.spots[0]={...state.spots[0],area:'江戸川区',website:'https://example.com/',rainy:true};
 const next=validateState(state);assert.equal(next.spots[0].area,'江戸川区');assert.equal(next.spots[0].rainy,true);
 assert.throws(()=>validateState({...state,spots:[{...state.spots[0],website:'javascript:alert(1)'}]}));
 const c={weather:'rainy',travel:'30',transport:'car',budget:'0',stay:'2'};assert.equal(filterSpots(c,next.spots)[0].id,1);
});

import {recommended,sortedVisits} from '../store.js';
test('好みを優先しても元の配列を変更しない',()=>{
 const source=[{id:1,category:'その他',type:'indoor',tent:false},{id:2,category:'ショッピングモール',type:'indoor',tent:false},{id:3,category:'その他',type:'outdoor',tent:true}];
 assert.deepEqual(recommended(source).map(s=>s.id),[2,3,1]);assert.equal(source[0].id,1);
});
test('訪問日・評価・訪問回数の並べ替え',()=>{
 const state=initialState();state.visits=[{id:'a',spotId:1,date:'2026-01-01',rating:2},{id:'b',spotId:1,date:'2026-01-02',rating:3},{id:'c',spotId:2,date:'2026-02-01',rating:5}];
 assert.deepEqual(sortedVisits(state,'date').map(v=>v.id),['c','b','a']);assert.deepEqual(sortedVisits(state,'rating').map(v=>v.id),['c','b','a']);assert.deepEqual(sortedVisits(state,'count').map(v=>v.id),['b','a','c']);
});
