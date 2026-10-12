import { shoppingSections } from "../shopping-presentation.js";
import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  prepareState,
  validateState,
  searchResults,
} from "../store.js";
import { verifiedSpots, catalogRevision } from "../catalog.js";
import {
  taxonomy,
  effectiveTags,
  tagsFor,
  campingFields,
  emptyShopping,
} from "../taxonomy.js";
import { resultPresentation } from "../result-presentation.js";
import { searchFacets, featureFacets } from "../search-facets.js";
import { pickerPool } from "../picker.js";
import baseline from "../catalog-interests-baseline.json" with { type: "json" };
import patches from "../catalog-interests-data.json" with { type: "json" };
const criteria = (
  mainCategory = "any",
  subcategories = [],
  tags = [],
  extra = {},
) => ({ mainCategory, subcategories, tags, ...extra });
const find = (state, name) => state.spots.find((s) => s.name === name);
const ids = (ss) => ss.map((s) => s.id).sort();
const cases = [
  ["shopping", ["買い物"], ["子ども服"], "SOCOLA南行徳"],
  ["shopping", ["遊ぶ"], ["コインゲーム"], "SUNAMO"],
  ["shopping", ["遊ぶ"], ["キッズ施設"], "アリオ葛西"],
  ["outdoor", ["アスレチック"], ["フィールドアスレチック"], "富士公園"],
  ["outdoor", ["BBQ"], ["BBQ可"], "新左近川親水公園"],
  ["outdoor", ["水遊び"], ["水遊び"], "袖ケ浦公園"],
  ["sightseeing", ["景色"], ["富士山"], "海ほたる"],
  ["sightseeing", ["乗り物観光"], ["ロープウェイ"], "箱根ロープウェイ"],
  ["animals", ["水族館"], ["ペンギン"], "葛西臨海水族園"],
  ["animals", ["動物ふれあい"], ["乗馬"], "篠崎ポニーランド"],
  ["leisure", [], ["キャラクター"], "ムーミンバレーパーク"],
  ["leisure", [], ["絶叫系"], "東京ディズニーランド"],
  ["indoor", [], ["トランポリン"], "東京あそびマーレ"],
  ["indoor", [], ["クライミング"], "ギャラクシティ"],
  [
    "indoor",
    ["デジタル体験"],
    ["AR"],
    "リトルプラネット ダイバーシティ東京 プラザ",
  ],
  ["learning", [], ["宇宙"], "JAXA相模原キャンパス"],
  ["learning", [], ["シミュレーター"], "航空科学博物館"],
  ["learning", ["職業体験"], ["職業体験"], "キッザニア東京"],
  ["activity", ["釣り"], ["ハゼ釣り"], "江戸川放水路"],
  ["activity", ["釣り"], ["貸し竿"], "オリジナルメーカー海づり公園"],
  ["relax", ["サウナ"], ["サウナ"], "箱根湯寮"],
  ["relax", [], ["貸切風呂"], "箱根小涌園ユネッサン"],
  ["nature", [], ["潮干狩り"], "富津海岸潮干狩場"],
  ["nature", [], ["いちご狩り"], "館山いちご狩りセンター"],
  ["nature", ["花・植物"], ["花菖蒲"], "小岩菖蒲園"],
];
test("提供情報65施設・350固定IDを維持し、全カテゴリの検索・カード・抽選に連携する", () => {
  const state = initialState();
  assert.equal(catalogRevision, 9);
  assert.equal(state.spots.length, 350);
  assert.equal(Object.keys(patches).length, 65);
  for (const [id, patch] of Object.entries(patches)) {
    const spot = state.spots.find((s) => s.id === id);
    assert.ok(spot, id);
    for (const [field, value] of Object.entries(patch)) {
      if (Array.isArray(value))
        for (const item of value)
          assert.ok(
            spot[field].includes(item),
            `${spot.name}:${field}:${item}`,
          );
      else if (value && typeof value === "object")
        for (const [key, detail] of Object.entries(value)) {
          if (Array.isArray(detail))
            for (const item of detail)
              assert.ok(
                spot[field][key].includes(item),
                `${spot.name}:${field}.${key}:${item}`,
              );
          else
            assert.equal(
              spot[field][key],
              detail,
              `${spot.name}:${field}.${key}`,
            );
        }
      else assert.equal(spot[field], value, `${spot.name}:${field}`);
    }
  }

  for (const [cat, subs, tags, name] of cases) {
    const c = criteria(cat, subs, tags),
      result = searchResults(state, c);
    assert.ok(
      result.some((s) => s.name === name),
      [cat, ...subs, ...tags, name].join("→"),
    );
    for (const s of result) {
      const p = resultPresentation(s, c);
      assert.ok(p.tags.includes(tags[0]));
      assert.ok(p.tags.length <= 4);
    }
    assert.deepEqual(ids(pickerPool(state, c, "current").spots), ids(result));
  }
  assert.ok(
    searchResults(state, criteria("outdoor", [], ["カヌー"])).some(
      (s) => s.name === "新左近川親水公園",
    ),
  );
  for (const [name, cat, subs] of [
    ["篠崎ポニーランド", "animals", ["動物ふれあい"]],
    ["なぎさポニーランド", "animals", ["動物ふれあい"]],
    ["夢の島熱帯植物館", "nature", ["花・植物"]],
    ["キッザニア東京", "learning", ["職業体験", "ものづくり"]],
  ]) {
    const s = find(state, name);
    assert.equal(s.mainCategory, cat);
    assert.deepEqual(s.subcategories, subs);
    assert.equal(
      searchResults(state, criteria("learning", ["工場見学"])).some(
        (candidate) => candidate.name === name,
      ),
      false,
    );
  }
});
test("taxonomyの追加タグが対象階層で利用でき、タグと専用条件の件数は実検索と一致する", () => {
  const state = initialState();
  for (const [cat, tags] of Object.entries({
    shopping: [
      "ボウリング",
      "室内アクティビティ",
      "カプセルトイ",
      "ホームセンター",
      "書店・文具",
    ],
    outdoor: ["幼児遊具", "水遊び", "カヌー"],
    animals: ["シャチ", "馬車"],
    indoor: [
      "ネット遊具",
      "クライミング",
      "ロープアスレチック",
      "ゴーカート",
      "パルクール",
    ],
    learning: ["シミュレーター", "運転体験", "飛行体験", "ものづくり", "食育"],
    sightseeing: ["湖景色", "富士山", "灯台", "日本庭園"],
    nature: ["花菖蒲"],
  }))
    for (const tag of tags)
      assert.ok(taxonomy[cat].tags.includes(tag), cat + tag);
  assert.ok(tagsFor("shopping", ["遊ぶ"]).includes("カプセルトイ"));
  assert.ok(tagsFor("shopping", ["買い物"]).includes("書店・文具"));
  assert.ok(tagsFor("nature", ["花・植物"]).includes("花菖蒲"));
  for (const [cat, subs, tags] of cases) {
    const c = criteria(cat, subs, tags, {
      transport: "car",
      travelRange: "0-120",
    });
    for (const f of searchFacets(state, c).tags)
      assert.equal(
        f.count,
        searchResults(state, { ...c, tags: [f.value] }).length,
      );
  }
  const c = criteria("outdoor", ["BBQ"], [], { camping: { bringFood: true } });
  for (const f of featureFacets(state, c, "camping", campingFields))
    assert.equal(
      f.count,
      searchResults(state, { ...c, camping: { ...c.camping, [f.key]: true } })
        .length,
    );
  const zero = searchFacets(
    state,
    criteria("indoor", ["室内遊具"], ["パルクール"]),
  );
  assert.equal(zero.tags.find((f) => f.value === "パルクール").count, 0);
  assert.equal(zero.tags.find((f) => f.value === "パルクール").selected, true);
});
test("shopping詳細と店舗名は検索・同義語・カード・JSON往復に対応する", () => {
  const state = initialState(),
    s = find(state, "SOCOLA南行徳");
  assert.deepEqual(s.shopping.buyTags, ["洋服", "子ども服", "雑貨", "家具"]);
  assert.ok(s.shopping.highlights.includes("西松屋"));
  assert.equal(s.shopping.verifiedAt, null);
  assert.deepEqual(
    shoppingSections(s).map((s) => s.title),
    ["買い物", "遊ぶ", "食べる・便利", "主な店舗"],
  );
  assert.ok(
    shoppingSections(find(state, "ららぽーと柏の葉"))
      .find((s) => s.title === "遊ぶ")
      .values.includes("コインゲーム"),
  );
  assert.equal(
    shoppingSections({
      ...s,
      shopping: emptyShopping(),
      tags: [],
      stayDuration: [],
    }).length,
    0,
  );
  assert.ok(effectiveTags(s).includes("家具"));
  assert.equal(effectiveTags(s).includes("西松屋"), false);
  assert.equal(effectiveTags(s).filter((t) => t === "子ども服").length, 1);
  assert.ok(
    searchResults(
      state,
      criteria("shopping", [], [], { query: "西松屋" }),
    ).some((candidate) => candidate.name === "SOCOLA南行徳"),
  );
  for (const [canonical, aliases] of [
    ["コインゲーム", ["メダルゲーム"]],
    ["クレーンゲーム", ["UFOキャッチャー", "プライズゲーム", "プライズ"]],
    ["子ども服", ["子供服", "キッズ服"]],
    ["書店・文具", ["本屋"]],
    ["スポーツ用品", ["スポーツショップ"]],
    ["アウトドア用品", ["アウトドアショップ"]],
    ["キッズ施設", ["キッズパーク", "室内遊園地"]],
    ["室内アクティビティ", ["スポッチャ"]],
  ]) {
    const expected = searchResults(
      state,
      criteria("shopping", [], [], { query: canonical }),
    );
    assert.ok(expected.length);
    for (const query of aliases) {
      const c = criteria("shopping", [], [], { query });
      const result = searchResults(state, c);
      assert.deepEqual(ids(result), ids(expected));
      for (const s of result.filter((s) =>
        effectiveTags(s).includes(canonical),
      ))
        assert.equal(resultPresentation(s, c).tags[0], canonical);
    }
  }
  const copy = validateState(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(copy, state);
  const custom = find(copy, "SOCOLA南行徳");
  custom.shopping.highlights = ["自分の店舗"];
  custom.shopping.verifiedAt = "2026-10-12";
  custom.shopping.extraneous = "保存しない";
  assert.deepEqual(
    prepareState(JSON.parse(JSON.stringify(copy))).spots.find(
      (s) => s.id === custom.id,
    ).shopping,
    Object.fromEntries(
      Object.entries(custom.shopping).filter(([key]) => key !== "extraneous"),
    ),
  );
});
test("shoppingの不正配列・日付は拒否し、古い形式とnullは受け入れる", () => {
  for (const bad of [
    { buyTags: "洋服" },
    { playTags: [1] },
    { foodTags: ["スーパー", "スーパー"] },
    { verifiedAt: "2026-02-30" },
    { verifiedAt: "bad" },
    [],
  ]) {
    const s = initialState(),
      spot = find(s, "SOCOLA南行徳");
    spot.shopping = Array.isArray(bad) ? bad : { ...spot.shopping, ...bad };
    assert.throws(() => validateState(s));
  }
  const s = initialState();
  for (const spot of s.spots) delete spot.shopping;
  assert.deepEqual(
    find(validateState(s), "MONA新浦安").shopping,
    emptyShopping(),
  );
  const spot = find(s, "MONA新浦安");
  spot.shopping = null;
  assert.equal(find(validateState(s), "MONA新浦安").shopping, null);
});
test("半日・1日タグはstayDurationだけから生成し、手動タグを重複管理しない", () => {
  const s = find(initialState(), "東京ディズニーランド");
  const fake = { ...s, tags: ["半日遊べる", "1日遊べる"], stayDuration: [2] };
  assert.equal(effectiveTags(fake).includes("半日遊べる"), false);
  assert.equal(effectiveTags(fake).includes("1日遊べる"), false);
  fake.stayDuration = [4, 8];
  assert.equal(effectiveTags(fake).filter((t) => t === "半日遊べる").length, 1);
  assert.equal(effectiveTags(fake).filter((t) => t === "1日遊べる").length, 1);
  assert.ok(
    searchResults(
      { ...initialState(), spots: [fake] },
      criteria("leisure", [], ["1日遊べる"]),
    ).length,
  );
});
test("revision8→9は分類を安全に修正し、手入力・非表示・記録・登録を維持する", () => {
  const state = initialState();
  state.catalogRevision = 8;
  const old = new Map(baseline.map((s) => [s.id, s]));
  state.spots = state.spots.map((s) =>
    old.has(s.id)
      ? { ...s, ...structuredClone(old.get(s.id)), shopping: undefined }
      : s,
  );
  const edited = find(state, "SOCOLA南行徳");
  edited.tags = edited.tags.filter((t) => t !== "子ども服");
  edited.description = "ユーザーの説明";
  edited.shopping = {
    ...emptyShopping(),
    buyTags: ["家族用"],
    highlights: ["自分の店舗"],
    verifiedAt: "2026-09-01",
  };
  const pony = find(state, "篠崎ポニーランド");
  pony.mainCategory = "activity";
  pony.subcategories = ["乗り物"];
  pony.tags = ["手入力"];
  const kid = find(state, "キッザニア東京");
  kid.subcategories = ["自分の分類"];
  const fishing = find(state, "オリジナルメーカー海づり公園");
  fishing.fishing.rodRental = false;
  const hidden = find(state, "なぎさポニーランド");
  state.spots = state.spots.filter((s) => s.id !== hidden.id);
  state.archivedSpots = [hidden];
  state.removedBuiltinIds = [hidden.id];
  state.favorites = [hidden.id];
  state.visits = [
    {
      id: "v9-memory",
      spotId: hidden.id,
      date: "2026-01-01",
      rating: 5,
      comment: "大切な思い出",
      intention: "また行きたい",
    },
  ];
  const user = {
    ...structuredClone(edited),
    id: "user-v9",
    source: "user",
    name: "ユーザー施設",
  };
  state.spots.push(user);
  const normalized = validateState(state),
    next = prepareState(state);
  assert.equal(next.catalogRevision, 9);
  assert.deepEqual(next.favorites, state.favorites);
  assert.deepEqual(next.visits, state.visits);
  assert.deepEqual(next.removedBuiltinIds, state.removedBuiltinIds);
  assert.equal(
    next.spots.some((s) => s.id === hidden.id),
    false,
  );
  assert.equal(next.archivedSpots[0].mainCategory, "animals");
  assert.deepEqual(
    next.spots.find((s) => s.id === user.id),
    normalized.spots.find((s) => s.id === user.id),
  );
  const e = next.spots.find((s) => s.id === edited.id);
  assert.equal(e.description, edited.description);
  assert.equal(e.tags.includes("子ども服"), false);
  assert.equal(effectiveTags(e).includes("子ども服"), false);
  assert.ok(e.shopping.buyTags.includes("家族用"));
  assert.ok(e.shopping.buyTags.includes("家具"));
  assert.ok(e.shopping.highlights.includes("自分の店舗"));
  assert.equal(e.shopping.verifiedAt, "2026-09-01");
  const p = next.spots.find((s) => s.id === pony.id);
  assert.equal(p.mainCategory, "activity");
  assert.deepEqual(p.subcategories, pony.subcategories);
  assert.deepEqual(p.tags, pony.tags);
  assert.deepEqual(
    next.spots.find((s) => s.id === kid.id).subcategories,
    kid.subcategories,
  );
  assert.equal(
    next.spots.find((s) => s.id === fishing.id).fishing.rodRental,
    false,
  );
  const botanical = find(next, "夢の島熱帯植物館");
  assert.equal(botanical.mainCategory, "nature");
  assert.deepEqual(botanical.subcategories, ["花・植物"]);
  assert.deepEqual(prepareState(next), next);
});
