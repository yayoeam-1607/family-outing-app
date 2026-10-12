import fs from "node:fs";
import { taxonomy, effectiveTags } from "../taxonomy.js";
import { initialState, searchResults } from "../store.js";
import { catalogRevision } from "../catalog.js";
import before from "../docs/interests-before-summary.json" with { type: "json" };
import patches from "../catalog-interests-data.json" with { type: "json" };
import baseline from "../catalog-interests-baseline.json" with { type: "json" };
const state = initialState();
const categories = Object.fromEntries(
  Object.entries(taxonomy).map(([cat, meta]) => {
    const records = state.spots.filter((s) => s.mainCategory === cat),
      hits = Object.fromEntries(
        meta.tags.map((tag) => [
          tag,
          searchResults(state, { mainCategory: cat, tags: [tag] }).length,
        ]),
      );
    const subs = Object.fromEntries(
      meta.subs.map((sub) => [
        sub,
        searchResults(state, { mainCategory: cat, subcategories: [sub] })
          .length,
      ]),
    );
    return [
      cat,
      {
        label: meta.label,
        spots: records.length,
        definitions: meta.tags,
        hits,
        subs,
        tagKinds: Object.values(hits).filter((n) => n > 0).length,
        tagHits: Object.values(hits).reduce((a, b) => a + b, 0),
      },
    ];
  }),
);
const requested = {
  outdoor: [
    ["大型遊具", "tag"],
    ["アスレチック", "sub"],
    ["BBQ", "sub"],
    ["水遊び", "sub"],
    ["ピクニック", "sub"],
  ],
  sightseeing: [
    ["展望台", "tag"],
    ["夜景", "tag"],
    ["海景色", "tag"],
    ["富士山", "tag"],
    ["ロープウェイ", "tag"],
    ["観光船", "tag"],
  ],
  animals: [
    ["ふれあい", "tag"],
    ["乗馬", "tag"],
    ["ペンギン", "tag"],
    ["イルカ", "tag"],
  ],
  indoor: [
    ["トランポリン", "tag"],
    ["クライミング", "tag"],
    ["デジタル体験", "sub"],
  ],
  learning: [
    ["宇宙", "tag"],
    ["シミュレーター", "tag"],
    ["職業体験", "tag"],
  ],
  nature: [
    ["潮干狩り", "tag"],
    ["いちご狩り", "tag"],
  ],
  shopping: [
    ["ゲームセンター", "tag"],
    ["コインゲーム", "tag"],
    ["クレーンゲーム", "tag"],
    ["映画館", "tag"],
    ["キッズ施設", "tag"],
  ],
};
const highlighted = Object.entries(requested).flatMap(([cat, items]) =>
  items.map(([condition, type]) => ({
    category: cat,
    condition,
    type,
    before:
      (type === "sub"
        ? before.categories[cat].subs
        : before.categories[cat].hits)[condition] ?? 0,
    after:
      (type === "sub" ? categories[cat].subs : categories[cat].hits)[
        condition
      ] ?? 0,
  })),
);
const taxonomyAdded = Object.fromEntries(
  Object.entries(categories)
    .map(([cat, meta]) => [
      cat,
      meta.definitions.filter(
        (t) => !before.categories[cat].definitions.includes(t),
      ),
    ])
    .filter(([, tags]) => tags.length),
);
const changed = baseline
  .filter((s) => patches[s.id]?.mainCategory)
  .map((s) => ({
    id: s.id,
    name: state.spots.find((x) => x.id === s.id).name,
    before: { mainCategory: s.mainCategory, subcategories: s.subcategories },
    after: {
      mainCategory: patches[s.id].mainCategory,
      subcategories: patches[s.id].subcategories,
    },
  }));
const report = {
  catalogRevision,
  previousRevision: before.catalogRevision,
  total: state.spots.length,
  updatedFacilities: Object.keys(patches).length,
  source:
    "ユーザー提供の事前調査情報。今回Web調査なし。確認日が未提供のshopping.verifiedAtはnull。",
  categories,
  highlighted,
  taxonomyAdded,
  classificationChanges: changed,
};
fs.writeFileSync(
  new URL("../docs/interests-summary.json", import.meta.url),
  JSON.stringify(report, null, 2) + "\n",
);
const lines = [
  "# 全カテゴリの「気になること」情報補完",
  "",
  `catalogRevision ${before.catalogRevision} → ${catalogRevision} / 固定350施設維持 / 提供情報${report.updatedFacilities}施設を反映`,
  "",
  "今回はWeb調査を行わず、ユーザーが事前に調査・整理した情報を採用。以前の確認済み情報も維持し、指定の追加・分類変更を適用。確認日の指定がないshopping.verifiedAtはnull。",
  "",
  "## カテゴリ別の実データ集計",
  "",
  "タグ種類数はtaxonomyに登録され、当該カテゴリで1施設以上ヒットするタグの数。延べヒットはそれぞれのタグに一致する施設数の合計（同一施設の重複あり）。中カテゴリの件数とは区別する。",
  "",
  "| カテゴリ | 施設数 前→後 | 使用タグ種類 前→後 | タグ延べヒット 前→後 |",
  "| --- | ---: | ---: | ---: |",
  ...Object.entries(categories).map(
    ([cat, meta]) =>
      `| ${meta.label} | ${before.categories[cat].spots} → ${meta.spots} | ${before.categories[cat].tagKinds} → ${meta.tagKinds} | ${before.categories[cat].tagHits} → ${meta.tagHits} |`,
  ),
  "",
  "## 指定条件のヒット件数",
  "",
  "| カテゴリ | 条件 | 種別 | 前 | 後 |",
  "| --- | --- | --- | ---: | ---: |",
  ...highlighted.map(
    (r) =>
      `| ${categories[r.category].label} | ${r.condition} | ${r.type === "sub" ? "中カテゴリ" : "タグ"} | ${r.before} | ${r.after} |`,
  ),
  "",
  "## 分類変更",
  "",
  ...changed.map(
    (r) =>
      `- ${r.name}：${taxonomy[r.before.mainCategory].label}／${r.before.subcategories.join("・")} → ${taxonomy[r.after.mainCategory].label}／${r.after.subcategories.join("・")}。`,
  ),
  "",
  "## 追加したtaxonomyタグ",
  "",
  ...Object.entries(taxonomyAdded).map(
    ([cat, tags]) => `- ${categories[cat].label}：${tags.join("、")}。`,
  ),
  "",
  "ボウリングは既存定義を維持。ショッピングの中カテゴリ「食べる・便利」を追加。ホームセンター、書店・文具、食事タグなど、提供データで使用する項目も検索へ接続。",
  "",
  "## 検索・表示",
  "",
  "- タグと専用条件の件数は現在の検索条件から自動計算。0件の未選択候補を隠し、選択中の0件は解除できる状態で残す。固定件数をUIへ埋め込まない。",
  "- shopping.buyTags / playTags / foodTags をeffectiveTagsへ統合し、highlightsは店舗名の自由検索に使用。検索タグは重複排除。",
  "- 提供された同義語をcanonical名称へ正規化し、AND/OR・時間上限・駐車場等の既存検索仕様を維持。おまかせも同じ候補を使用。",
  "- カードは検索に合うタグを先頭へ並べ、最大4タグ。詳細には全タグ・中カテゴリ・既知の専用情報を表示。",
  "- shopping詳細を買い物／遊ぶ／食べる・便利／主な店舗へ分割。旧来の確認済みタグも表示へ取り込み、空ブロックを省く。専用詳細のnullを大量表示しない。",
  "- 半日遊べる／1日遊べるはstayDurationの4／8から生成し、検索・カード・詳細へ反映。手動タグは判定の根拠にしない。",
  "",
  "## 保存・移行・既存データ保護",
  "",
  "- revision 8の元データと現在値を比較。未編集値を更新し、配列は今回の差分を補完。手入力の説明、確認日、独自タグ、店舗名、falseの専用条件を保護。",
  "- mainCategoryを指定した4施設は分類と中カテゴリが未編集なら指定分類へ置換。手動変更された分類は維持。",
  "- ユーザーが削除した既存タグはshoppingタグ経由でも復活させない。",
  "- お気に入り・訪問履歴・思い出・非表示ID・保管施設・ユーザー追加施設を保持。非表示施設にも情報を補完するが候補へ復帰させない。",
  "- shoppingの配列・null・ISO日付をvalidationで検証。cleanSpotの保存対象へ追加し、JSON export/importで往復。未知プロパティを除外。",
  "",
  "## 変更ファイル",
  "",
  "- catalog-interests-data.json / catalog-interests-baseline.json / catalog-interests.js：提供情報、移行前スナップショット、補完と安全な移行。",
  "- catalog.js / catalog-migration.js：revision 9、更新ステージの接続。",
  "- taxonomy.js / search.js / search-synonyms.js / search-facets.js：検索タグ、shopping統合、同義語、現在条件の件数。",
  "- spot-schema.js / store.js：shoppingの初期値・検証・保存・JSON往復。",
  "- shopping-presentation.js / result-presentation.js / app.js：詳細ブロック、優先タグ、0件非表示、専用詳細の空欄省略。",
  "- tests/interests.test.js / tests/shopping-audit.test.js / tests/search-repairs.test.js：指定25検索、カード・抽選・タグ件数、同義語、移行と保存保護、既存回帰の更新。",
  "- scripts/interests-summary.mjs / docs/interests-before-summary.json / docs/interests-summary.json / docs/interests-update.md / README.md：修正前後の集計と実装記録。",
  "",
];
lines.push(
  "## 検証結果（2026-10-12）",
  "",
  "- npm test：69件成功、失敗0件。",
  "- npm run build：成功。",
  "- ブラウザ：指定25検索・タグ優先表示（最大4）・現在条件の件数・0件非表示と解除・おまかせ候補・shopping詳細・同義語・revision 8→9の保存データ保護・再読み込み・実際のJSON export/import・390px表示を確認。JavaScriptエラー0件。",
  "",
);
fs.writeFileSync(
  new URL("../docs/interests-update.md", import.meta.url),
  lines.join("\n"),
);
console.log(lines.slice(0, 45).join("\n"));
