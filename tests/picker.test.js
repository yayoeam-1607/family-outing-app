import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  searchResults,
  deleteSpot,
  visitCount,
} from "../store.js";
import {
  pickerPool,
  drawSpot,
  randomIndex,
  commonCriteria,
  hasSearchCondition,
} from "../picker.js";
const base = {
  mainCategory: "shopping",
  subcategories: ["買い物"],
  tags: [],
  query: "",
  transport: "car",
};
test("現在条件の母集団はsearchResults全件と同一（10件・ページ上限に依存しない）", () => {
  const state = initialState();
  state.spots = state.spots
    .filter((s) => s.mainCategory === "shopping")
    .slice(0, 10);
  const pool = pickerPool(state, base, "current");
  assert.equal(pool.spots.length, 10);
  assert.deepEqual(pool.spots, searchResults(state, base));
  for (let i = 0; i < 10; i++)
    assert.equal(
      drawSpot(pool.spots, { index: () => i }).spot.id,
      pool.spots[i].id,
    );
});
test("0件は抽選せず、1件はその施設、2件以上は直前IDを除外する", () => {
  assert.equal(drawSpot([]), null);
  const s = initialState().spots.slice(0, 3);
  assert.equal(drawSpot([s[0]], { previousId: s[0].id }).spot.id, s[0].id);
  for (const index of [() => 0, (n) => n - 1])
    assert.notEqual(
      drawSpot(s, { previousId: s[0].id, index }).spot.id,
      s[0].id,
    );
});
test("カテゴリは候補があるカテゴリを均等に抽選し、そのカテゴリ内だけから選ぶ", () => {
  const original = initialState().spots[0];
  const spots = [
    { ...original, id: "small", mainCategory: "animals" },
    ...Array.from({ length: 100 }, (_, i) => ({
      ...original,
      id: "large-" + i,
      mainCategory: "outdoor",
    })),
  ];
  const hits = { animals: 0, outdoor: 0 };
  for (let i = 0; i < 200; i++) {
    const lengths = [];
    const result = drawSpot(spots, {
      category: true,
      index: (n) => {
        lengths.push(n);
        return lengths.length === 1 ? i % n : n - 1;
      },
    });
    assert.equal(lengths[0], 2);
    assert.equal(result.spot.mainCategory, result.category);
    hits[result.category]++;
    assert.ok(
      result.categories.every((c) => spots.some((s) => s.mainCategory === c)),
    );
  }
  assert.deepEqual(hits, { animals: 100, outdoor: 100 });
  assert.notEqual(
    drawSpot(spots, { category: true, previousId: "small", index: () => 0 })
      .spot.id,
    "small",
  );
});
test("カテゴリ抽選は共通条件を再利用し、カテゴリ専用条件だけ解除する", () => {
  const state = initialState(),
    c = {
      ...base,
      query: "コインゲーム",
      tags: ["コインゲーム"],
      parking: "paid",
      weather: "rainy",
      travelRange: "30-90",
      budgetMax: "15000",
      region: "千葉県",
      seasons: ["summer"],
      unvisited: true,
      famousOnly: true,
      camping: { bbq: true },
      fishing: { haze: true },
      sauna: { available: true },
    };
  const common = commonCriteria(c);
  assert.equal(common.mainCategory, "any");
  assert.deepEqual(common.tags, []);
  assert.deepEqual(common.camping, {});
  for (const key of [
    "parking",
    "weather",
    "travelRange",
    "budgetMax",
    "region",
    "seasons",
    "unvisited",
    "famousOnly",
  ])
    assert.deepEqual(common[key], c[key]);
  assert.deepEqual(
    pickerPool(state, c, "category").spots,
    searchResults(state, common),
  );
  assert.equal(c.query, "コインゲーム");
});
test("マイリストは最新意向・未訪問・お気に入りをunionし、非表示を除く", () => {
  let state = initialState();
  state.spots = state.spots.slice(0, 4);
  const [a, b, c, d] = state.spots;
  state.favorites = [a.id, c.id];
  state.visits = [
    { id: "v1", spotId: a.id, date: "2025-01-01", intention: "また行きたい" },
    {
      id: "v2",
      spotId: a.id,
      date: "2026-01-01",
      intention: "もう行かなくてよい",
    },
    { id: "v3", spotId: b.id, date: "2026-01-01", intention: "また行きたい" },
    { id: "v4", spotId: b.id, date: "2026-01-01", intention: "どちらでも" },
    { id: "v5", spotId: b.id, date: "2026-02-01", intention: "また行きたい" },
  ];
  assert.deepEqual(
    pickerPool(state, base, "lists", ["favorites"]).spots.map((s) => s.id),
    [a.id, c.id],
  );
  assert.deepEqual(
    pickerPool(state, base, "lists", ["again"]).spots.map((s) => s.id),
    [b.id],
  );
  assert.deepEqual(
    pickerPool(state, base, "lists", ["unvisited"]).spots.map((s) => s.id),
    [c.id, d.id],
  );
  assert.ok(
    pickerPool(state, base, "lists", ["unvisited"]).spots.every(
      (s) => visitCount(state, s.id) === 0,
    ),
  );
  assert.equal(
    pickerPool(state, base, "lists", ["favorites", "again", "unvisited"]).spots
      .length,
    4,
  );
  state = deleteSpot(state, c.id);
  assert.equal(
    pickerPool(state, base, "lists", ["favorites", "unvisited"]).spots.length,
    2,
  );
  assert.equal(pickerPool(state, base, "lists", []).spots.length, 0);
});
test("crypto乱数は剰余の偏りを避け、未提供時だけMath.randomへfallback", () => {
  const values = [0xffffffff, 7];
  let calls = 0;
  assert.equal(
    randomIndex(
      3,
      {
        getRandomValues: (a) => {
          a[0] = values[calls++];
        },
      },
      () => {
        throw Error("fallback不可");
      },
    ),
    1,
  );
  assert.equal(calls, 2);
  assert.equal(
    randomIndex(10, null, () => 0.99),
    9,
  );
  assert.throws(() => randomIndex(0));
});
test("未指定の全件完全ランダムは開始せず、意味のある検索条件で有効にする", () => {
  assert.equal(
    hasSearchCondition({
      mainCategory: "any",
      sort: "distance",
      transport: "train",
    }),
    false,
  );
  assert.equal(hasSearchCondition(base), true);
  assert.equal(hasSearchCondition({ unvisited: true }), true);
});
