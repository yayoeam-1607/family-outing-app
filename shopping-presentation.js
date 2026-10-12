import { effectiveTags } from "./taxonomy.js";
const groups = [
  [
    "buyTags",
    "買い物",
    [
      "洋服",
      "子ども服",
      "雑貨",
      "おもちゃ",
      "家電",
      "家具",
      "スポーツ用品",
      "アウトドア用品",
      "ホームセンター",
      "書店・文具",
    ],
  ],
  [
    "playTags",
    "遊ぶ",
    [
      "ゲームセンター",
      "コインゲーム",
      "クレーンゲーム",
      "映画館",
      "キッズ施設",
      "ボウリング",
      "室内アクティビティ",
      "カプセルトイ",
      "室内遊具",
      "スポーツ／アクティビティ",
      "トランポリン",
      "子ども向け体験",
    ],
  ],
  ["foodTags", "食べる・便利", ["スーパー", "フードコート", "レストラン"]],
  ["highlights", "主な店舗", []],
];
// 旧来の確認済みタグも新しい詳細ブロックへ表示し、保存データは二重化しない。
export function shoppingSections(spot) {
  if (spot.mainCategory !== "shopping" && !spot.shopping) return [];
  const effective = effectiveTags(spot);
  return groups
    .map(([key, title, legacy]) => ({
      key,
      title,
      values: [
        ...new Set([
          ...(spot.shopping?.[key] ?? []),
          ...legacy.filter((tag) => effective.includes(tag)),
        ]),
      ],
    }))
    .filter((s) => s.values.length);
}
