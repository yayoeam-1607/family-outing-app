import test from "node:test";
import assert from "node:assert/strict";
import {
  verifiedSpots,
  prior350Spots,
  expectedCatalogSize,
  catalogRevision,
} from "../catalog.js";
import { leisureRecords } from "../catalog-leisure.js";
import {
  initialState,
  prepareState,
  searchResults,
  deleteSpot,
  validateState,
} from "../store.js";
import { pickerPool } from "../picker.js";
import { resultPresentation } from "../result-presentation.js";
import { spotBadges } from "../ui-presentation.js";
import priorIds from "./fixtures/catalogue-revision9-ids.json" with { type: "json" };
const ids = (xs) => xs.map((s) => s.id).sort();
test("旧350IDとデータを維持して確認済み独立施設8件だけ追加、計358件", () => {
  assert.equal(expectedCatalogSize, 358);
  assert.equal(catalogRevision, 10);
  assert.equal(verifiedSpots.length, 358);
  assert.equal(new Set(ids(verifiedSpots)).size, 358);
  assert.deepEqual(ids(prior350Spots), [...priorIds].sort());
  assert.equal(leisureRecords.length, 8);
  const added = verifiedSpots.filter((s) => !priorIds.includes(s.id));
  assert.deepEqual(ids(added), ids(leisureRecords));
  for (const s of prior350Spots)
    assert.deepEqual(
      verifiedSpots.find((x) => x.id === s.id),
      s,
    );
  assert.equal(
    prior350Spots.filter((s) => s.mainCategory === "leisure").length,
    11,
  );
  assert.equal(
    verifiedSpots.filter((s) => s.mainCategory === "leisure").length,
    19,
  );
  for (const s of added) {
    assert.equal(s.source, "builtin");
    assert.equal(s.mainCategory, "leisure");
    assert.ok(s.subcategories.includes("複合レジャー"));
    assert.deepEqual(s.weather, ["indoor", "rainy"]);
    assert.equal(s.price.family4Typical, null);
    assert.deepEqual(s.stayDuration, []);
  }
});
test("新規施設の時間は同一商業施設からだけ再利用し、他はnullのまま", () => {
  for (const record of leisureRecords) {
    const spot = verifiedSpots.find((s) => s.id === record.id);
    const parent = prior350Spots.find((s) => s.id === record.travelSource);
    for (const k of ["carMinutes", "trainMinutes"])
      assert.equal(spot.travel[k], parent?.travel[k] ?? null);
  }
  const ichikawa = verifiedSpots.find((s) => s.id.endsWith("round1-ichikawa"));
  assert.equal(ichikawa.tags.includes("スポッチャ"), false);
  assert.equal(ichikawa.parking.capacity, 210);
  assert.equal(
    verifiedSpots.find((s) => s.id.endsWith("round1-divercity")).parking
      .freeMinutes,
    240,
  );
  assert.equal(
    verifiedSpots.find((s) => s.id.endsWith("trampoland-bayside")).parking
      .freeMinutes,
    180,
  );
});
test("複合レジャー・スポッチャなどのタグ、雨AND、カードとおまかせが一致する", () => {
  const state = initialState();
  const base = {
    mainCategory: "leisure",
    subcategories: ["複合レジャー"],
    tags: [],
  };
  assert.equal(searchResults(state, base).length, 8);
  for (const [tag, n] of [
    ["スポッチャ", 4],
    ["ボウリング", 5],
    ["カラオケ", 5],
    ["トランポリン", 1],
    ["謎解き", 1],
    ["パルクール", 1],
    ["コインゲーム", 4],
  ]) {
    const c = { ...base, tags: [tag], weather: "rainy" };
    const found = searchResults(state, c);
    assert.equal(found.length, n, tag);
    for (const s of found) assert.equal(resultPresentation(s, c).tags[0], tag);
    assert.deepEqual(ids(pickerPool(state, c, "current").spots), ids(found));
  }
  const spotcha = searchResults(state, { ...base, query: "スポッチャ" });
  assert.equal(spotcha.length, 4);
  assert.ok(spotcha.every((s) => s.tags.includes("スポッチャ")));
  const explicit = searchResults(state, {
    ...base,
    tags: ["スポッチャ"],
    travelRange: "0-60",
    transport: "car",
  });
  assert.equal(explicit.length, 1);
  assert.ok(explicit[0].id.endsWith("round1-shinmisato"));
});
test("revision9→10は8件だけ追加し、手動編集・削除タグ・履歴・非表示を完全に保護する", () => {
  let state = initialState();
  state.catalogRevision = 9;
  state.spots = state.spots.filter((s) => priorIds.includes(s.id));
  const edited = state.spots.find((s) => s.name === "SUNAMO");
  edited.tags = ["ユーザー独自タグ"];
  edited.shopping.playTags = [];
  edited.description = "手入力";
  const hidden = state.spots[0];
  state = deleteSpot(state, hidden.id);
  state.favorites = [hidden.id, edited.id];
  state.visits = [
    {
      id: "leisure-memory",
      spotId: hidden.id,
      date: "2026-01-01",
      rating: 5,
      comment: "消さない思い出",
      intention: "また行きたい",
    },
  ];
  state.spots.push({
    ...structuredClone(edited),
    id: "user-leisure-test",
    source: "user",
    name: "ユーザーの場所",
  });
  const before = validateState(state),
    next = prepareState(state);
  assert.equal(next.catalogRevision, 10);
  assert.equal(next.spots.length, before.spots.length + 8);
  for (const s of before.spots)
    assert.deepEqual(
      next.spots.find((x) => x.id === s.id),
      s,
    );
  assert.deepEqual(next.archivedSpots, before.archivedSpots);
  assert.deepEqual(next.removedBuiltinIds, before.removedBuiltinIds);
  assert.deepEqual(next.favorites, before.favorites);
  assert.deepEqual(next.visits, before.visits);
  assert.deepEqual(prepareState(next), next);
  const hiddenNew = deleteSpot(next, leisureRecords[0].id);
  hiddenNew.catalogRevision = 9;
  const updated = prepareState(hiddenNew);
  assert.equal(
    updated.spots.some((s) => s.id === leisureRecords[0].id),
    false,
  );
  assert.ok(updated.archivedSpots.some((s) => s.id === leisureRecords[0].id));
});
test("UIのバッジは選択交通手段と確認済み天候だけから生成する", () => {
  assert.deepEqual(
    spotBadges({
      travel: { carMinutes: null, trainMinutes: null },
      weather: [],
    }),
    [],
  );
  const s = {
    travel: { carMinutes: 30, trainMinutes: 90 },
    weather: ["rainy"],
  };
  assert.deepEqual(
    spotBadges(s, "car").map((b) => b.text),
    ["30分以内の目安", "雨の日OK"],
  );
  assert.deepEqual(
    spotBadges(s, "train").map((b) => b.text),
    ["雨の日OK"],
  );
});
