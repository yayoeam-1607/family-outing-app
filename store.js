import { spots, categories } from './spots.js';
export const storageKey = 'family-outing-data-v1';
export const intentions = ['また行きたい', '普通', 'もう行かなくてよい'];
export function initialState() { return { version: 1, spots: structuredClone(spots), favorites: [], visits: [] }; }
const text = (v, max) => typeof v === 'string' && v.length <= max;
const number = (v, max) => Number.isFinite(v) && v >= 0 && v <= max;
const id = v => (typeof v === 'string' && v.length > 0 && v.length <= 100) || (Number.isInteger(v) && v > 0);
export function validateState(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.spots) || !Array.isArray(data.favorites) || !Array.isArray(data.visits) || data.spots.length > 10000 || data.visits.length > 50000) throw Error('対応するバックアップ形式ではありません。');
  const ids = new Set();
  for (const s of data.spots) {
    if (!s || !id(s.id) || ids.has(s.id) || !text(s.name, 100) || !s.name.trim() || !text(s.description, 2000) || !['indoor', 'outdoor'].includes(s.type) || !categories.includes(s.category) || !number(s.cost, 10000000) || !s.travel || !number(s.travel.car, 1440) || !number(s.travel.train, 1440) || !Array.isArray(s.stays) || !s.stays.length || s.stays.some(n => ![2,4,8].includes(n)) || !Number.isInteger(s.rating) || s.rating < 1 || s.rating > 5 || typeof s.tent !== 'boolean' || typeof s.bbq !== 'boolean' || typeof s.sample !== 'boolean') throw Error('スポットのデータが不正です。');
    ids.add(s.id);
  }
  if (new Set(data.favorites).size !== data.favorites.length || data.favorites.some(i => !ids.has(i))) throw Error('お気に入りのデータが不正です。');
  const visitIds = new Set();
  for (const v of data.visits) {
    if (!v || !id(v.id) || visitIds.has(v.id) || !ids.has(v.spotId) || !text(v.date, 10) || !/^\d{4}-\d{2}-\d{2}$/.test(v.date) || !Number.isFinite(Date.parse(v.date)) || new Date(v.date).toISOString().slice(0,10) !== v.date || !Number.isInteger(v.rating) || v.rating < 1 || v.rating > 5 || !text(v.comment,2000) || !intentions.includes(v.intention)) throw Error('訪問記録のデータが不正です。');
    visitIds.add(v.id);
  }
  // 未知のプロパティは保存しない。
  return { version: 1, spots: data.spots.map(s => ({ id:s.id, name:s.name, description:s.description, type:s.type, category:s.category, cost:s.cost, travel:{car:s.travel.car,train:s.travel.train}, stays:[...s.stays], rating:s.rating, tent:s.tent, bbq:s.bbq, sample:s.sample })), favorites:[...data.favorites], visits:data.visits.map(v => ({id:v.id,spotId:v.spotId,date:v.date,rating:v.rating,comment:v.comment,intention:v.intention})) };
}
export function visitCount(state, spotId) { return state.visits.filter(v => v.spotId === spotId).length; }
export function collection(state, view) {
  return state.spots.filter(s => view === 'favorites' ? state.favorites.includes(s.id) : view === 'unvisited' ? visitCount(state,s.id) === 0 : view === 'frequent' ? visitCount(state,s.id) > 0 : view === 'again' ? state.visits.filter(v=>v.spotId===s.id).sort((a,b)=>b.date.localeCompare(a.date) || state.visits.indexOf(b)-state.visits.indexOf(a))[0]?.intention === 'また行きたい' : true).sort((a,b)=>view==='frequent' ? visitCount(state,b.id)-visitCount(state,a.id) : 0);
}
export function deleteSpot(state, spotId) { return { ...state, spots:state.spots.filter(s=>s.id!==spotId), favorites:state.favorites.filter(i=>i!==spotId), visits:state.visits.filter(v=>v.spotId!==spotId) }; }
