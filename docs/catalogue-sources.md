# 瑞江駅基準・実在おでかけスポット100件の調査記録

確認日：2026年10月11日（日本時間）。100施設の公式施設案内を取得して名称・実在を確認し、自治体・運営者の案内から所在地またはエリアを記録した。施設案内と公園・庭園の一覧に所在地の粒度差があるため、町丁目まで確認できない施設は市区のエリア表示とした。

HTTP 200だけを実在確認の根拠にせず、ページタイトル・本文の施設名も点検した。エラーページ、汎用トップページだけの候補、長期休館中の日本科学未来館は登録に使っていない。自治体の公式ページで紹介されている管理施設も含む。原本HTML・本文は作業用ディレクトリに保管し、コミットする根拠JSONには参照URL・ページタイトル・確認日・HTTP結果・取得原本のSHA-256を残す。全文転載はしない。

## 検索値の読み方

- 基準人数は大人2人＋小学生2人。`cost`は通常入館・入園の合計または明記したプランの計画予算。交通費・駐車料金・食事・買い物は原則別。無料の公園でもBBQ・レンタル・スポーツ施設の利用が無料という意味ではない。通常入園の料金範囲がある施設は上限を検索値に使った。幼児・中高生・割引・特別展では変わる。
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
