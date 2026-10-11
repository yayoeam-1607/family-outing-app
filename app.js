import { categories, filterSpots } from './spots.js';
import { storageKey, initialState, validateState, visitCount, collection, deleteSpot, recommended, sortedVisits, prepareState, allSpots, searchResults } from './store.js';
const $ = s => document.querySelector(s);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let storageUnreadable = false;
let state = validateState(initialState()), view = 'search', searched = false, editingId = null, visitingId = null;
function notice(message) { $('#notice').textContent = message; }
try { const saved = localStorage.getItem(storageKey); if (saved) {
    const original = JSON.parse(saved); state = prepareState(original);
    if (original.version !== state.version || original.catalogRevision !== state.catalogRevision) {
      if (localStorage.getItem(storageKey + '-before-v2') === null) localStorage.setItem(storageKey + '-before-v2', saved);
      localStorage.setItem(storageKey, JSON.stringify(state));
      notice('おすすめスポットを更新しました。旧架空施設のお気に入り・訪問記録は保管しています。');
    }
  } }
catch { storageUnreadable = true; notice('保存データを読み込めませんでした。元の保存データは上書きしていません。バックアップを読み込むか、ブラウザの保存設定を確認してください。'); }
function save(next, restoring = false) {
  if (storageUnreadable && !restoring) { notice('元の保存データを保護しています。正常なバックアップを読み込んでから操作してください。'); return false; }
  try { next = validateState(next); localStorage.setItem(storageKey, JSON.stringify(next)); state = next; storageUnreadable = false; render(); return true; }
  catch (error) { notice(`保存できませんでした。データは変更していません。${error.message}`); return false; }
}
for (const selector of ['#search-category','#edit-category']) {
  $(selector).innerHTML = (selector === '#search-category' ? '<option value="any">すべて</option>' : '') + categories.map(c=>`<option>${escape(c)}</option>`).join('');
}
const titles = { search:'今週のおすすめ', favorites:'お気に入り', again:'また行きたいスポット', frequent:'よく行くスポット', unvisited:'まだ行ってないスポット', history:'行った場所・訪問記録' };
function render() {
  $('#search-panel').hidden = view !== 'search';
  $('#history-sort-label').hidden = view !== 'history';
  $('#home-lists').hidden = view !== 'search' || searched;
  $('#home-lists').innerHTML = [['unvisited','まだ行ったことがない場所'],['again','また行きたい場所'],['frequent','よく行く場所']].map(([key,label]) => {
    const list=collection(state,key);
    return `<section><h2>${label}</h2><p>${list.length ? list.slice(0,3).map(s=>escape(s.name)+(key==='frequent'?`（${visitCount(state,s.id)}回）`:'')).join(' / ') : 'まだありません。おでかけを記録してみよう。'}</p><button class="secondary" data-home-view="${key}">一覧を見る →</button></section>`;
  }).join('');
  $('#results-heading').textContent = titles[view];
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
  const criteria = Object.fromEntries(new FormData($('#search-form')));
  const items = view === 'history' ? sortedVisits(state,$('#history-sort').value) : view === 'search' ? searchResults(state,criteria,searched) : collection(state,view);
  $('#result-count').textContent = `${items.length} 件${view==='frequent' ? '（訪問回数順）' : ''}`;
  $('#empty').hidden = items.length > 0;
  $('#results').innerHTML = items.map(item => {
    if (view === 'history') {
      const spot = allSpots(state).find(s=>s.id===item.spotId);
      return `<article class="card history-card"><h3>${escape(spot.name)}</h3><p>${escape(item.date)} · 訪問 ${visitCount(state,item.spotId)} 回 · ${'★'.repeat(item.rating)}</p><span class="pill">${escape(item.intention)}</span><p class="comment">${escape(item.comment) || '感想は未記入です。'}</p><button data-action="visit-delete" data-id="${escape(item.id)}" class="secondary">記録を削除</button></article>`;
    }
    const s = item, favorite = state.favorites.includes(s.id);
    return `<article class="card"><div class="card-art ${s.type==='indoor'?'blue':'green'}"><span class="type-badge">${s.type==='indoor'?'☂ 屋内':'☀ 屋外'} · ${s.source==='builtin'?'おすすめスポット':s.source==='legacy' && state.version===2?'旧施設の保管記録':s.sample?'旧架空施設':'登録スポット'}</span><span class="spot-icon" aria-hidden="true">${s.type==='indoor'?'🏠':'🌳'}</span></div><div class="card-body"><span class="pill">${escape(s.category)}</span><h3>${escape(s.name)}</h3><p class="area">📍 ${escape(s.area) || (s.sample ? '架空のエリア（旧施設）' : 'エリア未登録')}</p><p class="description">${escape(s.description)}</p>${s.website ? `<a class="official-link" href="${escape(s.website)}" target="_blank" rel="noopener noreferrer">公式サイト ↗</a>` : ''}<div class="card-facts"><span>👛 目安 ${s.cost===0?'無料':s.cost.toLocaleString('ja-JP')+'円'}</span><span>${criteria.transport==='car'?'🚗 車':'🚃 公共交通'} 約${s.travel[criteria.transport]}分</span></div><p class="features">${s.rainy ? '☂ 雨の日向き' : '☀ 晴れの日向き'}<br>瑞江駅からの目安（混雑・経路で変動）<br>テント ${s.tent===null?'公式確認が必要':s.tent?'条件付きOK':s.type==='indoor'?'対象外':'不可'} / BBQ ${s.bbq===null?'公式確認が必要':s.bbq?'条件付きOK':s.type==='indoor'?'対象外':'不可'}<br>滞在：${s.stays.map(n=>({2:'2時間',4:'半日',8:'1日'}[n])).join('・')}</p><div class="rating"><span>子ども向け度（目安）</span><span aria-label="5段階中${s.rating}" class="stars">${'★'.repeat(s.rating)}</span></div><p class="visit-count">訪問 ${visitCount(state,s.id)} 回</p><div class="card-actions"><button data-action="favorite" data-id="${escape(s.id)}" aria-pressed="${favorite}" class="secondary">${favorite?'♥ 解除':'♡ お気に入り'}</button><button data-action="visit" data-id="${escape(s.id)}">行った！</button><button data-action="edit" data-id="${escape(s.id)}" class="text-button">編集</button><button data-action="delete" data-id="${escape(s.id)}" class="text-button">削除</button></div></div></article>`;
  }).join('');
}
function setView(next) { view=next; render(); }
$('#search-form').addEventListener('submit',e=>{ e.preventDefault(); searched=true; setView('search'); $('.results-section').scrollIntoView({behavior:'smooth'}); });
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
function openEditor(spot) {
  editingId=spot?.id ?? null;
  const form=$('#spot-form'); form.reset();
  $('#editor-title').textContent=spot?'スポットを編集':'スポットを追加';
  if(spot) {
    for(const key of ['name','type','category','cost','rating','description','area','website']) form.elements[key].value=spot[key];
    for(const key of ['car','train']) form.elements[key].value=spot.travel[key];
    form.elements.rainy.checked=spot.rainy;
    for(const key of ['tent','bbq']) form.elements[key].value=spot[key]===null?'unknown':spot[key]?'yes':'no';
    form.querySelectorAll('[name=stays]').forEach(b=>b.checked=spot.stays.includes(Number(b.value)));
  }
  $('#editor').showModal();
}
$('#add').addEventListener('click',()=>openEditor());
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
$('#spot-form').addEventListener('submit',e=>{
  e.preventDefault(); const f=new FormData(e.target), stays=f.getAll('stays').map(Number);
  if(!stays.length){ alert('滞在時間を1つ以上選んでください。'); return; }
  const old=state.spots.find(s=>s.id===editingId);
  const feature=key=>f.get(key)==='unknown'?null:f.get(key)==='yes';
  const spot={id:editingId ?? crypto.randomUUID(),name:f.get('name').trim(),description:f.get('description').trim(),area:f.get('area').trim(),website:f.get('website').trim(),rainy:f.has('rainy'),type:f.get('type'),category:f.get('category'),cost:Number(f.get('cost')),rating:Number(f.get('rating')),travel:{car:Number(f.get('car')),train:Number(f.get('train'))},stays,tent:feature('tent'),bbq:feature('bbq'),sample:old?.sample ?? false,source:old?.source ?? 'user'};
  if(save({...state,spots:old?state.spots.map(s=>s.id===editingId?spot:s):[...state.spots,spot]})) { $('#editor').close(); searched=false; setView('search'); notice('スポットを保存しました。'); }
});
$('#results').addEventListener('click',e=>{
  const button=e.target.closest('[data-action]'); if(!button)return;
  const {action}=button.dataset;
  if(action==='visit-delete') { const visit=state.visits.find(v=>String(v.id)===button.dataset.id); if(confirm('この訪問記録を削除しますか？') && save({...state,visits:state.visits.filter(v=>v.id!==visit.id)})) notice('訪問記録を削除しました。'); return; }
  const spot=allSpots(state).find(s=>String(s.id)===button.dataset.id); if(!spot)return;
  if ((action==='edit' || action==='visit') && spot.source==='legacy' && state.version===2) { notice('旧架空施設は記録保管用です。実在する場所を追加してご利用ください。'); return; }
  if(action==='edit')openEditor(spot);
  if(action==='favorite') save({...state,favorites:state.favorites.includes(spot.id)?state.favorites.filter(i=>i!==spot.id):[...state.favorites,spot.id]});
  if(action==='delete' && confirm(`「${spot.name}」と関連する訪問記録・お気に入りを削除しますか？`)) { if(save(deleteSpot(state,spot.id)))notice('スポットを削除しました。'); }
  if(action==='visit') {
    visitingId=spot.id; $('#visit-form').reset(); $('#visit-name').textContent=spot.name;
    const now=new Date(); const local=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
    $('#visit-form').elements.date.value=local; $('#visit-form').elements.date.max=local; $('#visit-dialog').showModal();
  }
});
$('#visit-form').addEventListener('submit',e=>{
  e.preventDefault(); const f=new FormData(e.target);
  const visit={id:crypto.randomUUID(),spotId:visitingId,date:f.get('date'),rating:Number(f.get('rating')),comment:f.get('comment'),intention:f.get('intention')};
  if(save({...state,visits:[...state.visits,visit]})){ $('#visit-dialog').close(); notice('訪問を記録しました！'); }
});
$('#export').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}), url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url;a.download='family-outing-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('#import').addEventListener('change',async e=>{
  const file=e.target.files[0];if(!file)return;
  try {
    if(file.size>10000000)throw Error('ファイルは10MB以内にしてください。');
    const next=prepareState(JSON.parse(await file.text()));
    if(confirm(`${next.spots.length}件のスポットと${next.visits.length}件の訪問記録を読み込みます。現在のデータを置き換えますか？`)) {
      if(save(next, true)){ searched=false;setView('search');notice('バックアップを読み込みました。'); }
    }
  } catch(error){notice(`読み込めませんでした。現在のデータは変更していません。${error.message}`);}
  finally{e.target.value='';}
});
render();

$('#history-sort').addEventListener('change',render);
$('#home-lists').addEventListener('click',e=>{const b=e.target.closest('[data-home-view]');if(b)setView(b.dataset.homeView);});

for (const field of ['focus','sort']) $('#search-form').elements[field].addEventListener('change',render);
