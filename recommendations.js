import { taxonomy } from './taxonomy.js';
import { randomIndex } from './picker.js';
const day = 86400000;
export function recommendationContext(state, now = new Date()) {
  const today = new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Tokyo'}).format(now);
  const spots = state.spots.filter(s => !(state.removedBuiltinIds ?? []).includes(s.id) && !(state.archivedSpots ?? []).some(a=>a.id===s.id) && !s.hidden && !s.archived);
  const all = [...state.spots, ...(state.archivedSpots ?? [])];
  const visits = state.visits.filter(v=>v.date <= today).slice().sort((a,b)=>b.date.localeCompare(a.date));
  const recent = visits.slice(0,5), frequency = new Map(), latest = new Map();
  for(const v of visits) {
    if(!latest.has(v.spotId)) latest.set(v.spotId,v.date);
  }
  for(const v of recent) {
    const category=all.find(s=>s.id===v.spotId)?.mainCategory;
    if(category) frequency.set(category,(frequency.get(category)??0)+1);
  }
  return {spots, frequency, latest, historyCount:recent.length, favorites:new Set(state.favorites), today, month:Number(today.slice(5,7))};
}
export function recommendationScore(spot, role, context, selected = []) {
  const last=context.latest.get(spot.id), unvisited=!last;
  const old=last && (Date.parse(context.today)-Date.parse(last))/day>=365;
  const season = ['winter','spring','summer','autumn'][Math.floor((context.month%12)/3)];
  let score=(unvisited?2:0)+(old?2:0)+(context.favorites.has(spot.id)?1:0)+(spot.seasons?.includes(season)?0.25:0);
  if(role==='far' && ['leisure','outdoor','animals','nature','sightseeing','activity','relax'].includes(spot.mainCategory))score+=2;
  if(role==='different') {
    if(context.historyCount>=3)score+=2-4*(context.frequency.get(spot.mainCategory)??0);
    else if(!selected.some(s=>s.mainCategory===spot.mainCategory))score+=3;
  }
  return score;
}
export function recommendToday(state, {previousIds=[], now=new Date(), index=randomIndex}={}) {
  const context=recommendationContext(state,now), selected=[], result=[];
  const previous=new Set(previousIds);
  for(const role of ['near','far','different']) {
    let pool=context.spots.filter(s=>!selected.some(p=>p.id===s.id));
    if(role==='near')pool=pool.filter(s=>s.travel?.carMinutes!=null && s.travel.carMinutes<=45);
    if(role==='far')pool=pool.filter(s=>s.travel?.carMinutes!=null && s.travel.carMinutes>=45 && s.travel.carMinutes<=150);
    // Avoid the previous three whenever this role still has an alternative.
    const fresh=pool.filter(s=>!previous.has(s.id)); if(fresh.length)pool=fresh;
    if(role==='near') {const preferred=pool.filter(s=>s.travel.carMinutes<=30);if(preferred.length)pool=preferred;}
    if(role==='far') {const preferred=pool.filter(s=>s.travel.carMinutes>=60 && s.travel.carMinutes<=120);if(preferred.length)pool=preferred;}
    if(!pool.length)continue;
    const ranked=pool.map(spot=>({spot,score:recommendationScore(spot,role,context,selected)})).sort((a,b)=>b.score-a.score);
    const top=ranked.filter(s=>s.score>=ranked[0].score-1);
    const spot=top[index(top.length)].spot;
    let reason;
    if(role==='near')reason=!context.latest.has(spot.id)?'近くて、まだ行っていない場所':context.favorites.has(spot.id)?'お気に入りの近場スポット':`瑞江駅から車で約${spot.travel.carMinutes}分の目安`;
    if(role==='far')reason=!context.latest.has(spot.id)?'まだ行っていない遠出候補':'今日は少し足を伸ばして';
    if(role==='different') {
      const frequent=[...context.frequency].sort((a,b)=>b[1]-a[1])[0];
      reason=context.historyCount>=3 && frequent && frequent[0]!==spot.mainCategory && frequent[1]>(context.frequency.get(spot.mainCategory)??0)?`最近は${taxonomy[frequent[0]]?.label??'同じ種類のおでかけ'}が多いので、別の楽しみ方を`:!context.latest.has(spot.id)?'まだ行っていない場所を提案':(Date.parse(context.today)-Date.parse(context.latest.get(spot.id)))/day>=365?'1年以上ぶりのおでかけ候補':'いつもと違う行き先の候補';
    }
    selected.push(spot);result.push({role,spot,reason});
  }
  return result;
}
