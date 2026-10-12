import informationSources from "../docs/information-sources.json" with { type: "json" };
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { verifiedSpots, expectedCatalogSize, catalogReady, catalogRevision } from '../catalog.js';
import { initialState, prepareState, validateState, deleteSpot, searchResults } from '../store.js';
import { filterSpots } from '../spots.js';
import { legacyState } from './legacy-fixture.js';

const evidence = JSON.parse(readFileSync(new URL('../docs/catalogue-evidence.json', import.meta.url)));
const criteria = { weather:'any', transport:'car', travel:'120', budget:'any', stay:'any', category:'any', tent:'any', bbq:'any' };

test('実在カタログは固定ID付き施設で旧250件の公式確認記録と追加100件の不明情報を区別する', () => {
  assert.equal(catalogReady, true);
  assert.equal(verifiedSpots.length, expectedCatalogSize);
  assert.equal(new Set(verifiedSpots.map(s=>s.id)).size, expectedCatalogSize);
  assert.equal(new Set(verifiedSpots.map(s=>s.name)).size, expectedCatalogSize);
  assert.equal(evidence.length,250);
  for (const s of verifiedSpots) {
    assert.match(s.id, /^place-/);
    assert.equal(s.source, 'builtin');
    assert.equal(s.sample, false);
    if(s.id.startsWith('place-added-')) {assert.ok(s.website === '' || informationSources.some(r => r.id === s.id && r.source === s.website));assert.equal(s.price.family4Typical,null);continue;}
    assert.ok(s.area && s.website.startsWith('https://'));
    const record = evidence.find(e=>e.id===s.id);
    assert.equal(record?.name, s.name);
    assert.equal(record?.checkedOn, '2026-10-11');
    assert.ok(record.sources.some(r=>r.url===s.website && (r.httpStatus===200 || r.method==='official-web-retrieval') && /^[a-f0-9]{64}$/.test(r.sha256)));
  }
  const state = validateState(initialState());
  assert.equal(state.version, 3);
  assert.equal(state.catalogRevision, catalogRevision);
  assert.equal(state.spots.length, expectedCatalogSize);
});

test('実在カタログへ移行してユーザー施設・旧履歴・お気に入りを保持する', () => {
  const old = legacyState();
  old.spots.push({...old.spots[0], id:'user-family',name:'家族の場所',sample:false,description:'入力したメモ'});
  old.favorites = [1, 'user-family'];
  old.visits = [{id:'memory',spotId:1,date:'2026-01-01',rating:4,comment:'思い出',intention:'普通'}];
  const before = JSON.stringify(old);
  const next = prepareState(old);
  assert.equal(next.spots.length,expectedCatalogSize+1);
  assert.equal(next.archivedSpots.length,10);
  assert.deepEqual(next.favorites,old.favorites);
  assert.equal(next.visits[0].spotId,1);
  assert.equal(next.visits[0].intention,'どちらでも');
  assert.equal(next.spots.find(s=>s.id==='user-family').description,'入力したメモ');
  assert.ok(next.spots.every(s=>!s.sample && s.source!=='legacy'));
  assert.equal(JSON.stringify(old),before);
  assert.deepEqual(prepareState(JSON.parse(JSON.stringify(next))),next);
});

test('公開カタログの編集・削除はJSON復元や再読み込みで戻らない', () => {
  let next=validateState(initialState());
  next.spots[0].name='家族で編集した名前';
  const removed=next.spots[1].id;
  next=deleteSpot(next,removed);
  next=prepareState(JSON.parse(JSON.stringify(next)));
  assert.equal(next.spots[0].name,'家族で編集した名前');
  assert.ok(!next.spots.some(s=>s.id===removed));
  assert.deepEqual(next.removedBuiltinIds,[removed]);
});

test('未確認のテント・BBQは可にも不可にも混ぜず、条件付き可は検索できる', () => {
  const unknown = verifiedSpots.find(s=>s.tent===null && s.bbq===null);
  assert.ok(unknown);
  for (const field of ['tent','bbq']) {
    assert.equal(filterSpots({...criteria,[field]:'yes'},[unknown]).length,0);
    assert.equal(filterSpots({...criteria,[field]:'no'},[unknown]).length,0);
  }
  const tents=filterSpots({...criteria,tent:'yes'},verifiedSpots);
  assert.ok(tents.some(s=>s.id==='place-edogawa-senbonsakura')); assert.ok(tents.some(s=>s.id==='place-ichikawa-camp')); assert.ok(tents.every(s=>s.tent===true));
  assert.match(tents[0].description,/区画|予約/);
  assert.ok(filterSpots({...criteria,bbq:'yes'},verifiedSpots).length>=10);
});

test('実在データでも雨・予算・移動手段・カテゴリ・滞在の複合条件と近い順が有効', () => {
  const c={...criteria,weather:'rainy',transport:'train',travel:'60',budget:'5000',stay:'2',category:'科学館・博物館',sort:'distance',focus:'any'};
  const result=searchResults(validateState(initialState()),c);
  assert.deepEqual(result.map(s=>s.id),['place-ichikawa-museum','place-kahaku']);
  const shopping=searchResults(validateState(initialState()),{...criteria,focus:'shopping'},false);
  assert.ok(shopping.length>=8);
  assert.ok(shopping.every(s=>s.mainCategory==='shopping'));
});

test('料金未確定の計画予算と閉館・工事情報を明示する', () => {
  const estimates=evidence.filter(e=>e.budgetVerification==='estimate');
  assert.equal(estimates.length,3);
  for(const e of estimates) assert.match(verifiedSpots.find(s=>s.id===e.id).description,/仮置き|要確認/);
  assert.ok(!verifiedSpots.some(s=>s.name==='日本科学未来館'));
  assert.match(verifiedSpots.find(s=>s.id==='place-edogawa-c_recreation').description,/工事/);
});
