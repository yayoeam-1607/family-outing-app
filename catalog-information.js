import baseline from "./catalog-information-baseline.json" with { type: "json" };
import information from "./catalog-information-data.json" with { type: "json" };
import { upgradeSpot } from "./spot-schema.js";
import {
  emptyDetails,
  campingFields,
  fishingFields,
  saunaFields,
} from "./taxonomy.js";
const originals = new Map(baseline.map((s) => [s.id, upgradeSpot(s)]));
export function enrichSpot(spot) {
  const patch = information[spot.id];
  if (!patch) return spot;
  const result = { ...spot };
  for (const [field, value] of Object.entries(patch)) {
    if (["tags", "subcategories"].includes(field))
      result[field] = [...new Set([...spot[field], ...value])];
    else if (value && typeof value === "object" && !Array.isArray(value)) {
      const defaults =
        field === "camping"
          ? { ...emptyDetails(campingFields), reservation: "unknown" }
          : field === "fishing"
            ? emptyDetails(fishingFields)
            : field === "sauna"
              ? {
                  ...emptyDetails(saunaFields),
                  familyUse: "unknown",
                  childUse: "unknown",
                  childAgeRule: null,
                }
              : {};
      result[field] = { ...defaults, ...spot[field], ...value };
    } else result[field] = structuredClone(value);
  }
  return result;
}
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function merge(current, old, latest) {
  if (equal(old, latest)) return current;
  if (equal(current, old)) return structuredClone(latest);
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
    const result = { ...current };
    for (const key of Object.keys(latest))
      result[key] = merge(current[key], old[key], latest[key]);
    return result;
  }
  return current;
}
export function mergeConfirmedFields(spot, latest, old, fields) {
  if (spot.source !== "builtin" || !latest || !old) return spot;
  const result = { ...spot };
  for (const field of fields) {
    if (
      ["tags", "subcategories"].includes(field) &&
      spot.mainCategory !== old.mainCategory
    )
      continue;
    // 手入力の補足がある駐車場は一式を保護する。
    if (field === "parking" && !equal(spot.parking?.note, old.parking?.note))
      continue;
    result[field] = merge(spot[field], old[field], latest[field]);
  }
  return result;
}

export function mergeInformation(spot, latest) {
  const patch = information[spot.id];
  return patch
    ? mergeConfirmedFields(
        spot,
        latest,
        originals.get(spot.id),
        Object.keys(patch),
      )
    : spot;
}
