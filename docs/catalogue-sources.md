# 旧250件の調査記録（version 2時点）

この資料は前版250件の確認記録を保持したものです。現行は350候補・10大カテゴリ・version 3です。今回Web検索は行わず、追加100件はユーザー提供の名称と種別を使用しています。旧仮予算3件は新しい予算検索から除外しています。現行仕様は[README](../README.md)、件数は[集計](catalogue-summary.json)、再利用した追加項目の根拠は[v3再利用記録](v3-reused-facts.json)を参照してください。

確認日：2026年10月11日（日本時間）。100施設の公式施設案内を取得して名称・実在を確認し、自治体・運営者の案内から所在地またはエリアを記録した。施設案内と公園・庭園の一覧に所在地の粒度差があるため、町丁目まで確認できない施設は市区のエリア表示とした。

HTTP 200だけを実在確認の根拠にせず、ページタイトル・本文の施設名も点検した。エラーページ、汎用トップページだけの候補、長期休館中の日本科学未来館は登録に使っていない。自治体の公式ページで紹介されている管理施設も含む。原本HTML・本文は作業用ディレクトリに保管し、コミットする根拠JSONには参照URL・ページタイトル・確認日・HTTP結果・取得原本のSHA-256を残す。全文転載はしない。

先行100件の確認・予算条件はそのまま保持した。2026年10月11日に追加150件を50件ずつ確認・登録し、合計250件へ拡張した。追加分は運営者・自治体・公式観光機関の施設案内と料金・利用条件ページを参照した。ブラウザ取得または公式ページの検索索引による確認は、根拠JSONに `method: official-web-retrieval` と記録し、取得本文のSHA-256を保存している。直接HTTP取得の200応答と混同しない。索引に残った本文は現行表示と異なる場合があり、料金の適用日・プランはカード内に明示した。

## 検索値の読み方

- 基準人数は大人2人＋小学生2人。`cost`は通常入館・入園の合計または明記したプランの計画予算。交通費・駐車料金・食事・買い物は原則別。無料の公園でもBBQ・レンタル・スポーツ施設の利用が無料という意味ではない。先行100件は通常入園の料金範囲がある施設で上限を検索値に使った。追加分は下限・日付区分・特定プランを使う場合があるため、各カードに適用条件を明記した。幼児・中高生・割引・特別展では変わる。
- キッザニア東京、夢の島熱帯植物館、木もれ陽の森の金額は最新の料金表で確定できず、**計画用の仮予算**。各カードに要確認と明記し、根拠JSONの`budgetVerification`を`estimate`とした。未確認の金額を公式料金として扱わない。
- 移動時間は瑞江駅からの車／公共交通（電車・バス・徒歩を含む）の片道推定。公式の所在地・最寄りアクセスを参考に編集した値で、経路APIの計算や現在のダイヤ確認、実走調査はしていない。乗換・待ち・駐車を想定し5分単位に丸めた。下表の幅は計画上の幅で、混雑・バス間隔・渋滞で超過する。距離順は実距離ではなく、選択した移動手段の所要時間順。
- 滞在時間と子ども向け度は編集上の提案で、公式評価や口コミ点数ではない。`rainy`は屋内中心で計画できることを示す。屋外を含む水族館では雨に濡れる部分もある。
- テント・BBQは`true`＝指定条件で利用可、`null`＝許可条件を未確認、屋内の`false`＝この施設では対象外。タープの許可だけではテントOKにしない。災害用テント設備から普段の設営許可を推定しない。宿泊キャンプと日除けテントも区別する。
- いちかわ市民キャンプ場は市外利用も無料。テントサイト・予約申請・市外利用者の装備持参条件を公式手引きで確認。持込コンロBBQは許可されないためBBQの可否はnullとし、指定かまどなど火気条件をカードに明示した。
- 水元公園の教育用キャンプ広場は、人数・児童比率などの条件から家族4人の通常キャンプ候補としては推奨しない。木もれ陽の森はBBQ予約・2026年4月のキャンプ再開を市の公式案内で確認したが、テント装備の条件は未確認。
- 同じ敷地内でも、公園と入園管理される動物園・水族園・博物館は別施設。組み合わせ訪問時に移動時間を加算する必要はない。総合レクリエーション公園とポニーランド等もこの関係にある。

## 施設別の確認と目安

詳細なURLと検証記録は [`catalogue-evidence.json`](catalogue-evidence.json)。テント・BBQの予約条件、部分工事、料金条件はカードと根拠JSONに記録した。

| 固定ID・施設 | 公式施設案内 | 車 / 公共交通の計画幅（分） | 予算条件 |
| --- | --- | --- | --- |
| `place-tokyo-ukita` 宇喜田公園 | [公式](https://www.tokyo-park.or.jp/park/ukita/index.html) | 15〜30 / 25〜55 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-ojima-komatsugawa` 大島小松川公園 | [公式](https://www.tokyo-park.or.jp/park/ojima-komatsugawa/index.html) | 15〜30 / 15〜45 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-kasaikaihin` 葛西海浜公園 | [公式](https://www.tokyo-park.or.jp/park/kasaikaihin/index.html) | 15〜55 / 50〜80 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-kasairinkai` 葛西臨海公園 | [公式](https://www.tokyo-park.or.jp/park/kasairinkai/index.html) | 15〜55 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-kasai-rinkai-suizokuen` 葛西臨海水族園 | [公式](https://www.tokyo-park.or.jp/park/kasai-rinkai-suizokuen/index.html) | 15〜55 / 50〜80 | 大人700円×2、小学生以下無料。 |
| `place-tokyo-kameido-chuo` 亀戸中央公園 | [公式](https://www.tokyo-park.or.jp/park/kameido-chuo/index.html) | 20〜35 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-kiba` 木場公園 | [公式](https://www.tokyo-park.or.jp/park/kiba/index.html) | 15〜55 / 40〜70 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-sarue` 猿江恩賜公園 | [公式](https://www.tokyo-park.or.jp/park/sarue/index.html) | 15〜55 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-shinozaki` 篠崎公園 | [公式](https://www.tokyo-park.or.jp/park/shinozaki/index.html) | 10〜25 / 20〜50 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-mizumoto` 水元公園 | [公式](https://www.tokyo-park.or.jp/park/mizumoto/index.html) | 30〜70 / 70〜100 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-higashi-shirahige` 東白鬚公園 | [公式](https://www.tokyo-park.or.jp/park/higashi-shirahige/index.html) | 20〜60 / 50〜80 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-shioiri` 汐入公園 | [公式](https://www.tokyo-park.or.jp/park/shioiri/index.html) | 20〜60 / 50〜80 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-ueno` 上野恩賜公園 | [公式](https://www.tokyo-park.or.jp/park/ueno/index.html) | 30〜70 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-ueno-zoological-gardens` 恩賜上野動物園 | [公式](https://www.tokyo-park.or.jp/park/ueno-zoological-gardens/index.html) | 30〜70 / 50〜80 | 大人600円×2、小学生以下無料。 |
| `place-tokyo-inokashira` 井の頭恩賜公園 | [公式](https://www.tokyo-park.or.jp/park/inokashira/index.html) | 65〜105 / 75〜105 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-inokashira-park-zoo` 井の頭自然文化園 | [公式](https://www.tokyo-park.or.jp/park/inokashira-park-zoo/index.html) | 65〜105 / 80〜110 | 大人400円×2、小学生以下無料。 |
| `place-tokyo-tama-zoological-park` 多摩動物公園 | [公式](https://www.tokyo-park.or.jp/park/tama-zoological-park/index.html) | 85〜125 / 100〜130 | 大人600円×2、小学生以下無料。 |
| `place-tokyo-toneri` 舎人公園 | [公式](https://www.tokyo-park.or.jp/park/toneri/index.html) | 35〜75 / 75〜105 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-nakagawa` 中川公園 | [公式](https://www.tokyo-park.or.jp/park/nakagawa/index.html) | 25〜65 / 65〜95 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-higashi-ayase` 東綾瀬公園 | [公式](https://www.tokyo-park.or.jp/park/higashi-ayase/index.html) | 25〜65 / 60〜90 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-yumenoshima` 夢の島公園 | [公式](https://www.tokyo-park.or.jp/park/yumenoshima/index.html) | 15〜55 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-yumenoshima-botanicalhall` 夢の島熱帯植物館 | [公式](https://www.tokyo-park.or.jp/park/yumenoshima-botanicalhall/index.html) | 15〜55 / 50〜80 | 入館予算の仮置き500〜1,000円。最新料金は指定管理者に要確認。 |
| `place-tokyo-wakasu-kaihin` 若洲海浜公園 | [公式](https://www.tokyo-park.or.jp/park/wakasu-kaihin/index.html) | 25〜65 / 70〜100 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-tatsuminomori-kaihin` 辰巳の森海浜公園 | [公式](https://www.tokyo-park.or.jp/park/tatsuminomori-kaihin/index.html) | 15〜55 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-tatsuminomori-ryokudo` 辰巳の森緑道公園 | [公式](https://www.tokyo-park.or.jp/park/tatsuminomori-ryokudo/index.html) | 15〜55 / 40〜70 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-odaiba-kaihin` お台場海浜公園 | [公式](https://www.tokyo-park.or.jp/park/odaiba-kaihin/index.html) | 25〜65 / 60〜90 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-shiokaze` 潮風公園 | [公式](https://www.tokyo-park.or.jp/park/shiokaze/index.html) | 25〜65 / 65〜95 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-daiba` 台場公園 | [公式](https://www.tokyo-park.or.jp/park/daiba/index.html) | 25〜65 / 70〜100 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-shinkiba` 新木場公園 | [公式](https://www.tokyo-park.or.jp/park/shinkiba/index.html) | 15〜55 / 50〜80 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-tokyo-rinkai-koikibosai` 東京臨海広域防災公園 | [公式](https://www.tokyo-park.or.jp/park/tokyo-rinkai-koikibosai/index.html) | 20〜60 / 55〜85 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-matsudo-komorebi` 木もれ陽の森（21世紀の森と広場） | [公式](https://www.city.matsudo.chiba.jp/shisetsu-guide/kouen_ryokuka/top/shisetuannnai/komorebi-bbq/index.html) | 30〜70 / 70〜100 | BBQ予算の仮置き6,000〜10,000円（場所・器具・食材）。運営会社の現行見積りは要確認。 |
| `place-tokyo-siba` 芝公園 | [公式](https://www.tokyo-park.or.jp/park/siba/index.html) | 30〜70 / 55〜85 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-hibiya` 日比谷公園 | [公式](https://www.tokyo-park.or.jp/park/hibiya/index.html) | 30〜70 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-yoyogi` 代々木公園 | [公式](https://www.tokyo-park.or.jp/park/yoyogi/index.html) | 45〜85 / 55〜85 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-rinshinomori` 林試の森公園 | [公式](https://www.tokyo-park.or.jp/park/rinshinomori/index.html) | 45〜85 / 70〜100 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-komazawa-olympic` 駒沢オリンピック公園 | [公式](https://www.tokyo-park.or.jp/park/komazawa-olympic/index.html) | 55〜95 / 75〜105 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-kinuta` 砧公園 | [公式](https://www.tokyo-park.or.jp/park/kinuta/index.html) | 60〜100 / 80〜110 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-shakujii` 石神井公園 | [公式](https://www.tokyo-park.or.jp/park/shakujii/index.html) | 65〜105 / 80〜110 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-hikarigaoka` 光が丘公園 | [公式](https://www.tokyo-park.or.jp/park/hikarigaoka/index.html) | 60〜100 / 75〜105 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-koganei` 小金井公園 | [公式](https://www.tokyo-park.or.jp/park/koganei/index.html) | 75〜115 / 85〜115 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-nogawa` 野川公園 | [公式](https://www.tokyo-park.or.jp/park/nogawa/index.html) | 75〜115 / 90〜120 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-fuchunomori` 府中の森公園 | [公式](https://www.tokyo-park.or.jp/park/fuchunomori/index.html) | 75〜115 / 85〜115 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-musashino-no-mori` 武蔵野の森公園 | [公式](https://www.tokyo-park.or.jp/park/musashino-no-mori/index.html) | 75〜115 / 85〜115 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-tokyo-kyu-iwasaki-tei` 旧岩崎邸庭園 | [公式](https://www.tokyo-park.or.jp/park/kyu-iwasaki-tei/index.html) | 30〜70 / 50〜80 | 一般400円×2、小学生以下無料。 |
| `place-tokyo-kyu-shiba-rikyu` 旧芝離宮恩賜庭園 | [公式](https://www.tokyo-park.or.jp/park/kyu-shiba-rikyu/index.html) | 30〜70 / 55〜85 | 一般150円×2、小学生以下無料。 |
| `place-tokyo-kyu-furukawa` 旧古河庭園 | [公式](https://www.tokyo-park.or.jp/park/kyu-furukawa/index.html) | 35〜75 / 60〜90 | 一般150円×2、小学生以下無料。洋館見学は別料金。 |
| `place-tokyo-kiyosumi` 清澄庭園 | [公式](https://www.tokyo-park.or.jp/park/kiyosumi/index.html) | 15〜55 / 35〜65 | 一般150円×2、小学生以下無料。 |
| `place-tokyo-koishikawakorakuen` 小石川後楽園 | [公式](https://www.tokyo-park.or.jp/park/koishikawakorakuen/index.html) | 30〜70 / 45〜75 | 一般300円×2、小学生以下無料。 |
| `place-tokyo-hama-rikyu` 浜離宮恩賜庭園 | [公式](https://www.tokyo-park.or.jp/park/hama-rikyu/index.html) | 30〜70 / 50〜80 | 一般300円×2、小学生以下無料。 |
| `place-tokyo-mukojima-hyakkaen` 向島百花園 | [公式](https://www.tokyo-park.or.jp/park/mukojima-hyakkaen/index.html) | 20〜60 / 50〜80 | 一般150円×2、小学生以下無料。 |
| `place-tokyo-rikugien` 六義園 | [公式](https://www.tokyo-park.or.jp/park/rikugien/index.html) | 35〜75 / 55〜85 | 一般300円×2、小学生以下無料。 |
| `place-tokyo-jindai` 神代植物公園 | [公式](https://www.tokyo-park.or.jp/park/jindai/index.html) | 75〜115 / 90〜120 | 一般500円×2、小学生以下無料。 |
| `place-edogawa-komatsugawa2` 小松川境川親水公園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/komatsugawa2.html) | 15〜30 / 25〜55 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-ichinoe2` 一之江境川親水公園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/ichinoe2.html) | 10〜25 / 15〜45 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-makkou` 一之江抹香亭（一之江境川親水公園） | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/makkou.html) | 10〜25 / 20〜50 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-senbonsakura` 小松川千本桜 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/senbonsakura.html) | 15〜30 / 20〜50 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-shinkawasenbonzakura` 新川千本桜 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinkawasenbonzakura/index.html) | 15〜30 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-c_recreation` 総合レクリエーション公園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/c_recreation/index.html) | 20〜35 / 40〜70 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-nagisaponyland` なぎさポニーランド | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/nagisaponyland.html) | 20〜35 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-gyosen` 行船公園（平成庭園・源心庵） | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/gyosen.html) | 15〜30 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-shizen` 自然動物園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shizen.html) | 15〜30 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-furukawa` 古川親水公園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/furukawa.html) | 10〜25 / 25〜55 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-shincho` 新長島川親水公園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shincho.html) | 20〜35 / 40〜70 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-shinsakon` 新左近川親水公園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinsakon.html) | 20〜35 / 40〜70 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-kowatei` 小岩公園（甲和亭） | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/kowatei.html) | 20〜35 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-koiwa` 小岩菖蒲園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/koiwa.html) | 20〜35 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-shinozakiponyland` 篠崎ポニーランド | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinozakiponyland.html) | 10〜25 / 25〜55 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-edogawa-toubukoutuu` 東部交通公園 | [公式](https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/toubukoutuu.html) | 5〜20 / 10〜40 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-3087` 万葉植物園 | [公式](https://www.city.ichikawa.lg.jp/page/3087.html) | 20〜60 / 55〜85 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-4330` 大洲防災公園 | [公式](https://www.city.ichikawa.lg.jp/page/4330.html) | 20〜35 / 35〜65 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-7810` 里見公園 | [公式](https://www.city.ichikawa.lg.jp/page/7810.html) | 15〜55 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-2453` じゅん菜池緑地 | [公式](https://www.city.ichikawa.lg.jp/page/2453.html) | 15〜55 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-4473` 小塚山公園 | [公式](https://www.city.ichikawa.lg.jp/page/4473.html) | 15〜55 / 50〜80 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-4472` 小塚山フィールドアスレチック | [公式](https://www.city.ichikawa.lg.jp/page/4472.html) | 15〜55 / 50〜80 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-3934` 市川児童交通公園（東菅野） | [公式](https://www.city.ichikawa.lg.jp/page/3934.html) | 20〜35 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-4262` 堀之内貝塚公園 | [公式](https://www.city.ichikawa.lg.jp/page/4262.html) | 15〜55 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-7915` 須和田公園 | [公式](https://www.city.ichikawa.lg.jp/page/7915.html) | 20〜35 / 35〜65 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-7440` 行徳中央公園 | [公式](https://www.city.ichikawa.lg.jp/page/7440.html) | 15〜30 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-8014` 駅前公園 | [公式](https://www.city.ichikawa.lg.jp/page/8014.html) | 15〜30 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-4083` 南沖公園 | [公式](https://www.city.ichikawa.lg.jp/page/4083.html) | 15〜30 / 35〜65 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-4363` 妙典公園 | [公式](https://www.city.ichikawa.lg.jp/page/4363.html) | 15〜30 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-4084` 南行徳公園 | [公式](https://www.city.ichikawa.lg.jp/page/4084.html) | 15〜30 / 30〜60 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-7474` 行徳水辺の杜公園 | [公式](https://www.city.ichikawa.lg.jp/page/7474.html) | 15〜30 / 35〜65 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-ichikawa-zoo` 市川市動植物園 | [公式](https://www.city.ichikawa.lg.jp/site/zoo/index.html) | 25〜65 / 65〜95 | 大人440円×2、小人110円×2。 |
| `place-mitsui-toyosu` アーバンドック ららぽーと豊洲 | [公式](https://mitsui-shopping-park.com/lalaport/toyosu/) | 20〜60 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-mitsui-tokyo-bay` ららぽーとTOKYO-BAY | [公式](https://mitsui-shopping-park.com/lalaport/tokyo-bay/) | 20〜60 / 50〜80 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-mitsui-shinmisato` ららぽーと新三郷 | [公式](https://mitsui-shopping-park.com/lalaport/shinmisato/) | 35〜75 / 85〜115 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-mitsui-kashiwa` ららぽーと柏の葉 | [公式](https://mitsui-shopping-park.com/lalaport/kashiwa/) | 45〜85 / 90〜120 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-mitsui-fujimi` ららぽーと富士見 | [公式](https://mitsui-shopping-park.com/lalaport/fujimi/) | 70〜110 / 100〜130 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-mitsui-ebina` ららぽーと海老名 | [公式](https://mitsui-shopping-park.com/lalaport/ebina/) | 95〜135 / 105〜135 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-mitsui-tachikawa` ららぽーと立川立飛 | [公式](https://mitsui-shopping-park.com/lalaport/tachikawa/) | 85〜125 / 90〜120 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-mitsui-yokohama` ららぽーと横浜 | [公式](https://mitsui-shopping-park.com/lalaport/yokohama/) | 75〜115 / 100〜130 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-kahaku` 国立科学博物館（上野本館） | [公式](https://www.kahaku.go.jp/) | 30〜70 / 50〜80 | 常設展一般630円×2、高校生以下無料。 |
| `place-ichikawa-camp` いちかわ市民キャンプ場 | [公式](https://www.city.ichikawa.lg.jp/page/1807.html) | 20〜60 / 65〜95 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-sumida` すみだ水族館 | [公式](https://www.sumida-aquarium.com/) | 20〜60 / 40〜70 | 大人2,700円×2、小学生1,400円×2。 |
| `place-kidzania` キッザニア東京 | [公式](https://www.kidzania.jp/tokyo) | 20〜60 / 45〜75 | 家族予算の仮置き12,000〜24,000円。料金表はセッションエラーで数値を確認できず、予約日・プランで要確認。 |
| `place-sunshine-aqua` サンシャイン水族館 | [公式](https://sunshinecity.jp/aquarium/) | 45〜85 / 60〜90 | 大人2,600〜3,200円×2、小学生1,300円×2で7,800〜9,000円。検索は上限の9,000円。 |
| `place-sunshine-observatory` サンシャイン60展望台 てんぼうパーク | [公式](https://sunshinecity.jp/observatory/) | 45〜85 / 60〜90 | 大人700〜1,200円×2、小学生500〜800円×2で2,400〜4,000円。検索は上限の4,000円。 |
| `place-ichikawa-museum` 市立市川考古博物館 | [公式](https://www.city.ichikawa.lg.jp/site/edu14/5235.html) | 15〜55 / 45〜75 | 通常の公園散策・見学または入館のみ0円。飲食・買い物・駐車場・有料体験は含まない。 |
| `place-funabashi-sanbanze` ふなばし三番瀬環境学習館 | [公式](https://www.city.funabashi.lg.jp/machi/kankyou/002/p051395.html) | 20〜60 / 65〜95 | 一般400円×2、小学生100円×2の有料展示1,000円。船橋市内在住・在学の小中学生は無料。 |

## 追加150件（改訂2～4）

車または公共交通の目安で概ね3時間以内の施設を対象とし、都県・エリア・17カテゴリ・有名タグを追加した。時間と滞在・子ども向け度は編集目安。BBQ・テントの可否は専用区画、日帰り・宿泊予約、持込制限などの条件付きで、未確認はnullのまま扱う。費用は入場料または説明に示したプラン。料金・入場区分の時点差や予約日の変動は出発前に確認する。

以下の注意点を反映した。

- 西武園ゆうえんちは現在の公式ドメイン、さがみ湖MORI MORIは現在の名称で登録。
- 大多喜ハーブガーデンは公式観光協会と新運営サイトでリニューアルを確認し「大多喜有用植物苑（OTAKI HERB GARDEN）」に変更。
- 千葉ウシノヒロバは2026年5月3日のお知らせに従い、宿泊予約後17時までに退場する日帰り利用と説明。見学の入場料金とキャンプ料金を区別。
- スプラッシュガーデンの日帰りテント設営禁止、箱根湯寮の大浴場の未就学児不可を明示。
- 大磯ロングビーチは2026年営業終了、次季営業・料金未発表。狭山スキー場は掲載中の入場区分と冬季券・レンタルを区別。
- 龍宮城スパの一部浴槽の温泉供給停止、展示休止・点検等は公式案内に従って計画する。
- 油壺マリンパーク、閉園した旧館山ファミリーパーク、所在地が1都3県外のスズキ歴史館、公式案内を確認できない候補は登録対象から除外した。

| 施設・固定ID | 都県 / カテゴリ | 車 / 公共交通（分） | 公式案内・予算根拠 | 予算条件 |
| --- | --- | --- | --- | --- |
| 東京ディズニーランド<br>`place-tdl` | 千葉県 / テーマパーク／遊園地 | 30 / 55 | [公式1](https://www.tokyodisneyresort.jp/tdl/) / [公式2](https://www.tokyodisneyresort.jp/ticket/index.html?park=tdl) | 1デーパスポート大人8,900円～×2＋小人5,300円～×2＝28,400円～。日付変動・追加サービス別。 |
| 東京ディズニーシー<br>`place-tds` | 千葉県 / テーマパーク／遊園地 | 35 / 65 | [公式1](https://www.tokyodisneyresort.jp/tds/) / [公式2](https://www.tokyodisneyresort.jp/ticket/index.html?park=tdl) | 1デーパスポート大人8,900円～×2＋小人5,300円～×2＝28,400円～。日付変動・追加サービス別。 |
| 東京ドイツ村<br>`place-german` | 千葉県 / テーマパーク／遊園地 | 80 / 150 | [公式1](https://t-doitsumura.co.jp/) / [公式2](https://t-doitsumura.co.jp/hour-fee) | 2026年10月30日まで大人1,000円×2＋小人500円×2＝3,000円。10月31日以降4,600円。駐車場・遊具別。 |
| マザー牧場<br>`place-mother` | 千葉県 / 農業／牧場 | 100 / 170 | [公式1](https://www.motherfarm.co.jp/) / [公式2](https://www.motherfarm.co.jp/ticket/index.php?id=anc_entrance) | 大人1,800円×2＋小人900円×2＝5,400円。ファームツアー・遊園地・駐車場別。 |
| 鴨川シーワールド<br>`place-kamogawa` | 千葉県 / 水族館 | 150 / 180 | [公式1](https://www.kamogawa-seaworld.jp/) / [公式2](https://www.kamogawa-seaworld.jp/price_ticket/admission/) | 大人3,300円×2＋小中学生2,000円×2＝10,600円。 |
| ふなばしアンデルセン公園<br>`place-andersen` | 千葉県 / 大型公園 | 60 / 95 | [公式1](https://www.park-funabashi.or.jp/and/) / [公式2](https://www.park-funabashi.or.jp/and/guide.html) / [公式3](https://www.park-funabashi.or.jp/and/faq) | 一般900円×2＋小中学生200円×2＝2,200円。有料遊戯・駐車場別。 |
| 清水公園<br>`place-shimizu` | 千葉県 / アスレチック | 75 / 100 | [公式1](https://www.shimizu-kouen.com/public-price-athletic) / [公式2](https://www.shimizu-kouen.com/camp) / [公式3](https://www.shimizu-kouen.com/main/wp-content/uploads/2024/12/2024_12_brochure.pdf) | 公式公開パンフレットのアスレチック通常大人1,500円×2＋小学生1,000円×2。季節料金・最新区分は予約時確認。 |
| 三井アウトレットパーク 木更津<br>`place-kisarazu-outlet` | 千葉県 / アウトレット | 75 / 125 | [公式1](https://mitsui-shopping-park.com/mop/kisarazu/) | 無料の基本入場。買い物・食事等は含まない。 |
| イオンモール幕張新都心<br>`place-makuhari-aeon` | 千葉県 / ショッピングモール | 50 / 80 | [公式1](https://makuharishintoshin-aeonmall.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| 成田ゆめ牧場<br>`place-yume` | 千葉県 / 農業／牧場 | 100 / 150 | [公式1](https://www.yumebokujo.com/) / [公式2](https://www.yumebokujo.com/access.html) | 土日祝の大人1,800円×2＋子供900円×2＝5,400円。平日は4,800円。駐車場・遊戯別。 |
| よみうりランド<br>`place-yomiuri` | 東京都 / テーマパーク／遊園地 | 80 / 100 | [公式1](https://www.yomiuriland.com/) / [公式2](https://www.yomiuriland.com/charge/) | 通常ワンデーパス大人5,900円×2＋小学生4,100円×2＝20,000円。オンライン価格は別。 |
| サンリオピューロランド<br>`place-puroland` | 東京都 / テーマパーク／遊園地 | 95 / 100 | [公式1](https://www.puroland.jp/) / [公式2](https://www.puroland.jp/news/passport_information_2026/) | 2026年8月以降デイパスポート最安区分大人3,900円×2＋小人2,800円×2＝13,400円～。日付により変動。 |
| 東京ドームシティ<br>`place-dome` | 東京都 / テーマパーク／遊園地 | 45 / 50 | [公式1](https://www.tokyo-dome.co.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| 国営昭和記念公園<br>`place-showa` | 東京都 / 大型公園 | 100 / 110 | [公式1](https://www.showakinen-koen.jp/) / [公式2](https://www.showakinen-koen.jp/park-information/price/) | 大人450円×2。中学生以下無料。駐車場・有料施設別。 |
| レゴランド・ディスカバリー・センター東京<br>`place-legoland` | 東京都 / 屋内遊び場 | 40 / 65 | [公式1](https://www.legolanddiscoverycenter.com/tokyo/) / [公式2](https://www.legolanddiscoverycenter.com/tokyo/tickets-passes/) | オンラインチケット2,350円～×4＝9,400円～。日時・券種で変動。 |
| 東京ジョイポリス<br>`place-joypolis` | 東京都 / テーマパーク／遊園地 | 40 / 65 | [公式1](https://tokyo-joypolis.com/) | 公式掲載Webパスポート大人5,700円×2＋小中高生4,700円×2＝20,800円。券種・キャンペーンで変動。 |
| チームラボプラネッツ TOKYO<br>`place-planets` | 東京都 / 体験施設／工場見学 | 35 / 50 | [公式1](https://teamlabplanets.dmm.com/) | 大人3,800円～×2＋4～12歳1,500円×2＝10,600円～。日時指定・変動料金。 |
| 東武動物公園<br>`place-tobu` | 埼玉県 / 動物園 | 85 / 110 | [公式1](https://www.tobuzoo.com/) / [公式2](https://www.tobuzoo.com/ticket/chargelist/) | 現行日本語料金表の入園大人2,300円×2＋小人1,000円×2。遊園地パス・プール別。公式サイトの一時障害時は公式チケット案内を確認。 |
| 西武園ゆうえんち<br>`place-seibuen` | 埼玉県 / テーマパーク／遊園地 | 100 / 120 | [公式1](https://www.seibuen-amusement-park.jp/) / [公式2](https://www.seibuen-amusement-park.jp/ticket/) | 1日券通常大人4,900円×2＋子ども3,600円×2＝17,000円。追加有料サービス別。 |
| ムーミンバレーパーク<br>`place-moomin` | 埼玉県 / テーマパーク／遊園地 | 120 / 150 | [公式1](https://metsa-hanno.com/) | 当日1デーパス大人4,300円×2＋子供1,300円×2＝11,200円。前売は9,800円。 |
| 鉄道博物館<br>`place-railway` | 埼玉県 / 科学館／博物館 | 75 / 90 | [公式1](https://www.railway-museum.jp/) / [公式2](https://www.railway-museum.jp/information/) | 当日大人1,600円×2＋小中高生600円×2＝4,400円。前売4,000円。体験別。 |
| 国営武蔵丘陵森林公園<br>`place-shinrin` | 埼玉県 / 大型公園 | 115 / 150 | [公式1](https://www.shinrinkoen.jp/) / [公式2](https://www.town.namegawa.saitama.jp/material/files/group/2/596.pdf) | 町公式の入園料金改定資料：大人450円×2、中学生以下無料。駐車場・有料体験別、最新区分は公園公式確認。 |
| 埼玉県こども動物自然公園<br>`place-saitama-zoo` | 埼玉県 / 動物園 | 110 / 150 | [公式1](https://www.parks.or.jp/sczoo/) / [公式2](https://www.parks.or.jp/sczoo/guide/000/000194.html) | 大人900円×2＋小中学生200円×2＝2,200円。駐車場別。 |
| イオンレイクタウン<br>`place-laketown` | 埼玉県 / ショッピングモール | 60 / 75 | [公式1](https://www.aeon-laketown.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| 横浜・八景島シーパラダイス<br>`place-hakkeijima` | 神奈川県 / 水族館 | 100 / 130 | [公式1](https://www.seaparadise.co.jp/) / [公式2](https://www.seaparadise.co.jp/price/passport/doukousha.html) | アクアリゾーツパス通常料金：大人3,500円×2＋小中学生2,200円×2＝11,400円。遊園地別。 |
| よこはま動物園ズーラシア<br>`place-zoorasia` | 神奈川県 / 動物園 | 95 / 140 | [公式1](https://www.hama-midorinokyokai.or.jp/zoo/zoorasia/) / [公式2](https://www.hama-midorinokyokai.or.jp/zoo/zoorasia/fee.php) | 大人800円×2＋小中学生200円×2＝2,000円。小中高生は土曜無料。駐車場別。 |
| 横浜アンパンマンこどもミュージアム<br>`place-anpanman` | 神奈川県 / 屋内遊び場 | 75 / 100 | [公式1](https://www.yokohama-anpanman.jp/) / [公式2](https://www.yokohama-anpanman.jp/guide/) | 1歳以上2,200～2,800円×4＝8,800～11,200円。1F無料エリアとは区別。 |
| カップヌードルミュージアム 横浜<br>`place-cupnoodles` | 神奈川県 / 体験施設／工場見学 | 75 / 100 | [公式1](https://www.cupnoodles-museum.jp/ja/yokohama/) | 大人500円×2、高校生以下無料。マイカップヌードル等の体験料は別。 |
| こどもの国<br>`place-kodomonokuni` | 神奈川県 / 大型公園 | 100 / 130 | [公式1](https://www.kodomonokuni.org/) / [公式2](https://www.kodomonokuni.org/price/) | 2026年4月改定：大人800円×2＋小学生300円×2＝2,200円。駐車場・有料遊具別。 |
| さがみ湖MORI MORI<br>`place-morimori` | 神奈川県 / テーマパーク／遊園地 | 120 / 155 | [公式1](https://www.sagamiko-resort.jp/) / [公式2](https://www.sagamiko-resort.jp/calender/charge.html) | フリーパス大人4,700円×2＋小人3,700円×2＝16,800円。一部アトラクション別。 |
| 新江ノ島水族館<br>`place-enoshima-aqua` | 神奈川県 / 水族館 | 125 / 140 | [公式1](https://www.enosui.com/) / [公式2](https://www.enosui.com/basicinfo.php) | 大人2,800円×2＋小学生1,300円×2＝8,200円。 |
| 三井アウトレットパーク 多摩南大沢<br>`place-minamiosawa` | 東京都 / アウトレット | 105 / 115 | [公式1](https://mitsui-shopping-park.com/mop/tama/) | 無料の基本入場。買い物・食事等は含まない。 |
| 三井アウトレットパーク 入間<br>`place-iruma` | 埼玉県 / アウトレット | 110 / 140 | [公式1](https://mitsui-shopping-park.com/mop/iruma/) | 無料の基本入場。買い物・食事等は含まない。 |
| THE OUTLETS SHONAN HIRATSUKA<br>`place-shonan-hiratsuka` | 神奈川県 / アウトレット | 125 / 160 | [公式1](https://the-outlets-shonan-hiratsuka.aeonmall.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| 三井アウトレットパーク 横浜ベイサイド<br>`place-yokohama-outlet` | 神奈川県 / アウトレット | 95 / 125 | [公式1](https://mitsui-shopping-park.com/mop/yokohama/) | 無料の基本入場。買い物・食事等は含まない。 |
| 酒々井プレミアム・アウトレット<br>`place-sakeya` | 千葉県 / アウトレット | 80 / 115 | [公式1](https://www.premiumoutlets.co.jp/shisui/) | 無料の基本入場。買い物・食事等は含まない。 |
| レイクタウンアウトレット<br>`place-laketown-outlet` | 埼玉県 / アウトレット | 65 / 80 | [公式1](https://laketown-outlet.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| イオンモール川口<br>`place-aeon-kawaguchi` | 埼玉県 / ショッピングモール | 65 / 85 | [公式1](https://kawaguchi-aeonmall.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| イオンモールむさし村山<br>`place-aeon-musashimurayama` | 東京都 / ショッピングモール | 115 / 140 | [公式1](https://musashimurayama-aeonmall.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| ノースポート・モール<br>`place-northport` | 神奈川県 / ショッピングモール | 90 / 115 | [公式1](https://www.northport.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| ビナウォーク<br>`place-vinawalk` | 神奈川県 / ショッピングモール | 110 / 125 | [公式1](https://www.odakyu-sc.com/vinawalk/) | 無料の基本入場。買い物・食事等は含まない。 |
| ららぽーと湘南平塚<br>`place-lala-hiratsuka` | 神奈川県 / ショッピングモール | 125 / 145 | [公式1](https://mitsui-shopping-park.com/lalaport/hiratsuka/) | 無料の基本入場。買い物・食事等は含まない。 |
| アリオ橋本<br>`place-lala-sagamihara` | 神奈川県 / ショッピングモール | 115 / 130 | [公式1](https://hashimoto.ario.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| イオンモール成田<br>`place-aeon-narita` | 千葉県 / ショッピングモール | 85 / 120 | [公式1](https://narita-aeonmall.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| コースカ ベイサイド ストアーズ<br>`place-lala-yokosuka` | 神奈川県 / ショッピングモール | 110 / 135 | [公式1](https://coaska.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| テラスモール湘南<br>`place-terrace-tsujido` | 神奈川県 / ショッピングモール | 125 / 140 | [公式1](https://shonan.terracemall.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| 湘南モールフィル<br>`place-shonan-mall` | 神奈川県 / ショッピングモール | 125 / 150 | [公式1](https://www.shonan-fill.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| 海ほたる<br>`place-aqua-line` | 千葉県 / 観光スポット | 65 / 115 | [公式1](https://www.umihotaru.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| 千葉市動物公園<br>`place-chiba-zoo` | 千葉県 / 動物園 | 60 / 90 | [公式1](https://www.city.chiba.jp/zoo/) / [公式2](https://www.city.chiba.jp/zoo/guide/) | 大人800円×2。中学生以下無料。駐車場別。 |
| 宝登山小動物公園<br>`place-hodosan-zoo` | 埼玉県 / 動物園 | 150 / 180 | [公式1](https://hodosan-ropeway.co.jp/zoo) | 大人500円×2＋3歳以上小人250円×2＝1,500円。ロープウェイ別。 |
| 大井ふ頭中央海浜公園 はぜつき磯バーベキュー場<br>`place-oi-bbq` | 東京都 / BBQ | 50 / 85 | [公式1](https://tokyo-south-seaside-parks.com/application-forms/) / [公式2](https://tokyo-south-seaside-parks.com/news/7%E6%9C%8818%E6%97%A5%E3%81%8B%E3%82%89%E3%80%8C%E3%81%AF%E3%81%9C%E3%81%A4%E3%81%8D%E7%A3%AF%E3%83%90%E3%83%BC%E3%83%99%E3%82%AD%E3%83%A5%E3%83%BC%E5%A0%B4%E3%80%8D%E3%81%93%E3%81%AE%E5%A4%8F) | 公式掲載BBQ機材レンタル昼2,200円×4の目安。食材別、年齢・区画・夜間プランで変動。 |
| 城南島海浜公園キャンプ場<br>`place-jonan-camp` | 東京都 / キャンプ／デイキャンプ | 50 / 85 | [公式1](https://tokyo-south-seaside-parks.com/jonanjima-campground/) / [公式2](https://tokyo-south-seaside-parks.com/common/images/jonanjima/jonanjima-pdf01_parkmap.pdf) | 公式園内ガイドの一般日帰り大人300円×2＋小中学生150円×2。オート区画・器材・食材・駐車別、新運営者の予約料金を確認。 |
| 平和島公園キャンプ場<br>`place-heiwa-camp` | 東京都 / キャンプ／デイキャンプ | 50 / 75 | [公式1](https://www.city.ota.tokyo.jp/shisetsu/park/heiwajima.html) / [公式2](https://www.city.ota.tokyo.jp/shisetsu/sports/camp/heiwajima_camp.html) | 大田区外A・B区画1,200円、C区画960円。予約制、器材・食材・交通費別。 |
| 氷川キャンプ場<br>`place-hikawa-camp` | 東京都 / キャンプ／デイキャンプ | 155 / 180 | [公式1](https://www.okutamas.co.jp/hikawa/) / [公式2](https://www.okutamas.co.jp/hikawa/price/) | 公式デイキャンプ1名1,500円～×4＝6,000円～。駐車場・レンタル別。 |
| 川井キャンプ場<br>`place-kawai-camp` | 東京都 / キャンプ／デイキャンプ | 150 / 170 | [公式1](https://www.okutamas.co.jp/kawai/) / [公式2](https://www.okutamas.co.jp/kawai/day-camp) | 河原日帰り1,500円×4。土曜・連休・7～8月7,200円、器材・車1,200円別。 |
| アメリカキャンプ村<br>`place-america-camp` | 東京都 / キャンプ／デイキャンプ | 155 / 185 | [公式1](https://www.americacampmura.jp/) / [公式2](https://www.americacampmura.jp/daycamp/) | 日帰り入場大人1,600円×2＋小学生800円×2＝4,800円。BBQ卓・食材・駐車場別。 |
| 秋川橋河川公園バーベキューランド<br>`place-akigawa-bbq` | 東京都 / BBQ | 135 / 155 | [公式1](https://www.akirunokanko.com/) / [公式2](https://www.akirunokanko.com/?p=307br+%2F) | 2026年4月改定Cセット（炉・網・薪・炭）6,000円、7～9月6,500円。食材・駐車別。器材の持込制限あり。 |
| 森のまきばオートキャンプ場<br>`place-morimaki` | 千葉県 / キャンプ／デイキャンプ | 85 / 150 | [公式1](https://www.morimaki-camp.com/guide/) / [公式2](https://www.morimaki-camp.com/) / [公式3](https://www.morimaki-camp.com/facility/) | 日帰り大人1,000円×2＋小人800円×2＝3,600円の区分。低料金区分は3,200円。車200円、レンタル別。 |
| 有野実苑オートキャンプ場<br>`place-arisunomori` | 千葉県 / キャンプ／デイキャンプ | 95 / 155 | [公式1](https://www.arinomi.co.jp/) / [公式2](https://arinomi.co.jp/rates/) | オートサイト日帰り3～5人平日4,500円。通常5,300円、ミドル5,800円。混雑日は日帰り販売なし。 |
| 成田ゆめ牧場ファミリーオートキャンプ場<br>`place-narita-camp` | 千葉県 / キャンプ／デイキャンプ | 100 / 150 | [公式1](https://www.yumebokujo.com/camp.html) | 通常日帰り：大人1,500円×2＋小人1,000円×2＝5,000円。車1台の日帰り駐車1,000円、牧場入場別。 |
| かずさオートキャンプ場<br>`place-kazusa-camp` | 千葉県 / キャンプ／デイキャンプ | 105 / 170 | [公式1](https://www.kazusa-autocamp.com/index2.htm) / [公式2](https://kazusa-autocamp.com/guide2022.pdf) | 税抜サイト1,000円＋大人700円×2＋小人400円×2、税込3,520円。繁忙期別料金。 |
| 内浦山県民の森<br>`place-uchiura-camp` | 千葉県 / キャンプ／デイキャンプ | 145 / 190 | [公式1](https://www.uchiurayama.jp/) / [公式2](https://www.uchiurayama.jp/bbq) | 日帰りBBQ1区画1回1,560円。予約制、食材・器材別。宿泊テント料金と区別。 |
| 南総城山温泉 里見の湯<br>`place-tateyama-onsen` | 千葉県 / 温泉／スパ | 145 / 190 | [公式1](https://www.satominoyu.com/) | 土日祝大人1,700円×2＋4歳～小学生600円×2＝4,600円。特定日は変動。 |
| スプラッシュガーデン秩父<br>`place-splash-garden` | 埼玉県 / キャンプ／デイキャンプ | 145 / 175 | [公式1](https://www.sg-chichibu.co.jp/) / [公式2](https://www.sg-chichibu.co.jp/daycamp/) | デイキャンプ1グループ最大5名3,740円。車1台の河原乗り入れ含む。器材・食材別。日帰りテント不可。 |
| 長瀞オートキャンプ場<br>`place-nagatoro-camp` | 埼玉県 / キャンプ／デイキャンプ | 150 / 180 | [公式1](https://www.nagatoro-camp.com/) / [公式2](https://www.nagatoro-camp.com/daycamp/) | 持ち込みデイキャンプサイト2,500～4,000円（時期区分）。屋根付きBBQや手ぶらプランは別。 |
| ウッドルーフ奥秩父オートキャンプ場<br>`place-woodroof` | 埼玉県 / BBQ | 175 / 230 | [公式1](https://www.woodroof.jp/) / [公式2](https://www.woodroof.jp/fee_en/) | らくらく日帰りパック2～4人1区画税込10,450円。タープ・BBQ器材・車1台含む、食材別。混雑日は利用不可。 |
| PICA秩父<br>`place-pica-chichibu` | 埼玉県 / キャンプ／デイキャンプ | 150 / 190 | [公式1](https://www.pica-resort.jp/chichibu/) / [公式2](https://www.pica-resort.jp/chichibu/stay/site/day_bbq.html) | 食材なし日帰り大人1,500円×2＋4歳～小学生800円×2。食材付きBBQは大人3,500円・子供2,500円から。 |
| PICAさがみ湖 ワイルドクッキングガーデン<br>`place-pica-sagamiko` | 神奈川県 / BBQ | 120 / 155 | [公式1](https://www.pica-resort.jp/sagamiko/) / [公式2](https://www.pica-resort.jp/sagamiko/bbq/charge/index.html) | 食材持込予約大人2,500円×2＋小人2,000円×2。遊園地入場券含む、食材・器材別。 |
| ウェルキャンプ西丹沢<br>`place-well-camp` | 神奈川県 / キャンプ／デイキャンプ | 165 / 240 | [公式1](https://well-camp.com/) / [公式2](https://well-camp.com/price/) | デイキャンプ基本料金オフ4,500円、オン5,000円、ハイ5,500円。人数上限・追加料金・レンタルは公式確認。 |
| BOSCO Auto Camp Base<br>`place-bosco` | 神奈川県 / キャンプ／デイキャンプ | 155 / 220 | [公式1](https://www.moroto.co.jp/bosco/list.html) | 10時開始デイキャンプ1台用（最大6名）4,000～8,000円。レンタル別。 |
| 神戸園<br>`place-kanotoen` | 東京都 / BBQ | 155 / 195 | [公式1](https://hinohara-kankou.jp/spot/kanotoen/) | デイキャンプ大人770円×2＋小人550円×2＝2,640円。駐車・器材・釣り別。 |
| WILD MAGIC<br>`place-wildmagic` | 東京都 / BBQ | 35 / 50 | [公式1](https://wildmagic.jp/) / [公式2](https://wildmagic.jp/wp/wp-content/themes/wildmagic_v2.2/bbq) | 大人2名の6,000円～プランで12,000円～。公式予約ページの中学生未満入場無料プランは席・食材なし、子ども食事・席の追加料金別。 |
| THE BBQ BEACH in TOYOSU<br>`place-soramen` | 東京都 / BBQ | 40 / 60 | [公式1](https://digiq.jp/toyosuc25) | カジュアルゾーン土日祝大人1,300円～×2＋小学生500円×2＝3,600円～。食材・飲料は別。 |
| 秋川渓谷 瀬音の湯<br>`place-akigawakeikoku` | 東京都 / 温泉／スパ | 140 / 165 | [公式1](https://www.akirunokanko.com/?p=337) / [公式2](https://www.city.akiruno.tokyo.jp/kanko/0000008755.html) | 市公式掲載3時間大人1,000円×2＋小学生500円×2。延長・食事別。 |
| 奥多摩温泉 もえぎの湯<br>`place-moeginoyu` | 東京都 / 温泉／スパ | 155 / 180 | [公式1](https://www.okutamas.co.jp/moegi/) / [公式2](https://www.okutamas.co.jp/moegi/price/info/) | 3時間大人1,200円×2＋小学生600円×2。超過料金別。足湯停止中。 |
| 天然温泉 満天の湯<br>`place-sururu` | 神奈川県 / 温泉／スパ | 95 / 115 | [公式1](https://mantennoyu.com/) | 土日祝の一般大人1,200円×2＋小学生400円×2＝3,200円。 |
| 龍宮城スパホテル三日月<br>`place-ryugu` | 千葉県 / 温泉／スパ | 80 / 130 | [公式1](https://www.mikazuki.co.jp/ryugu/) / [公式2](https://www.mikazuki.co.jp/ryugujo/yutoasobi/price/) | 公式掲載1DAY基本大人2,000円×2＋子供1,300円×2。日付・プランで変動、駐車・レンタル別。 |
| 美楽温泉 SPA-HERBS<br>`place-spa-herbs` | 埼玉県 / 温泉／スパ | 80 / 100 | [公式1](https://spa-herbs.jp/) / [公式2](https://spa-herbs.jp/guide/flow.html) | 土日祝の入浴大人1,520円×2＋小人780円×2＝4,600円。岩盤浴・レンタル別。おむつ着用者は浴場不可。 |
| おがわ温泉 花和楽の湯<br>`place-ogawa-hanawa` | 埼玉県 / 温泉／スパ | 125 / 160 | [公式1](https://www.kawaranoyu.jp/) / [公式2](https://kawaranoyu.jp/price/) | 土日祝の基本入浴大人1,400円×2＋小人700円×2＝4,200円。岩盤浴等は別。 |
| 箱根湯寮<br>`place-hakone-yuryo` | 神奈川県 / 温泉／スパ | 155 / 175 | [公式1](https://www.hakoneyuryo.jp/) / [公式2](https://www.hakoneyuryo.jp/price/) | 大浴場土休日大人2,000円～×2＋小学生1,000円×2＝6,000円～。未就学児は大浴場利用不可、貸切風呂は別。 |
| 箱根小涌園ユネッサン<br>`place-yunessun` | 神奈川県 / 温泉／スパ | 170 / 190 | [公式1](https://www.yunessun.com/) / [公式2](https://www.yunessun.com/service/price/) | 水着エリアA料金：大人2,500円×2＋子供1,400円×2＝7,800円。日付区分や森の湯セットで変動。 |
| 勝浦海中公園<br>`place-marinepark` | 千葉県 / 海／水遊び | 130 / 165 | [公式1](https://www.city.katsuura.lg.jp/map/4462.html) / [公式2](https://maruchiba.jp/spot/detail_10392.html) | 県公式観光サイト掲載の海中展望塔：大人980円×2＋小中学生480円×2。海況による割引・駐車料金別。 |
| 館山城・館山市立博物館<br>`place-tateyama-castle` | 千葉県 / 科学館／博物館 | 145 / 190 | [公式1](https://www.city.tateyama.chiba.jp/hakubutukan/) / [公式2](https://www.city.tateyama.chiba.jp/hakubutukan/page000653.html) | 市外通常共通券大人400円×2＋小中学生200円×2。特別展中1,600円。未就学児無料。 |
| 大山千枚田<br>`place-kamogawa-oyama` | 千葉県 / 農業／牧場 | 145 / 200 | [公式1](https://senmaida.com/) / [公式2](https://senmaida.com/access/) | 周辺の舗装道路からの棚田見学。農地・畦への立入りや撮影は会員登録・申請が必要で別料金。 |
| 九十九里海釣りセンター<br>`place-kujukuri` | 千葉県 / スポーツ／アクティビティ | 100 / 150 | [公式1](https://www2.hp-ez.com/hp/hashimotomisaki/page9) | 1日コース大人10,500円×2＋子供5,500円×2＝32,000円。女性区分・短時間券・竿等は公式確認。 |
| フォレストアドベンチャー・秩父<br>`place-forest-chichibu` | 埼玉県 / アスレチック | 150 / 190 | [公式1](https://foret-aventure.jp/park/fa-chichibu/) | 2026年9月改定60分3,300円×4。繁忙期変動・レンタル別。身長・学年条件あり。 |
| フォレストアドベンチャー・小田原<br>`place-forest-odawara` | 神奈川県 / アスレチック | 145 / 170 | [公式1](https://foret-aventure.jp/park/fa-odawara/) | アドベンチャー4,000円～×4。身長・学年条件あり。キッズコース別。 |
| フォレストアドベンチャー・よこはま<br>`place-forest-yokohama` | 神奈川県 / アスレチック | 95 / 135 | [公式1](https://foret-aventure.jp/park/fa-yokohama/) | トレック60分3,200円×4。予約割引・キッズコース別料金、利用条件あり。 |
| 県立あいかわ公園<br>`place-shonan-athletic` | 神奈川県 / 大型公園 | 125 / 180 | [公式1](https://www.aikawa-park.jp/publics/index/3/index.html) | 無料の基本入場。買い物・食事等は含まない。 |
| 県立相模原公園<br>`place-sagamihara-park` | 神奈川県 / 大型公園 | 110 / 140 | [公式1](https://www.kanagawa-park.or.jp/sagamihara/index.html) | 無料の基本入場。買い物・食事等は含まない。 |
| 千葉市泉自然公園<br>`place-izumi-park` | 千葉県 / 大型公園 | 75 / 115 | [公式1](https://izumi-park.city.chiba.jp/) / [公式2](https://maruchiba.jp/spot/detail_10573.html) | 県公式観光サイト掲載の公園入園無料。駐車場・アスレチック・BBQなど有料利用は別。 |
| 秩父ミューズパーク<br>`place-chichibu-muse` | 埼玉県 / 大型公園 | 150 / 185 | [公式1](https://www.muse-park.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| 県営彩の森入間公園<br>`place-musashi-kyuryo` | 埼玉県 / 大型公園 | 110 / 135 | [公式1](https://www.seibu-green.co.jp/sainomori/) | 無料の基本入場。買い物・食事等は含まない。 |
| むさしの村<br>`place-adventurefarm` | 埼玉県 / テーマパーク／遊園地 | 100 / 145 | [公式1](https://www.musashinomura.co.jp/) / [公式2](https://www.musashinomura.co.jp/charge/) | 入園大人1,200円×2＋3歳～小学生650円×2。のりもの・収穫体験別。 |
| 彩の国ふれあい牧場<br>`place-saitama-farm` | 埼玉県 / 農業／牧場 | 145 / 230 | [公式1](https://www.pref.saitama.lg.jp/kogen-bokujo/) | 無料の基本入場。買い物・食事等は含まない。 |
| 服部牧場<br>`place-hattori` | 神奈川県 / 農業／牧場 | 125 / 175 | [公式1](https://kanagawa-hattoribokujou.com/) | 無料の基本入場。買い物・食事等は含まない。 |
| 長井海の手公園 ソレイユの丘<br>`place-soleil` | 神奈川県 / 大型公園 | 125 / 165 | [公式1](https://soleil-park.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| 清和県民の森<br>`place-seiwa` | 千葉県 / キャンプ／デイキャンプ | 120 / 200 | [公式1](https://www.seiwanomori.jp/) / [公式2](https://www.seiwanomori.jp/%E5%90%84%E6%96%BD%E8%A8%AD%E3%81%AE%E7%89%B9%E5%BE%B4%E3%81%A8%E3%81%94%E6%A1%88%E5%86%85/) | 日帰り屋根付きBBQ8名まで1サイト1,500円、持込サイト1,200円。食材・燃料・ゴミ袋等別。 |
| 千葉ウシノヒロバ<br>`place-chiba-farm` | 千葉県 / 農業／牧場 | 75 / 120 | [公式1](https://ushinohiroba.com/) / [公式2](https://ushinohiroba.com/user-guide/) / [公式3](https://ushinohiroba.com/%E3%83%87%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%97%E3%81%B8%E3%81%AE%E3%81%94%E5%A4%89%E6%9B%B4%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/) | 一般見学入場のみ大人550円×2＋小学生330円×2。キャンプ料金・駐車別。日帰りは宿泊予約後17時までに退場する方式。 |
| 柿山田オートキャンプガーデン<br>`place-kakiyamada` | 千葉県 / キャンプ／デイキャンプ | 110 / 190 | [公式1](https://www.kakiyamada.jp/) | 予約制日帰りファミリー大人2人・小人2人3,500円、ごみ処理含む。レンタル・食材別。 |
| 千葉市科学館<br>`place-chiba-science` | 千葉県 / 科学館／博物館 | 65 / 90 | [公式1](https://www.kagakukanq.com/) / [公式2](https://www.kagakukanq.com/guide) | 常設展示大人600円×2＋小中学生100円×2＝1,400円。プラネタリウム・企画展別。 |
| 千葉県立中央博物館<br>`place-chiba-museum` | 千葉県 / 科学館／博物館 | 70 / 100 | [公式1](https://www.chiba-muse.or.jp/NATURAL/) / [公式2](https://www.chiba-muse.or.jp/NATURAL/visit/) | 通常期間の一般300円×2、中学生以下無料。企画展・特別展期間の入場料は増額。 |
| 国立歴史民俗博物館<br>`place-sakura-history` | 千葉県 / 科学館／博物館 | 85 / 105 | [公式1](https://www.rekihaku.ac.jp/) / [公式2](https://www.rekihaku.ac.jp/information/basicinfo/) | 総合展示一般900円×2、高校生以下無料。企画展は別料金。 |
| 航空科学博物館<br>`place-aviation` | 千葉県 / 科学館／博物館 | 100 / 140 | [公式1](https://www.aeromuseum.or.jp/) / [公式2](https://www.aeromuseum.or.jp/guide/) | 大人900円×2＋4歳以上子供300円×2＝2,400円。体験の追加料金別。 |
| ホキ美術館<br>`place-hoki` | 千葉県 / 科学館／博物館 | 90 / 120 | [公式1](https://www.hoki-museum.jp/) / [公式2](https://www.hoki-museum.jp/about/open_close/) | 一般2,100円×2。保護者1人につき小学生2人まで無料。未就学児の入場条件を公式で確認。 |
| キッコーマンもの知りしょうゆ館<br>`place-kikkoman` | 千葉県 / 体験施設／工場見学 | 75 / 105 | [公式1](https://www.kikkoman.com/jp/shokuiku/factory/noda/) | 無料の基本入場。買い物・食事等は含まない。 |
| グリコピア・イースト<br>`place-glico` | 埼玉県 / 体験施設／工場見学 | 100 / 125 | [公式1](https://www.glico.com/jp/enjoy/experience/glicopia/east/) | 無料の基本入場。買い物・食事等は含まない。 |
| 明治なるほどファクトリー坂戸<br>`place-meiji` | 埼玉県 / 体験施設／工場見学 | 110 / 135 | [公式1](https://www.meiji.co.jp/learned/factory/sakado/) | 無料の基本入場。買い物・食事等は含まない。 |
| 日産エンジンミュージアム<br>`place-nissan-engine` | 神奈川県 / 体験施設／工場見学 | 80 / 110 | [公式1](https://www.nissan-global.com/JP/PLANT/YOKOHAMA/) | 無料の基本入場。買い物・食事等は含まない。 |
| かわさき宙と緑の科学館<br>`place-kawasaki-science` | 神奈川県 / 科学館／博物館 | 95 / 120 | [公式1](https://www.nature-kawasaki.jp/) / [公式2](https://www.nature-kawasaki.jp/introduction.html) | 展示室の入館は無料。プラネタリウムは大人400円×2、中学生以下無料。 |
| 大磯ロングビーチ<br>`place-oiso-pool` | 神奈川県 / 海／水遊び | 125 / 155 | [公式1](https://www.princehotels.co.jp/pool/oiso/) / [公式2](https://www.princehotels.co.jp/pool/oiso//charge/) | 2026年1日券下限大人4,400円×2＋小学生2,400円×2。高料金日15,000円。2026営業終了、次季営業・料金は別途発表。 |
| 神奈川県立生命の星・地球博物館<br>`place-kanagawa-life` | 神奈川県 / 科学館／博物館 | 150 / 165 | [公式1](https://nh.kanagawa-museum.jp/) / [公式2](https://nh.kanagawa-museum.jp/visit/information.html) | 常設展20～64歳一般520円×2、中学生以下無料。特別展は別料金。 |
| 小田原城<br>`place-odawara-castle` | 神奈川県 / 観光スポット | 145 / 160 | [公式1](https://odawaracastle.com/) / [公式2](https://odawaracastle.com/info/) | 天守閣大人1,000円×2＋小中学生300円×2＝2,600円。NINJA館等は別。 |
| 彫刻の森美術館<br>`place-hakone-openair` | 神奈川県 / 科学館／博物館 | 170 / 190 | [公式1](https://www.hakone-oam.or.jp/) / [公式2](https://www.hakone-oam.or.jp/info/) | 当日窓口一般2,000円×2＋小中学生800円×2＝5,600円。WEB券・駐車場は別。 |
| 箱根海賊船<br>`place-hakone-pirate` | 神奈川県 / 観光スポット | 175 / 210 | [公式1](https://www.hakonenavi.jp/hakone-kankosen/) | 2025年10月改定往復普通船室大人3,000円×2＋小学生1,300円×2。特別船室別。 |
| 箱根ロープウェイ<br>`place-hakone-ropeway` | 神奈川県 / 観光スポット | 175 / 210 | [公式1](https://www.hakonenavi.jp/hakone-ropeway/) / [公式2](https://www.hakonenavi.jp/transportation/ticket_info/fee/) | 2025年10月改定往復大人3,000円×2＋小学生1,000円×2。強風・定期点検時は運休。 |
| 箱根園水族館<br>`place-hakone-aqua` | 神奈川県 / 水族館 | 175 / 210 | [公式1](https://www.princehotels.co.jp/amuse/hakone-en/suizokukan/) / [公式2](https://www.princehotels.co.jp/amuse/hakone-en/suizokukan/eigyou/) | 大人1,600円×2＋4歳～小学生800円×2。駐車場・周辺施設別。 |
| 箱根強羅公園<br>`place-hakone-park` | 神奈川県 / 観光スポット | 170 / 190 | [公式1](https://www.hakonenavi.jp/gorapark/intro/) | 大人650円×2、小学生以下無料。有料体験・食事別。 |
| 相模原市立博物館<br>`place-sagami-science` | 神奈川県 / 科学館／博物館 | 115 / 140 | [公式1](https://sagamiharacitymuseum.jp/) / [公式2](https://sagamiharacitymuseum.jp/information/guide/) | 常設展は無料。プラネタリウム一般席大人500円×2＋小中学生200円×2＝1,400円、企画展等は別。 |
| JAXA相模原キャンパス<br>`place-jaxa` | 神奈川県 / 体験施設／工場見学 | 115 / 140 | [公式1](https://www.isas.jaxa.jp/visit/) | 無料の基本入場。買い物・食事等は含まない。 |
| ロマンスカーミュージアム<br>`place-romancecar` | 神奈川県 / 科学館／博物館 | 110 / 125 | [公式1](https://www.odakyu.jp/romancecarmuseum/) / [公式2](https://www.odakyu.jp/romancecarmuseum/guide/fee/) | 通常大人1,100円×2＋小学生400円×2＝3,000円。体験・キッズ遊び場別。 |
| 横須賀美術館<br>`place-yokosuka-art` | 神奈川県 / 科学館／博物館 | 120 / 155 | [公式1](https://www.yokosuka-moa.jp/) / [公式2](https://www.yokosuka-moa.jp/outline/) | 所蔵品展一般450円×2、中学生以下無料。企画展は別料金。2026年4月改定。 |
| 猿島<br>`place-sarushima` | 神奈川県 / 観光スポット | 130 / 165 | [公式1](https://sarushima.jp/) / [公式2](https://sarushima.jp/information/) | 2026年A料金の往復船＋入園大人2,500円×2＋小学生1,250円×2。B・C料金日あり、BBQ・ツアー別。 |
| うらりマルシェ<br>`place-urari` | 神奈川県 / 観光スポット | 135 / 175 | [公式1](https://www.umigyo.co.jp/) | 無料の基本入場。買い物・食事等は含まない。 |
| 埼玉県立川の博物館<br>`place-saitama-river` | 埼玉県 / 科学館／博物館 | 125 / 170 | [公式1](https://www.river-museum.jp/) | 一般410円×2、中学生以下無料。わくわくランド・駐車場別。 |
| 埼玉県立自然の博物館<br>`place-saitama-nature` | 埼玉県 / 科学館／博物館 | 150 / 175 | [公式1](https://shizen.spec.ed.jp/) / [公式2](https://shizen.spec.ed.jp/%E9%96%8B%E9%A4%A8%E6%99%82%E9%96%93---%E4%BC%91%E9%A4%A8%E6%97%A5---%E8%A6%B3%E8%A6%A7%E6%96%99) | 一般200円×2、中学生以下無料。体験・特別展示等の条件は公式案内確認。 |
| 秩父まつり会館<br>`place-chichibu-festival` | 埼玉県 / 科学館／博物館 | 145 / 170 | [公式1](https://www.chichibu-matsuri.jp/) / [公式2](https://www.chichibu-matsuri.jp/riyo/) | 一般500円×2＋小中学生250円×2。 |
| 長瀞ラインくだり<br>`place-nagatoro-boat` | 埼玉県 / スポーツ／アクティビティ | 150 / 175 | [公式1](https://www.chichibu-railway.co.jp/nagatoro/boat.html) / [公式2](https://www.chichibu-railway.co.jp/assets/newsrelease/20260305_linekudari.pdf) / [公式3](https://www.chichibu-railway.co.jp/nagatoro/news/230222/) | A・B各コース通常大人2,000円×2＋3歳以上子供1,000円×2。2026繁忙期6,600円、渇水時は別コース・料金。 |
| 秩父滝沢サイクルパーク<br>`place-chichibu-forest` | 埼玉県 / スポーツ／アクティビティ | 175 / 230 | [公式1](https://chichibu-cyclepark.localinfo.jp/pages/1592777/profile) | 2時間使用料大人1,100円×2＋中学生以下880円×2。自転車レンタル1時間1,100円別。 |
| 狭山スキー場<br>`place-sayama-ski` | 埼玉県 / スポーツ／アクティビティ | 100 / 120 | [公式1](https://sayamaski.jp/) / [公式2](https://sayamaski.jp/price.html) | 掲載中の平日入場大人1,500円×2＋3歳～小学生1,300円×2。土日6,000円、特定日7,200円。冬季スキー券・レンタルは別案内。 |
| クライミングパーク神怡舘<br>`place-ogano-boulder` | 埼玉県 / スポーツ／アクティビティ | 165 / 230 | [公式1](https://www.town.ogano.lg.jp/crimeshin2/) | 2026年4月改定町外1日大人1,800円×2＋小中学生500円×2。初回登録1,000円・レンタル別。 |
| アロハガーデンたてやま<br>`place-aloha` | 千葉県 / 動物園 | 150 / 200 | [公式1](https://www.aloha-garden-t.com/) | 大人1,300円×2＋小人800円×2。幼児500円、食事・体験別。 |
| 千葉県立房総のむら<br>`place-boso-mura` | 千葉県 / 体験施設／工場見学 | 90 / 140 | [公式1](https://www.chiba-muse.or.jp/MURA/) / [公式2](https://www.chiba-muse.or.jp/MURA/visit/) | 一般300円×2、中学生以下無料。体験参加料別。 |
| 水郷佐原山車会館<br>`place-sawara` | 千葉県 / 科学館／博物館 | 115 / 150 | [公式1](https://www.city.katori.lg.jp/sightseeing/sawaradashikaikan/guide.html) | 大人400円×2＋小中学生200円×2＝1,200円。 |
| 千葉県立中央博物館分館 海の博物館<br>`place-boso-ocean` | 千葉県 / 科学館／博物館 | 135 / 165 | [公式1](https://www.chiba-muse.or.jp/UMIHAKU/) / [公式2](https://www.chiba-muse.or.jp/UMIHAKU/visit/) | 一般200円×2、中学生以下無料。隣接駐車場・企画参加費別。 |
| 鴨川市郷土資料館・文化財センター<br>`place-kamogawa-history` | 千葉県 / 科学館／博物館 | 145 / 200 | [公式1](https://www.city.kamogawa.lg.jp/map/4605.html) | 無料の基本入場。買い物・食事等は含まない。 |
| 濃溝の滝・亀岩の洞窟<br>`place-nomizo` | 千葉県 / 観光スポット | 120 / 200 | [公式1](https://www.city.kimitsu.lg.jp/soshiki/24/2123.html) | 無料の基本入場。買い物・食事等は含まない。 |
| 野島埼灯台<br>`place-nojima` | 千葉県 / 観光スポット | 160 / 220 | [公式1](https://www.tokokai.org/tourlight/tourlight04/) | 参観寄付金中学生以上300円×2。小学生以下は不要。 |
| 犬吠埼灯台<br>`place-inubosaki` | 千葉県 / 観光スポット | 155 / 185 | [公式1](https://www.tokokai.org/tourlight/tourlight03/) | 参観寄付金中学生以上300円×2。小学生以下は不要。 |
| 銚子海洋研究所<br>`place-choshiocean` | 千葉県 / スポーツ／アクティビティ | 155 / 200 | [公式1](https://www.choshi-iruka-watching.co.jp/) / [公式2](https://choshi-iruka-watching.co.jp/watching) | 沿岸イルカコース大人4,500円×2＋小中学生3,500円×2。3歳未満不可。沖合コースは別料金、海況で欠航。 |
| 大多喜有用植物苑（OTAKI HERB GARDEN）<br>`place-kamogawa-herb` | 千葉県 / 観光スポット | 115 / 180 | [公式1](https://www.otaki-herbgarden.jp/visit/) / [公式2](https://kankouotaki.com/Midokoro.html) | 土日祝大人900円×2＋小中学生500円×2。夏季平日半額、未就学児無料。キャッシュレスのみ。 |
| 市原ぞうの国<br>`place-ichihara-elephant` | 千葉県 / 動物園 | 95 / 150 | [公式1](https://zounokuni.com/) / [公式2](https://zounokuni.com/info/) | 大人2,400円×2＋小人900円×2。ふれあい・乗象・駐車別。雨の日券は別条件。 |
| サユリワールド<br>`place-sayuri` | 千葉県 / 動物園 | 95 / 150 | [公式1](https://sayuri-world.com/) / [公式2](https://zounokuni.com/info/) | 大人1,500円×2＋小人800円×2。餌・駐車別、小学生以下は保護者同伴。 |
| 鋸山ロープウェー<br>`place-nokogiriyama` | 千葉県 / 観光スポット | 110 / 155 | [公式1](https://www.mt-nokogiri.co.jp/) / [公式2](https://www.mt-nokogiri.co.jp/pc/p040000.php) | 往復大人1,200円×2＋小学生600円×2。日本寺拝観料・交通費別。 |
| 藤子・F・不二雄ミュージアム<br>`place-fujiko` | 神奈川県 / 科学館／博物館 | 95 / 115 | [公式1](https://fujiko-museum.com/) / [公式2](https://fujiko-museum.com/access.html) | 日時指定予約大人1,000円×2＋4歳以上500円×2。3歳以下無料。交通・飲食別。 |
| 小松沢レジャー農園<br>`place-komatsuzawa` | 埼玉県 / 農業／牧場 | 145 / 175 | [公式1](https://www.komatsuzawa.co.jp/) / [公式2](https://www.komatsuzawa.co.jp/sp/exp.html) | 通年マス釣り1匹900円×4匹（焼き代含む）。収穫・季節体験は別料金・実施期間。 |
| フォレストアドベンチャー・箱根<br>`place-hakone-forest` | 神奈川県 / アスレチック | 155 / 175 | [公式1](https://foret-aventure.jp/park/fa-hakone/) | アドベンチャー4,500円×4。身長・学年条件あり。キャノピー3,500円別。 |
| トーベ・ヤンソンあけぼの子どもの森公園<br>`place-seibu-nature` | 埼玉県 / 観光スポット | 115 / 145 | [公式1](https://www.city.hanno.lg.jp/akebono/annai/2113.html) | 無料の基本入場。買い物・食事等は含まない。 |
| 檜原 森のおもちゃ美術館<br>`place-hinohara-toy` | 東京都 / 屋内遊び場 | 155 / 200 | [公式1](https://www.hinohara-toymuseum.com/) / [公式2](https://www.hinohara-toymuseum.com/info) | 村外一般大人1,200円×2＋小学生900円×2＝4,200円。2026年4月改定。 |
| イオンモール日の出<br>`place-hinode` | 東京都 / ショッピングモール | 125 / 140 | [公式1](https://hinode-aeonmall.com/) | 無料の基本入場。買い物・食事等は含まない。 |
