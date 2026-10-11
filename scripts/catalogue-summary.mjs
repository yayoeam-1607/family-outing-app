import { writeFileSync } from 'node:fs';
import { verifiedSpots, catalogRevision } from '../catalog.js';
import { categories, regions, matchesRegion } from '../spots.js';

const limits=[30,60,90,120,180];
const labels=['30分以内','30分超～60分','60分超～90分','90分超～120分','120分超～180分','180分超'];
const tally = (values, select) => Object.fromEntries(values.map(v=>[v,verifiedSpots.filter(s=>select(s,v)).length]));
function bands(select) {
 return Object.fromEntries(labels.map((label,i)=>[label,verifiedSpots.filter(s=>{
  const minutes=select(s);return i===5 ? minutes>180 : minutes<=limits[i]&&(i===0||minutes>limits[i-1]);
 }).length]));
}
const summary={
 checkedOn:'2026-10-11',origin:'東京都江戸川区 瑞江駅',catalogRevision,total:verifiedSpots.length,
 prefectures:tally(['東京都','千葉県','埼玉県','神奈川県'],(s,v)=>s.prefecture===v),
 categories:tally(categories,(s,v)=>s.category===v),
 regions:tally(regions,matchesRegion),
 travel:{car:bands(s=>s.travel.car),publicTransport:bands(s=>s.travel.train),fasterOption:bands(s=>Math.min(s.travel.car,s.travel.train))},
 targetTravelBands:[40,50,50,45,65],
 famous:verifiedSpots.filter(s=>s.famous).length,
 rainy:verifiedSpots.filter(s=>s.rainy).length,
 conditionalTent:verifiedSpots.filter(s=>s.tent===true).length,
 conditionalBBQ:verifiedSpots.filter(s=>s.bbq===true).length,
 notes:['時間は経路API・実測ではなく、公式所在地・アクセスを参考にした片道編集目安。','近場地域は東京23区・千葉県と重複する。','既存100件だけで車30分以内が46件のため、目安40件とは一致しない。既存ID・時間は維持。','公共交通が180分を超える施設は車で180分以内。公共交通3時間以内の検索では除外。','元100件に含まれる仮予算3件は内容を維持し要確認を明示。追加150件は掲載された公式料金・無料条件を根拠に設定。']
};
if(process.argv.includes('--write'))writeFileSync(new URL('../docs/catalogue-summary.json',import.meta.url),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
