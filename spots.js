// 架空のサンプル。cost は家族4人分の合計、移動時間は片道（分）。
// stays は楽しめる滞在時間：2 = 2時間、4 = 半日、8 = 1日。
export const spots = [
  { id: 1, name: 'ひだまり中央公園', type: 'outdoor', cost: 0, travel: { car: 15, train: 25 }, stays: [2, 4], rating: 5, icon: '🌳', color: 'green', description: '広い芝生でピクニック。遊具や散歩道で、のびのび遊べる公園です。' },
  { id: 2, name: 'わくわく科学館', type: 'indoor', cost: 2400, travel: { car: 25, train: 30 }, stays: [2, 4], rating: 5, icon: '🚀', color: 'purple', description: '触って学べる体験展示がいっぱい。家族で科学のふしぎを発見しよう。' },
  { id: 3, name: 'あおぞら動物園', type: 'outdoor', cost: 4000, travel: { car: 45, train: 60 }, stays: [4, 8], rating: 5, icon: '🦒', color: 'yellow', description: '人気の動物に会いに行こう。小動物とのふれあいエリアも楽しめます。' },
  { id: 4, name: 'うみいろ水族館', type: 'indoor', cost: 8000, travel: { car: 60, train: 50 }, stays: [2, 4], rating: 5, icon: '🐠', color: 'blue', description: '色とりどりの魚やクラゲを眺めながら、海の世界をゆっくり探検。' },
  { id: 5, name: 'こもれび図書館', type: 'indoor', cost: 0, travel: { car: 10, train: 15 }, stays: [2], rating: 4, icon: '📚', color: 'pink', description: '絵本コーナーでお気に入りの一冊を。親子で穏やかな時間を過ごせます。' },
  { id: 6, name: 'にじいろ室内あそび場', type: 'indoor', cost: 4500, travel: { car: 20, train: 35 }, stays: [2, 4], rating: 5, icon: '🧸', color: 'pink', description: 'ボールプールや大きなすべり台。雨の日も思いきり体を動かせます。' },
  { id: 7, name: 'みどりの体験農園', type: 'outdoor', cost: 6000, travel: { car: 70, train: 100 }, stays: [4], rating: 4, icon: '🥕', color: 'green', description: '季節の野菜を収穫して、土にふれる一日。食べものの育ち方も学べます。' },
  { id: 8, name: '星の丘テーマパーク', type: 'outdoor', cost: 24000, travel: { car: 100, train: 90 }, stays: [8], rating: 5, icon: '🎡', color: 'purple', description: '家族で乗れるアトラクションやショー。朝から夕方までたっぷり楽しもう。' },
  { id: 9, name: 'まちの歴史ミュージアム', type: 'indoor', cost: 1200, travel: { car: 35, train: 20 }, stays: [2], rating: 3, icon: '🏛️', color: 'yellow', description: '昔の暮らしや道具を見てみよう。親子で地域の歴史に出会える展示館です。' },
  { id: 10, name: 'さざなみ海浜公園', type: 'outdoor', cost: 0, travel: { car: 80, train: 110 }, stays: [2, 4, 8], rating: 4, icon: '🏖️', color: 'blue', description: '海辺の散歩や砂遊びを楽しめる公園。お弁当を持ってのんびり過ごそう。' },
];

export const categories = ['ショッピングモール', '大型公園', 'キャンプ・デイキャンプ', 'BBQ', 'テントOK', 'アスレチック', '屋内遊び場', '水族館・動物園', '科学館・博物館', 'スポーツ', 'その他'];
const sampleCategories = [1, 8, 7, 7, 10, 6, 10, 10, 8, 1];
spots.forEach((spot, index) => Object.assign(spot, { sample: true, category: categories[sampleCategories[index]], tent: false, bbq: false }));

export function filterSpots(conditions, source = spots) {
  return source.filter((spot) =>
    (conditions.weather !== 'rainy' || spot.type === 'indoor') &&
    spot.travel[conditions.transport] <= Number(conditions.travel) &&
    (conditions.budget === 'any' || spot.cost <= Number(conditions.budget)) &&
    (conditions.stay === 'any' || spot.stays.includes(Number(conditions.stay))) &&
    (!conditions.category || conditions.category === 'any' || spot.category === conditions.category) &&
    (!conditions.tent || conditions.tent === 'any' || spot.tent === (conditions.tent === 'yes')) &&
    (!conditions.bbq || conditions.bbq === 'any' || spot.bbq === (conditions.bbq === 'yes'))
  );
}
