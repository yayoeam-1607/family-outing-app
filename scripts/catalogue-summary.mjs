import { writeFileSync } from "node:fs";
import { verifiedSpots, catalogRevision } from "../catalog.js";
import { taxonomy } from "../taxonomy.js";
const tally = (values, fn) =>
  Object.fromEntries(
    values.map((v) => [v, verifiedSpots.filter((s) => fn(s, v)).length]),
  );
const bandLabels = [
  "0〜30分",
  "30分超〜60分",
  "60分超〜90分",
  "90分超〜120分",
  "120分超〜180分",
  "180分超",
  "不明",
];
function bands(key) {
  return tally(bandLabels, (s, label) => {
    const n = s.travel[key];
    if (n == null) return label === "不明";
    const i = bandLabels.indexOf(label),
      bounds = [0, 30, 60, 90, 120, 180, Infinity];
    return i < 6 && n <= bounds[i + 1] && (i === 0 || n > bounds[i]);
  });
}
const summary = {
  origin: "東京都江戸川区 瑞江駅",
  catalogRevision,
  total: verifiedSpots.length,
  prefectures: tally(
    ["東京都", "千葉県", "埼玉県", "神奈川県", "不明"],
    (s, v) => s.prefecture === (v === "不明" ? "" : v),
  ),
  mainCategories: Object.fromEntries(
    Object.entries(taxonomy).map(([key, t]) => [
      t.label,
      verifiedSpots.filter((s) => s.mainCategory === key).length,
    ]),
  ),
  camping: verifiedSpots.filter((s) => s.subcategories.includes("キャンプ"))
    .length,
  bbq: verifiedSpots.filter(
    (s) => s.tags.includes("BBQ可") || s.camping?.bbq === true,
  ).length,
  fishing: verifiedSpots.filter((s) => s.subcategories.includes("釣り")).length,
  shopping: verifiedSpots.filter((s) => s.mainCategory === "shopping").length,
  indoor: verifiedSpots.filter((s) => s.mainCategory === "indoor").length,
  famous: verifiedSpots.filter((s) => s.famous).length,
  travel: { car: bands("carMinutes"), train: bands("trainMinutes") },
  information: {
    previousOfficialRecords: 250,
    userProvidedAdditions: 100,
    unknownPrice: verifiedSpots.filter(
      (s) =>
        s.price.free !== true &&
        s.price.family4Typical == null &&
        s.price.family4Min == null &&
        s.price.family4Max == null,
    ).length,
    unknownParking: verifiedSpots.filter((s) => s.parking.type === "unknown")
      .length,
  },
  notes: [
    "今回はWeb検索を行っていません。追加100件はユーザー提供の施設名・種別だけを使用。所在地・公式URL・料金・所要時間・設備は未提供のため不明。",
    "既存250件の確認記録は前版のもの。新たな営業状況確認はしていません。",
    "旧版の移動・滞在時間は計画目安であり、経路APIや実測値ではありません。",
    "キャンプ件数は中カテゴリ、BBQ件数は可を確認済みのタグ/専用フィールド、釣り件数は中カテゴリで集計。",
    "不明を推測で埋めないため、追加分の時間・地域・料金・設備条件による検索は、確認情報の入力後に利用できます。",
  ],
};
if (process.argv.includes("--write"))
  writeFileSync(
    new URL("../docs/catalogue-summary.json", import.meta.url),
    JSON.stringify(summary, null, 2) + "\n",
  );
console.log(JSON.stringify(summary, null, 2));
