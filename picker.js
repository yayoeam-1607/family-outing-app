import { searchResults, collection } from "./store.js";
export function randomIndex(
  length,
  cryptoSource = globalThis.crypto,
  fallback = Math.random,
) {
  if (!Number.isInteger(length) || length < 1 || length > 0x100000000)
    throw Error("抽選候補が不正です");
  if (!cryptoSource?.getRandomValues) return Math.floor(fallback() * length);
  const values = new Uint32Array(1),
    limit = Math.floor(0x100000000 / length) * length;
  do {
    cryptoSource.getRandomValues(values);
  } while (values[0] >= limit);
  return values[0] % length;
}
export function commonCriteria(criteria) {
  // カテゴリ・自由検索・カテゴリ専用条件を解除し、共通条件はそのまま再利用。
  return {
    ...criteria,
    query: "",
    mainCategory: "any",
    subcategories: [],
    tags: [],
    camping: {},
    fishing: {},
    sauna: {},
    focus: undefined,
  };
}
export function pickerPool(state, criteria, mode, lists = []) {
  if (mode === "current")
    return { spots: searchResults(state, criteria), criteria };
  if (mode === "category") {
    const common = commonCriteria(criteria);
    return { spots: searchResults(state, common), criteria: common };
  }
  if (mode !== "lists") throw Error("抽選方法が不正です");
  const ids = new Set(
    lists
      .filter((k) => ["favorites", "again", "unvisited"].includes(k))
      .flatMap((k) => collection(state, k).map((s) => s.id)),
  );
  return {
    spots: state.spots.filter((s) => ids.has(s.id)),
    criteria: { transport: criteria.transport },
  };
}
export function drawSpot(
  spots,
  { category = false, previousId = null, index = randomIndex } = {},
) {
  if (!spots.length) return null;
  const unique = [...new Map(spots.map((s) => [s.id, s])).values()];
  const eligible =
    unique.length > 1 ? unique.filter((s) => s.id !== previousId) : unique;
  if (!category)
    return {
      spot: eligible[index(eligible.length)],
      category: null,
      candidates: eligible,
    };
  const groups = new Map();
  for (const s of eligible) {
    if (!groups.has(s.mainCategory)) groups.set(s.mainCategory, []);
    groups.get(s.mainCategory).push(s);
  }
  const categories = [...groups.keys()],
    selected = categories[index(categories.length)],
    candidates = groups.get(selected);
  return {
    spot: candidates[index(candidates.length)],
    category: selected,
    candidates,
    categories,
  };
}
export function hasSearchCondition(c) {
  return Boolean(
    c.query?.trim() ||
    (c.mainCategory && c.mainCategory !== "any") ||
    c.subcategories?.length ||
    c.tags?.length ||
    c.seasons?.length ||
    c.unvisited ||
    c.famousOnly ||
    c.focus ||
    [
      "travelRange",
      "budgetMin",
      "budgetMax",
      "parking",
      "weather",
      "stay",
      "region",
    ].some((k) => c[k] != null && c[k] !== "" && c[k] !== "any") ||
    ["camping", "fishing", "sauna"].some((g) =>
      Object.values(c[g] ?? {}).some((v) => v != null && v !== "any"),
    ),
  );
}
