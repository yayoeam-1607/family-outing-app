export const taxonomy = {
  shopping: {
    label: "ショッピング",
    icon: "🛍",
    subs: ["買い物", "遊ぶ", "食べる・便利", "施設タイプ"],
    tags: "洋服 子ども服 雑貨 おもちゃ 家電 家具 スポーツ用品 アウトドア用品 ゲームセンター コインゲーム クレーンゲーム 映画館 キッズ施設 室内遊具 ボウリング スポーツ／アクティビティ トランポリン 子ども向け体験 ショッピングモール アウトレット 大型商業施設 ホームセンター 書店・文具 室内アクティビティ カプセルトイ スーパー フードコート レストラン",
  },
  outdoor: {
    label: "公園・アウトドア",
    icon: "🌳",
    subs: ["公園", "ピクニック", "キャンプ", "BBQ", "アスレチック", "水遊び"],
    tags: "大型公園 大型遊具 複合遊具 芝生 ボール遊び サイクリング レジャーシート テントOK ポップアップテントOK 木陰 BBQ可 手ぶらBBQ 食材持込 機材レンタル デイキャンプ 宿泊キャンプ オートキャンプ コテージ バンガロー 焚き火OK 車横付け 電源サイト レンタルあり シャワー 風呂 川遊び じゃぶじゃぶ池 フィールドアスレチック 幼児遊具 水遊び カヌー",
  },
  leisure: {
    label: "テーマパーク・レジャー",
    icon: "🎡",
    subs: ["遊園地", "テーマパーク", "大型レジャー", "エンタメ"],
    tags: "子ども向け乗り物 絶叫系 観覧車 キャラクター ショー パレード 世界観 半日遊べる 1日遊べる",
  },
  animals: {
    label: "動物・水族館",
    icon: "🐾",
    subs: ["動物園", "水族館", "牧場", "動物ふれあい"],
    tags: "大型動物 小動物 エサやり ふれあい イルカ ペンギン 大型水槽 水族館ショー 乳搾り 乗馬 シャチ 馬車",
  },
  indoor: {
    label: "屋内遊び",
    icon: "🧩",
    subs: ["室内遊具", "ゲーム", "デジタル体験", "エンタメ", "室内スポーツ"],
    tags: "大型室内遊具 ボールプール 室内アスレチック トランポリン ゲームセンター コインゲーム クレーンゲーム VR AR デジタルアート 映画 カラオケ ボードゲーム ネット遊具 クライミング ロープアスレチック ゴーカート パルクール",
  },
  learning: {
    label: "学び・体験",
    icon: "🔬",
    subs: ["科学", "博物館", "工場見学", "職業体験", "ものづくり", "文化体験"],
    tags: "科学 宇宙 プラネタリウム 恐竜 鉄道 自動車 航空 歴史 自然 食品工場 飲料工場 工作 料理 DIY アート 職業体験 シミュレーター 運転体験 飛行体験 ものづくり 食育",
  },
  activity: {
    label: "スポーツ・アクティビティ",
    icon: "🎣",
    subs: [
      "釣り",
      "球技",
      "室内スポーツ",
      "アクティビティ",
      "乗り物",
      "水上アクティビティ",
      "季節スポーツ",
    ],
    tags: "ハゼ釣り アジ釣り サビキ 釣り堀 海釣り施設 初心者向け釣り 子ども向け釣り 貸し竿 エサ販売 手ぶら釣り 野球 サッカー テニス ボウリング 卓球 バドミントン ボルダリング トランポリン サイクリング ゴーカート カヌー カヤック SUP スケート スキー 雪遊び",
  },
  relax: {
    label: "温泉・リラックス",
    icon: "♨",
    subs: ["温泉", "スーパー銭湯", "サウナ", "スパ", "滞在型"],
    tags: "天然温泉 露天風呂 家族風呂 貸切風呂 サウナ 貸切サウナ 家族利用可能 水着エリア 男女一緒に利用可 子ども利用可 子ども年齢制限あり 温水プール 岩盤浴 漫画 休憩スペース 食事処",
  },
  sightseeing: {
    label: "観光・街歩き",
    icon: "🗺",
    subs: ["街歩き", "景色", "名所", "乗り物観光"],
    tags: "商店街 歴史地区 展望台 夜景 海景色 城 寺社 ランドマーク ロープウェイ 観光船 クルーズ 湖景色 富士山 灯台 日本庭園 磯遊び 紅葉",
  },
  nature: {
    label: "自然・収穫体験",
    icon: "🌿",
    subs: ["果物狩り", "農業体験", "海", "川・湖", "山・森", "花・植物"],
    tags: "いちご狩り 梨狩り ぶどう狩り みかん狩り ブルーベリー狩り 芋掘り 野菜収穫 潮干狩り 海水浴 磯遊び 川遊び 魚つかみ ハイキング 虫取り 森林体験 桜 ネモフィラ ひまわり コスモス 紅葉 花菖蒲",
  },
};
Object.values(taxonomy).forEach((x) => (x.tags = x.tags.split(" ")));
export const seasons = {
  spring: "春",
  summer: "夏",
  autumn: "秋",
  winter: "冬",
  all: "通年",
};
export const seasonTags = {
  spring: ["桜", "潮干狩り", "いちご狩り", "花畑"],
  summer: ["プール", "水遊び", "海水浴", "川遊び", "花火", "夏祭り"],
  autumn: ["紅葉", "梨狩り", "ぶどう狩り", "芋掘り", "ハイキング"],
  winter: ["イルミネーション", "スケート", "雪遊び", "温泉"],
};
export const campingFields = {
  dayCamp: "デイキャンプ",
  overnight: "宿泊キャンプ",
  autoCamp: "オートキャンプ",
  cottage: "コテージ",
  tentStay: "テント泊",
  carBesideSite: "車横付け",
  bbq: "BBQ可",
  handsFreeBbq: "手ぶらBBQ",
  bringFood: "食材持込",
  bonfire: "焚き火OK",
  rental: "レンタルあり",
  shower: "シャワー",
  bath: "風呂",
  poweredSite: "電源サイト",
  beginnerFriendly: "初心者向け",
  familyFriendly: "家族向け",
};
export const fishingFields = {
  haze: "ハゼ釣り",
  horseMackerel: "アジ釣り",
  sabiki: "サビキ",
  fishingPond: "釣り堀",
  seaFishingFacility: "海釣り施設",
  beginnerFriendly: "初心者向け釣り",
  childFriendly: "子ども向け釣り",
  rodRental: "貸し竿",
  baitSales: "エサ販売",
  handsFree: "手ぶら釣り",
};
export const saunaFields = {
  available: "サウナあり",
  mixedGenderUse: "男女一緒に利用可",
  swimwearRequired: "水着エリア",
  privateSauna: "貸切サウナ",
  privateBath: "貸切風呂",
};
export function emptyDetails(fields) {
  return Object.fromEntries(Object.keys(fields).map((k) => [k, null]));
}
export function tagsFor(category, subs = []) {
  const all = taxonomy[category]?.tags ?? [];
  if (!subs.length) return [];
  const groups = {
    キャンプ: Object.values(campingFields).concat([
      "テントOK",
      "バンガロー",
      "機材レンタル",
    ]),
    BBQ: ["BBQ可", "手ぶらBBQ", "食材持込", "機材レンタル"],
    公園: [
      "大型公園",
      "大型遊具",
      "幼児遊具",
      "複合遊具",
      "芝生",
      "ボール遊び",
      "木陰",
      "カヌー",
    ],
    ピクニック: [
      "レジャーシート",
      "テントOK",
      "ポップアップテントOK",
      "芝生",
      "木陰",
    ],
    アスレチック: ["フィールドアスレチック", "室内アスレチック"],
    水遊び: ["水遊び", "川遊び", "じゃぶじゃぶ池", "カヌー"],
    買い物: [
      "洋服",
      "子ども服",
      "雑貨",
      "おもちゃ",
      "家電",
      "家具",
      "スポーツ用品",
      "アウトドア用品",
      "ホームセンター",
      "書店・文具",
    ],
    遊ぶ: [
      "ゲームセンター",
      "コインゲーム",
      "クレーンゲーム",
      "映画館",
      "キッズ施設",
      "室内遊具",
      "ボウリング",
      "スポーツ／アクティビティ",
      "トランポリン",
      "子ども向け体験",
      "室内アクティビティ",
      "カプセルトイ",
    ],
    "食べる・便利": ["スーパー", "フードコート", "レストラン"],
    施設タイプ: ["ショッピングモール", "アウトレット", "大型商業施設"],
    釣り: Object.values(fishingFields),
    サウナ: all.slice(4, 12),
    果物狩り: all.slice(0, 5),
    農業体験: ["芋掘り", "野菜収穫"],
    海: ["潮干狩り", "海水浴", "磯遊び"],
    "花・植物": ["桜", "ネモフィラ", "ひまわり", "コスモス", "紅葉", "花菖蒲"],
  };
  return [...new Set(subs.flatMap((s) => groups[s] ?? all))];
}

// 専用項目の確認済みtrueをタグ検索にも反映する。nullからは生成しない。
export function effectiveTags(spot) {
  const tags = (spot.tags ?? []).filter(
    (t) => !["半日遊べる", "1日遊べる"].includes(t),
  );
  for (const key of ["buyTags", "playTags", "foodTags"])
    tags.push(...(spot.shopping?.[key] ?? []));
  if (spot.stayDuration?.includes(4)) tags.push("半日遊べる");
  if (spot.stayDuration?.includes(8)) tags.push("1日遊べる");
  for (const [group, fields] of Object.entries({
    camping: campingFields,
    fishing: fishingFields,
    sauna: saunaFields,
  })) {
    for (const [key, label] of Object.entries(fields))
      if (spot[group]?.[key] === true)
        tags.push(group === "sauna" && key === "available" ? "サウナ" : label);
  }
  if (spot.sauna?.familyUse === "yes") tags.push("家族利用可能");
  if (spot.sauna?.childUse === "yes") tags.push("子ども利用可");
  if (spot.sauna?.childUse === "ageRestricted") tags.push("子ども年齢制限あり");
  if (spot.famous) tags.push("有名スポット");
  return [...new Set(tags)];
}

export const shoppingArrayFields = [
  "buyTags",
  "playTags",
  "foodTags",
  "highlights",
];
export function emptyShopping() {
  return {
    buyTags: [],
    playTags: [],
    foodTags: [],
    highlights: [],
    verifiedAt: null,
  };
}
