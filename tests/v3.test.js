import { expectedCatalogSize } from "../catalog.js";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { verifiedSpots } from "../catalog.js";
import { additionalSpots } from "../catalog-additions.js";
import {
  taxonomy,
  emptyDetails,
  campingFields,
  fishingFields,
  saunaFields,
} from "../taxonomy.js";
import {
  initialState,
  prepareState,
  validateState,
  deleteSpot,
  restoreSpot,
  yearMemories,
  backupBeforeV3,
  storageKey,
} from "../store.js";
import { matchesSpot } from "../search.js";
const old = JSON.parse(
  fs.readFileSync(new URL("./fixtures/catalogue-v2.json", import.meta.url)),
);
const specimen = () => ({
  ...structuredClone(verifiedSpots[0]),
  mainCategory: "outdoor",
  subcategories: ["キャンプ", "BBQ"],
  tags: ["芝生", "BBQ可"],
  seasons: ["spring"],
  weather: ["sunny"],
  travel: { carMinutes: 60, trainMinutes: 90 },
  price: {
    free: false,
    family4Min: 3000,
    family4Max: 6000,
    family4Typical: 5000,
    note: null,
  },
  parking: {
    available: true,
    type: "free",
    freeMinutes: null,
    fee: 0,
    capacity: null,
    note: null,
  },
  camping: {
    ...emptyDetails(campingFields),
    bbq: true,
    carBesideSite: true,
    reservation: "required",
  },
  fishing: emptyDetails(fishingFields),
  sauna: {
    ...emptyDetails(saunaFields),
    familyUse: "unknown",
    childUse: "unknown",
    childAgeRule: null,
  },
});
test("350件・10大カテゴリ・既存250ID維持と2バッチの独立性", () => {
  assert.equal(verifiedSpots.length, expectedCatalogSize);
  assert.equal(new Set(verifiedSpots.map((s) => s.id)).size, expectedCatalogSize);
  assert.equal(
    new Set(verifiedSpots.map((s) => s.name.normalize("NFKC"))).size,
    expectedCatalogSize,
  );
  for (const s of old)
    assert.ok(verifiedSpots.some((x) => x.id === s.id && x.name === s.name));
  assert.equal(Object.keys(taxonomy).length, 10);
  for (const key of Object.keys(taxonomy))
    assert.ok(verifiedSpots.some((s) => s.mainCategory === key));
  for (const batch of [
    additionalSpots.slice(0, 50),
    additionalSpots.slice(50),
  ]) {
    assert.equal(batch.length, 50);
    assert.equal(new Set(batch.map((s) => s.id)).size, 50);
    validateState({
      ...initialState(),
      spots: batch,
      favorites: [],
      visits: [],
    });
  }
});
test("v2→v3で編集・追加・非表示・お気に入り・思い出を保護する", () => {
  const data = {
    version: 2,
    catalogRevision: 4,
    spots: structuredClone(old),
    archivedSpots: [],
    removedBuiltinIds: [],
    favorites: [old[0].id],
    visits: [
      {
        id: "v",
        spotId: old[0].id,
        date: "2025-01-01",
        rating: 5,
        comment: "大切なメモ",
        intention: "また行きたい",
      },
    ],
  };
  data.spots[0].description = "編集済み";
  data.spots[0].cost = 1234;
  data.spots.push({
    ...old[1],
    id: "user-family",
    source: "user",
    name: "登録場所",
  });
  data.removedBuiltinIds = [data.spots.splice(2, 1)[0].id];
  const raw = JSON.stringify(data),
    next = prepareState(data);
  assert.equal(next.version, 3);
  assert.equal(next.spots.length, expectedCatalogSize);
  assert.deepEqual(next.favorites, data.favorites);
  assert.deepEqual(next.visits, data.visits);
  assert.equal(next.spots[0].description, "編集済み");
  assert.equal(next.spots[0].price.family4Typical, 1234);
  assert.ok(!next.spots.some((s) => data.removedBuiltinIds.includes(s.id)));
  assert.equal(JSON.stringify(data), raw);
  assert.deepEqual(prepareState(JSON.parse(JSON.stringify(next))), next);
});
test("非表示で履歴・お気に入り・施設名を保持し、同じIDで復元する", () => {
  const state = initialState(),
    id = state.spots[0].id;
  state.favorites = [id];
  state.visits = [
    {
      id: "memory",
      spotId: id,
      date: "2026-01-01",
      rating: 5,
      comment: "思い出",
      intention: "また行きたい",
    },
  ];
  const next = prepareState(deleteSpot(state, id));
  assert.equal(next.visits.length, 1);
  assert.deepEqual(next.favorites, [id]);
  assert.ok(next.archivedSpots.some((s) => s.id === id));
  assert.ok(!next.spots.some((s) => s.id === id));
  assert.equal(restoreSpot(next, id).spots.length, expectedCatalogSize);
  assert.equal(yearMemories(next, 2026).outings, 1);
});
test("自由検索・大カテゴリ・中カテゴリ・タグのANDと同グループOR", () => {
  const s = specimen();
  for (const c of [
    { query: "公園 キャンプ" },
    { mainCategory: "outdoor" },
    { subcategories: ["水遊び", "キャンプ"] },
    { tags: ["BBQ可", "川遊び"] },
  ])
    assert.equal(matchesSpot(s, c), true);
  assert.equal(
    matchesSpot(s, { mainCategory: "shopping", tags: ["BBQ可"] }),
    false,
  );
  assert.equal(matchesSpot(s, { query: "存在しない" }), false);
  assert.equal(matchesSpot(s, { tags: ["川遊び"] }), false);
});
test("時間範囲・予算上下限・無料・不明・料金範囲重なり", () => {
  const s = specimen();
  assert.equal(
    matchesSpot(s, { transport: "car", travelRange: "30-60" }),
    true,
  );
  assert.equal(
    matchesSpot(s, { transport: "train", travelRange: "30-60" }),
    false,
  );
  assert.equal(matchesSpot(s, { budgetMin: 3000, budgetMax: 5000 }), true);
  assert.equal(matchesSpot(s, { budgetMin: 6000 }), false);
  s.price.family4Typical = null;
  assert.equal(matchesSpot(s, { budgetMin: 5500, budgetMax: 8000 }), true);
  s.price.family4Min = s.price.family4Max = null;
  assert.equal(matchesSpot(s, { budgetMax: 10000 }), false);
  s.price.free = true;
  assert.equal(matchesSpot(s, { budgetMax: 0 }), true);
  assert.equal(matchesSpot(s, { budgetMin: 3000 }), false);
  s.travel.carMinutes = null;
  assert.equal(matchesSpot(s, { travelRange: "0-30" }), false);
});
test("駐車場・天気・季節ORと通年", () => {
  const s = specimen();
  assert.equal(
    matchesSpot(s, {
      parking: "free",
      weather: "sunny",
      seasons: ["summer", "spring"],
    }),
    true,
  );
  assert.equal(matchesSpot(s, { parking: "paid" }), false);
  assert.equal(matchesSpot(s, { weather: "indoor" }), false);
  assert.equal(matchesSpot(s, { seasons: ["winter"] }), false);
  s.seasons = ["all"];
  assert.equal(matchesSpot(s, { seasons: ["winter"] }), true);
  s.seasons = [];
  assert.equal(matchesSpot(s, { seasons: ["winter"] }), false);
});
test("キャンプ・釣り・サウナの異なる特徴はAND、nullは一致しない", () => {
  const s = specimen();
  assert.equal(
    matchesSpot(s, { camping: { bbq: true, carBesideSite: true } }),
    true,
  );
  assert.equal(
    matchesSpot(s, { camping: { bbq: true, bonfire: true } }),
    false,
  );
  s.fishing.haze = s.fishing.rodRental = true;
  assert.equal(
    matchesSpot(s, { fishing: { haze: true, rodRental: true } }),
    true,
  );
  assert.equal(matchesSpot(s, { fishing: { horseMackerel: true } }), false);
  s.sauna.available = true;
  s.sauna.familyUse = "conditional";
  s.sauna.childUse = "ageRestricted";
  s.sauna.privateSauna = true;
  assert.equal(
    matchesSpot(s, {
      sauna: {
        available: true,
        familyUse: "conditional",
        childUse: "ageRestricted",
        privateSauna: true,
      },
    }),
    true,
  );
  assert.equal(matchesSpot(s, { sauna: { mixedGenderUse: true } }), false);
});
test("年別の訪問件数とユニーク数・年内最新意向・初訪問を区別する", () => {
  const state = initialState(),
    a = state.spots[0].id,
    b = state.spots[1].id;
  state.visits = [
    {
      id: "a1",
      spotId: a,
      date: "2025-01-01",
      rating: 5,
      comment: "前年",
      intention: "また行きたい",
    },
    {
      id: "a2",
      spotId: a,
      date: "2026-01-01",
      rating: 5,
      comment: "",
      intention: "また行きたい",
    },
    {
      id: "a3",
      spotId: a,
      date: "2026-10-11",
      rating: 4,
      comment: "",
      intention: "どちらでも",
    },
    {
      id: "b",
      spotId: b,
      date: "2026-10-10",
      rating: 5,
      comment: "",
      intention: "また行きたい",
    },
  ];
  const m = yearMemories(state, 2026);
  assert.equal(m.outings, 3);
  assert.equal(m.uniquePlaces, 2);
  assert.deepEqual(m.topSpot, [a, 2]);
  assert.equal(m.fiveStarPlaces, 2);
  assert.equal(m.againPlaces, 1);
  assert.equal(m.firstTimePlaces, 1);
  assert.deepEqual(
    m.visits.map((v) => v.id),
    ["a3", "b", "a2"],
  );
});
test("v3全項目はJSON往復し未知プロパティや画像は保存しない", () => {
  const state = initialState();
  state.spots[0] = specimen();
  state.spots[0].photo = "data:huge";
  const saved = validateState(state);
  assert.equal(saved.spots[0].photo, undefined);
  assert.deepEqual(prepareState(JSON.parse(JSON.stringify(saved))), saved);
  for (const key of [
    "camping",
    "fishing",
    "sauna",
    "parking",
    "price",
    "tags",
    "weather",
    "seasons",
  ])
    assert.deepEqual(saved.spots[0][key], state.spots[0][key]);
  assert.throws(() =>
    validateState({
      ...state,
      spots: [
        {
          ...specimen(),
          parking: { type: "paid", available: true, fee: -1, note: null },
        },
      ],
    }),
  );
});
test("移行前バックアップは初回のみ。失敗時は保存を中断できる", () => {
  const data = new Map(),
    storage = {
      getItem: (k) => data.get(k) ?? null,
      setItem: (k, v) => data.set(k, v),
    };
  backupBeforeV3(storage, "first");
  backupBeforeV3(storage, "second");
  assert.equal(data.get(storageKey + "-before-v3"), "first");
  assert.throws(() =>
    backupBeforeV3(
      {
        getItem: () => null,
        setItem: () => {
          throw Error("quota");
        },
      },
      "original",
    ),
  );
});

test("前版250件の新項目は初期状態と移行後で一致し、明示したnullを保持する", () => {
  const migrated = prepareState({
    version: 2,
    catalogRevision: 4,
    spots: old,
    archivedSpots: [],
    removedBuiltinIds: [],
    favorites: [],
    visits: [],
  });
  for (const previous of old) {
    const a = migrated.spots.find((s) => s.id === previous.id),
      b = verifiedSpots.find((s) => s.id === previous.id);
    for (const key of [
      "mainCategory",
      "subcategories",
      "tags",
      "parking",
      "price",
      "camping",
      "fishing",
      "sauna",
      "seasons",
    ])
      assert.deepEqual(a[key], b[key], previous.name + " " + key);
    assert.equal(a.travel.car, previous.travel.car);
    assert.equal(a.travel.train, previous.travel.train);
  }
  const state = initialState(),
    spot = state.spots.find((s) => s.sauna);
  spot.sauna = null;
  const again = prepareState(JSON.parse(JSON.stringify(state)));
  assert.equal(again.spots.find((s) => s.id === spot.id).sauna, null);
});
test("確認済み専用特徴はタグと自由検索にも使え、春の施設を全て潮干狩りと誤認しない", () => {
  const s = specimen();
  s.tags = [];
  s.camping.handsFreeBbq = true;
  assert.equal(matchesSpot(s, { tags: ["手ぶらBBQ"] }), true);
  assert.equal(matchesSpot(s, { query: "手ぶらBBQ" }), true);
  s.tags = ["いちご狩り"];
  s.seasons = ["spring"];
  assert.equal(matchesSpot(s, { query: "潮干狩り" }), false);
  assert.equal(matchesSpot(s, { query: "春" }), true);
});
