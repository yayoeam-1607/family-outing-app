import { verifiedSpots, catalogReady, catalogRevision } from './catalog.js';
import { migrateCatalogue } from './catalog-migration.js';
import { spots, categories, legacyCategories, canonicalCategory, filterSpots } from './spots.js';
export const storageKey = 'family-outing-data-v1';
export const intentions = ['また行きたい', 'どちらでも', '普通', 'もう行かなくてよい'];
export function initialState() {
  const legacy = { version: 1, spots: structuredClone(spots), favorites: [], visits: [] };
  return catalogReady ? migrateCatalogue(legacy, verifiedSpots, catalogRevision) : legacy;
}
export function prepareState(data) {
  const valid = validateState(data);
  return catalogReady && (valid.version === 1 || valid.catalogRevision < catalogRevision)
    ? validateState(migrateCatalogue(valid, verifiedSpots, catalogRevision)) : valid;
}
export function allSpots(state) { return [...state.spots, ...(state.archivedSpots ?? [])]; }
const text = (v, max) => typeof v === 'string' && v.length <= max;
const number = (v, max) => Number.isFinite(v) && v >= 0 && v <= max;
const id = v => (typeof v === 'string' && v.length > 0 && v.length <= 100) || (Number.isInteger(v) && v > 0);
export function validateState(data) {
  if (!data || ![1, 2].includes(data.version) || !Array.isArray(data.spots) || !Array.isArray(data.favorites) || !Array.isArray(data.visits) || data.spots.length > 10000 || data.visits.length > 50000) throw Error('対応するバックアップ形式ではありません。');
  if (data.version === 2 && (!Number.isInteger(data.catalogRevision) || data.catalogRevision < 1 || !Array.isArray(data.archivedSpots) || !Array.isArray(data.removedBuiltinIds) || data.archivedSpots.length > 10000 || data.removedBuiltinIds.some(i => typeof i !== 'string' || !i.startsWith('place-')))) throw Error('データの改訂情報が不正です。');
  const normalize = s => s && ({ ...s, category: canonicalCategory(s), prefecture:s.prefecture ?? verifiedSpots.find(c=>c.id===s.id)?.prefecture ?? '', famous:s.famous ?? verifiedSpots.find(c=>c.id===s.id)?.famous ?? false, area: s.area ?? '', website: s.website ?? '', rainy: s.rainy ?? (s.type === 'indoor'), source: s.source ?? (s.sample ? 'legacy' : 'user') });
  data = { ...data, spots: data.spots.map(normalize), archivedSpots: (data.archivedSpots ?? []).map(normalize) };
  const ids = new Set();
  for (const s of allSpots(data)) {
    if (!s || !id(s.id) || ids.has(s.id) || !text(s.name, 100) || !s.name.trim() || !text(s.description, 2000) || !text(s.prefecture,20) || !['','東京都','千葉県','埼玉県','神奈川県'].includes(s.prefecture) || typeof s.famous !== 'boolean' || !text(s.area, 200) || !text(s.website, 2000) || !validWebsite(s.website) || typeof s.rainy !== 'boolean' || !['indoor', 'outdoor'].includes(s.type) || ![...categories,...legacyCategories].includes(s.category) || (s.cost !== null && !number(s.cost, 10000000)) || !s.travel || !number(s.travel.car, 1440) || !number(s.travel.train, 1440) || !Array.isArray(s.stays) || !s.stays.length || s.stays.some(n => ![2,4,8].includes(n)) || !Number.isInteger(s.rating) || s.rating < 1 || s.rating > 5 || ![true, false, null].includes(s.tent) || ![true, false, null].includes(s.bbq) || typeof s.sample !== 'boolean' || !['builtin','user','legacy'].includes(s.source)) throw Error('スポットのデータが不正です。');
    ids.add(s.id);
  }
  if (new Set(data.favorites).size !== data.favorites.length || data.favorites.some(i => !ids.has(i))) throw Error('お気に入りのデータが不正です。');
  const visitIds = new Set();
  for (const v of data.visits) {
    if (!v || !id(v.id) || visitIds.has(v.id) || !ids.has(v.spotId) || !text(v.date, 10) || !/^\d{4}-\d{2}-\d{2}$/.test(v.date) || !Number.isFinite(Date.parse(v.date)) || new Date(v.date).toISOString().slice(0,10) !== v.date || !Number.isInteger(v.rating) || v.rating < 1 || v.rating > 5 || !text(v.comment,2000) || !intentions.includes(v.intention)) throw Error('訪問記録のデータが不正です。');
    visitIds.add(v.id);
  }
  if (data.version === 2 && data.spots.some(s => s.source === 'legacy')) throw Error('旧架空施設は通常の候補には登録できません。');
  if (data.archivedSpots.some(s => s.source !== 'legacy')) throw Error('保管データの種別が不正です。');
  // 未知のプロパティは保存しない。
  const cleanSpot = s => ({ id:s.id, name:s.name, description:s.description, type:s.type, category:s.category, cost:s.cost, travel:{car:s.travel.car,train:s.travel.train}, stays:[...s.stays], rating:s.rating, tent:s.tent, bbq:s.bbq, sample:s.sample, source:s.source, prefecture:s.prefecture, famous:s.famous, area:s.area, website:s.website, rainy:s.rainy });
  return { version: data.version, ...(data.version === 2 ? {catalogRevision:data.catalogRevision, removedBuiltinIds:[...new Set(data.removedBuiltinIds)], archivedSpots:data.archivedSpots.map(cleanSpot)} : {}), spots:data.spots.map(cleanSpot), favorites:[...data.favorites], visits:data.visits.map(v => ({id:v.id,spotId:v.spotId,date:v.date,rating:v.rating,comment:v.comment,intention:v.intention === '普通' ? 'どちらでも' : v.intention})) };
}
export function visitCount(state, spotId) { return state.visits.filter(v => v.spotId === spotId).length; }
export function collection(state, view) {
  return (view === 'favorites' ? allSpots(state) : state.spots).filter(s => view === 'favorites' ? state.favorites.includes(s.id) : view === 'unvisited' ? visitCount(state,s.id) === 0 : view === 'frequent' ? visitCount(state,s.id) > 0 : view === 'again' ? state.visits.filter(v=>v.spotId===s.id).sort((a,b)=>b.date.localeCompare(a.date) || state.visits.indexOf(b)-state.visits.indexOf(a))[0]?.intention === 'また行きたい' : true).sort((a,b)=>view==='frequent' ? visitCount(state,b.id)-visitCount(state,a.id) : 0);
}
export function deleteSpot(state, spotId) {
  const spot = state.spots.find(s=>s.id===spotId);
  return { ...state, ...(state.version === 2 ? { archivedSpots:state.archivedSpots.filter(s=>s.id!==spotId), removedBuiltinIds: spot?.source === 'builtin' ? [...new Set([...state.removedBuiltinIds,spotId])] : state.removedBuiltinIds } : {}), spots:state.spots.filter(s=>s.id!==spotId), favorites:state.favorites.filter(i=>i!==spotId), visits:state.visits.filter(v=>v.spotId!==spotId) };
}

export function validWebsite(value) {
  if (value === '') return true;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
}
export function recommendationScore(spot) {
  return (['ショッピングモール','大型公園','キャンプ／デイキャンプ','キャンプ・デイキャンプ','アウトレット','BBQ','テントOK','アスレチック'].includes(spot.category) || spot.tent ? 2 : spot.type === 'outdoor' ? 1 : 0);
}
export function recommended(source) { return [...source].sort((a,b)=>recommendationScore(b)-recommendationScore(a)); }
export function sortedVisits(state, order = 'date') {
  return [...state.visits].sort((a,b)=>(order === 'rating' ? b.rating-a.rating : order === 'count' ? visitCount(state,b.spotId)-visitCount(state,a.spotId) : 0) || b.date.localeCompare(a.date));
}

export function searchResults(state, criteria, applyConditions = true) {
  let result = applyConditions ? filterSpots(criteria,state.spots) : [...state.spots];
  if (criteria.focus === 'rainy') result = result.filter(s=>s.rainy);
  if (criteria.focus === 'outdoor') result = result.filter(s=>s.type==='outdoor');
  if (criteria.focus === 'shopping') result = result.filter(s=>['ショッピングモール','アウトレット'].includes(canonicalCategory(s)));
  if (criteria.focus === 'unvisited') result = result.filter(s=>visitCount(state,s.id)===0);
  if (criteria.focus === 'famous') result = result.filter(s=>s.famous);
  if (criteria.focus === 'far') result = result.filter(s=>s.travel[criteria.transport]>60);
  const sorted = criteria.sort === 'distance' ? result.sort((a,b)=>a.travel[criteria.transport]-b.travel[criteria.transport]) : recommended(result);
  return criteria.famousPriority === 'yes' ? sorted.sort((a,b)=>Number(b.famous)-Number(a.famous)) : sorted;
}
