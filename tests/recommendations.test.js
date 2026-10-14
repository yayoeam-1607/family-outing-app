import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState} from '../store.js';
import {recommendToday,recommendationContext,recommendationScore} from '../recommendations.js';
const now=new Date('2026-10-14T03:00:00Z'), first=()=>0;
const spot=(id,minutes,category='outdoor')=>({id,mainCategory:category,travel:{carMinutes:minutes},seasons:[]});
const state=(spots,visits=[])=>({spots,visits,favorites:[],archivedSpots:[],removedBuiltinIds:[]});
test('実データで3役・異なるID・優先時間を満たし入力とlocalStorage形式を変えない',()=>{
 const s=initialState(),before=JSON.stringify(s),r=recommendToday(s,{now,index:first});
 assert.deepEqual(r.map(x=>x.role),['near','far','different']);assert.equal(new Set(r.map(x=>x.spot.id)).size,3);
 assert.ok(r[0].spot.travel.carMinutes<=30);assert.ok(r[1].spot.travel.carMinutes>=60&&r[1].spot.travel.carMinutes<=120);assert.equal(JSON.stringify(s),before);
 const next=recommendToday(s,{now,index:first,previousIds:r.map(x=>x.spot.id)});assert.ok(next.every(x=>!r.some(p=>p.spot.id===x.spot.id)));
});
test('候補不足時の時間緩和・null除外・空データ・小さい候補集合',()=>{
 const s=state([spot('n',40),spot('f',145),spot('u',null,'learning')]);const r=recommendToday(s,{now,index:first});assert.deepEqual(r.map(x=>x.spot.id),['n','f','u']);
 assert.equal(recommendToday(state([]),{now}).length,0);
 assert.equal(recommendToday(state([spot('one',20)]),{now}).length,1);
 assert.deepEqual(recommendToday(state([spot('x',null)]),{now}).map(x=>x.role),['different']);
});
test('未訪問・お気に入り・365日以上・季節は実際の根拠だけで加点',()=>{
 const a=spot('a',20),s=state([a],[{spotId:'a',date:'2025-10-14'}]),ctx=recommendationContext(s,now);
 assert.equal(recommendationScore(a,'near',ctx),2);
 s.visits[0].date='2025-10-15';assert.equal(recommendationScore(a,'near',recommendationContext(s,now)),0);
 s.visits=[];s.favorites=['a'];a.seasons=['autumn'];assert.equal(recommendationScore(a,'near',recommendationContext(s,now)),3.25);
});
test('直近5回を日付で集計し頻出カテゴリを下げる・未来の履歴は分析しない',()=>{
 const s=state([spot('near',20,'shopping'),spot('far',80,'animals'),spot('park',null),spot('learn',null,'learning')]);
 s.visits=[...Array.from({length:5},(_,i)=>({spotId:'park',date:`2026-10-${String(13-i).padStart(2,'0')}`})),{spotId:'learn',date:'2026-01-01'},{spotId:'learn',date:'2099-01-01'}].reverse();
 const c=recommendationContext(s,now);assert.equal(c.frequency.get('outdoor'),5);assert.equal(c.frequency.has('learning'),false);
 assert.ok(recommendationScore(s.spots[3],'different',c)>recommendationScore(s.spots[2],'different',c));
 const r=recommendToday(s,{now,index:first});assert.equal(r[2].spot.id,'learn');assert.match(r[2].reason,/最近は/);
});
test('履歴0〜2件はカテゴリ多様性を優先し、非表示・アーカイブ・削除IDを除外',()=>{
 for(let n=0;n<3;n++){
  const s=state([spot('near',20),spot('far',80),spot('same',null),spot('new',null,'learning')],Array.from({length:n},()=>({spotId:'near',date:'2026-10-01'})));
  assert.equal(recommendToday(s,{now,index:first})[2].spot.id,'new');
 }
 const s=state([spot('removed',20),spot('archived',80),{...spot('hidden',20),hidden:true},spot('ok',null)]);s.removedBuiltinIds=['removed'];s.archivedSpots=[spot('archived',80)];assert.deepEqual(recommendToday(s,{now,index:first}).map(r=>r.spot.id),['ok']);
});
test('前回以外がなければ再利用するが3枠で重複しない',()=>{
 const s=state([spot('n',20),spot('f',90)]),r=recommendToday(s,{now,index:first,previousIds:['n','f']});assert.equal(r.length,2);assert.equal(new Set(r.map(x=>x.spot.id)).size,2);
});
