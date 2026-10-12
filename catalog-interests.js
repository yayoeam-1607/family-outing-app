import information from "./catalog-interests-data.json" with { type: "json" };
import baseline from "./catalog-interests-baseline.json" with { type: "json" };
import {
  campingFields,
  fishingFields,
  saunaFields,
  emptyDetails,
  emptyShopping,
} from "./taxonomy.js";
const originals = new Map(
  baseline.map((s) => [
    s.id,
    {
      ...s,
      shopping:
        s.shopping ?? (s.mainCategory === "shopping" ? emptyShopping() : null),
    },
  ]),
);
const clone = structuredClone;
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const defaults = {
  camping: { ...emptyDetails(campingFields), reservation: "unknown" },
  fishing: emptyDetails(fishingFields),
  sauna: {
    ...emptyDetails(saunaFields),
    familyUse: "unknown",
    childUse: "unknown",
    childAgeRule: null,
  },
  shopping: emptyShopping(),
};
export function enrichInterests(spot) {
  const patch = information[spot.id];
  if (!patch) return spot;
  const next = { ...spot };
  for (const [key, value] of Object.entries(patch)) {
    if (Array.isArray(value))
      next[key] =
        key === "subcategories" && patch.mainCategory
          ? clone(value)
          : [...new Set([...(spot[key] ?? []), ...value])];
    else if (value && typeof value === "object") {
      next[key] = { ...clone(defaults[key] ?? {}), ...clone(spot[key] ?? {}) };
      for (const [field, v] of Object.entries(value))
        next[key][field] = Array.isArray(v)
          ? [...new Set([...(next[key][field] ?? []), ...v])]
          : clone(v);
    } else next[key] = clone(value);
  }
  next.tags = next.tags.filter((t) => !["半日遊べる", "1日遊べる"].includes(t));
  return next;
}
// 元の値と同じ項目だけ置換。配列は今回の追加分のみを補完し、既存削除を復活させない。
function merge(current, old, latest) {
  if (equal(old, latest)) return current;
  if (equal(current, old)) return clone(latest);
  if (Array.isArray(current) && Array.isArray(old) && Array.isArray(latest))
    return [
      ...new Set([...current, ...latest.filter((v) => !old.includes(v))]),
    ];
  if (
    current &&
    old &&
    latest &&
    typeof current === "object" &&
    !Array.isArray(current)
  ) {
    const next = { ...current };
    for (const key of Object.keys(latest))
      next[key] = merge(current[key], old[key], latest[key]);
    return next;
  }
  return current;
}
export function mergeInterests(spot, latest) {
  const patch = information[spot.id],
    old = originals.get(spot.id);
  if (!patch || spot.source !== "builtin" || !old || !latest) return spot;
  const next = { ...spot };
  const originalCategory = spot.mainCategory === old.mainCategory;
  const classificationChange = Object.hasOwn(patch, "mainCategory");
  const unchangedClassification =
    originalCategory && equal(spot.subcategories, old.subcategories);
  for (const field of Object.keys(patch)) {
    if (
      ["mainCategory", "subcategories"].includes(field) &&
      classificationChange
    ) {
      if (unchangedClassification) next[field] = clone(latest[field]);
      continue;
    }
    if (
      [
        "subcategories",
        "tags",
        "shopping",
        "camping",
        "fishing",
        "sauna",
      ].includes(field) &&
      !originalCategory
    )
      continue;
    let value = latest[field];
    if (field === "shopping" && value) {
      value = clone(value);
      for (const key of ["buyTags", "playTags", "foodTags"])
        value[key] = value[key].filter(
          (tag) =>
            !old.tags.includes(tag) ||
            spot.tags.includes(tag) ||
            spot.shopping?.[key]?.includes(tag),
        );
    }
    next[field] = merge(spot[field], old[field], value);
  }
  return next;
}
