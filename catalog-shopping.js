import baseline from "./catalog-shopping-baseline.json" with { type: "json" };
import information from "./catalog-shopping-data.json" with { type: "json" };
import { mergeConfirmedFields } from "./catalog-information.js";
const originals = new Map(baseline.map((s) => [s.id, s]));
export function enrichShopping(spot) {
  const patch = information[spot.id];
  if (spot.mainCategory !== "shopping" || !patch) return spot;
  const result = { ...spot };
  for (const [field, value] of Object.entries(patch)) {
    if (["tags", "subcategories"].includes(field))
      result[field] = [...new Set([...spot[field], ...value])];
    else if (field === "parking") result[field] = { ...spot[field], ...value };
    else result[field] = value;
  }
  return result;
}
export function mergeShopping(spot, latest) {
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
