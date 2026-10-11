// 2026-10-11に公式施設案内で実在を確認した100施設。根拠はdocs/catalogue-evidence.json。
// 移動時間・滞在・子ども向け度は編集上の目安。テント/BBQのnullは未確認。
export const catalogRevision = 1;
export const verifiedSpots = [
  {
    "id": "place-tokyo-ukita",
    "name": "宇喜田公園",
    "area": "江戸川区北葛西三丁目、宇喜田町",
    "website": "https://www.tokyo-park.or.jp/park/ukita/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 35
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "広場での散策や、近隣の行船公園と組み合わせたおでかけに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-ojima-komatsugawa",
    "name": "大島小松川公園",
    "area": "江東区大島九丁目、江戸川区小松川一丁目",
    "website": "https://www.tokyo-park.or.jp/park/ojima-komatsugawa/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 25
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "広い公園で散策やピクニック。東大島駅から徒歩でアクセスできます。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kasaikaihin",
    "name": "葛西海浜公園",
    "area": "江戸川区臨海町六丁目地先",
    "website": "https://www.tokyo-park.or.jp/park/kasaikaihin/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "東京湾に面する公園。海辺で過ごす日は風や潮位、開園時間も確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kasairinkai",
    "name": "葛西臨海公園",
    "area": "江戸川区臨海町六丁目",
    "website": "https://www.tokyo-park.or.jp/park/kasairinkai/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 55
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "芝生広場や鳥類園で、海辺の自然を観察。水族園などの別料金施設もあります。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kasai-rinkai-suizokuen",
    "name": "葛西臨海水族園",
    "area": "東京都 江戸川区",
    "website": "https://www.tokyo-park.or.jp/park/kasai-rinkai-suizokuen/index.html",
    "type": "indoor",
    "rainy": true,
    "category": "水族館・動物園",
    "cost": 1400,
    "travel": {
      "car": 30,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": false,
    "bbq": false,
    "description": "海の生きものを観察する水族園。屋内展示を中心に楽しむプランに。  予算条件：大人700円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kameido-chuo",
    "name": "亀戸中央公園",
    "area": "東京都 江東区",
    "website": "https://www.tokyo-park.or.jp/park/kameido-chuo/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 40
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "江東区の公園で、近隣散策と組み合わせた屋外のおでかけに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kiba",
    "name": "木場公園",
    "area": "江東区木場四・五丁目・平野四丁目・三好四丁目・東陽六丁目",
    "website": "https://www.tokyo-park.or.jp/park/kiba/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 50
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "大きな橋で南北を結ぶ公園。芝生での休憩と散策に。木場ミドリアムは工事で閉館中です。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-sarue",
    "name": "猿江恩賜公園",
    "area": "東京都 江東区",
    "website": "https://www.tokyo-park.or.jp/park/sarue/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 40
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "江東区の公園で、親子の散策や屋外での休憩を計画する候補に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-shinozaki",
    "name": "篠崎公園",
    "area": "江戸川区上篠崎一・四・八丁目、篠崎町六・七・八丁目、西篠崎一・二丁目、谷河内二丁目、南篠崎町四丁目、鹿骨町",
    "website": "https://www.tokyo-park.or.jp/park/shinozaki/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 15,
      "train": 30
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "瑞江から比較的近い大きな公園。工事や地区ごとの利用状況を確認して訪問してください。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-mizumoto",
    "name": "水元公園",
    "area": "葛飾区水元公園・水元猿町・東金町五、八丁目・埼玉県三郷市高洲三丁目",
    "website": "https://www.tokyo-park.or.jp/park/mizumoto/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 45,
      "train": 80
    },
    "stays": [
      4,
      8
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "水辺や芝生で自然にふれる公園。キャンプ広場は教育目的・人数条件があり、一般の家族4人だけでは利用できません。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-higashi-shirahige",
    "name": "東白鬚公園",
    "area": "墨田区堤通二丁目",
    "website": "https://www.tokyo-park.or.jp/park/higashi-shirahige/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 35,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "隅田川沿いの公園。川辺の散策と広場での休憩を組み合わせて。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-shioiri",
    "name": "汐入公園",
    "area": "荒川区南千住八丁目",
    "website": "https://www.tokyo-park.or.jp/park/shioiri/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 35,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "隅田川沿いの公園で散歩。BBQは指定広場の利用条件を確認して予約してください。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-ueno",
    "name": "上野恩賜公園",
    "area": "台東区上野公園・池之端三丁目",
    "website": "https://www.tokyo-park.or.jp/park/ueno/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 45,
      "train": 55
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "上野駅近くの公園で散歩。動物園や博物館とは別施設として登録しています。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-ueno-zoological-gardens",
    "name": "恩賜上野動物園",
    "area": "東京都 台東区",
    "website": "https://www.tokyo-park.or.jp/park/ueno-zoological-gardens/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "水族館・動物園",
    "cost": 1200,
    "travel": {
      "car": 45,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "上野公園内の動物園。園内を歩きながらさまざまな動物を観察できます。  予算条件：大人600円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-inokashira",
    "name": "井の頭恩賜公園",
    "area": "武蔵野市御殿山一丁目、",
    "website": "https://www.tokyo-park.or.jp/park/inokashira/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 80,
      "train": 85
    },
    "stays": [
      4,
      8
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "池の周辺を歩いて自然を楽しむ公園。自然文化園の入園とは別の散策プランです。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-inokashira-park-zoo",
    "name": "井の頭自然文化園",
    "area": "東京都 武蔵野市",
    "website": "https://www.tokyo-park.or.jp/park/inokashira-park-zoo/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "水族館・動物園",
    "cost": 800,
    "travel": {
      "car": 80,
      "train": 90
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "動物園と水生物園を楽しむ施設。公園散策と組み合わせた半日のおでかけに。  予算条件：大人400円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-tama-zoological-park",
    "name": "多摩動物公園",
    "area": "東京都 日野市",
    "website": "https://www.tokyo-park.or.jp/park/tama-zoological-park/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "水族館・動物園",
    "cost": 1200,
    "travel": {
      "car": 100,
      "train": 110
    },
    "stays": [
      4,
      8
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "広い園内で動物を観察。起伏があるため、歩く時間に余裕を持って計画してください。  予算条件：大人600円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-toneri",
    "name": "舎人公園",
    "area": "足立区舎人公園、西伊興町ほか",
    "website": "https://www.tokyo-park.or.jp/park/toneri/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 50,
      "train": 85
    },
    "stays": [
      4,
      8
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "芝生や遊具で屋外の時間を過ごす公園。水遊び設備には季節や利用条件があります。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-nakagawa",
    "name": "中川公園",
    "area": "足立区中川五丁目",
    "website": "https://www.tokyo-park.or.jp/park/nakagawa/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 40,
      "train": 75
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "足立区の公園。亀有駅からの徒歩を含め、親子で屋外散策を楽しむ候補に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-higashi-ayase",
    "name": "東綾瀬公園",
    "area": "足立区東綾瀬一・二・三丁目、綾瀬三・五・六丁目、谷中一丁目",
    "website": "https://www.tokyo-park.or.jp/park/higashi-ayase/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 40,
      "train": 70
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "綾瀬駅周辺から続く公園。散歩と広場での休憩を組み合わせて。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-yumenoshima",
    "name": "夢の島公園",
    "area": "江東区夢の島一、二丁目",
    "website": "https://www.tokyo-park.or.jp/park/yumenoshima/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 55
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "新木場駅近くの公園。緑の中で散策し、熱帯植物館は別料金で計画できます。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-yumenoshima-botanicalhall",
    "name": "夢の島熱帯植物館",
    "area": "東京都 江東区",
    "website": "https://www.tokyo-park.or.jp/park/yumenoshima-botanicalhall/index.html",
    "type": "indoor",
    "rainy": true,
    "category": "大型公園",
    "cost": 1000,
    "travel": {
      "car": 30,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "夢の島公園内の植物館。入館料と開館状況は指定管理者の公式案内で再確認してください。  予算条件：入館予算の仮置き500〜1,000円。最新料金は指定管理者に要確認。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-wakasu-kaihin",
    "name": "若洲海浜公園",
    "area": "東京都 江東区",
    "website": "https://www.tokyo-park.or.jp/park/wakasu-kaihin/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 40,
      "train": 80
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "江東区の海辺の公園。キャンプ場と海浜公園の利用条件は異なるため、利用施設を確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-tatsuminomori-kaihin",
    "name": "辰巳の森海浜公園",
    "area": "東京都 江東区",
    "website": "https://www.tokyo-park.or.jp/park/tatsuminomori-kaihin/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 55
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "江東区の海浜公園。屋外で過ごすプランとして、利用施設の詳細を管理者に確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-tatsuminomori-ryokudo",
    "name": "辰巳の森緑道公園",
    "area": "東京都 江東区",
    "website": "https://www.tokyo-park.or.jp/park/tatsuminomori-ryokudo/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 50
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "江東区の緑道公園で散策。屋外中心のおでかけに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-odaiba-kaihin",
    "name": "お台場海浜公園",
    "area": "東京都 港区",
    "website": "https://www.tokyo-park.or.jp/park/odaiba-kaihin/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 40,
      "train": 70
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "お台場の海辺を歩く公園。海沿いのおでかけは風や天候に合わせて計画してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-shiokaze",
    "name": "潮風公園",
    "area": "品川区東八潮",
    "website": "https://www.tokyo-park.or.jp/park/shiokaze/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 40,
      "train": 75
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "お台場エリアの公園。海辺での散歩や、指定広場での予約BBQを計画できます。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-daiba",
    "name": "台場公園",
    "area": "東京都 港区",
    "website": "https://www.tokyo-park.or.jp/park/daiba/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 40,
      "train": 80
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "お台場エリアの公園。近隣の海浜公園と合わせて、歴史を感じる散策の候補に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-shinkiba",
    "name": "新木場公園",
    "area": "東京都 江東区",
    "website": "https://www.tokyo-park.or.jp/park/shinkiba/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "新木場エリアの公園。屋外散策の候補に。火気やテントの条件は別途確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-tokyo-rinkai-koikibosai",
    "name": "東京臨海広域防災公園",
    "area": "江東区有明三丁目",
    "website": "https://www.tokyo-park.or.jp/park/tokyo-rinkai-koikibosai/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 35,
      "train": 65
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "有明にある防災公園。散策と防災について学ぶおでかけを組み合わせて。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-matsudo-komorebi",
    "name": "木もれ陽の森（21世紀の森と広場）",
    "area": "千葉県松戸市千駄堀269番地（21世紀の森と広場内）",
    "website": "https://www.city.matsudo.chiba.jp/shisetsu-guide/kouen_ryokuka/top/shisetuannnai/komorebi-bbq/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "BBQ",
    "cost": 10000,
    "travel": {
      "car": 45,
      "train": 80
    },
    "stays": [
      4,
      8
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "木々に囲まれたBBQ場・野外キャンプ場。完全予約制で電話か窓口で申し込み。キャンプは2026年4月に再開。キャンプの人数・装備条件は予約先へ確認してください。 BBQは指定区画のみ。予約や器具・食材の費用は別途確認。 予算条件：BBQ予算の仮置き6,000〜10,000円（場所・器具・食材）。運営会社の現行見積りは要確認。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-siba",
    "name": "芝公園",
    "area": "港区芝公園一・二・三・四丁目",
    "website": "https://www.tokyo-park.or.jp/park/siba/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 45,
      "train": 65
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "芝公園駅や御成門駅から歩ける公園。街歩きの途中の休憩に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-hibiya",
    "name": "日比谷公園",
    "area": "千代田区日比谷公園",
    "website": "https://www.tokyo-park.or.jp/park/hibiya/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 45,
      "train": 55
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "都心の公園で花や緑を楽しむ散策。整備工事に伴う一部区域の規制を確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-yoyogi",
    "name": "代々木公園",
    "area": "渋谷区代々木神園町(A地区)、神南一丁目・神南二丁目(B地区)",
    "website": "https://www.tokyo-park.or.jp/park/yoyogi/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 60,
      "train": 65
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "都心の広い公園で散策。休日は道路や駐車場が混雑するため公共交通も検討してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-rinshinomori",
    "name": "林試の森公園",
    "area": "目黒区下目黒五丁目、品川区小山台二丁目",
    "website": "https://www.tokyo-park.or.jp/park/rinshinomori/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 60,
      "train": 80
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "目黒区・品川区にまたがる公園。木々に囲まれた散策を楽しむ候補に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-komazawa-olympic",
    "name": "駒沢オリンピック公園",
    "area": "世田谷区駒沢公園、目黒区東が丘二丁目・八雲五丁目",
    "website": "https://www.tokyo-park.or.jp/park/komazawa-olympic/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 70,
      "train": 85
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "スポーツ施設がある公園。散歩や屋外で体を動かすおでかけに。施設利用は別料金です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kinuta",
    "name": "砧公園",
    "area": "世田谷区砧公園・大蔵一丁目・岡本一丁目",
    "website": "https://www.tokyo-park.or.jp/park/kinuta/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 75,
      "train": 90
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "世田谷区の公園で緑を楽しむ散策。美術館などは別施設として料金を確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-shakujii",
    "name": "石神井公園",
    "area": "練馬区石神井台一・二丁目、石神井町五丁目",
    "website": "https://www.tokyo-park.or.jp/park/shakujii/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 80,
      "train": 90
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "池の周辺の散策を楽しむ公園。歩く距離を子どもの体力に合わせて。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-hikarigaoka",
    "name": "光が丘公園",
    "area": "練馬区光が丘二・四丁目、旭町二丁目、板橋区赤塚新町三丁目",
    "website": "https://www.tokyo-park.or.jp/park/hikarigaoka/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 75,
      "train": 85
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "緑豊かな大きな公園。BBQは完全予約制で、食材や器具の貸出・販売はありません。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-koganei",
    "name": "小金井公園",
    "area": "小金井市桜町三丁目、関野町一・二丁目、小平市花小金井南町三丁目、西東京市向台町六丁目、武蔵野市桜堤三丁目",
    "website": "https://www.tokyo-park.or.jp/park/koganei/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 90,
      "train": 95
    },
    "stays": [
      4,
      8
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "広い公園で散策や遊具を楽しむプランに。たてもの園の入園料は含めていません。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-nogawa",
    "name": "野川公園",
    "area": "調布市野水一・二丁目、小金井市東町一丁目、三鷹市大沢二・三・六丁目",
    "website": "https://www.tokyo-park.or.jp/park/nogawa/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 90,
      "train": 100
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "多摩エリアの公園で自然散策。野川沿いの屋外のおでかけに。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-fuchunomori",
    "name": "府中の森公園",
    "area": "府中市浅間町一丁目・緑町二丁目・天神町二丁目",
    "website": "https://www.tokyo-park.or.jp/park/fuchunomori/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 90,
      "train": 95
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": true,
    "description": "府中市の公園で散歩や広場での休憩。スポーツ施設は別料金です。 BBQは指定広場のみ。予約・持込・レンタル・営業日を要確認。散策予算にBBQ費用は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-musashino-no-mori",
    "name": "武蔵野の森公園",
    "area": "府中市朝日町三丁目、調布市西町、三鷹市大沢五・六丁目",
    "website": "https://www.tokyo-park.or.jp/park/musashino-no-mori/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 0,
    "travel": {
      "car": 90,
      "train": 95
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "調布飛行場周辺の公園で散策。空の見える広場で過ごす屋外プランに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kyu-iwasaki-tei",
    "name": "旧岩崎邸庭園",
    "area": "台東区池之端1-3-45",
    "website": "https://www.tokyo-park.or.jp/park/kyu-iwasaki-tei/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 800,
    "travel": {
      "car": 45,
      "train": 60
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "歴史ある建物と庭園を見学。通常の入園時間に合わせた文化のおでかけに。  予算条件：一般400円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kyu-shiba-rikyu",
    "name": "旧芝離宮恩賜庭園",
    "area": "港区海岸1-4-1",
    "website": "https://www.tokyo-park.or.jp/park/kyu-shiba-rikyu/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 300,
    "travel": {
      "car": 45,
      "train": 65
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "浜松町駅近くの庭園。池を囲む庭園をゆっくり歩くプランに。  予算条件：一般150円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kyu-furukawa",
    "name": "旧古河庭園",
    "area": "東京都北区西ヶ原一丁目",
    "website": "https://www.tokyo-park.or.jp/park/kyu-furukawa/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 300,
    "travel": {
      "car": 50,
      "train": 70
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "洋風庭園と日本庭園を巡る施設。洋館内部の見学は別料金・別条件です。  予算条件：一般150円×2、小学生以下無料。洋館見学は別料金。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-kiyosumi",
    "name": "清澄庭園",
    "area": "江東区清澄3-3-9",
    "website": "https://www.tokyo-park.or.jp/park/kiyosumi/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 300,
    "travel": {
      "car": 30,
      "train": 45
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "池や庭石を眺めながら歩く日本庭園。清澄白河周辺の散策と合わせて。  予算条件：一般150円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-koishikawakorakuen",
    "name": "小石川後楽園",
    "area": "文京区後楽1-6-6",
    "website": "https://www.tokyo-park.or.jp/park/koishikawakorakuen/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 600,
    "travel": {
      "car": 45,
      "train": 55
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "池を中心とする庭園を散策。特別な夜間開園は通常料金と別に確認してください。  予算条件：一般300円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-hama-rikyu",
    "name": "浜離宮恩賜庭園",
    "area": "東京都中央区浜離宮庭園1-1",
    "website": "https://www.tokyo-park.or.jp/park/hama-rikyu/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 600,
    "travel": {
      "car": 45,
      "train": 60
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "都心にある庭園で水辺や季節の植物を楽しむ散歩。茶屋の飲食は別料金です。  予算条件：一般300円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-mukojima-hyakkaen",
    "name": "向島百花園",
    "area": "墨田区東向島3-18-3",
    "website": "https://www.tokyo-park.or.jp/park/mukojima-hyakkaen/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 300,
    "travel": {
      "car": 35,
      "train": 60
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "季節の草花を楽しむ庭園。花の見頃に合わせた散策に。  予算条件：一般150円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-rikugien",
    "name": "六義園",
    "area": "文京区本駒込6-16-3",
    "website": "https://www.tokyo-park.or.jp/park/rikugien/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 600,
    "travel": {
      "car": 50,
      "train": 65
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "池を囲む庭園を歩くおでかけ。夜間イベントは別の利用条件を確認してください。  予算条件：一般300円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-tokyo-jindai",
    "name": "神代植物公園",
    "area": "調布市深大寺元町5-31-10（神代植物公園サービスセンター）",
    "website": "https://www.tokyo-park.or.jp/park/jindai/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "大型公園",
    "cost": 1000,
    "travel": {
      "car": 90,
      "train": 100
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": null,
    "bbq": null,
    "description": "季節の花や植物を楽しむ植物公園。半日かけて園内を歩くプランに。  予算条件：一般500円×2、小学生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-komatsugawa2",
    "name": "小松川境川親水公園",
    "area": "江戸川区中央四丁目・本一色一丁目から西小松川町",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/komatsugawa2.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 35
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "小川や飛び石を楽しむ親水公園。水遊びは季節や設備の稼働状況を確認して。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-ichinoe2",
    "name": "一之江境川親水公園",
    "area": "江戸川区一之江1丁目から船堀7丁目",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/ichinoe2.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 15,
      "train": 25
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "自然に近い水辺を歩く親水公園。魚や昆虫を観察する散策に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-makkou",
    "name": "一之江抹香亭（一之江境川親水公園）",
    "area": "江戸川区一之江五丁目13番16号",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/makkou.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 15,
      "train": 30
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "一之江の歴史を伝える施設。庭や古い暮らしにふれる見学に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-senbonsakura",
    "name": "小松川千本桜",
    "area": "江戸川区小松川1から3丁目地先",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/senbonsakura.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 30
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": true,
    "bbq": true,
    "description": "荒川の堤防沿いの桜を楽しむ散策スポット。花の時期以外も川辺の散歩に。 BBQは指定区画のみ。予約や器具・食材の費用は別途確認。 テント・タープは予約区画内に収まり、地面に大きな穴を開けないもののみ。BBQ区画2,100円、3歳以上5名まで、3〜11月。散策予算に区画料金は含まない。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-shinkawasenbonzakura",
    "name": "新川千本桜",
    "area": "東京都江戸川区",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinkawasenbonzakura/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 40
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "新川沿いの散策路で、桜や川の景色を楽しむおでかけに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-c_recreation",
    "name": "総合レクリエーション公園",
    "area": "東京都江戸川区",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/c_recreation/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 50
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "葛西地区に複数の広場が連なる公園。自由広場・新田の森は2027年2月上旬まで工事予定。一部野球広場も工事中です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-nagisaponyland",
    "name": "なぎさポニーランド",
    "area": "江戸川区南葛西7丁目3番（なぎさ公園内）",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/nagisaponyland.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 55
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "なぎさ公園内のポニーランド。乗馬の対象年齢、時間、当日の実施状況を確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-gyosen",
    "name": "行船公園（平成庭園・源心庵）",
    "area": "江戸川区北葛西3丁目2番1号",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/gyosen.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 40
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "平成庭園の散策と公園での休憩に。源心庵の貸切利用は別の予約・料金が必要です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-shizen",
    "name": "自然動物園",
    "area": "江戸川区北葛西3丁目2番1号行船公園内",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shizen.html",
    "type": "outdoor",
    "rainy": false,
    "category": "水族館・動物園",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 40
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "行船公園内の無料の動物園。近くの庭園や公園散策と組み合わせて。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-furukawa",
    "name": "古川親水公園",
    "area": "江戸川区江戸川6丁目内",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/furukawa.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 15,
      "train": 35
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "国内初の親水公園として紹介される水辺。散歩や季節の花を楽しむプランに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-shincho",
    "name": "新長島川親水公園",
    "area": "江戸川区清新町2丁目8番・9番・10番先",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shincho.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 50
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "噴水や季節の緑を楽しむ親水公園。水遊び設備の稼働状況は訪問前に確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-shinsakon",
    "name": "新左近川親水公園",
    "area": "東京都江戸川区",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinsakon.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 50
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": true,
    "description": "広い水面を眺める親水公園。遊具や、指定エリアでの予約BBQも候補に。 BBQは指定区画のみ。予約や器具・食材の費用は別途確認。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-kowatei",
    "name": "小岩公園（甲和亭）",
    "area": "江戸川区北小岩6丁目43番1号",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/kowatei.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 55
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "北小岩の公園で散歩。甲和亭の利用は施設の開館時間や条件を確認して。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-koiwa",
    "name": "小岩菖蒲園",
    "area": "江戸川区北小岩4丁目先（江戸川河川敷）",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/koiwa.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 55
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "江戸川河川敷の菖蒲園。初夏の花菖蒲の見頃に合わせた散策に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-shinozakiponyland",
    "name": "篠崎ポニーランド",
    "area": "江戸川区篠崎町3丁目12番17号",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinozakiponyland.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 15,
      "train": 35
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "小学生までのポニー乗馬が無料。天候や動物の体調で実施が変わります。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-edogawa-toubukoutuu",
    "name": "東部交通公園",
    "area": "江戸川区江戸川2丁目28番1号",
    "website": "https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/toubukoutuu.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 10,
      "train": 20
    },
    "stays": [
      2
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "自転車や足踏みゴーカートで交通ルールを学ぶ無料施設。瑞江駅から徒歩20分と公式に案内されています。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-3087",
    "name": "万葉植物園",
    "area": "市川市大野町2-1857",
    "website": "https://www.city.ichikawa.lg.jp/page/3087.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 35,
      "train": 65
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "万葉集ゆかりの植物を楽しむ無料の植物園。展示室などは当面利用休止中です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-4330",
    "name": "大洲防災公園",
    "area": "市川市大洲1-18",
    "website": "https://www.city.ichikawa.lg.jp/page/4330.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 45
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": true,
    "description": "広場で休憩できる防災公園。ピクニック広場のBBQは要予約・道具持参です。 BBQは指定区画のみ。予約や器具・食材の費用は別途確認。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-7810",
    "name": "里見公園",
    "area": "市川市国府台3-9",
    "website": "https://www.city.ichikawa.lg.jp/page/7810.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 55
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "桜やバラを楽しめる公園。江戸川周辺の散策と合わせたおでかけに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-2453",
    "name": "じゅん菜池緑地",
    "area": "市川市中国分4-27",
    "website": "https://www.city.ichikawa.lg.jp/page/2453.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 55
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "池の周辺の散策で季節の風景を楽しむ緑地。茶室利用は別途予約が必要です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-4473",
    "name": "小塚山公園",
    "area": "市川市北国分1-26",
    "website": "https://www.city.ichikawa.lg.jp/page/4473.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 60
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "緑の中を歩く公園。隣接するフィールドアスレチックとは別の散策プランです。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-4472",
    "name": "小塚山フィールドアスレチック",
    "area": "市川市北国分1-1",
    "website": "https://www.city.ichikawa.lg.jp/page/4472.html",
    "type": "outdoor",
    "rainy": false,
    "category": "アスレチック",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "13基の遊具で楽しむ無料アスレチック。雨の日や雨の翌日など危険な日は休園します。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-3934",
    "name": "市川児童交通公園（東菅野）",
    "area": "千葉県市川市東菅野2－23－3",
    "website": "https://www.city.ichikawa.lg.jp/page/3934.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 40
    },
    "stays": [
      2
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "自転車などで交通ルールを学ぶ児童交通公園。公園用駐車場はありません。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-4262",
    "name": "堀之内貝塚公園",
    "area": "市川市堀之内2-2899",
    "website": "https://www.city.ichikawa.lg.jp/page/4262.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 55
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "縄文時代の貝塚をめぐる公園。隣接する考古・歴史博物館と合わせて。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-7915",
    "name": "須和田公園",
    "area": "市川市須和田2-34",
    "website": "https://www.city.ichikawa.lg.jp/page/7915.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 25,
      "train": 45
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "桜やバラ、文学者の詩碑がある公園。季節の花を楽しむ短い散策に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-7440",
    "name": "行徳中央公園",
    "area": "市川市富浜3-10",
    "website": "https://www.city.ichikawa.lg.jp/page/7440.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 40
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "遊具広場などがある行徳の公園。夏季のミニプールは実施日を確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-8014",
    "name": "駅前公園",
    "area": "市川市湊新田2-4",
    "website": "https://www.city.ichikawa.lg.jp/page/8014.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 40
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "行徳駅近くの公園。ミニSLは第2日曜（8月を除く）に実施、雨天中止です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-4083",
    "name": "南沖公園",
    "area": "市川市行徳駅前3-4",
    "website": "https://www.city.ichikawa.lg.jp/page/4083.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 45
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "交通遊具で遊べる公園。貸出時間や休園日を公式案内で確認してください。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-4363",
    "name": "妙典公園",
    "area": "市川市妙典6丁目1-1",
    "website": "https://www.city.ichikawa.lg.jp/page/4363.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 40
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "芝生と周遊路がある公園。妙典エリアの散歩や休憩に。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-4084",
    "name": "南行徳公園",
    "area": "市川市相之川4-1",
    "website": "https://www.city.ichikawa.lg.jp/page/4084.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 40
    },
    "stays": [
      2
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "ローラー滑り台やアスレチック遊具がある公園。プールは夏季のみです。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-7474",
    "name": "行徳水辺の杜公園",
    "area": "市川市加藤新田202-13",
    "website": "https://www.city.ichikawa.lg.jp/page/7474.html",
    "type": "outdoor",
    "rainy": false,
    "category": "その他",
    "cost": 0,
    "travel": {
      "car": 20,
      "train": 45
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": null,
    "bbq": null,
    "description": "水辺の小さな公園で休憩。ブランコや複合遊具などがあります。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-zoo",
    "name": "市川市動植物園",
    "area": "千葉県市川市大町284番地1",
    "website": "https://www.city.ichikawa.lg.jp/site/zoo/index.html",
    "type": "outdoor",
    "rainy": false,
    "category": "水族館・動物園",
    "cost": 1100,
    "travel": {
      "car": 40,
      "train": 75
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": null,
    "bbq": null,
    "description": "小さな動物や園内の展示を観察する動植物園。ミニ鉄道などは別料金です。  予算条件：大人440円×2、小人110円×2。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-toyosu",
    "name": "アーバンドック ららぽーと豊洲",
    "area": "東京都江東区豊洲2-4-9",
    "website": "https://mitsui-shopping-park.com/lalaport/toyosu/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 35,
      "train": 55
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-tokyo-bay",
    "name": "ららぽーとTOKYO-BAY",
    "area": "千葉県船橋市浜町 2-1-1",
    "website": "https://mitsui-shopping-park.com/lalaport/tokyo-bay/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 35,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-shinmisato",
    "name": "ららぽーと新三郷",
    "area": "埼玉県三郷市新三郷ららシティ3-1-1",
    "website": "https://mitsui-shopping-park.com/lalaport/shinmisato/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 50,
      "train": 95
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-kashiwa",
    "name": "ららぽーと柏の葉",
    "area": "千葉県柏市若柴175",
    "website": "https://mitsui-shopping-park.com/lalaport/kashiwa/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 60,
      "train": 100
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-fujimi",
    "name": "ららぽーと富士見",
    "area": "埼玉県富士見市山室1-1313",
    "website": "https://mitsui-shopping-park.com/lalaport/fujimi/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 85,
      "train": 110
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-ebina",
    "name": "ららぽーと海老名",
    "area": "神奈川県海老名市扇町13-1",
    "website": "https://mitsui-shopping-park.com/lalaport/ebina/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 110,
      "train": 115
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-tachikawa",
    "name": "ららぽーと立川立飛",
    "area": "東京都立川市泉町935番地の1",
    "website": "https://mitsui-shopping-park.com/lalaport/tachikawa/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 100,
      "train": 100
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-mitsui-yokohama",
    "name": "ららぽーと横浜",
    "area": "神奈川県横浜市都筑区池辺町4035-1",
    "website": "https://mitsui-shopping-park.com/lalaport/yokohama/",
    "type": "indoor",
    "rainy": true,
    "category": "ショッピングモール",
    "cost": 0,
    "travel": {
      "car": 90,
      "train": 110
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "買い物や飲食を組み合わせた屋内中心のおでかけ。入館だけなら無料で、買い物・食事・遊び場・駐車場は別予算です。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-kahaku",
    "name": "国立科学博物館（上野本館）",
    "area": "東京都台東区上野公園",
    "website": "https://www.kahaku.go.jp/",
    "type": "indoor",
    "rainy": true,
    "category": "科学館・博物館",
    "cost": 1260,
    "travel": {
      "car": 45,
      "train": 60
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "上野本館の常設展示で自然や科学にふれるおでかけ。特別展は別料金です。  予算条件：常設展一般630円×2、高校生以下無料。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-camp",
    "name": "いちかわ市民キャンプ場",
    "area": "千葉県市川市柏井町2丁目992番地1",
    "website": "https://www.city.ichikawa.lg.jp/page/1807.html",
    "type": "outdoor",
    "rainy": false,
    "category": "キャンプ・デイキャンプ",
    "cost": 0,
    "travel": {
      "car": 35,
      "train": 75
    },
    "stays": [
      4,
      8
    ],
    "rating": 4,
    "tent": true,
    "bbq": null,
    "description": "無料・市外の方も利用可能なキャンプ場。利用日の2か月前〜7日前に仮予約と申請が必要。市外利用者はテント・調理器具を持参。火気は炊事場のかまどなど許可場所のみ、禁酒・禁煙。 テントは予約したサイトのみ。コンロ持込BBQは禁止、炊事場のかまど使用は予約時に確認。施設無料。食材・装備は別予算。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-sumida",
    "name": "すみだ水族館",
    "area": "東京都墨田区押上",
    "website": "https://www.sumida-aquarium.com/",
    "type": "indoor",
    "rainy": true,
    "category": "水族館・動物園",
    "cost": 8200,
    "travel": {
      "car": 35,
      "train": 50
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": false,
    "bbq": false,
    "description": "東京スカイツリータウン内の水族館。魚やペンギンなどを屋内で観察するプランに。  予算条件：大人2,700円×2、小学生1,400円×2。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-kidzania",
    "name": "キッザニア東京",
    "area": "東京都江東区豊洲",
    "website": "https://www.kidzania.jp/tokyo",
    "type": "indoor",
    "rainy": true,
    "category": "屋内遊び場",
    "cost": 24000,
    "travel": {
      "car": 35,
      "train": 55
    },
    "stays": [
      4,
      8
    ],
    "rating": 5,
    "tent": false,
    "bbq": false,
    "description": "子どもが仕事や社会を体験する施設。対象は3〜15歳。日時・プランで料金が変わるため予約時に確認してください。  予算条件：家族予算の仮置き12,000〜24,000円。料金表はセッションエラーで数値を確認できず、予約日・プランで要確認。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-sunshine-aqua",
    "name": "サンシャイン水族館",
    "area": "東京都豊島区東池袋",
    "website": "https://sunshinecity.jp/aquarium/",
    "type": "indoor",
    "rainy": true,
    "category": "水族館・動物園",
    "cost": 9000,
    "travel": {
      "car": 60,
      "train": 70
    },
    "stays": [
      2,
      4
    ],
    "rating": 5,
    "tent": false,
    "bbq": false,
    "description": "池袋の水族館で生きものを観察。屋外エリアもあるため、雨天は屋内展示を中心に。  予算条件：大人2,600〜3,200円×2、小学生1,300円×2で7,800〜9,000円。検索は上限の9,000円。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-sunshine-observatory",
    "name": "サンシャイン60展望台 てんぼうパーク",
    "area": "東京都豊島区東池袋",
    "website": "https://sunshinecity.jp/observatory/",
    "type": "indoor",
    "rainy": true,
    "category": "その他",
    "cost": 4000,
    "travel": {
      "car": 60,
      "train": 70
    },
    "stays": [
      2
    ],
    "rating": 3,
    "tent": false,
    "bbq": false,
    "description": "池袋の展望台で景色を楽しむ屋内プラン。日付によって料金が変わります。  予算条件：大人700〜1,200円×2、小学生500〜800円×2で2,400〜4,000円。検索は上限の4,000円。",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-ichikawa-museum",
    "name": "市立市川考古博物館",
    "area": "千葉県市川市堀之内2-26-1",
    "website": "https://www.city.ichikawa.lg.jp/site/edu14/5235.html",
    "type": "indoor",
    "rainy": true,
    "category": "科学館・博物館",
    "cost": 0,
    "travel": {
      "car": 30,
      "train": 55
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "市川の考古資料を見学する無料の博物館。隣接する貝塚公園と合わせた歴史のおでかけに。 ",
    "source": "builtin",
    "sample": false
  },
  {
    "id": "place-funabashi-sanbanze",
    "name": "ふなばし三番瀬環境学習館",
    "area": "千葉県船橋市潮見町40",
    "website": "https://www.city.funabashi.lg.jp/machi/kankyou/002/p051395.html",
    "type": "indoor",
    "rainy": true,
    "category": "科学館・博物館",
    "cost": 1000,
    "travel": {
      "car": 35,
      "train": 75
    },
    "stays": [
      2,
      4
    ],
    "rating": 4,
    "tent": false,
    "bbq": false,
    "description": "三番瀬の自然を展示や体験で学ぶ施設。有料展示の子ども料金は居住地・在学先による扱いがあります。  予算条件：一般400円×2、小学生100円×2の有料展示1,000円。船橋市内在住・在学の小中学生は無料。",
    "source": "builtin",
    "sample": false
  }
];
export const catalogReady = verifiedSpots.length === 100;
