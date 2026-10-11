import { verifiedSpots, catalogReady, catalogRevision } from "./catalog.js";
import { migrateCatalogue } from "./catalog-migration.js";
import { spots, filterSpots, canonicalCategory } from "./spots.js";
import {
  taxonomy,
  seasons,
  campingFields,
  fishingFields,
  saunaFields,
} from "./taxonomy.js";
import { upgradeSpot } from "./spot-schema.js";
import { filterAdvanced } from "./search.js";
export const storageKey = "family-outing-data-v1";
export const intentions = [
  "また行きたい",
  "どちらでも",
  "普通",
  "もう行かなくてよい",
];
export function initialState() {
  return validateState({
    version: 3,
    catalogRevision,
    spots: structuredClone(verifiedSpots),
    archivedSpots: [],
    removedBuiltinIds: [],
    favorites: [],
    visits: [],
  });
}
export function prepareState(data) {
  const valid = validateState(data);
  return catalogReady &&
    (valid.version < 3 || valid.catalogRevision < catalogRevision)
    ? validateState(migrateCatalogue(valid, verifiedSpots, catalogRevision))
    : valid;
}
export function allSpots(state) {
  return [...state.spots, ...(state.archivedSpots ?? [])];
}
const txt = (v, max = 2000) => typeof v === "string" && v.length <= max;
const num = (v, max = 1e7) => Number.isFinite(v) && v >= 0 && v <= max;
const nullableNum = (v, max) => v === null || num(v, max);
const bool = (v) => [true, false, null].includes(v);
const ident = (v) =>
  (typeof v === "string" && v.length > 0 && v.length <= 100) ||
  (Number.isInteger(v) && v > 0);
const array = (v, values) =>
  Array.isArray(v) &&
  v.length <= 100 &&
  new Set(v).size === v.length &&
  v.every((x) => (values ? values.includes(x) : txt(x, 100)));
const fail = () => {
  throw Error("バックアップのデータが不正です。元データは変更していません。");
};
export function validWebsite(value) {
  if (value === "") return true;
  try {
    const u = new URL(value);
    return (
      ["https:", "http:"].includes(u.protocol) && !u.username && !u.password
    );
  } catch {
    return false;
  }
}
export function cleanSpot(s) {
  const keep = [
    "id",
    "name",
    "description",
    "prefecture",
    "area",
    "website",
    "famous",
    "source",
    "sample",
    "mainCategory",
    "subcategories",
    "tags",
    "seasons",
    "weather",
    "travel",
    "price",
    "parking",
    "stayDuration",
    "camping",
    "fishing",
    "sauna",
    "type",
    "category",
    "cost",
    "stays",
    "rating",
    "tent",
    "bbq",
    "rainy",
  ];
  const cleaned = Object.fromEntries(
    keep.map((k) => [k, structuredClone(s[k])]),
  );
  cleaned.travel = Object.fromEntries(
    ["car", "train", "carMinutes", "trainMinutes"]
      .filter((k) => s.travel[k] !== undefined)
      .map((k) => [k, s.travel[k]]),
  );
  cleaned.price = Object.fromEntries(
    ["free", "family4Min", "family4Max", "family4Typical", "note"].map((k) => [
      k,
      s.price[k],
    ]),
  );
  cleaned.parking = Object.fromEntries(
    ["available", "type", "fee", "note"].map((k) => [k, s.parking[k]]),
  );
  for (const [group, fields] of Object.entries({
    camping: campingFields,
    fishing: fishingFields,
    sauna: saunaFields,
  }))
    if (s[group])
      cleaned[group] = Object.fromEntries(
        [
          ...Object.keys(fields),
          ...(group === "camping"
            ? ["reservation"]
            : group === "sauna"
              ? ["familyUse", "childUse", "childAgeRule"]
              : []),
        ].map((k) => [k, s[group][k]]),
      );
  return cleaned;
}
export function validateState(data) {
  if (
    !data ||
    ![1, 2, 3].includes(data.version) ||
    !Array.isArray(data.spots) ||
    !Array.isArray(data.favorites) ||
    !Array.isArray(data.visits) ||
    data.spots.length > 10000 ||
    data.visits.length > 50000
  )
    fail();
  if (
    data.version >= 2 &&
    (!Number.isInteger(data.catalogRevision) ||
      data.catalogRevision < 1 ||
      !Array.isArray(data.archivedSpots) ||
      data.archivedSpots.length > 10000 ||
      !Array.isArray(data.removedBuiltinIds) ||
      data.removedBuiltinIds.some(
        (x) => typeof x !== "string" || !x.startsWith("place-"),
      ))
  )
    fail();
  const normalized = {
      ...data,
      spots: data.spots.map(upgradeSpot),
      archivedSpots: (data.archivedSpots ?? []).map(upgradeSpot),
    },
    ids = new Set();
  for (const s of allSpots(normalized)) {
    if (
      !ident(s.id) ||
      ids.has(s.id) ||
      !txt(s.name, 100) ||
      !s.name.trim() ||
      !txt(s.description) ||
      !["", "東京都", "千葉県", "埼玉県", "神奈川県"].includes(s.prefecture) ||
      !txt(s.area, 200) ||
      !txt(s.website) ||
      !validWebsite(s.website) ||
      typeof s.famous !== "boolean" ||
      !["builtin", "user", "legacy"].includes(s.source) ||
      typeof s.sample !== "boolean" ||
      !Object.hasOwn(taxonomy, s.mainCategory)
    )
      fail();
    if (
      !array(s.subcategories) ||
      !array(s.tags) ||
      !array(s.seasons, Object.keys(seasons)) ||
      !array(s.weather, ["sunny", "rainy", "indoor"]) ||
      !array(s.stayDuration, [2, 4, 8]) ||
      !s.travel ||
      !nullableNum(s.travel.carMinutes, 1440) ||
      !nullableNum(s.travel.trainMinutes, 1440)
    )
      fail();
    if (
      !["indoor", "outdoor", "unknown"].includes(s.type) ||
      !txt(s.category, 100) ||
      !nullableNum(s.cost) ||
      !array(s.stays, [2, 4, 8]) ||
      !Number.isInteger(s.rating) ||
      s.rating < 1 ||
      s.rating > 5 ||
      !bool(s.tent) ||
      !bool(s.bbq) ||
      typeof s.rainy !== "boolean"
    )
      fail();
    const p = s.price,
      q = s.parking;
    if (
      !p ||
      !bool(p.free) ||
      ["family4Min", "family4Max", "family4Typical"].some(
        (k) => !nullableNum(p[k]),
      ) ||
      (p.note !== null && !txt(p.note)) ||
      (p.family4Min !== null &&
        p.family4Max !== null &&
        p.family4Min > p.family4Max)
    )
      fail();
    if (
      !q ||
      !bool(q.available) ||
      !["free", "paid", "none", "unknown"].includes(q.type) ||
      !nullableNum(q.fee) ||
      (q.note !== null && !txt(q.note))
    )
      fail();
    for (const [group, fields] of Object.entries({
      camping: campingFields,
      fishing: fishingFields,
      sauna: saunaFields,
    })) {
      const d = s[group];
      if (
        d !== null &&
        (!d ||
          typeof d !== "object" ||
          Object.keys(fields).some((k) => !bool(d[k])))
      )
        fail();
    }
    if (
      s.camping &&
      !["required", "possible", "not-required", "unknown"].includes(
        s.camping.reservation,
      )
    )
      fail();
    if (
      s.sauna &&
      (!["yes", "no", "conditional", "unknown"].includes(s.sauna.familyUse) ||
        !["yes", "no", "ageRestricted", "unknown"].includes(s.sauna.childUse) ||
        (s.sauna.childAgeRule !== null && !txt(s.sauna.childAgeRule)))
    )
      fail();
    ids.add(s.id);
  }
  if (
    new Set(data.favorites).size !== data.favorites.length ||
    data.favorites.some((x) => !ids.has(x))
  )
    fail();
  const visits = new Set();
  for (const v of data.visits) {
    if (
      !v ||
      !ident(v.id) ||
      visits.has(v.id) ||
      !ids.has(v.spotId) ||
      !txt(v.date, 10) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(v.date) ||
      !Number.isFinite(Date.parse(v.date)) ||
      new Date(v.date).toISOString().slice(0, 10) !== v.date ||
      !Number.isInteger(v.rating) ||
      v.rating < 1 ||
      v.rating > 5 ||
      !txt(v.comment) ||
      !intentions.includes(v.intention)
    )
      fail();
    visits.add(v.id);
  }
  if (data.version >= 2 && normalized.spots.some((s) => s.source === "legacy"))
    fail();
  return {
    version: data.version,
    ...(data.version >= 2
      ? {
          catalogRevision: data.catalogRevision,
          removedBuiltinIds: [...new Set(data.removedBuiltinIds)],
          archivedSpots: normalized.archivedSpots.map(cleanSpot),
        }
      : normalized.archivedSpots.length
        ? { archivedSpots: normalized.archivedSpots.map(cleanSpot) }
        : {}),
    spots: normalized.spots.map(cleanSpot),
    favorites: [...data.favorites],
    visits: data.visits.map((v) => ({
      id: v.id,
      spotId: v.spotId,
      date: v.date,
      rating: v.rating,
      comment: v.comment,
      intention: v.intention === "普通" ? "どちらでも" : v.intention,
    })),
  };
}
export function visitCount(state, id) {
  return state.visits.filter((v) => v.spotId === id).length;
}
export function sortedVisits(state, order = "date") {
  return [...state.visits].sort(
    (a, b) =>
      (order === "rating"
        ? b.rating - a.rating
        : order === "count"
          ? visitCount(state, b.spotId) - visitCount(state, a.spotId)
          : 0) ||
      b.date.localeCompare(a.date) ||
      state.visits.indexOf(b) - state.visits.indexOf(a),
  );
}
export function collection(state, view) {
  return (view === "favorites" ? allSpots(state) : state.spots)
    .filter((s) =>
      view === "favorites"
        ? state.favorites.includes(s.id)
        : view === "unvisited"
          ? visitCount(state, s.id) === 0
          : view === "frequent"
            ? visitCount(state, s.id) > 0
            : view === "again"
              ? sortedVisits(state).find((v) => v.spotId === s.id)
                  ?.intention === "また行きたい"
              : true,
    )
    .sort((a, b) =>
      view === "frequent"
        ? visitCount(state, b.id) - visitCount(state, a.id)
        : 0,
    );
}
// 通常操作は非表示。参照元を保管し、お気に入り・思い出を保持。
export function deleteSpot(state, id) {
  const spot = state.spots.find((s) => s.id === id);
  if (!spot) return state;
  return {
    ...state,
    spots: state.spots.filter((s) => s.id !== id),
    archivedSpots: [...(state.archivedSpots ?? []), structuredClone(spot)],
    removedBuiltinIds:
      spot.source === "builtin"
        ? [...new Set([...(state.removedBuiltinIds ?? []), id])]
        : [...(state.removedBuiltinIds ?? [])],
  };
}
export function restoreSpot(state, id) {
  const s = state.archivedSpots?.find((x) => x.id === id);
  if (!s || s.source === "legacy") return state;
  return {
    ...state,
    spots: [...state.spots, s],
    archivedSpots: state.archivedSpots.filter((x) => x.id !== id),
    removedBuiltinIds: state.removedBuiltinIds.filter((x) => x !== id),
  };
}
export function purgeSpot(state, id) {
  const s = allSpots(state).find((x) => x.id === id);
  return {
    ...state,
    spots: state.spots.filter((x) => x.id !== id),
    archivedSpots: (state.archivedSpots ?? []).filter((x) => x.id !== id),
    favorites: state.favorites.filter((x) => x !== id),
    visits: state.visits.filter((x) => x.spotId !== id),
    removedBuiltinIds:
      s?.source === "builtin"
        ? [...new Set([...(state.removedBuiltinIds ?? []), id])]
        : state.removedBuiltinIds,
  };
}
export function recommendationScore(s) {
  return ["shopping", "outdoor"].includes(s.mainCategory) ||
    [
      "ショッピングモール",
      "大型公園",
      "キャンプ／デイキャンプ",
      "キャンプ・デイキャンプ",
      "アウトレット",
      "BBQ",
      "テントOK",
      "アスレチック",
    ].includes(s.category) ||
    s.tent
    ? 2
    : s.type === "outdoor"
      ? 1
      : 0;
}
export function recommended(source) {
  return [...source].sort(
    (a, b) => recommendationScore(b) - recommendationScore(a),
  );
}
export function searchResults(state, c, apply = true) {
  const advanced = [
    "query",
    "mainCategory",
    "subcategories",
    "tags",
    "travelRange",
    "budgetMin",
    "budgetMax",
    "parking",
    "seasons",
    "camping",
    "fishing",
    "sauna",
  ].some((k) => Object.hasOwn(c, k));
  let result = apply
    ? advanced
      ? filterAdvanced(state.spots, c)
      : filterSpots(
          { weather: "any", travel: "any", budget: "any", stay: "any", ...c },
          state.spots,
        )
    : [...state.spots];
  if (c.focus === "rainy") result = result.filter((s) => s.rainy);
  if (c.focus === "outdoor")
    result = result.filter((s) => s.type === "outdoor");
  if (c.focus === "shopping")
    result = result.filter(
      (s) =>
        s.mainCategory === "shopping" ||
        ["ショッピングモール", "アウトレット"].includes(canonicalCategory(s)),
    );
  if (c.focus === "unvisited" || c.unvisited)
    result = result.filter((s) => visitCount(state, s.id) === 0);
  if (c.focus === "famous") result = result.filter((s) => s.famous);
  if (c.focus === "far")
    result = result.filter(
      (s) =>
        (s.travel[c.transport === "train" ? "trainMinutes" : "carMinutes"] ??
          s.travel[c.transport]) > 60,
    );
  const time = (s) =>
    s.travel[c.transport === "train" ? "trainMinutes" : "carMinutes"] ??
    s.travel[c.transport] ??
    Infinity;
  result =
    c.sort === "distance"
      ? result.sort((a, b) => time(a) - time(b))
      : recommended(result);
  return c.famousPriority === "yes" || c.famousPriority === true
    ? result.sort((a, b) => Number(b.famous) - Number(a.famous))
    : result;
}
export function memoryYears(state) {
  return [...new Set(state.visits.map((v) => Number(v.date.slice(0, 4))))].sort(
    (a, b) => b - a,
  );
}
export function yearMemories(state, year) {
  const visits = sortedVisits(state).filter(
      (v) => Number(v.date.slice(0, 4)) === Number(year),
    ),
    places = new Set(visits.map((v) => v.spotId)),
    lookup = new Map(allSpots(state).map((s) => [s.id, s]));
  const counts = new Map(),
    cats = new Map();
  for (const v of visits) {
    counts.set(v.spotId, (counts.get(v.spotId) ?? 0) + 1);
    const cat = lookup.get(v.spotId)?.mainCategory;
    cats.set(cat, (cats.get(cat) ?? 0) + 1);
  }
  const top = (map) =>
    [...map.entries()].sort(
      (a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])),
    )[0] ?? null;
  const first = new Map();
  for (const v of state.visits)
    if (!first.has(v.spotId) || v.date < first.get(v.spotId))
      first.set(v.spotId, v.date);
  return {
    year: Number(year),
    visits,
    outings: visits.length,
    uniquePlaces: places.size,
    topSpot: top(counts),
    topCategory: top(cats),
    fiveStarPlaces: new Set(
      visits.filter((v) => v.rating === 5).map((v) => v.spotId),
    ).size,
    againPlaces: [...places].filter(
      (id) => visits.find((v) => v.spotId === id)?.intention === "また行きたい",
    ).length,
    firstTimePlaces: [...places].filter(
      (id) => first.get(id)?.slice(0, 4) === String(year),
    ).length,
  };
}
export function backupBeforeV3(storage, raw) {
  if (raw !== null && storage.getItem(storageKey + "-before-v3") === null)
    storage.setItem(storageKey + "-before-v3", raw);
}
