import baseline from "./catalog-baseline-v3.json" with { type: "json" };

// 店舗・施設の公式情報で確認できた遊び分類だけを補完する。
export const shoppingPlayFacts = {
  "place-mitsui-tokyo-bay": {
    tags: ["ゲームセンター", "コインゲーム"],
    url: "https://www.gigo.co.jp/shops/llp-tokyo-bay/games",
  },
  "place-added-138e423f61ea": {
    tags: ["ゲームセンター", "コインゲーム"],
    url: "https://www.taito.co.jp/store/00002056",
  },
  "place-added-362838edeaa5": {
    tags: ["ゲームセンター", "クレーンゲーム"],
    url: "https://bandainamco-am.co.jp/game_center/loc/matsudo-terracemall/",
  },
  "place-added-15a45a24de42": {
    tags: ["キッズ施設"],
    url: "https://www.kameidoclock.jp/facility/",
  },
};
export function repairSearchClassification(spot) {
  if (spot.mainCategory !== "shopping") return spot;
  const play = shoppingPlayFacts[spot.id];
  return {
    ...spot,
    subcategories: [
      ...new Set([
        ...spot.subcategories,
        "買い物",
        "施設タイプ",
        ...(play ? ["遊ぶ"] : []),
      ]),
    ],
    tags: [...new Set([...spot.tags, ...(play?.tags ?? [])])],
  };
}
const originals = new Map(baseline.spots.map((s) => [s.id, s]));
// 既存の値を置換せず、新しく確認した分類だけを追加する。
// ユーザーが変更した主カテゴリ、削除した旧タグ、その他の全項目は保持する。
export function mergeSearchClassification(spot, latest) {
  const old = originals.get(spot.id);
  if (
    spot.source !== "builtin" ||
    !latest ||
    !old ||
    spot.mainCategory !== old.mainCategory ||
    latest.mainCategory !== old.mainCategory
  )
    return spot;
  const merged = { ...spot };
  for (const field of ["subcategories", "tags"]) {
    const additions = latest[field].filter(
      (value) => !old[field].includes(value),
    );
    merged[field] = [...new Set([...(spot[field] ?? []), ...additions])];
  }
  return merged;
}
