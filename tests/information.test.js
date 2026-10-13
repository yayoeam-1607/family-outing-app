import { expectedCatalogSize } from "../catalog.js";
import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  prepareState,
  searchResults,
  validateState,
} from "../store.js";
import { verifiedSpots } from "../catalog.js";
import { resultPresentation } from "../result-presentation.js";
import baseline from "../catalog-information-baseline.json" with { type: "json" };
import information from "../catalog-information-data.json" with { type: "json" };
import sources from "../docs/information-sources.json" with { type: "json" };
const criteria = (extra = {}) => ({
  mainCategory: "any",
  tags: [],
  subcategories: [],
  ...extra,
});
test("駐車場6項目は旧JSONと互換で、無料時間・台数が往復し不正値を拒否する", () => {
  const state = initialState(),
    s = state.spots.find((s) => s.name === "SOCOLA南行徳");
  assert.equal(s.parking.type, "free-limited");
  assert.equal(s.parking.freeMinutes, 120);
  assert.equal(s.parking.capacity, 680);
  assert.deepEqual(
    validateState(JSON.parse(JSON.stringify(state))).spots.find(
      (x) => x.id === s.id,
    ).parking,
    s.parking,
  );
  const old = structuredClone(state);
  delete old.spots[0].parking.freeMinutes;
  delete old.spots[0].parking.capacity;
  assert.equal(validateState(old).spots[0].parking.freeMinutes, null);
  s.parking.capacity = -1;
  assert.throws(() => validateState(state));
});
test("無条件の初期無料と購入条件付きサービスを区別し、unknownは駐車場条件に一致しない", () => {
  const state = initialState();
  const limited = searchResults(state, criteria({ parking: "free-limited" }));
  assert.ok(limited.some((s) => s.name === "SOCOLA南行徳"));
  assert.ok(!limited.some((s) => s.name === "アトレ新浦安"));
  assert.equal(
    state.spots.find((s) => s.name === "アトレ新浦安").parking.type,
    "paid",
  );
  assert.ok(
    searchResults(state, criteria({ parking: "available" })).every((s) =>
      ["free", "free-limited", "paid"].includes(s.parking.type),
    ),
  );
  assert.ok(
    searchResults(state, criteria({ parking: "free" })).some(
      (s) => s.name === "ニューコースト新浦安",
    ),
  );
});
test("指定の検索例は実データでヒットし、検索したタグ・設備をカード表示で優先する", () => {
  const state = initialState();
  const cases = [
    [
      criteria({ mainCategory: "shopping", subcategories: ["買い物"] }),
      "買い物",
    ],
    [criteria({ mainCategory: "shopping", subcategories: ["遊ぶ"] }), "遊ぶ"],
    [
      criteria({ mainCategory: "shopping", tags: ["コインゲーム"] }),
      "コインゲーム",
    ],
    [
      criteria({
        mainCategory: "outdoor",
        subcategories: ["公園", "BBQ"],
        camping: { bbq: true },
      }),
      "BBQ可",
    ],
    [
      criteria({
        mainCategory: "outdoor",
        subcategories: ["キャンプ"],
        camping: { dayCamp: true },
      }),
      "デイキャンプ",
    ],
    [
      criteria({
        mainCategory: "outdoor",
        subcategories: ["キャンプ"],
        camping: { bbq: true, bonfire: true },
      }),
      "焚き火OK",
    ],
    [
      criteria({
        mainCategory: "activity",
        subcategories: ["釣り"],
        fishing: { haze: true },
      }),
      "ハゼ釣り",
    ],
    [
      criteria({
        mainCategory: "relax",
        subcategories: ["温泉", "サウナ"],
        sauna: { available: true },
      }),
      "サウナ",
    ],
  ];
  for (const [c, expected] of cases) {
    const result = searchResults(state, c);
    assert.ok(result.length, expected);
    for (const s of result) {
      const p = resultPresentation(s, c);
      assert.ok(
        p.points.includes(expected) || p.tags.includes(expected),
        expected,
      );
      assert.ok(p.points.length <= 4);
    }
  }
  const s = {
    ...verifiedSpots[0],
    tags: ["先頭1", "先頭2", "先頭3", "先頭4", "コインゲーム"],
  };
  assert.equal(
    resultPresentation(s, criteria({ tags: ["コインゲーム"] })).tags[0],
    "コインゲーム",
  );
});
test("revision 6更新は未知情報を補完し、手入力・非表示・履歴・お気に入り・ユーザー登録を保持する", () => {
  const state = initialState();
  state.catalogRevision = 6;
  const old = new Map(baseline.map((s) => [s.id, s]));
  state.spots = state.spots.map((s) =>
    old.has(s.id) ? { ...s, ...structuredClone(old.get(s.id)) } : s,
  );
  const edited = state.spots.find((s) => s.name === "SOCOLA南行徳");
  edited.area = "手入力の所在地";
  edited.website = "https://example.com/";
  edited.travel.carMinutes = 77;
  edited.tags.push("家族タグ");
  edited.parking = {
    available: true,
    type: "free",
    fee: 0,
    note: "手入力",
    freeMinutes: null,
    capacity: 3,
  };
  const hidden = state.spots.find((s) => s.name === "ニューコースト新浦安");
  state.spots = state.spots.filter((s) => s.id !== hidden.id);
  state.archivedSpots = [hidden];
  state.removedBuiltinIds = [hidden.id];
  state.favorites = [hidden.id];
  state.visits = [
    {
      id: "v-info",
      spotId: hidden.id,
      date: "2026-01-01",
      rating: 5,
      comment: "大切な記録",
      intention: "また行きたい",
    },
  ];
  const user = {
    ...structuredClone(verifiedSpots[0]),
    id: "user-info",
    source: "user",
    name: "家族の場所",
  };
  state.spots.push(user);
  const updated = prepareState(state),
    e = updated.spots.find((s) => s.id === edited.id);
  assert.equal(e.area, edited.area);
  assert.equal(e.website, edited.website);
  assert.equal(e.travel.carMinutes, 77);
  assert.deepEqual(e.parking, edited.parking);
  assert.ok(e.tags.includes("家族タグ"));
  assert.ok(e.tags.includes("子ども服"));
  assert.equal(updated.archivedSpots[0].parking.type, "free");
  assert.deepEqual(updated.favorites, state.favorites);
  assert.deepEqual(updated.visits, state.visits);
  assert.deepEqual(updated.removedBuiltinIds, state.removedBuiltinIds);
  assert.equal(updated.spots.length, expectedCatalogSize);
  assert.equal(updated.spots.find((s) => s.id === user.id).name, user.name);
  assert.deepEqual(prepareState(updated), updated);
});
test("情報補完には施設ごとの公式出典があり、350件の固定IDを保持する", () => {
  assert.equal(verifiedSpots.length, expectedCatalogSize);
  assert.equal(new Set(verifiedSpots.map((s) => s.id)).size, expectedCatalogSize);
  for (const id of Object.keys(information))
    assert.ok(
      sources.some((s) => s.id === id && /^https:\/\//.test(s.source)),
      id,
    );
  const s = verifiedSpots.find((s) => s.name === "江戸川放水路");
  assert.equal(s.fishing.haze, true);
  assert.equal(
    verifiedSpots.find((s) => s.name === "箱根小涌園ユネッサン").sauna
      .familyUse,
    "yes",
  );
});
