import { taxonomy, seasons, effectiveTags } from "./taxonomy.js";
import { normalizeSearchText } from "./search-synonyms.js";
import { matchesRegion } from "./spots.js";
const specified = (v) =>
  v !== undefined && v !== null && v !== "" && v !== "any";
const hasAny = (wanted, actual) =>
  !wanted?.length || wanted.some((v) => actual?.includes(v));
export function matchesBudget(s, min, max) {
  if (!specified(min) && !specified(max)) return true;
  const lo = specified(min) ? Number(min) : 0,
    hi = specified(max) ? Number(max) : Infinity,
    p = s.price;
  if (!p || lo > hi) return false;
  if (p.free === true) return lo <= 0 && hi >= 0;
  if (p.family4Typical !== null && p.family4Typical !== undefined)
    return p.family4Typical >= lo && p.family4Typical <= hi;
  if (p.family4Min == null && p.family4Max == null) return false;
  return (p.family4Max ?? Infinity) >= lo && (p.family4Min ?? 0) <= hi;
}
export function matchesSpot(s, c) {
  const related = (s.seasons ?? []).flatMap((x) => [seasons[x], x]);
  const text = normalizeSearchText(
    [
      s.name,
      s.description,
      taxonomy[s.mainCategory]?.label,
      s.mainCategory,
      ...(s.subcategories ?? []),
      ...effectiveTags(s),
      ...(s.shopping?.highlights ?? []),
      ...related,
    ].join(" "),
  );
  if (
    c.query?.trim() &&
    !normalizeSearchText(c.query)
      .trim()
      .split(/\s+/)
      .every((q) => text.includes(q))
  )
    return false;
  if (specified(c.mainCategory) && s.mainCategory !== c.mainCategory)
    return false;
  if (
    !hasAny(c.subcategories, s.subcategories) ||
    !hasAny(c.tags, effectiveTags(s))
  )
    return false;
  if (!matchesRegion(s, c.region)) return false;
  const minutes =
    s.travel?.[c.transport === "train" ? "trainMinutes" : "carMinutes"];
  if (specified(c.travelRange)) {
    const [lo, hi] = String(c.travelRange).split("-").map(Number);
    if (minutes == null || minutes < lo || minutes > hi) return false;
  }
  if (!matchesBudget(s, c.budgetMin, c.budgetMax)) return false;
  if (specified(c.parking)) {
    if (c.parking === "available") {
      if (!["free", "free-limited", "paid"].includes(s.parking?.type))
        return false;
    } else if (s.parking?.type !== c.parking) return false;
  }
  if (specified(c.weather) && !(s.weather ?? []).includes(c.weather))
    return false;
  if (specified(c.stay) && !(s.stayDuration ?? []).includes(Number(c.stay)))
    return false;
  if (
    c.seasons?.length &&
    !s.seasons?.includes("all") &&
    !hasAny(c.seasons, s.seasons)
  )
    return false;
  for (const group of ["camping", "fishing", "sauna"])
    for (const [k, v] of Object.entries(c[group] ?? {}))
      if (specified(v) && s[group]?.[k] !== v) return false;
  if (c.famousOnly && !s.famous) return false;
  return true;
}
export function filterAdvanced(source, criteria) {
  return source.filter((s) => matchesSpot(s, criteria));
}
