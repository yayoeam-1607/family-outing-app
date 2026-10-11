// 前回取得済みの公式資料から再利用。根拠はdocs/v3-reused-facts.json。
export const knownFacts = {
  "place-kamogawa-herb": {
    parking: {
      available: true,
      type: "free",
      fee: 0,
      note: "前回取得した公式資料で無料駐車場を確認。最新条件は公式で確認。",
    },
  },
  "place-komatsuzawa": {
    parking: {
      available: true,
      type: "free",
      fee: 0,
      note: "前回取得した公式資料で無料駐車場を確認。最新条件は公式で確認。",
    },
  },
  "place-boso-mura": {
    parking: {
      available: true,
      type: "free",
      fee: 0,
      note: "前回取得した公式資料で無料駐車場を確認。最新条件は公式で確認。",
    },
  },
  "place-sagami-science": {
    parking: {
      available: true,
      type: "free",
      fee: 0,
      note: "前回取得した公式資料で無料駐車場を確認。最新条件は公式で確認。",
    },
  },
  "place-aviation": {
    parking: {
      available: true,
      type: "free",
      fee: 0,
      note: "前回取得した公式資料で無料駐車場を確認。最新条件は公式で確認。",
    },
  },
  "place-shonan-mall": {
    parking: {
      available: true,
      type: "free",
      fee: 0,
      note: "前回取得した公式資料で無料駐車場を確認。最新条件は公式で確認。",
    },
  },
  "place-narita-camp": {
    parking: {
      available: true,
      type: "paid",
      fee: 1000,
      note: "旧資料の日帰り・車1台料金。予約プランや時期で条件が変わるため要確認。",
    },
    camping: {
      dayCamp: true,
    },
  },
  "place-morimaki": {
    parking: {
      available: true,
      type: "paid",
      fee: 200,
      note: "旧資料の日帰り・車1台料金。予約プランや時期で条件が変わるため要確認。",
    },
    camping: {
      dayCamp: true,
      reservation: "required",
    },
  },
  "place-kawai-camp": {
    parking: {
      available: true,
      type: "paid",
      fee: 1200,
      note: "旧資料の日帰り・車1台料金。予約プランや時期で条件が変わるため要確認。",
    },
    camping: {
      dayCamp: true,
      reservation: "required",
    },
  },
  "place-hikawa-camp": {
    camping: {
      dayCamp: true,
      reservation: "required",
    },
  },
  "place-america-camp": {
    camping: {
      dayCamp: true,
    },
  },
  "place-arisunomori": {
    camping: {
      dayCamp: true,
    },
  },
  "place-kazusa-camp": {
    camping: {
      dayCamp: true,
    },
  },
  "place-splash-garden": {
    camping: {
      dayCamp: true,
      reservation: "required",
    },
  },
  "place-nagatoro-camp": {
    camping: {
      dayCamp: true,
      bringFood: true,
      poweredSite: true,
    },
  },
  "place-well-camp": {
    camping: {
      dayCamp: true,
    },
  },
  "place-bosco": {
    camping: {
      dayCamp: true,
    },
  },
  "place-kanotoen": {
    camping: {
      dayCamp: true,
      rental: true,
    },
  },
  "place-woodroof": {
    camping: {
      rental: true,
      reservation: "required",
    },
  },
  "place-wildmagic": {
    camping: {
      handsFreeBbq: true,
      reservation: "required",
    },
  },
  "place-hakone-yuryo": {
    sauna: {
      available: true,
      privateBath: true,
    },
  },
  "place-tateyama-onsen": {
    sauna: {
      available: true,
      privateBath: true,
    },
  },
  "place-yunessun": {
    sauna: {
      available: true,
      privateBath: true,
    },
  },
  "place-spa-herbs": {
    sauna: {
      available: true,
    },
  },
};
