import { expectedCatalogSize } from "../catalog.js";
import test from "node:test";
import assert from "node:assert/strict";
import baseline from "../catalog-baseline-v3.json" with { type: "json" };
import { verifiedSpots } from "../catalog.js";
import { initialState, prepareState, searchResults } from "../store.js";
import { searchFacets } from "../search-facets.js";
import { taxonomy } from "../taxonomy.js";

const criteria = (extra = {}) => ({
  mainCategory: "shopping",
  subcategories: [],
  tags: [],
  ...extra,
});
test("ショッピングの3中カテゴリは施設データで一致し、未確認タグは一致しない", () => {
  const state = initialState();
  assert.equal(state.spots.length, expectedCatalogSize);
  assert.equal(searchResults(state, criteria()).length, 48);
  for (const sub of ["買い物", "施設タイプ"])
    assert.equal(
      searchResults(state, criteria({ subcategories: [sub] })).length,
      48,
    );
  const play = searchResults(state, criteria({ subcategories: ["遊ぶ"] }));
  assert.equal(play.length, 40);
  assert.ok(play.some((s) => s.name === "ららぽーとTOKYO-BAY"));
  assert.equal(
    searchResults(
      state,
      criteria({ subcategories: ["遊ぶ"], tags: ["コインゲーム"] }),
    ).length,
    21,
  );
  assert.equal(
    searchResults(state, criteria({ tags: ["存在しないタグ"] })).length,
    0,
  );
  for (const s of state.spots)
    assert.ok(taxonomy[s.mainCategory].subs.includes(s.subcategories[0]));
});
test("フィルター件数は実検索と一致し、条件変更と選択済みゼロ件を扱う", () => {
  const state = initialState();
  for (const mainCategory of Object.keys(taxonomy)) {
    const c = criteria({ mainCategory });
    for (const f of searchFacets(state, c).subcategories)
      assert.equal(
        f.count,
        searchResults(state, { ...c, subcategories: [f.value] }).length,
      );
  }
  let c = criteria({
    subcategories: ["遊ぶ"],
    tags: ["コインゲーム"],
    query: "存在しない施設",
  });
  const facets = searchFacets(state, c);
  assert.ok(facets.subcategories.every((f) => f.count === 0));
  assert.deepEqual(
    facets.tags.find((f) => f.value === "コインゲーム"),
    { value: "コインゲーム", count: 0, selected: true },
  );
  c = criteria({ subcategories: ["遊ぶ"] });
  for (const f of searchFacets(state, c).tags)
    assert.equal(
      f.count,
      searchResults(state, { ...c, tags: [f.value] }).length,
    );
});
test("revision 5の保存データに分類修正を反映し、編集・登録・非表示・思い出を保持する", () => {
  const state = initialState();
  state.catalogRevision = 5;
  const old = new Map(baseline.spots.map((s) => [s.id, s]));
  state.spots = state.spots.map((s) =>
    old.has(s.id) ? { ...s, ...structuredClone(old.get(s.id)) } : s,
  );
  const edited = state.spots.find((s) => s.id === "place-mitsui-tokyo-bay");
  edited.name = "家族の買い物先";
  edited.tags = ["家族専用タグ"];
  edited.parking.note = "手入力の駐車場";
  const changed = state.spots.find((s) => s.id === "place-mitsui-toyosu");
  changed.mainCategory = "indoor";
  changed.subcategories = ["ゲーム"];
  const hidden = state.spots.find((s) => s.id === "place-added-138e423f61ea");
  state.spots = state.spots.filter((s) => s.id !== hidden.id);
  state.archivedSpots = [hidden];
  state.removedBuiltinIds = [hidden.id];
  state.favorites = [hidden.id];
  state.visits = [
    {
      id: "visit-test",
      spotId: hidden.id,
      date: "2026-01-01",
      rating: 5,
      comment: "思い出",
      intention: "また行きたい",
    },
  ];
  const user = {
    ...structuredClone(verifiedSpots[0]),
    id: "user-test",
    source: "user",
    name: "登録施設",
  };
  state.spots.push(user);
  const input = JSON.stringify(state),
    updated = prepareState(JSON.parse(input));
  assert.equal(JSON.stringify(state), input);
  assert.equal(updated.spots.length, expectedCatalogSize);
  assert.deepEqual(updated.visits, state.visits);
  assert.deepEqual(updated.favorites, state.favorites);
  assert.deepEqual(updated.removedBuiltinIds, state.removedBuiltinIds);
  assert.ok(updated.archivedSpots[0].subcategories.includes("遊ぶ"));
  const e = updated.spots.find((s) => s.id === edited.id);
  assert.equal(e.name, edited.name);
  assert.equal(e.parking.note, edited.parking.note);
  assert.ok(e.tags.includes("家族専用タグ"));
  assert.ok(!e.tags.includes("ショッピングモール"));
  assert.ok(e.subcategories.includes("買い物"));
  assert.ok(e.subcategories.includes("遊ぶ"));
  assert.deepEqual(
    updated.spots.find((s) => s.id === changed.id).subcategories,
    ["ゲーム"],
  );
  assert.equal(updated.spots.find((s) => s.id === user.id).name, "登録施設");
  assert.deepEqual(prepareState(updated), updated);
});
