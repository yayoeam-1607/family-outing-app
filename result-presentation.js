import {
  effectiveTags,
  taxonomy,
  campingFields,
  fishingFields,
  saunaFields,
} from "./taxonomy.js";
import { matchesSpot, matchesBudget } from "./search.js";
export function resultPresentation(spot, criteria) {
  const all = effectiveTags(spot),
    matched = [];
  const points = [];
  if (criteria.query?.trim() && matchesSpot(spot, criteria))
    points.push("キーワードに一致");
  if (
    [criteria.budgetMin, criteria.budgetMax].some(
      (v) => v != null && v !== "" && v !== "any",
    ) &&
    matchesBudget(spot, criteria.budgetMin, criteria.budgetMax)
  )
    points.push("予算条件に一致");
  for (const tag of criteria.tags ?? [])
    if (all.includes(tag)) {
      matched.push(tag);
      points.push(tag);
    }
  for (const [group, fields] of Object.entries({
    camping: campingFields,
    fishing: fishingFields,
    sauna: saunaFields,
  })) {
    for (const [key, value] of Object.entries(criteria[group] ?? {})) {
      if (
        group === "sauna" &&
        ["familyUse", "childUse"].includes(key) &&
        value !== "any" &&
        spot.sauna?.[key] === value
      ) {
        const label =
          key === "familyUse"
            ? {
                yes: "家族利用可能",
                conditional: "家族利用：条件付き",
                no: "家族利用不可",
              }[value]
            : {
                yes: "子ども利用可",
                ageRestricted: "子ども利用：年齢条件あり",
                no: "子ども利用不可",
              }[value];
        points.push(label);
        if (all.includes(label)) matched.push(label);
      }
      if (value === true && spot[group]?.[key] === true) {
        const label =
          key === "available" && group === "sauna" ? "サウナ" : fields[key];
        if (label) {
          matched.push(label);
          points.push(label);
        }
      }
    }
  }
  const words =
    criteria.query
      ?.normalize("NFKC")
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean) ?? [];
  for (const tag of all)
    if (
      words.some((word) => tag.normalize("NFKC").toLowerCase().includes(word))
    ) {
      matched.push(tag);
      points.push(tag);
    }
  for (const sub of criteria.subcategories ?? [])
    if (spot.subcategories.includes(sub)) {
      points.push(sub);
      if (sub === "BBQ" && all.includes("BBQ可")) matched.push("BBQ可");
      if (all.includes(sub)) matched.push(sub);
    }
  if (criteria.travelRange && criteria.travelRange !== "any") {
    const [lo, hi] = criteria.travelRange.split("-").map(Number);
    const n =
      spot.travel[
        criteria.transport === "train" ? "trainMinutes" : "carMinutes"
      ];
    if (n != null && n >= lo && n <= hi)
      points.push(
        `${criteria.transport === "train" ? "電車" : "車"}${lo ? lo + "〜" : ""}${hi}分${lo ? "" : "以内"}の目安`,
      );
  }
  const parkingNames = {
    available: "駐車場あり",
    free: "駐車場無料",
    "free-limited": "駐車場は一定時間無料",
    paid: "駐車場有料",
    none: "駐車場なし",
  };
  if (
    parkingNames[criteria.parking] &&
    (criteria.parking === spot.parking.type ||
      (criteria.parking === "available" &&
        ["free", "free-limited", "paid"].includes(spot.parking.type)))
  )
    points.push(parkingNames[criteria.parking]);
  if (
    criteria.weather &&
    criteria.weather !== "any" &&
    spot.weather.includes(criteria.weather)
  )
    points.push(
      { rainy: "雨でもOK", indoor: "完全屋内", sunny: "晴れ向き" }[
        criteria.weather
      ],
    );
  if (criteria.mainCategory === spot.mainCategory)
    points.push(taxonomy[spot.mainCategory].label);
  const priority = [...new Set(matched.filter((t) => all.includes(t)))];
  return {
    tags: [...new Set([...priority, ...all])].slice(
      0,
      Math.max(4, priority.length),
    ),
    points: [...new Set(points.filter(Boolean))].slice(0, 4),
  };
}
