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
