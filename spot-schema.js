import { knownFacts } from "./spot-facts.js";
import {
  taxonomy,
  campingFields,
  fishingFields,
  saunaFields,
  emptyDetails,
} from "./taxonomy.js";
const categoryMap = {
  ショッピングモール: ["shopping", "施設タイプ", "ショッピングモール"],
  アウトレット: ["shopping", "施設タイプ", "アウトレット"],
  大型公園: ["outdoor", "公園", "大型公園"],
  "キャンプ／デイキャンプ": ["outdoor", "キャンプ"],
  "キャンプ・デイキャンプ": ["outdoor", "キャンプ"],
  テントOK: ["outdoor", "キャンプ"],
  BBQ: ["outdoor", "BBQ"],
  アスレチック: ["outdoor", "アスレチック"],
  屋内遊び場: ["indoor", "室内遊具"],
  "テーマパーク／遊園地": ["leisure", "テーマパーク"],
  動物園: ["animals", "動物園"],
  水族館: ["animals", "水族館"],
  "水族館・動物園": ["animals", "動物園"],
  "科学館／博物館": ["learning", "博物館"],
  "科学館・博物館": ["learning", "博物館"],
  "体験施設／工場見学": ["learning", "工場見学"],
  "農業／牧場": ["animals", "牧場"],
  "海／水遊び": ["nature", "海"],
  "温泉／スパ": ["relax", "温泉"],
  "スポーツ／アクティビティ": ["activity", "アクティビティ"],
  スポーツ: ["activity", "アクティビティ"],
};
export function classify(s) {
  let [main, sub, tag] = categoryMap[s.category] ?? ["sightseeing", "名所"];
  if (s.category === "水族館・動物園" && /水族/.test(s.name)) sub = "水族館";
  if (["観光スポット", "その他"].includes(s.category)) {
    if (/公園|緑地|千本桜/.test(s.name)) {
      main = "outdoor";
      sub = "公園";
    } else if (/庭園|植物|百花園|菖蒲|千枚田|滝|洞窟/.test(s.name)) {
      main = "nature";
      sub = /滝|洞窟/.test(s.name) ? "川・湖" : "花・植物";
    } else if (/ロープ|海賊船|ラインくだり/.test(s.name)) {
      sub = "乗り物観光";
      tag = /ロープ/.test(s.name) ? "ロープウェイ" : "観光船";
    } else if (/展望台|灯台/.test(s.name)) {
      sub = "景色";
      tag = /展望台/.test(s.name) ? "展望台" : "海景色";
    } else if (/博物館|資料館|会館|防災/.test(s.name)) {
      main = "learning";
      sub = "博物館";
    } else if (/城/.test(s.name)) tag = "城";
  }
  if (main === "outdoor" && /キャンプ/.test(s.name)) sub = "キャンプ";
  if (main === "activity" && /海釣り|釣り/.test(s.name)) sub = "釣り";
  if (/小松沢レジャー農園/.test(s.name)) {
    main = "nature";
    sub = "果物狩り";
  }
  if (/交通公園/.test(s.name)) {
    main = "outdoor";
    sub = "公園";
  }
  return { mainCategory: main, subcategories: [sub], tags: tag ? [tag] : [] };
}
export function upgradeSpot(s) {
  const facts = knownFacts[s.id] ?? {};
  const c = classify(s);
  const main = s.mainCategory ?? c.mainCategory;
  const camping =
    s.camping === undefined &&
    (["キャンプ", "BBQ"].some((x) =>
      (s.subcategories ?? c.subcategories).includes(x),
    ) ||
      s.bbq === true)
      ? {
          ...emptyDetails(campingFields),
          bbq: s.bbq ?? null,
          reservation: "unknown",
          ...(facts.camping ?? {}),
        }
      : (s.camping ?? null);
  const subs = [...c.subcategories];
  const inferredTags = [...c.tags];
  if (s.bbq === true) {
    inferredTags.push("BBQ可");
    if (c.mainCategory === "outdoor") subs.push("BBQ");
  }
  if (s.tent === true) inferredTags.push("テントOK");
  if (camping?.dayCamp === true) inferredTags.push("デイキャンプ");
  if (facts.sauna?.available === true) {
    subs.push("サウナ");
    inferredTags.push("サウナ");
  }
  if (c.mainCategory === "learning") {
    if (/科学/.test(s.name)) {
      subs.push("科学");
      inferredTags.push("科学");
    }
    if (/鉄道|ロマンスカー/.test(s.name)) inferredTags.push("鉄道");
    if (/航空/.test(s.name)) inferredTags.push("航空");
    if (/歴史|郷土|考古/.test(s.name)) inferredTags.push("歴史");
  }
  const tags = s.tags ?? [...new Set(inferredTags)];
  const recommendedSeasons = [];
  if (
    tags.some((x) => ["桜", "潮干狩り", "いちご狩り"].includes(x)) ||
    /千本桜/.test(s.name)
  )
    recommendedSeasons.push("spring");
  if (tags.some((x) => ["水遊び", "川遊び", "海水浴"].includes(x)))
    recommendedSeasons.push("summer");
  if (
    tags.some((x) =>
      ["紅葉", "梨狩り", "ぶどう狩り", "芋掘り", "ハイキング"].includes(x),
    )
  )
    recommendedSeasons.push("autumn");
  if (
    tags.some((x) =>
      ["温泉", "スケート", "雪遊び", "イルミネーション"].includes(x),
    ) ||
    c.mainCategory === "relax"
  )
    recommendedSeasons.push("winter");
  return {
    ...s,
    prefecture: s.prefecture ?? "",
    area: s.area ?? "",
    website: s.website ?? "",
    description: s.description ?? "",
    famous: s.famous ?? false,
    source: s.source ?? (s.sample ? "legacy" : "user"),
    sample: s.sample ?? false,
    mainCategory: main,
    subcategories: s.subcategories ?? [...new Set(subs)],
    tags: [...tags],
    seasons: s.seasons ?? recommendedSeasons,
    weather:
      s.weather ??
      (s.type === "indoor"
        ? ["indoor", "rainy"]
        : s.rainy === true
          ? ["rainy"]
          : s.type === "outdoor"
            ? ["sunny"]
            : []),
    travel: {
      ...s.travel,
      carMinutes:
        s.travel?.carMinutes === undefined
          ? (s.travel?.car ?? null)
          : s.travel.carMinutes,
      trainMinutes:
        s.travel?.trainMinutes === undefined
          ? (s.travel?.train ?? null)
          : s.travel.trainMinutes,
    },
    price: s.price ??
      (s.source === "builtin" &&
      {
        "place-tokyo-yumenoshima-botanicalhall": 1000,
        "place-matsudo-komorebi": 10000,
        "place-kidzania": 24000,
      }[s.id] === s.cost
        ? {
            free: null,
            family4Min: null,
            family4Max: null,
            family4Typical: null,
            note: "旧版の仮予算は料金未確認のため、新検索では使用しません。",
          }
        : null) ?? {
        free: s.cost === 0 ? true : s.cost == null ? null : false,
        family4Min: null,
        family4Max: null,
        family4Typical: s.cost ?? null,
        note:
          s.cost == null
            ? null
            : "旧版の家族4人料金目安。最新料金は公式情報でご確認ください。",
      },
    parking: {
      available: null,
      type: "unknown",
      freeMinutes: null,
      fee: null,
      capacity: null,
      note: null,
      ...(s.parking ?? facts.parking ?? {}),
    },
    stayDuration: s.stayDuration ?? s.stays ?? [],
    camping,
    fishing:
      s.fishing === undefined
        ? c.subcategories.includes("釣り")
          ? emptyDetails(fishingFields)
          : null
        : s.fishing,
    sauna:
      s.sauna === undefined
        ? facts.sauna
          ? {
              ...emptyDetails(saunaFields),
              familyUse: "unknown",
              childUse: "unknown",
              childAgeRule: null,
              ...facts.sauna,
            }
          : null
        : s.sauna,
    type: s.type ?? "unknown",
    category: s.category ?? taxonomy[main]?.label,
    cost: s.cost ?? null,
    stays: s.stays ?? s.stayDuration ?? [],
    rating: s.rating ?? 3,
    tent: s.tent ?? null,
    bbq: s.bbq ?? null,
    rainy: s.rainy ?? s.weather?.includes("rainy") ?? s.type === "indoor",
  };
}
export const detailDefinitions = {
  camping: campingFields,
  fishing: fishingFields,
  sauna: saunaFields,
};
