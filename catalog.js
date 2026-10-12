import { enrichInterests } from "./catalog-interests.js";
import { verifiedSpots as previous } from "./catalog-v2.js";
import { additionalSpots } from "./catalog-additions.js";
import { enrichShopping } from "./catalog-shopping.js";
import { enrichSpot } from "./catalog-information.js";
import { repairSearchClassification } from "./catalog-search-repairs.js";
import { upgradeSpot } from "./spot-schema.js";
const unknownPriceIds = new Set([
  "place-tokyo-yumenoshima-botanicalhall",
  "place-matsudo-komorebi",
  "place-kidzania",
]);
export const catalogRevision = 9;
export const expectedCatalogSize = 350;
export const verifiedSpots = [
  ...previous.map((s) => {
    const upgraded = upgradeSpot(s);
    if (s.tent === true) upgraded.tags.push("テントOK");
    if (s.bbq === true) {
      upgraded.tags.push("BBQ可");
      if (
        upgraded.mainCategory === "outdoor" &&
        !upgraded.subcategories.includes("BBQ")
      )
        upgraded.subcategories.push("BBQ");
    }
    if (upgraded.mainCategory === "learning") {
      if (/科学/.test(s.name)) {
        upgraded.subcategories.push("科学");
        upgraded.tags.push("科学");
      }
      if (/鉄道|ロマンスカー/.test(s.name)) upgraded.tags.push("鉄道");
      if (/航空/.test(s.name)) upgraded.tags.push("航空");
      if (/歴史|郷土|考古/.test(s.name)) upgraded.tags.push("歴史");
    }
    if (upgraded.camping?.dayCamp === true) upgraded.tags.push("デイキャンプ");
    if (upgraded.sauna?.available === true) {
      upgraded.subcategories.push("サウナ");
      upgraded.tags.push("サウナ");
    }
    upgraded.tags = [...new Set(upgraded.tags)];
    upgraded.subcategories = [...new Set(upgraded.subcategories)];
    if (unknownPriceIds.has(s.id))
      upgraded.price = {
        free: null,
        family4Min: null,
        family4Max: null,
        family4Typical: null,
        note: "旧版の仮予算は料金未確認のため、新検索では使用しません。",
      };
    return upgraded;
  }),
  ...additionalSpots,
]
  .map(repairSearchClassification)
  .map(enrichSpot)
  .map(enrichShopping)
  .map(enrichInterests);
export const catalogReady =
  verifiedSpots.length === expectedCatalogSize &&
  new Set(verifiedSpots.map((s) => s.id)).size === expectedCatalogSize;
