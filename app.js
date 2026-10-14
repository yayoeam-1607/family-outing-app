import {
  spotBadges,
  categoryGlyph,
  categoryArtwork,
} from "./ui-presentation.js";
import { installPwa } from "./pwa.js";
import { shoppingSections } from "./shopping-presentation.js";
import { emptyShopping } from "./taxonomy.js";
import {
  initialState,
  prepareState,
  validateState,
  storageKey,
  allSpots,
  visitCount,
  collection,
  searchResults,
  deleteSpot,
  restoreSpot,
  purgeSpot,
  memoryYears,
  yearMemories,
  backupBeforeV3,
} from "./store.js";
import {
  taxonomy,
  seasons,
  campingFields,
  fishingFields,
  saunaFields,
  emptyDetails,
  effectiveTags,
} from "./taxonomy.js";
import { upgradeSpot } from "./spot-schema.js";
import { regions } from "./spots.js";
import { installPicker } from "./picker-ui.js";
import { resultPresentation } from "./result-presentation.js";
import { searchFacets, featureFacets } from "./search-facets.js";
const $ = (id) => document.getElementById(id),
  esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
let state = initialState(),
  storageUnreadable = false,
  view = "search",
  limit = 30,
  detailId = null,
  visitId = null,
  editDraft = null,
  editStep = 0,
  noticeTimer;
let raw = null;
try {
  raw = localStorage.getItem(storageKey);
  if (raw) {
    const parsed = JSON.parse(raw),
      next = prepareState(parsed);
    if (parsed.version < 3) backupBeforeV3(localStorage, raw);
    if (JSON.stringify(parsed) !== JSON.stringify(next))
      localStorage.setItem(storageKey, JSON.stringify(next));
    state = next;
  }
} catch (error) {
  storageUnreadable = true;
  setTimeout(
    () =>
      notice(
        "保存データを読み込めませんでした。元データを保護しています。データ管理からバックアップをご確認ください。",
      ),
    0,
  );
}
const defaults = () => ({
  query: "",
  mainCategory: "any",
  subcategories: [],
  tags: [],
  transport: "car",
  travelRange: "any",
  budgetMin: "any",
  budgetMax: "any",
  parking: "any",
  weather: "any",
  stay: "any",
  seasons: [],
  region: "any",
  camping: {},
  fishing: {},
  sauna: {},
  unvisited: false,
  famousOnly: false,
  sort: "recommended",
  famousPriority: false,
});
let criteria = defaults();
function notice(message) {
  $("notice").textContent = message;
  $("notice").hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => ($("notice").hidden = true), 6500);
}
function save(next, { restoring = false } = {}) {
  try {
    if (storageUnreadable && !restoring)
      throw Error(
        "元データを保護中です。先に有効なJSONバックアップを読み込んでください。",
      );
    const valid = validateState(next);
    localStorage.setItem(storageKey, JSON.stringify(valid));
    state = valid;
    storageUnreadable = false;
    renderAll();
    return true;
  } catch (e) {
    notice(e.message || "保存できませんでした。バックアップをご確認ください。");
    return false;
  }
}
const spotById = (id) =>
  allSpots(state).find((s) => String(s.id) === String(id));
const isArchived = (id) => !state.spots.some((s) => s.id === id);
const latest = (id) =>
  [...state.visits]
    .filter((v) => v.spotId === id)
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        state.visits.indexOf(b) - state.visits.indexOf(a),
    )[0];
const yen = (n) => Number(n).toLocaleString("ja-JP") + "円";
function priceLabel(s) {
  const p = s.price;
  if (p?.free === true) return "無料";
  if (p?.family4Typical != null) return "約" + yen(p.family4Typical);
  if (p?.family4Min != null && p?.family4Max != null)
    return yen(p.family4Min) + "〜" + yen(p.family4Max);
  if (p?.family4Min != null) return yen(p.family4Min) + "〜";
  if (p?.family4Max != null) return "〜" + yen(p.family4Max);
  return "料金不明";
}
const timeLabel = (n) => (n == null ? "時間不明" : "約" + n + "分");
const parkingLabel = (s) =>
  ({
    free: "無料",
    "free-limited":
      s.parking.freeMinutes == null
        ? "一定時間無料（時間不明）"
        : "最初の" + s.parking.freeMinutes + "分無料",
    paid: "有料",
    none: "なし",
    unknown: s.parking?.available === true ? "あり（料金不明）" : "不明",
  })[s.parking?.type] ?? "不明";
const weatherLabel = (s) =>
  s.weather.includes("indoor")
    ? "完全屋内"
    : s.weather.includes("rainy")
      ? "雨でもOK"
      : s.weather.includes("sunny")
        ? "晴れ向き"
        : "天候不明";
const detailLabel = (v) =>
  v === true
    ? "可 / あり"
    : v === false
      ? "不可 / なし"
      : ({
          yes: "利用可",
          no: "利用不可",
          conditional: "条件付き",
          ageRestricted: "年齢制限あり",
          unknown: "不明",
          required: "要予約",
          possible: "予約可能",
          "not-required": "予約不要",
        }[v] ??
        v ??
        "不明");
function card(s) {
  return cardFor(s, criteria);
}
function cardFor(s, c) {
  const v = latest(s.id),
    count = visitCount(state, s.id),
    minutes = s.travel[c.transport === "train" ? "trainMinutes" : "carMinutes"],
    { tags, points } = resultPresentation(s, c);
  if (c.unvisited && count === 0) points.unshift("まだ行ってない");
  points.splice(4);
  const meta = taxonomy[s.mainCategory];
  return `<article class="spot-card" data-category-style="${esc(s.mainCategory)}" tabindex="0" role="button" aria-label="${esc(s.name)}の詳細" data-detail="${esc(s.id)}">${categoryArtwork(s.mainCategory)}<div class="card-heading"><div><h3>${esc(s.name)}</h3><span class="card-category">${meta.icon} ${esc(meta.label)}</span></div><button class="favorite ${state.favorites.includes(s.id) ? "selected" : ""}" data-favorite="${esc(s.id)}" aria-label="${esc(s.name)}を${state.favorites.includes(s.id) ? "お気に入り解除" : "お気に入りに追加"}" aria-pressed="${state.favorites.includes(s.id)}">${state.favorites.includes(s.id) ? "♥" : "♡"}</button></div><div class="card-location">${esc([s.prefecture, s.area].filter(Boolean).join(" ") || "所在地未確認")}${isArchived(s.id) ? " · 非表示の場所" : ""}</div><div class="card-facts"><span class="travel-fact" title="瑞江駅からの目安"><span aria-hidden="true">${c.transport === "train" ? "🚃" : "🚗"}</span><span><small>瑞江駅から</small><strong>${timeLabel(minutes)}</strong>${minutes == null ? "" : "<small>片道の目安</small>"}</span></span><span><span aria-hidden="true">🅿</span><span><small>駐車場</small>${parkingLabel(s)}</span></span><span><span aria-hidden="true">￥</span><span><small>家族4人</small>${priceLabel(s)}</span></span><span><span aria-hidden="true">☀</span><span><small>天候</small>${weatherLabel(s)}</span></span></div><div class="spot-badges">${spotBadges(
    s,
    c.transport,
  )
    .map((b) => `<span class="spot-badge ${b.kind}">${esc(b.text)}</span>`)
    .join(
      "",
    )}</div><div class="card-tags">${tags.map((t) => `<span>#${esc(t)}</span>`).join("")}</div>${points.length ? `<div class="match-points">${points.map((p) => `<span>✓ ${esc(p)}</span>`).join("")}</div>` : ""}<div class="visit-status">${v ? `<strong>✓ ${esc(v.date.replaceAll("-", "/"))}に行った</strong><span>訪問${count}回</span>` : '<span class="unvisited-dot"></span>まだ行っていない'}<span class="card-more" aria-hidden="true">詳細を見る ↗</span></div></article>`;
}
function renderResults() {
  const result = searchResults(state, criteria);
  $("result-count").innerHTML =
    `${result.length}件<span>家族の次のおでかけ</span>`;
  $("results").innerHTML =
    result.slice(0, limit).map(card).join("") ||
    '<div class="empty empty-search"><span class="empty-symbol" aria-hidden="true">⌕</span><h3>この条件では、まだ候補がありません</h3><p>移動時間や条件を、少し広げてみてください。</p><button data-reset-search>条件をクリアして探す</button></div>';
  $("more").hidden = result.length <= limit;
  renderSelected();
}
function option(value, label, selected) {
  return `<option value="${esc(value)}" ${String(value) === String(selected) ? "selected" : ""}>${esc(label)}</option>`;
}
function select(name, label, entries, value) {
  return `<label>${label}<select data-condition="${name}">${entries.map(([k, v]) => option(k, v, value)).join("")}</select></label>`;
}
function renderCommon() {
  const prices = [
    ["any", "指定なし"],
    [0, "0円"],
    [3000, "3,000円"],
    [5000, "5,000円"],
    [10000, "10,000円"],
    [15000, "15,000円"],
    [20000, "20,000円"],
    [30000, "30,000円"],
  ];
  $("common-filters").innerHTML = `<div class="filter-grid">${select(
    "transport",
    "交通手段",
    [
      ["car", "車"],
      ["train", "電車"],
    ],
    criteria.transport,
  )}${select(
    "travelRange",
    "片道の移動時間",
    [
      ["any", "気にしない"],
      ["0-30", "30分以内"],
      ["0-60", "1時間以内"],
      ["0-90", "1時間30分以内"],
      ["0-120", "2時間以内"],
      ["0-180", "3時間以内"],
    ],
    criteria.travelRange,
  )}${select("region", "地域", [["any", "指定なし"], ...regions.map((r) => [r, r])], criteria.region)}<label class="budget-label">家族4人の予算<div class="budget-range"><select data-condition="budgetMin" aria-label="予算下限">${prices
    .map(([k, v]) => [k, k === 30000 ? "30,000円以上" : v])
    .map(([k, v]) => option(k, v, criteria.budgetMin))
    .join(
      "",
    )}</select><span>〜</span><select data-condition="budgetMax" aria-label="予算上限">${prices.map(([k, v]) => option(k, v, criteria.budgetMax)).join("")}</select></div></label>${select(
    "parking",
    "駐車場",
    [
      ["any", "指定なし"],
      ["available", "駐車場あり"],
      ["free", "無料"],
      ["free-limited", "一定時間無料"],
      ["paid", "有料"],
      ["none", "なし"],
    ],
    criteria.parking,
  )}${select(
    "weather",
    "天気",
    [
      ["any", "指定なし"],
      ["sunny", "晴れ向き"],
      ["rainy", "雨でもOK"],
      ["indoor", "完全屋内"],
    ],
    criteria.weather,
  )}${select(
    "stay",
    "滞在時間",
    [
      ["any", "指定なし"],
      [2, "1〜2時間"],
      [4, "半日"],
      [8, "1日"],
    ],
    criteria.stay,
  )}<fieldset><legend>季節（複数選択はOR）</legend><div class="chips">${Object.entries(
    seasons,
  )
    .map(
      ([k, v]) =>
        `<button type="button" class="chip ${criteria.seasons.includes(k) ? "active" : ""}" data-season="${k}">${v}</button>`,
    )
    .join(
      "",
    )}</div></fieldset><fieldset><div class="feature-grid"><label><input type="checkbox" data-condition="unvisited" ${criteria.unvisited ? "checked" : ""}>まだ行っていない</label><label><input type="checkbox" data-condition="famousOnly" ${criteria.famousOnly ? "checked" : ""}>有名スポットのみ</label></div></fieldset></div><p class="form-note">時間は瑞江駅から片道。料金や設備が不明の施設は、その条件を指定すると候補から外れます。</p>`;
}
function renderHierarchy() {
  const cat = taxonomy[criteria.mainCategory];
  $("categories").innerHTML = Object.entries(taxonomy)
    .map(
      ([k, v]) =>
        `<button data-category="${k}" class="${criteria.mainCategory === k ? "active" : ""}" aria-pressed="${criteria.mainCategory === k}"><span class="category-icon" aria-hidden="true">${categoryGlyph(k)}</span><span class="category-label">${v.label}</span>${criteria.mainCategory === k ? '<span class="category-check" aria-hidden="true">✓</span>' : ""}</button>`,
    )
    .join("");
  if (!cat) {
    $("hierarchy").innerHTML = "";
    return;
  }
  const facets = searchFacets(state, criteria);
  const facetButtons = (items, attribute) =>
    items
      .filter(({ count, selected }) => count > 0 || selected)
      .map(
        ({ value, count, selected }) =>
          `<button class="chip ${selected ? "active" : ""}" data-${attribute}="${esc(value)}" ${count === 0 && !selected ? "disabled" : ""} aria-pressed="${selected}">${selected ? '<span class="chip-check" aria-hidden="true">✓</span>' : ""}<span>${esc(value)}</span> <small class="chip-count">${count}</small></button>`,
      )
      .join("");
  let html = `<section class="hierarchy-section"><h3>${cat.label}で何をする？ <small>複数選択はOR</small></h3><div class="chips">${facetButtons(facets.subcategories, "subcategory")}</div></section>`;
  if (criteria.subcategories.length) {
    html += `<section class="hierarchy-section"><h3>気になること <small>タグはOR</small></h3><div class="chips">${facetButtons(facets.tags, "tag")}</div></section>`;
  }
  const groups = [];
  if (
    criteria.mainCategory === "outdoor" &&
    criteria.subcategories.some((s) => ["キャンプ", "BBQ"].includes(s))
  )
    groups.push(["camping", campingFields, "キャンプ・BBQの条件"]);
  if (
    criteria.mainCategory === "activity" &&
    criteria.subcategories.includes("釣り")
  )
    groups.push(["fishing", fishingFields, "釣りの条件"]);
  if (
    criteria.mainCategory === "relax" &&
    criteria.subcategories.includes("サウナ")
  )
    groups.push(["sauna", saunaFields, "サウナの条件"]);
  for (const [group, fields, label] of groups) {
    html += `<section class="hierarchy-section"><h3>${label} <small>選んだ特徴をすべて満たす</small></h3><div class="feature-grid">${featureFacets(
      state,
      criteria,
      group,
      fields,
    )
      .filter(({ count, selected }) => count > 0 || selected)
      .map(
        ({ key: k, label: v, count, selected }) =>
          `<label><input type="checkbox" data-feature="${group}.${k}" ${selected ? "checked" : ""}>${v} (${count})</label>`,
      )
      .join("")}</div>`;
    if (group === "sauna")
      html += `<div class="form-grid" style="margin-top:12px">${select(
        "sauna.familyUse",
        "家族利用",
        [
          ["any", "指定なし"],
          ["yes", "利用可"],
          ["conditional", "条件付き"],
          ["no", "利用不可"],
        ],
        criteria.sauna.familyUse ?? "any",
      )}${select(
        "sauna.childUse",
        "子ども利用",
        [
          ["any", "指定なし"],
          ["yes", "利用可"],
          ["ageRestricted", "年齢制限あり"],
          ["no", "利用不可"],
        ],
        criteria.sauna.childUse ?? "any",
      )}</div>`;
    html += "</section>";
  }
  $("hierarchy").innerHTML = html;
}
function toggleArray(key, value) {
  criteria[key] = criteria[key].includes(value)
    ? criteria[key].filter((x) => x !== value)
    : [...criteria[key], value];
}
function renderSelected() {
  const chips = [];
  const add = (key, value, label) =>
    chips.push(
      `<button class="chip" data-remove="${key}" data-value="${esc(value)}" aria-label="${esc(label)}を解除">${esc(label)} ×</button>`,
    );
  if (criteria.query) add("query", "", criteria.query);
  if (criteria.mainCategory !== "any")
    add("mainCategory", "", taxonomy[criteria.mainCategory].label);
  for (const key of ["subcategories", "tags", "seasons"])
    for (const v of criteria[key])
      add(key, v, key === "seasons" ? seasons[v] : v);
  const names = {
    travelRange: criteria.transport === "car" ? "車" : "電車",
    budgetMin: "予算下限 ",
    budgetMax: "予算上限 ",
    parking: "駐車場 ",
    weather: "",
    stay: "滞在 ",
    region: "",
  };
  const labels = {
    free: "無料",
    paid: "有料",
    available: "あり",
    "free-limited": "一定時間無料",
    none: "なし",
    sunny: "晴れ向き",
    rainy: "雨でもOK",
    indoor: "完全屋内",
    2: "1〜2時間",
    4: "半日",
    8: "1日",
  };
  for (const [k, prefix] of Object.entries(names))
    if (criteria[k] !== "any")
      add(
        k,
        "",
        prefix +
          (k === "travelRange"
            ? ({
                "0-30": "30分以内",
                "0-60": "1時間以内",
                "0-90": "1時間30分以内",
                "0-120": "2時間以内",
                "0-180": "3時間以内",
              }[criteria[k]] ?? criteria[k].replace("-", "〜") + "分")
            : k.startsWith("budget")
              ? yen(criteria[k])
              : (labels[criteria[k]] ?? criteria[k])),
      );
  for (const [group, fields] of Object.entries({
    camping: campingFields,
    fishing: fishingFields,
    sauna: saunaFields,
  }))
    for (const [k, v] of Object.entries(criteria[group]))
      if (v !== undefined && v !== "any")
        add(
          group + "." + k,
          "",
          (fields[k] ?? (k === "familyUse" ? "家族利用" : "子ども利用")) +
            (v === true ? "" : " " + detailLabel(v)),
        );
  if (criteria.unvisited) add("unvisited", "", "まだ行っていない");
  if (criteria.famousOnly) add("famousOnly", "", "有名スポット");
  if (criteria.famousPriority) add("famousPriority", "", "有名スポット優先");
  $("selected-filters").innerHTML = chips.join("");
}
function renderMemories() {
  const years = memoryYears(state),
    previous = $("memory-year").value,
    year = years.includes(Number(previous)) ? Number(previous) : years[0];
  $("memory-year").innerHTML = years
    .map((y) => option(y, y + "年", year))
    .join("");
  $("memory-year").disabled = !years.length;
  if (!year) {
    $("memory-title").textContent = "家族の思い出";
    $("memory-summary").innerHTML = "";
    $("timeline").innerHTML =
      '<div class="empty empty-memories"><span class="empty-symbol" aria-hidden="true">▤</span><h3>家族のアルバムを、ここから。</h3><p>おでかけ先の「行った！」から、<br>楽しかった一日を残してみよう。</p><button data-view="search">次のおでかけを探す</button></div>';
    return;
  }
  const m = yearMemories(state, year);
  $("memory-title").textContent = year + "年の思い出";
  $("memory-summary").innerHTML =
    `<section class="memory-overview"><div class="memory-numbers"><div><strong>${m.outings}</strong><span>おでかけ</span></div><div><strong>${m.uniquePlaces}</strong><span>行った場所</span></div></div><div class="memory-highlights"><p><small>一番行った場所</small>${esc(spotById(m.topSpot[0])?.name ?? "保管した場所")}　${m.topSpot[1]}回</p><p><small>よく遊んだ</small>${esc(taxonomy[m.topCategory[0]]?.label ?? "未分類")}</p></div><div class="memory-extras"><span>★5 ${m.fiveStarPlaces}か所</span><span>また行きたい ${m.againPlaces}か所</span><span>初めて ${m.firstTimePlaces}か所</span></div></section>`;
  let month = "",
    html = "";
  for (const v of m.visits) {
    const key = v.date.slice(5, 7);
    if (key !== month) {
      month = key;
      html += `<h2 class="month-title"><span>${year}年${Number(month)}月</span><small>${year} / ${month}</small></h2>`;
    }
    const s = spotById(v.spotId);
    html += `<article class="journal-entry"><div class="journal-date"><small>${Number(month)}月</small><strong>${Number(v.date.slice(8))}</strong></div><div class="journal-content"><button data-detail="${esc(v.spotId)}">${esc(s?.name ?? "保管した場所")}</button><div><span class="stars">${"★".repeat(v.rating) + "☆".repeat(5 - v.rating)}</span><span class="intention">${esc(v.intention)}</span></div>${v.comment ? `<p>${esc(v.comment)}</p>` : ""}</div></article>`;
  }
  $("timeline").innerHTML = html;
}
function renderAll() {
  renderHierarchy();
  renderCommon();
  renderResults();
  $("favorites").innerHTML =
    collection(state, "favorites").map(card).join("") ||
    '<div class="empty empty-favorites"><span class="empty-symbol" aria-hidden="true">♡</span><h3>まだお気に入りはありません</h3><p>気になる場所を見つけたら、<br>ハートを押して保存してみよう。</p><button data-view="search">おでかけ先を探す</button></div>';
  renderMemories();
  $("archives").innerHTML =
    (state.archivedSpots ?? [])
      .map(
        (s) =>
          `<button data-detail="${esc(s.id)}">${esc(s.name)}　<small>${visitCount(state, s.id)}回の思い出</small></button>`,
      )
      .join("") || '<p class="muted">非表示の場所はありません。</p>';
  $("storage-status").textContent = storageUnreadable
    ? "読み込みに失敗した元データは上書きしていません。書き出しは元データをそのまま保存します。"
    : "保存形式 version 3 · このブラウザに保存";
}
function showView(next) {
  view = next;
  for (const v of ["search", "favorites", "memories", "add"])
    $(v + "-view").hidden = v !== next;
  document.querySelectorAll("[data-view]").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === next);
    if (b.closest(".bottom-nav")) {
      if (b.dataset.view === next) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    }
  });
  renderAll();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function detailsTable(group, fields, data) {
  const known = Object.entries(fields).filter(
    ([key]) => data[key] !== null && data[key] !== undefined,
  );
  if (!known.length) return "";
  return `<h4>${group}</h4><div class="detail-table">${known
    .map(
      ([k, v]) =>
        `<div><span>${v}</span><span>${esc(detailLabel(data[k]))}</span></div>`,
    )
    .join("")}</div>`;
}
function showDetail(id) {
  if ($("picker-dialog").open) $("picker-dialog").close();
  const s = spotById(id);
  if (!s) return;
  detailId = s.id;
  const archived = isArchived(s.id);
  const meta = taxonomy[s.mainCategory];
  let html = `${categoryArtwork(s.mainCategory)}<header class="detail-header"><p class="eyebrow">家族の次のおでかけ</p><span class="card-category">${meta.icon} ${esc(meta.label)}</span><h2 class="detail-title">${esc(s.name)}</h2><p class="detail-category">${esc(s.subcategories.join(" / "))}</p>${s.prefecture || s.area ? `<p class="detail-location">${esc([s.prefecture, s.area].filter(Boolean).join(" "))}</p>` : ""}${archived ? '<p class="form-note">候補から非表示にした場所</p>' : ""}${s.description ? `<p class="detail-description">${esc(s.description)}</p>` : ""}</header>`;
  const facts = [];
  const fact = (label, value) =>
    facts.push(`<p><small>${label}</small><strong>${esc(value)}</strong></p>`);
  if (s.travel.carMinutes != null)
    fact("🚗 瑞江駅から車", timeLabel(s.travel.carMinutes) + "（片道の目安）");
  if (s.travel.trainMinutes != null)
    fact(
      "🚃 瑞江駅から電車",
      timeLabel(s.travel.trainMinutes) + "（片道の目安）",
    );
  if (
    s.price.free === true ||
    [s.price.family4Typical, s.price.family4Min, s.price.family4Max].some(
      (v) => v != null,
    )
  )
    fact("￥ 家族4人の料金目安", priceLabel(s));
  if (s.parking.type !== "unknown" || s.parking.available != null)
    fact("🅿 駐車場", parkingLabel(s));
  if (s.parking.available != null)
    fact("駐車場の有無", detailLabel(s.parking.available));
  if (s.parking.freeMinutes != null)
    fact("最初の無料時間", s.parking.freeMinutes + "分");
  if (s.parking.fee != null) fact("駐車料金", yen(s.parking.fee));
  if (s.parking.capacity != null)
    fact("駐車台数", "約" + s.parking.capacity + "台");
  if (s.weather.length) fact("☀ 天候", weatherLabel(s));
  if (s.stayDuration.length)
    fact(
      "⏱ 滞在時間目安",
      s.stayDuration
        .map((x) => ({ 2: "1〜2時間", 4: "半日", 8: "1日" })[x])
        .join("・"),
    );
  if (s.seasons.length)
    fact("おすすめの季節", s.seasons.map((x) => seasons[x]).join("・"));
  if (facts.length || s.price.note || s.parking.note)
    html += `<section class="detail-section"><h3><span aria-hidden="true">01</span> おでかけ情報</h3><div class="detail-facts">${facts.join("")}</div>${s.price.note ? `<p class="detail-note">料金：${esc(s.price.note)}</p>` : ""}${s.parking.note ? `<p class="detail-note">駐車場：${esc(s.parking.note)}</p>` : ""}</section>`;
  const tags = effectiveTags(s);
  if (tags.length)
    html += `<section class="detail-section"><h3><span aria-hidden="true">02</span> 楽しめること</h3><div class="chips detail-tags">${tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div></section>`;
  let facilities = "";
  for (const { title, values } of shoppingSections(s))
    facilities += `<section class="shopping-detail"><h4>${title}</h4><div class="chips">${values.map((v) => `<span class="chip">${esc(v)}</span>`).join("")}</div></section>`;
  if (s.camping)
    facilities +=
      detailsTable("キャンプ・BBQ", campingFields, s.camping) +
      (s.camping.reservation && s.camping.reservation !== "unknown"
        ? `<p class="detail-note">予約：${esc(detailLabel(s.camping.reservation))}</p>`
        : "");
  if (s.fishing) facilities += detailsTable("釣り", fishingFields, s.fishing);
  if (s.sauna) {
    facilities += detailsTable("サウナ", saunaFields, s.sauna);
    const notes = [
      s.sauna.familyUse !== "unknown"
        ? "家族利用：" + detailLabel(s.sauna.familyUse)
        : "",
      s.sauna.childUse !== "unknown"
        ? "子ども：" + detailLabel(s.sauna.childUse)
        : "",
      s.sauna.childAgeRule ? "年齢条件：" + s.sauna.childAgeRule : "",
    ].filter(Boolean);
    if (notes.length)
      facilities += `<p class="detail-note">${esc(notes.join(" / "))}</p>`;
  }
  if (facilities)
    html += `<section class="detail-section"><h3><span aria-hidden="true">03</span> 施設詳細</h3>${facilities}</section>`;
  if (s.website)
    html += `<section class="detail-section detail-official"><h3>公式サイト</h3><a class="official-link" href="${esc(s.website)}" target="_blank" rel="noopener noreferrer">公式サイトを見る <span aria-hidden="true">↗</span></a></section>`;
  html += `<section class="detail-section detail-memories"><h3>家族の思い出</h3><div class="detail-facts"><p><small>行った回数</small><strong>${visitCount(state, s.id)}回</strong></p><p><small>最後に行った日</small><strong>${esc(latest(s.id)?.date ?? "まだ行っていない")}</strong></p></div></section>`;
  html += `<div class="detail-actions"><button class="primary" data-visit="${esc(s.id)}">✓ 行った！</button><button data-favorite="${esc(s.id)}">${state.favorites.includes(s.id) ? "♥ 保存済み" : "♡ お気に入り"}</button></div><div class="management actions">${s.source === "legacy" ? "" : `<button data-edit="${esc(s.id)}">編集</button><button data-${archived ? "restore" : "hide"}="${esc(s.id)}">${archived ? "候補に戻す" : "候補から非表示"}</button>`}${archived ? `<details><summary>完全削除の操作</summary><p class="form-note">この場所のすべての思い出とお気に入りも消えます。</p><button class="danger" data-purge="${esc(s.id)}">思い出も含め完全に削除</button></details>` : ""}</div>`;
  $("detail-content").innerHTML = html;
  if (!$("detail-dialog").open) $("detail-dialog").showModal();
}
function showVisit(id) {
  const s = spotById(id);
  if (!s) return;
  visitId = s.id;
  $("detail-dialog").close();
  $("visit-form").reset();
  $("visit-name").textContent = s.name;
  $("visit-form").elements.date.value = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  $("visit-dialog").showModal();
}
function favorite(id) {
  const s = spotById(id);
  if (!s) return;
  save({
    ...state,
    favorites: state.favorites.includes(s.id)
      ? state.favorites.filter((x) => x !== s.id)
      : [...state.favorites, s.id],
  });
  if ($("detail-dialog").open) showDetail(s.id);
}
function editorInput(path, label, value, { type = "text", max = 2000 } = {}) {
  return `<label>${label}<input data-path="${path}" data-kind="${type === "number" ? "number" : "string"}" type="${type}" value="${esc(value)}" ${type === "number" ? 'min="0" max="10000000"' : `maxlength="${max}"`} ${path === "name" ? "required" : ""}></label>`;
}
function editorSelect(path, label, values, current, kind = "string") {
  return `<label>${label}<select data-path="${path}" data-kind="${kind}">${values.map(([k, v]) => option(k, v, current)).join("")}</select></label>`;
}
const boolOptions = [
  ["null", "不明"],
  ["true", "可 / あり"],
  ["false", "不可 / なし"],
];
function editGroup(group, title, fields) {
  const data = editDraft[group];
  if (!data) return "";
  let html = `<details class="detail-editor"><summary>${title}の詳細を編集</summary><div class="form-grid">${Object.entries(
    fields,
  )
    .map(([k, v]) =>
      editorSelect(group + "." + k, v, boolOptions, String(data[k]), "bool"),
    )
    .join("")}`;
  if (group === "camping")
    html += editorSelect(
      "camping.reservation",
      "予約",
      [
        ["unknown", "不明"],
        ["required", "要予約"],
        ["possible", "予約可能"],
        ["not-required", "予約不要"],
      ],
      data.reservation,
    );
  if (group === "sauna")
    html +=
      editorSelect(
        "sauna.familyUse",
        "家族利用",
        [
          ["unknown", "不明"],
          ["yes", "利用可"],
          ["no", "利用不可"],
          ["conditional", "条件付き"],
        ],
        data.familyUse,
      ) +
      editorSelect(
        "sauna.childUse",
        "子ども利用",
        [
          ["unknown", "不明"],
          ["yes", "利用可"],
          ["no", "利用不可"],
          ["ageRestricted", "年齢制限あり"],
        ],
        data.childUse,
      ) +
      editorInput("sauna.childAgeRule", "子どもの年齢条件", data.childAgeRule);
  return html + "</div></details>";
}
function renderEditor() {
  const s = editDraft;
  $("editor-steps").innerHTML = ["1 基本項目", "2 カテゴリ", "3 必要な詳細"]
    .map(
      (label, i) =>
        `<button type="button" data-step="${i}" class="${editStep === i ? "active" : ""}">${label}</button>`,
    )
    .join("");
  let html = "";
  if (editStep === 0)
    html = `${editorInput("name", "施設名", s.name, { max: 100 })}<div class="form-grid">${editorSelect("prefecture", "都県", [["", "不明"], ...["東京都", "千葉県", "埼玉県", "神奈川県"].map((x) => [x, x])], s.prefecture)}${editorInput("area", "エリア", s.area, { max: 200 })}</div><label>おすすめポイント<textarea data-path="description" data-kind="string" maxlength="2000" rows="4">${esc(s.description)}</textarea></label>${editorInput("website", "公式サイト URL", s.website, { type: "url" })}<p class="form-note">公式情報や、ご自身が確認した内容を入力してください。</p>`;
  if (editStep === 1) {
    const cat = taxonomy[s.mainCategory];
    html =
      editorSelect(
        "mainCategory",
        "大カテゴリ",
        Object.entries(taxonomy).map(([k, v]) => [k, v.label]),
        s.mainCategory,
      ) +
      `<p class="form-note">中カテゴリ（複数選択可）</p><div class="feature-grid">${cat.subs.map((v) => `<label><input type="checkbox" data-array="subcategories" value="${v}" ${s.subcategories.includes(v) ? "checked" : ""}>${v}</label>`).join("")}</div>${editorInput("tags", "タグ（カンマ区切り）", s.tags.join(", "))}<p class="form-note">季節</p><div class="feature-grid">${Object.entries(
        seasons,
      )
        .map(
          ([k, v]) =>
            `<label><input type="checkbox" data-array="seasons" value="${k}" ${s.seasons.includes(k) ? "checked" : ""}>${v}</label>`,
        )
        .join(
          "",
        )}</div><p class="form-note">天候</p><div class="feature-grid">${[
        ["sunny", "晴れ向き"],
        ["rainy", "雨でもOK"],
        ["indoor", "完全屋内"],
      ]
        .map(
          ([k, v]) =>
            `<label><input type="checkbox" data-array="weather" value="${k}" ${s.weather.includes(k) ? "checked" : ""}>${v}</label>`,
        )
        .join(
          "",
        )}</div><p class="form-note">滞在時間</p><div class="feature-grid">${[
        [2, "1〜2時間"],
        [4, "半日"],
        [8, "1日"],
      ]
        .map(
          ([k, v]) =>
            `<label><input type="checkbox" data-array="stayDuration" value="${k}" ${s.stayDuration.includes(k) ? "checked" : ""}>${v}</label>`,
        )
        .join("")}</div>${editorSelect(
        "famous",
        "有名スポット",
        [
          ["false", "付けない"],
          ["true", "有名スポット"],
        ],
        String(s.famous),
        "bool",
      )}`;
  }
  if (editStep === 2) {
    if (s.mainCategory === "shopping" && !s.shopping)
      s.shopping = emptyShopping();
    if (
      s.mainCategory === "outdoor" &&
      s.subcategories.some((x) => ["キャンプ", "BBQ"].includes(x)) &&
      !s.camping
    )
      s.camping = { ...emptyDetails(campingFields), reservation: "unknown" };
    if (
      s.mainCategory === "activity" &&
      s.subcategories.includes("釣り") &&
      !s.fishing
    )
      s.fishing = emptyDetails(fishingFields);
    if (
      s.mainCategory === "relax" &&
      s.subcategories.includes("サウナ") &&
      !s.sauna
    )
      s.sauna = {
        ...emptyDetails(saunaFields),
        familyUse: "unknown",
        childUse: "unknown",
        childAgeRule: null,
      };
    html = `<p class="form-note">不明な数値は空欄にしてください。料金は家族4人分の目安です。</p><div class="form-grid">${editorInput("travel.carMinutes", "車での片道時間（分）", s.travel.carMinutes, { type: "number" })}${editorInput("travel.trainMinutes", "公共交通の片道時間（分）", s.travel.trainMinutes, { type: "number" })}${editorSelect(
      "price.free",
      "料金は無料？",
      [
        ["null", "不明"],
        ["true", "無料"],
        ["false", "有料"],
      ],
      String(s.price.free),
      "bool",
    )}${editorInput("price.family4Typical", "通常の料金目安（円）", s.price.family4Typical, { type: "number" })}${editorInput("price.family4Min", "料金の下限（円）", s.price.family4Min, { type: "number" })}${editorInput("price.family4Max", "料金の上限（円）", s.price.family4Max, { type: "number" })}${editorInput("price.note", "料金についてのメモ", s.price.note)}${editorSelect("parking.available", "駐車場の有無", boolOptions, String(s.parking.available), "bool")}${editorSelect(
      "parking.type",
      "駐車場の種類",
      [
        ["unknown", "不明"],
        ["free", "無料"],
        ["free-limited", "一定時間無料"],
        ["paid", "有料"],
        ["none", "なし"],
      ],
      s.parking.type,
    )}${editorInput("parking.fee", "駐車料金（円）", s.parking.fee, { type: "number" })}${editorInput("parking.freeMinutes", "最初の無料時間（分）", s.parking.freeMinutes, { type: "number" })}${editorInput("parking.capacity", "駐車台数", s.parking.capacity, { type: "number" })}${editorInput("parking.note", "駐車場のメモ", s.parking.note)}</div>${editGroup("camping", "キャンプ・BBQ", campingFields)}${editGroup("fishing", "釣り", fishingFields)}${editGroup("sauna", "サウナ", saunaFields)}`;
  }
  if (editStep === 2 && s.shopping) {
    html += `<details class="detail-editor"><summary>ショッピングの詳細を編集</summary><div class="form-grid">${[
      ["buyTags", "買い物"],
      ["playTags", "遊ぶ"],
      ["foodTags", "食べる・便利"],
      ["highlights", "主な店舗"],
    ]
      .map(
        ([key, title]) =>
          `<label>${title}（カンマ区切り）<input data-path="shopping.${key}" data-kind="array" value="${esc(s.shopping[key].join(", "))}" maxlength="2000"></label>`,
      )
      .join("")}</div></details>`;
  }
  $("editor-content").innerHTML = html;
  $("editor-prev").hidden = editStep === 0;
  $("editor-next").hidden = editStep === 2;
  $("editor-save").hidden = editStep !== 2;
}
function captureEditor() {
  if (!$("editor-form").reportValidity()) return false;
  for (const input of $("editor-content").querySelectorAll("[data-path]")) {
    const path = input.dataset.path.split("."),
      parent = path.length === 2 ? editDraft[path[0]] : editDraft,
      key = path.at(-1);
    let value = input.value;
    if (input.dataset.kind === "number")
      value = value === "" ? null : Number(value);
    if (input.dataset.kind === "bool")
      value = value === "null" ? null : value === "true";
    if (input.dataset.path === "tags" || input.dataset.kind === "array")
      value = [
        ...new Set(
          value
            .split(/[,、\n]/)
            .map((x) => x.trim())
            .filter(Boolean),
        ),
      ];
    if (
      ["price.note", "parking.note", "sauna.childAgeRule"].includes(
        input.dataset.path,
      ) &&
      value === ""
    )
      value = null;
    parent[key] = value;
  }
  for (const key of new Set(
    [...$("editor-content").querySelectorAll("[data-array]")].map(
      (x) => x.dataset.array,
    ),
  ))
    editDraft[key] = [
      ...$("editor-content").querySelectorAll(`[data-array="${key}"]:checked`),
    ].map((x) => (key === "stayDuration" ? Number(x.value) : x.value));
  return true;
}
function showEditor(id) {
  const s = id ? spotById(id) : null;
  editDraft = s
    ? structuredClone(s)
    : upgradeSpot({
        id: "user-" + crypto.randomUUID(),
        name: "",
        mainCategory: "outdoor",
        subcategories: [],
        tags: [],
        source: "user",
        sample: false,
      });
  editStep = 0;
  $("detail-dialog").close();
  $("editor-title").textContent = s ? "スポットを編集" : "スポットを追加";
  renderEditor();
  $("editor-dialog").showModal();
}
function refreshSearch({ controls = true } = {}) {
  limit = 30;
  renderHierarchy();
  if (controls) renderCommon();
  renderResults();
}
$("query").addEventListener("input", (e) => {
  criteria.query = e.target.value;
  refreshSearch({ controls: false });
});
$("filter-toggle").addEventListener("click", () => {
  const hidden = $("common-filters").hidden;
  $("common-filters").hidden = !hidden;
  $("filter-toggle").setAttribute("aria-expanded", String(hidden));
});
$("sort").addEventListener("change", (e) => {
  criteria.sort = e.target.value === "famous" ? "recommended" : e.target.value;
  criteria.famousPriority = e.target.value === "famous";
  renderResults();
});
$("clear").addEventListener("click", () => {
  criteria = defaults();
  $("query").value = "";
  $("sort").value = "recommended";
  refreshSearch();
});
$("more").addEventListener("click", () => {
  limit += 30;
  renderResults();
});
$("memory-year").addEventListener("change", renderMemories);
$("backup-toggle").addEventListener("click", () => {
  $("backup-panel").hidden = !$("backup-panel").hidden;
  if (!$("backup-panel").hidden)
    $("backup-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});
$("add-spot").addEventListener("click", () => showEditor());
const suggestions = [
  [
    "キャンプ",
    () => {
      criteria.mainCategory = "outdoor";
      criteria.subcategories = ["キャンプ"];
    },
  ],
  ["雨の日", () => (criteria.weather = "rainy")],
  ["水遊び", () => (criteria.query = "水遊び")],
  [
    "釣り",
    () => {
      criteria.mainCategory = "activity";
      criteria.subcategories = ["釣り"];
    },
  ],
  ["潮干狩り", () => (criteria.query = "潮干狩り")],
  [
    "公園",
    () => {
      criteria.mainCategory = "outdoor";
      criteria.subcategories = ["公園"];
    },
  ],
  ["屋内", () => (criteria.weather = "indoor")],
  ["ショッピング", () => (criteria.mainCategory = "shopping")],
];
$("suggestions").innerHTML = suggestions
  .map(
    ([name], i) =>
      `<button class="chip" data-suggestion="${i}">${name}</button>`,
  )
  .join("");
document.addEventListener("click", (e) => {
  const b = e.target.closest("button,[data-detail]");
  if (!b) return;
  if (b.dataset.close) {
    $(b.dataset.close).close();
    return;
  }
  if (b.dataset.view) {
    showView(b.dataset.view);
    return;
  }
  if (b.dataset.favorite) {
    e.stopPropagation();
    favorite(b.dataset.favorite);
    return;
  }
  if (b.dataset.detail) {
    showDetail(b.dataset.detail);
    return;
  }
  if (b.dataset.visit) {
    showVisit(b.dataset.visit);
    return;
  }
  if (b.dataset.edit) {
    showEditor(b.dataset.edit);
    return;
  }
  if (b.dataset.hide) {
    const s = spotById(b.dataset.hide);
    if (
      confirm(
        `${s.name}を候補から非表示にします。思い出とお気に入りは残ります。`,
      ) &&
      save(deleteSpot(state, s.id))
    ) {
      $("detail-dialog").close();
      notice("候補から非表示にしました。思い出は残っています。");
    }
    return;
  }
  if (b.dataset.restore) {
    const s = spotById(b.dataset.restore);
    if (save(restoreSpot(state, s.id))) {
      showDetail(s.id);
      notice("候補に戻しました。");
    }
    return;
  }
  if (b.dataset.purge) {
    const s = spotById(b.dataset.purge);
    if (
      confirm(
        `${s.name}の訪問記録${visitCount(state, s.id)}件・お気に入りを含め完全に削除します。この操作は戻せません。`,
      ) &&
      confirm("家族の思い出も完全に削除してよいですか？") &&
      save(purgeSpot(state, s.id))
    ) {
      $("detail-dialog").close();
      notice("完全に削除しました。");
    }
    return;
  }
  if (b.dataset.category) {
    criteria.mainCategory =
      criteria.mainCategory === b.dataset.category ? "any" : b.dataset.category;
    criteria.subcategories = [];
    criteria.tags = [];
    criteria.camping = {};
    criteria.fishing = {};
    criteria.sauna = {};
    refreshSearch();
    return;
  }
  if (b.dataset.subcategory) {
    toggleArray("subcategories", b.dataset.subcategory);
    criteria.tags = [];
    criteria.camping = {};
    criteria.fishing = {};
    criteria.sauna = {};
    refreshSearch();
    return;
  }
  if (b.dataset.tag) {
    toggleArray("tags", b.dataset.tag);
    refreshSearch();
    return;
  }
  if (b.dataset.season) {
    toggleArray("seasons", b.dataset.season);
    refreshSearch();
    return;
  }
  if (b.dataset.suggestion !== undefined) {
    criteria = defaults();
    suggestions[Number(b.dataset.suggestion)][1]();
    $("query").value = criteria.query;
    $("sort").value = "recommended";
    refreshSearch();
    return;
  }
  if (b.dataset.remove) {
    const key = b.dataset.remove;
    if (["subcategories", "tags", "seasons"].includes(key))
      criteria[key] = criteria[key].filter((v) => v !== b.dataset.value);
    else if (key.includes(".")) {
      const [g, k] = key.split(".");
      delete criteria[g][k];
    } else if (key === "mainCategory") {
      criteria.mainCategory = "any";
      criteria.subcategories = [];
      criteria.tags = [];
      criteria.camping = {};
      criteria.fishing = {};
      criteria.sauna = {};
    } else criteria[key] = defaults()[key];
    $("query").value = criteria.query;
    if (key === "famousPriority") $("sort").value = criteria.sort;
    refreshSearch();
    return;
  }
  if (b.dataset.step !== undefined && captureEditor()) {
    editStep = Number(b.dataset.step);
    renderEditor();
  }
});
document.addEventListener("keydown", (e) => {
  const card = e.target.closest(".spot-card");
  if (card && e.target === card && ["Enter", " "].includes(e.key)) {
    e.preventDefault();
    showDetail(card.dataset.detail);
  }
});
document.addEventListener("change", (e) => {
  const input = e.target;
  if (input.dataset.condition) {
    const path = input.dataset.condition.split(".");
    if (path.length === 2) criteria[path[0]][path[1]] = input.value;
    else
      criteria[path[0]] =
        input.type === "checkbox" ? input.checked : input.value;
    refreshSearch({ controls: false });
  }
  if (input.dataset.feature) {
    const [g, k] = input.dataset.feature.split(".");
    if (input.checked) criteria[g][k] = true;
    else delete criteria[g][k];
    refreshSearch({ controls: false });
  }
  if (input.dataset.path === "mainCategory" && captureEditor()) {
    editDraft.subcategories = [];
    renderEditor();
  }
});
$("editor-next").addEventListener("click", () => {
  if (captureEditor()) {
    editStep++;
    renderEditor();
  }
});
$("editor-prev").addEventListener("click", () => {
  if (captureEditor()) {
    editStep--;
    renderEditor();
  }
});
$("editor-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (editStep !== 2) {
    if (captureEditor()) {
      editStep++;
      renderEditor();
    }
    return;
  }
  if (!captureEditor()) return;
  const s = editDraft;
  s.category = taxonomy[s.mainCategory].label;
  s.cost = s.price.free === true ? 0 : s.price.family4Typical;
  s.travel.car = s.travel.carMinutes;
  s.travel.train = s.travel.trainMinutes;
  s.stays = [...s.stayDuration];
  s.rainy = s.weather.includes("rainy") || s.weather.includes("indoor");
  s.type = s.weather.includes("indoor")
    ? "indoor"
    : s.weather.includes("sunny")
      ? "outdoor"
      : s.type;
  s.bbq = s.camping?.bbq ?? s.bbq;
  const archived =
    isArchived(s.id) && allSpots(state).some((x) => x.id === s.id);
  const key = archived ? "archivedSpots" : "spots",
    existing = state[key].some((x) => x.id === s.id);
  const next = {
    ...state,
    [key]: existing
      ? state[key].map((x) => (x.id === s.id ? s : x))
      : [...state[key], s],
  };
  if (save(next)) {
    $("editor-dialog").close();
    notice("スポットを保存しました。");
  }
});
$("visit-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target,
    visit = {
      id: "visit-" + crypto.randomUUID(),
      spotId: visitId,
      date: form.elements.date.value,
      rating: Number(form.elements.rating.value),
      comment: form.elements.comment.value,
      intention: form.elements.intention.value,
    };
  if (save({ ...state, visits: [...state.visits, visit] })) {
    $("visit-dialog").close();
    notice("この日の思い出を保存しました。");
  }
});
$("export").addEventListener("click", () => {
  const data = storageUnreadable
      ? localStorage.getItem(storageKey)
      : JSON.stringify(validateState(state), null, 2),
    blob = new Blob([data], { type: "application/json" }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download =
    "family-outing-backup-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$("import").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > 10 * 1024 * 1024)
      throw Error("10MB以下のJSONを選んでください。");
    const text = await file.text(),
      parsed = JSON.parse(text),
      next = prepareState(parsed);
    if (
      !confirm(
        `現在のデータを読み込むバックアップに置き換えます。${next.spots.length}件の候補と${next.visits.length}件の思い出を読み込みます。事前の書き出しをおすすめします。`,
      )
    )
      return;
    if (parsed.version < 3) backupBeforeV3(localStorage, text);
    if (save(next, { restoring: true }))
      notice("バックアップを読み込みました。");
  } catch (error) {
    notice(
      error.message || "読み込めませんでした。元データは変更していません。",
    );
  } finally {
    e.target.value = "";
  }
});
document.querySelector(".brand").addEventListener("click", (e) => {
  e.preventDefault();
  showView("search");
});
for (const dialog of document.querySelectorAll("dialog"))
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  });
renderAll();

installPicker({
  getState: () => state,
  getCriteria: () => criteria,
  renderCard: cardFor,
  showDetail,
});

installPwa();

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-reset-search]")) $("clear").click();
});
