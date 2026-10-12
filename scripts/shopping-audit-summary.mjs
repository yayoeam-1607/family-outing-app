import fs from "node:fs";
import { verifiedSpots, catalogRevision } from "../catalog.js";
import baseline from "../catalog-shopping-baseline.json" with { type: "json" };
import audit from "../docs/shopping-audit.json" with { type: "json" };
import { initialState, searchResults } from "../store.js";
const shopping = verifiedSpots.filter((s) => s.mainCategory === "shopping");
const definitions = [
  ["ショッピング総数", () => true],
  ["遊ぶ", (s) => s.subcategories.includes("遊ぶ")],
  ...[
    "ゲームセンター",
    "コインゲーム",
    "クレーンゲーム",
    "映画館",
    "キッズ施設",
  ].map((t) => [t, (s) => s.tags.includes(t)]),
  [
    "その他遊び",
    (s) =>
      s.tags.some((t) =>
        [
          "室内遊具",
          "ボウリング",
          "スポーツ／アクティビティ",
          "トランポリン",
          "子ども向け体験",
        ].includes(t),
      ),
  ],
];
const counts = definitions.map(([label, predicate]) => ({
  label,
  before: baseline.filter(predicate).length,
  after: shopping.filter(predicate).length,
}));
const added = shopping.filter(
  (s) =>
    s.subcategories.includes("遊ぶ") &&
    !baseline.find((b) => b.id === s.id).subcategories.includes("遊ぶ"),
);
const times = {};
const state = initialState();
for (const transport of ["car", "train"])
  times[transport] = [30, 60, 90, 120, 180].map((max) => ({
    max,
    count: searchResults(state, {
      mainCategory: "any",
      transport,
      travelRange: `0-${max}`,
    }).length,
  }));
const summary = {
  catalogRevision,
  total: verifiedSpots.length,
  audited: audit.facilities.length,
  counts,
  newPlay: added.map((s) => ({ id: s.id, name: s.name })),
  travelUpperLimits: times,
};
fs.writeFileSync(
  new URL("../docs/shopping-summary.json", import.meta.url),
  JSON.stringify(summary, null, 2) + "\n",
);
const lines = [
  "# ショッピング48施設の公式情報監査",
  "",
  `確認日：${audit.checkedAt} / catalogRevision ${catalogRevision} / 固定施設${verifiedSpots.length}件（ショッピング${shopping.length}件）`,
  "",
  "## 集計",
  "",
  "| 項目 | 修正前 | 修正後 |",
  "| --- | ---: | ---: |",
  ...counts.map((r) => `| ${r.label} | ${r.before} | ${r.after} |`),
  "",
  "施設数で集計。タグ間の重複あり。「その他遊び」は室内遊具・ボウリング・スポーツ／アクティビティ・トランポリン・子ども向け体験のいずれか。",
  "",
  "## 新たに「遊ぶ」を追加した施設",
  "",
  ...added.map((s) => `- ${s.name}`),
  "",
  "## 48施設の監査結果",
  "",
  "公式施設案内・当該テナントのページを1件ずつ確認。以下の「未確認」は設備の不存在を示すものではなく、推測して追加していないことを示す。駐車場等は取得できた公式情報だけを補完。店舗別プライズをクレーンゲーム、店舗別メダル機をコインゲームへ統一し、共通メニューや別施設の情報は除外。",
  "",
  "各施設についてゲームセンター／メダル／クレーン／映画／キッズ／室内遊具／ボウリング／スポーツ／子ども向け遊び場を監査。項目別ステータス・採用根拠・取得不可は [shopping-audit.json](shopping-audit.json) に記録。",
  "",
];
for (const record of audit.facilities) {
  const s = shopping.find((s) => s.id === record.id);
  lines.push(
    `### ${s.name}`,
    "",
    `確認できた遊び：${
      Object.entries(record.features)
        .filter(([, v]) => v === "confirmed")
        .map(([k]) => k)
        .join("、") || "未確認（遊ぶは追加せず）"
    }。`,
    "",
    ...record.sources.map(
      (source, index) =>
        `- [公式資料${index + 1}](${source.url})：${source.basis}${source.status === "unavailable" ? "（取得不可）" : ""}`,
    ),
    ...record.notes.map((note) => `- ${note}`),
    "",
  );
}
lines.push(
  "## 検索・データ保護",
  "",
  "- 自由検索：メダルゲーム＝コインゲーム、UFOキャッチャー／プライズゲーム／プライズ＝クレーンゲーム、キッズパーク／子ども遊び場／室内遊び場＝キッズ施設。データのタグはcanonical名称のみ。",
  "- カード：タグ選択と自由検索の同義語に一致するタグを先頭に表示。既存の条件一致ポイントを維持。",
  "- 移動時間：30分・1時間・1時間30分・2時間・3時間以内の上限方式。上限を広げても近場を除外せず、おまかせにも同じ条件を使用。不明時間は指定時に除外、気にしないでは含める。",
  "- revision 8：revision 7の元データとの差分だけを補完。個別編集・削除済みタグ・独自駐車場メモ・変更カテゴリ・お気に入り・訪問履歴・非表示・ユーザー登録を保護。",
  "- ビビット南船橋は現公式名称North Gateへ変更し、旧名を併記。IDと施設件数は維持。",
  "",
);
fs.writeFileSync(
  new URL("../docs/shopping-audit.md", import.meta.url),
  lines.join("\n"),
);
console.log(JSON.stringify(summary, null, 2));
