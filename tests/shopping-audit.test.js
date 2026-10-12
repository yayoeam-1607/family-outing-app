import test from "node:test";
import assert from "node:assert/strict";
import { verifiedSpots, catalogRevision } from "../catalog.js";
import { initialState, prepareState, searchResults } from "../store.js";
import { pickerPool } from "../picker.js";
import { resultPresentation } from "../result-presentation.js";
import baseline from "../catalog-shopping-baseline.json" with { type: "json" };
import patches from "../catalog-shopping-data.json" with { type: "json" };
import audit from "../docs/shopping-audit.json" with { type: "json" };

const c = (extra = {}) => ({
  mainCategory: "shopping",
  subcategories: [],
  tags: [],
  ...extra,
});
const ids = (spots) => spots.map((s) => s.id).sort();
const find = (name) => verifiedSpots.find((s) => s.name === name);

test("48施設を個別監査し、公式根拠のあるタグだけを固定350件へ補完する", () => {
  assert.equal(catalogRevision, 9);
  assert.equal(verifiedSpots.length, 350);
  assert.equal(new Set(verifiedSpots.map((s) => s.id)).size, 350);
  assert.equal(baseline.length, 48);
  const shopping = verifiedSpots.filter((s) => s.mainCategory === "shopping");
  assert.deepEqual(ids(shopping), ids(baseline));
  assert.deepEqual(ids(audit.facilities), ids(baseline));
  for (const record of audit.facilities) {
    for (const feature of [
      "ゲームセンター",
      "コインゲーム",
      "クレーンゲーム",
      "映画館",
      "キッズ施設",
      "室内遊具",
      "ボウリング",
      "スポーツ／アクティビティ",
      "子ども向け遊び場",
    ])
      assert.ok(
        ["confirmed", "unknown"].includes(record.features[feature]),
        record.name + feature,
      );
    const patch = patches[record.id];
    for (const tag of patch?.tags ?? []) {
      assert.equal(record.features[tag], "confirmed");
      assert.ok(
        record.sources.some(
          (s) =>
            s.status === "reviewed" &&
            s.supports.includes(tag) &&
            /^https:\/\//.test(s.url),
        ),
        record.name + tag,
      );
    }
    if (patch?.subcategories?.includes("遊ぶ")) assert.ok(patch.tags.length);
  }
  // 別施設・閉店店舗・未設置表記を勝手に肯定しない。
  for (const name of [
    "MONA新浦安",
    "アトレ新浦安",
    "レイクタウンアウトレット",
    "三井アウトレットパーク 入間",
  ])
    assert.equal(find(name).subcategories.includes("遊ぶ"), false, name);
  assert.equal(find("流山おおたかの森S・C").tags.includes("キッズ施設"), false);
  for (const name of ["ららぽーと富士見", "イオンモール川口", "ららぽーと横浜"])
    assert.equal(find(name).tags.includes("コインゲーム"), false, name);
  assert.equal(find("ららぽーと立川立飛").tags.includes("映画館"), false);
});

test("ショッピング8検索の全候補で選択した条件がカードに優先表示される", () => {
  const state = initialState();
  const cases = [
    [c(), 48],
    [c({ subcategories: ["買い物"] }), 48],
    [c({ subcategories: ["遊ぶ"] }), 40],
  ];
  for (const [tag, count] of [
    ["ゲームセンター", 31],
    ["コインゲーム", 21],
    ["クレーンゲーム", 26],
    ["映画館", 18],
    ["キッズ施設", 26],
  ])
    cases.push([c({ subcategories: ["遊ぶ"], tags: [tag] }), count]);
  for (const [criteria, count] of cases) {
    const result = searchResults(state, criteria);
    assert.equal(result.length, count);
    for (const spot of result) {
      const card = resultPresentation(spot, criteria);
      for (const tag of criteria.tags) assert.equal(card.tags[0], tag);
      for (const sub of criteria.subcategories)
        assert.ok(card.points.includes(sub));
    }
  }
  const coin = searchResults(state, c({ tags: ["コインゲーム"] }));
  for (const name of [
    "ニューコースト新浦安",
    "イオン市川妙典店",
    "イオンモール船橋",
    "テラスモール松戸",
    "アリオ葛西",
    "アリオ北砂",
  ])
    assert.ok(
      coin.some((s) => s.name === name),
      name,
    );
});

test("自由検索の同義語は同じ候補を返し、canonicalタグを優先し、他条件を維持する", () => {
  const state = initialState();
  for (const [tag, aliases] of [
    ["コインゲーム", ["メダルゲーム"]],
    [
      "クレーンゲーム",
      ["UFOキャッチャー", "ＵＦＯキャッチャー", "プライズゲーム", "プライズ"],
    ],
    ["キッズ施設", ["キッズパーク", "子ども遊び場", "室内遊び場"]],
  ]) {
    const expected = searchResults(state, c({ query: tag }));
    assert.ok(expected.length);
    for (const query of aliases) {
      const criteria = c({ query });
      const result = searchResults(state, criteria);
      assert.deepEqual(ids(result), ids(expected));
      for (const spot of result.filter((s) => s.tags.includes(tag)))
        assert.equal(resultPresentation(spot, criteria).tags[0], tag);
    }
  }
  assert.equal(
    searchResults(state, c({ query: "メダルゲーム 存在しないキーワード" }))
      .length,
    0,
  );
  const narrow = c({
    query: "メダルゲーム",
    travelRange: "0-30",
    transport: "car",
    parking: "free",
  });
  for (const spot of searchResults(state, narrow)) {
    assert.ok(spot.travel.carMinutes <= 30);
    assert.equal(spot.parking.type, "free");
  }
  assert.deepEqual(
    find("アリオ北砂").tags.filter((t) =>
      ["メダルゲーム", "プライズゲーム", "UFOキャッチャー"].includes(t),
    ),
    [],
  );
});

test("revision7から8へ補完し、ユーザー編集・削除済みタグ・非表示・思い出を保護する", () => {
  const state = initialState();
  state.catalogRevision = 7;
  const old = new Map(baseline.map((s) => [s.id, s]));
  state.spots = state.spots.map((s) =>
    old.has(s.id) ? { ...s, ...structuredClone(old.get(s.id)) } : s,
  );
  const edited = state.spots.find((s) => s.name === "モラージュ柏");
  edited.parking.note = "家族専用の駐車場メモ";
  edited.name = "我が家のモラージュ";
  edited.tags = ["家族専用タグ"];
  const removed = state.spots.find((s) => s.name === "テラスモール松戸");
  removed.tags = removed.tags.filter((t) => t !== "クレーンゲーム");
  const changed = state.spots.find((s) => s.name === "ららぽーと新三郷");
  changed.mainCategory = "indoor";
  changed.subcategories = ["ゲーム"];
  changed.tags = ["手入力"];
  const hidden = state.spots.find((s) => s.name === "ニューコースト新浦安");
  state.spots = state.spots.filter((s) => s.id !== hidden.id);
  state.archivedSpots = [hidden];
  state.removedBuiltinIds = [hidden.id];
  state.favorites = [hidden.id];
  state.visits = [
    {
      id: "shopping-memory",
      spotId: hidden.id,
      date: "2026-01-01",
      rating: 5,
      comment: "絶対に残す思い出",
      intention: "また行きたい",
    },
  ];
  const user = {
    ...structuredClone(hidden),
    id: "user-shopping",
    source: "user",
    name: "家族の登録施設",
  };
  state.spots.push(user);
  const before = structuredClone(state),
    next = prepareState(state);
  assert.equal(next.catalogRevision, 9);
  assert.deepEqual(next.favorites, before.favorites);
  assert.deepEqual(next.visits, before.visits);
  assert.deepEqual(next.removedBuiltinIds, before.removedBuiltinIds);
  assert.deepEqual(
    next.spots.find((s) => s.id === user.id),
    user,
  );
  assert.equal(
    next.spots.some((s) => s.id === hidden.id),
    false,
  );
  assert.ok(next.archivedSpots[0].tags.includes("コインゲーム"));
  const e = next.spots.find((s) => s.id === edited.id);
  assert.equal(e.name, edited.name);
  assert.equal(e.parking.note, edited.parking.note);
  assert.equal(e.parking.type, edited.parking.type);
  assert.equal(e.parking.available, edited.parking.available);
  assert.ok(e.tags.includes("家族専用タグ"));
  assert.ok(e.tags.includes("コインゲーム"));
  const r = next.spots.find((s) => s.id === removed.id);
  assert.equal(r.tags.includes("クレーンゲーム"), false);
  assert.ok(r.tags.includes("コインゲーム"));
  const ch = next.spots.find((s) => s.id === changed.id);
  assert.deepEqual(ch.tags, changed.tags);
  assert.deepEqual(ch.subcategories, changed.subcategories);
  assert.deepEqual(prepareState(next), next);
});

test("移動時間の上限を広げると近場をすべて含み、車・電車・おまかせで一致する", () => {
  const state = initialState();
  for (const transport of ["car", "train"]) {
    let previous = [];
    for (const max of [30, 60, 90, 120, 180]) {
      const criteria = c({
        mainCategory: "any",
        transport,
        travelRange: `0-${max}`,
      });
      const result = searchResults(state, criteria),
        current = new Set(ids(result));
      assert.ok(result.length);
      assert.ok(previous.every((id) => current.has(id)));
      for (const s of result)
        assert.ok(
          s.travel[transport === "car" ? "carMinutes" : "trainMinutes"] !==
            null &&
            s.travel[transport === "car" ? "carMinutes" : "trainMinutes"] <=
              max,
        );
      assert.deepEqual(
        ids(pickerPool(state, criteria, "current").spots),
        ids(result),
      );
      assert.deepEqual(
        ids(pickerPool(state, criteria, "category").spots),
        ids(result),
      );
      previous = ids(result);
    }
  }
  assert.equal(
    searchResults(state, c({ mainCategory: "any", travelRange: "any" })).length,
    350,
  );
});
