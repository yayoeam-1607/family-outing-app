# 今日どこ行く？のPWA対応

公開URL：https://yayoeam-1607.github.io/family-outing-app/

## 構成

追加依存なし。Web App Manifest、標準Service Worker API、ViteのビルドフックでPWA化した。

- `public/manifest.webmanifest`：名前、説明、日本語、standalone、portrait-primary、固定id/start_url/scope。
- `public/icons/`：生成したオフホワイトとセージグリーンの「地図ピン＋星」。通常192/512px、maskable 512px、Apple用180pxのPNG。
- `pwa.js`：本番でworker登録、更新確認、控えめなインストール導線、iPhone/iPad判定、standalone時の案内非表示。
- `scripts/pwa-build.js`：Vite出力全体とworkerテンプレートのSHA-256から更新識別子とキャッシュ対象を毎ビルド生成。`dist/sw.js`と`.nojekyll`を出力。
- `scripts/service-worker.template.js`：一括プリキャッシュ、完全な新ビルドを確保した後の自動activate、同アプリの旧キャッシュ削除、オフライン画面起動。
- `.github/workflows/pages.yml`：mainのpush → npm ci → test → build → distをGitHub Pagesへ公開。
- `tests/pwa.test.js`：manifest、PNG寸法、ビルド識別子、インストール案内、scope・更新確認のテスト。

既存の`app.js`、`index.html`、`style.css`、`vite.config.js`、READMEも更新。施設データ、catalogRevision、検索・おまかせのロジック、保存形式を変更していない。

## インストール

### iPhone / iPad

Safariで公開URLを開く → 共有ボタン → ホーム画面に追加 → 追加。「Webアプリとして開く」の設定が表示される場合はオン。ホーム画面のアイコンから起動する。

### Android

Chromeで公開URLを開く → メニューの「アプリをインストール」または「ホーム画面に追加」。対応ブラウザでインストール提示イベントが利用できる時は、アプリの「データ管理」→「アプリとして追加」でも開始できる。

案内はデータ管理内だけにあり、自動ポップアップは出さない。standaloneで起動中は案内を隠す。

iOSや別ブラウザでは保存領域が分かれる場合がある。追加前に既存のJSON書き出しを利用し、ホーム画面版に記録が表示されない場合はそのJSONを読み込む。元ブラウザの記録はPWAの処理で消さない。

## オフラインと更新

初回はオンラインで開き、Service Workerの準備完了後はHTML・JS・CSS・manifest・アイコンをキャッシュから起動できる。350施設はJSに含まれ、登録済みのお気に入り・思い出等は既存localStorageから読み込む。外部公式サイトはキャッシュしない。

起動時・アプリへ戻った時・オンラインへ復帰した時にworkerの更新を確認する。`updateViaCache: none`で登録し、プリキャッシュ取得にもビルド識別子付きURLを使う。新しいファイル一式を確保してから`skipWaiting`と`clients.claim`で自動有効化する。操作中のフォームを失わないよう強制再読み込みはせず、更新完了後の次回起動／再読み込みから新しい画面を使用する。GitHub側の配信キャッシュにより反映には少し時間がかかる場合がある。

キャッシュ照合は生成済み静的ファイルに限定し、Varyヘッダーや更新用queryによる照合差を吸収する。旧workerのリクエスト処理から削除済みキャッシュを再作成しない。失敗したプリキャッシュは新workerの有効化を中断し、前の動作版を残す。

## 保存データ保護

localStorageキー`family-outing-data-v1`は変更しない。PWAコードはlocalStorageを読み書き・削除しない。workerは自アプリ専用の`family-outing-app-shell-`キャッシュだけを管理し、他アプリのキャッシュやユーザーデータに触れない。お気に入り、訪問履歴、思い出、非表示施設、ユーザー登録施設を含む既存データの保持をブラウザで検証した。

## GitHub Pages・今後の開発

Viteのbaseとmanifest・worker・アイコンはすべて`/family-outing-app/`に統一。GitHubのSettings → Pages → Sourceを「GitHub Actions」に設定する。従来のブランチ公開ではビルド前HTMLが配信されるため、PWA公開にはこの切替が必要。設定変更にはリポジトリ管理権限が必要で、GITHUB_TOKENからの自動切替はGitHubに403で拒否されたため行わない。以降は通常どおり修正・commit・pushするだけでビルドと公開が進み、workerの識別子も自動で変わる。手動のキャッシュバージョン更新は不要。

ローカル開発は`npm run dev`で同じサブパスを開く。開発モードでは新しいworkerを登録しない。PWA確認は`npm run build` → `npm run preview` → 表示された`/family-outing-app/`のURL。HTTPSまたはlocalhostが必要。

## 検証（2026-10-12）

- npm test：74件成功。
- npm run build：成功。subpath付きHTML、sw.js、manifest、4アイコン、JS/CSSを出力。
- Chromium 390px：manifest/icon取得、worker登録とscope、検索、おまかせ、詳細、お気に入り、思い出、下部ナビ、横溢れなしを確認。
- オフライン再起動：350施設・お気に入り・思い出を表示。保存済みJSONが完全一致。
- 新公開版の模擬更新：新workerを有効化し、新HTMLへ切替、旧キャッシュを削除。ユーザーデータと他アプリのキャッシュを保持。
- インストール提示イベント・iPhone案内・standalone表示を模擬確認。safe-areaのCSS計算を上44px／下34pxで確認。
- JavaScriptエラー0件。

実機iPhone/AndroidのOSインストール操作は未実施。ブラウザのstandaloneモードとsafe-areaは模擬検証であり、実機検証とは区別する。
