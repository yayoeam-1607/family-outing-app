import { upgradeSpot } from "./spot-schema.js";
// User-provided, officially checked information. No Web research in this update.
const shared = {
  mainCategory: "leisure",
  subcategories: ["大型レジャー", "複合レジャー"],
  source: "builtin",
  sample: false,
  type: "indoor",
  weather: ["indoor", "rainy"],
  tags: [],
  prefecture: "",
  area: "",
  website: "",
  description: "",
  seasons: [],
  stayDuration: [],
  famous: false,
  travel: { carMinutes: null, trainMinutes: null },
  price: {
    free: null,
    family4Min: null,
    family4Max: null,
    family4Typical: null,
    note: null,
  },
  parking: {
    available: null,
    type: "unknown",
    freeMinutes: null,
    fee: null,
    capacity: null,
    note: null,
  },
  camping: null,
  fishing: null,
  sauna: null,
};
export const leisureRecords = [
  {
    id: "place-added-leisure-round1-ichikawa",
    name: "ラウンドワン 市川鬼高店",
    tags: [
      "ボウリング",
      "カラオケ",
      "アミューズメント",
      "クレーンゲーム",
      "コインゲーム",
    ],
    prefecture: "千葉県",
    area: "市川市鬼高4丁目1番3号",
    website: "https://www.round1.co.jp/shop/tenpo/chiba-ichikawa.html",
    parking: {
      available: true,
      type: "free",
      capacity: 210,
      note: "店舗施設利用中は無料。",
    },
  },
  {
    id: "place-added-leisure-round1-narashino",
    name: "ラウンドワンスタジアム 習志野店",
    tags: [
      "スポッチャ",
      "ボウリング",
      "カラオケ",
      "アミューズメント",
      "室内アクティビティ",
    ],
    prefecture: "千葉県",
    area: "習志野市芝園1丁目4番5号",
    website: "https://www.round1.co.jp/shop/tenpo/chiba-narashino.html",
  },
  {
    id: "place-added-leisure-round1-kashiwa",
    name: "ラウンドワンスタジアム アリオ柏店",
    tags: [
      "スポッチャ",
      "ボウリング",
      "カラオケ",
      "アミューズメント",
      "クレーンゲーム",
      "コインゲーム",
      "室内アクティビティ",
    ],
    prefecture: "千葉県",
    area: "柏市大島田1丁目6番地1",
    website: "https://www.round1.co.jp/shop/tenpo/chiba-kashiwa.html",
    parking: {
      available: true,
      type: "unknown",
      capacity: 4000,
      note: "セブンパーク アリオ柏共用駐車場。",
    },
    travelSource: "place-added-2fdc32ab8675",
  },
  {
    id: "place-added-leisure-round1-divercity",
    name: "ラウンドワンスタジアム ダイバーシティ東京 プラザ店",
    tags: [
      "スポッチャ",
      "ボウリング",
      "カラオケ",
      "アミューズメント",
      "クレーンゲーム",
      "コインゲーム",
      "室内アクティビティ",
    ],
    prefecture: "東京都",
    area: "江東区青海1丁目1番10号 ダイバーシティ東京 プラザ6階",
    website: "https://www.round1.co.jp/shop/tenpo/tokyo-divercity.html",
    parking: {
      available: true,
      type: "free-limited",
      freeMinutes: 240,
      capacity: 1400,
      note: "ラウンドワン利用者は4時間無料。",
    },
    travelSource: "place-added-bce64314a901",
  },
  {
    id: "place-added-leisure-round1-shinmisato",
    name: "ラウンドワンスタジアム ららぽーと新三郷店",
    tags: [
      "スポッチャ",
      "ボウリング",
      "カラオケ",
      "アミューズメント",
      "クレーンゲーム",
      "コインゲーム",
      "室内アクティビティ",
    ],
    prefecture: "埼玉県",
    area: "三郷市新三郷ららシティ3丁目1-1",
    website: "https://www.round1.co.jp/shop/tenpo/saitama-shinmisato.html",
    parking: {
      available: true,
      type: "free",
      capacity: 2800,
      note: "店舗施設利用中は無料。",
    },
    travelSource: "place-mitsui-shinmisato",
  },
  {
    id: "place-added-leisure-trampoland-bayside",
    name: "トランポランドTOKYO BAYSIDE",
    tags: ["トランポリン", "室内アクティビティ"],
    prefecture: "千葉県",
    area: "浦安市日の出5-7-7 マリナガーデン新浦安",
    website: "https://trampoland.com/facility/tokyo-bayside",
    parking: {
      available: true,
      type: "free-limited",
      freeMinutes: 180,
      note: "駐車場最大3時間無料サービスあり。",
    },
  },
  {
    id: "place-added-leisure-vspark-laketown",
    name: "VS PARK イオンレイクタウンmori店",
    tags: ["体験型アクティビティ", "室内アクティビティ", "パルクール"],
    prefecture: "埼玉県",
    area: "越谷市レイクタウン3丁目1-1 イオンレイクタウンmori 3階",
    website: "https://bandainamco-am.co.jp/others/vspark/laketown/",
    description:
      "24種類以上の体験型アクティビティを楽しめる屋内施設。2026年10月時点では小学生以上が利用対象。",
    travelSource: "place-laketown",
  },
  {
    id: "place-added-leisure-mystery-circus",
    name: "東京ミステリーサーカス",
    subcategories: ["エンタメ", "複合レジャー"],
    tags: ["謎解き", "体験型アクティビティ"],
    prefecture: "東京都",
    area: "新宿区歌舞伎町1-27-5 APMビル",
    website: "https://mysterycircus.jp/tokyo/",
    description:
      "リアル脱出ゲームなどを楽しめる体験型テーマパーク。参加可能年齢・推奨年齢はイベントごとに異なるため公式情報を確認。",
  },
];
export function createLeisureSpots(previous) {
  return leisureRecords.map(({ travelSource, ...record }) => {
    const parent = travelSource
      ? previous.find((s) => s.id === travelSource)
      : null;
    if (travelSource && !parent)
      throw Error(
        "同一商業施設の移動時間参照元が見つかりません: " + travelSource,
      );
    return upgradeSpot({
      ...structuredClone(shared),
      ...structuredClone(record),
      parking: { ...shared.parking, ...record.parking },
      travel: {
        carMinutes: parent?.travel.carMinutes ?? null,
        trainMinutes: parent?.travel.trainMinutes ?? null,
      },
    });
  });
}
