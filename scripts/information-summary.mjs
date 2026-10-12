import fs from "node:fs";
import { verifiedSpots } from "../catalog.js";
import { effectiveTags } from "../taxonomy.js";
import information from "../catalog-information-data.json" with { type: "json" };
const count = (fn) => verifiedSpots.filter(fn).length;
const details = (group) =>
  count((s) => s[group] && Object.values(s[group]).includes(true));
const shopping = verifiedSpots.filter((s) => s.mainCategory === "shopping");
const detailedTags = [
  "洋服",
  "子ども服",
  "雑貨",
  "おもちゃ",
  "家電",
  "家具",
  "スポーツ用品",
  "アウトドア用品",
  "ゲームセンター",
  "コインゲーム",
  "クレーンゲーム",
  "映画館",
  "キッズ施設",
];
const summary = {
  catalogRevision: 7,
  total: verifiedSpots.length,
  enriched: Object.keys(information).length,
  additionalEnriched: Object.keys(information).filter((id) =>
    id.startsWith("place-added-"),
  ).length,
  parkingAvailabilityConfirmed: count((s) => s.parking.available !== null),
  parkingTypeConfirmed: count((s) => s.parking.type !== "unknown"),
  parkingTypes: Object.fromEntries(
    ["free", "free-limited", "paid", "none", "unknown"].map((type) => [
      type,
      count((s) => s.parking.type === type),
    ]),
  ),
  location: count((s) => s.prefecture && s.area),
  carMinutes: count((s) => s.travel.carMinutes != null),
  trainMinutes: count((s) => s.travel.trainMinutes != null),
  website: count((s) => s.website),
  weather: count((s) => s.weather.length),
  stayDuration: count((s) => s.stayDuration.length),
  shoppingDetailedFacilities: shopping.filter((s) =>
    effectiveTags(s).some((t) => detailedTags.includes(t)),
  ).length,
  shoppingTagCounts: Object.fromEntries(
    detailedTags.map((t) => [
      t,
      shopping.filter((s) => effectiveTags(s).includes(t)).length,
    ]),
  ),
  campingDetails: details("camping"),
  fishingDetails: details("fishing"),
  saunaDetails: details("sauna"),
};
if (process.argv.includes("--write"))
  fs.writeFileSync(
    new URL("../docs/information-summary.json", import.meta.url),
    JSON.stringify(summary, null, 2) + "\n",
  );
console.log(JSON.stringify(summary, null, 2));
