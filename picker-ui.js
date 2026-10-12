import { taxonomy } from "./taxonomy.js";
import { pickerPool, drawSpot, hasSearchCondition } from "./picker.js";
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function installPicker({
  getState,
  getCriteria,
  renderCard,
  showDetail,
}) {
  const dialog = document.getElementById("picker-dialog"),
    content = document.getElementById("picker-content");
  let mode = "choice",
    lists = ["favorites"],
    previousId = null,
    busy = false,
    timer = null,
    selected = null;
  const pool = () => pickerPool(getState(), getCriteria(), mode, lists);
  function render() {
    if (mode === "choice") {
      content.innerHTML = `<p class="eyebrow">A LITTLE SURPRISE</p><h2 id="picker-title">今日はどうやって決める？</h2><p class="muted">候補を絞って、最後は楽しく。</p><div class="picker-options"><button data-picker-mode="conditional">🎲 条件付きおまかせ<small>今の条件から、またはカテゴリから</small></button><button data-picker-mode="lists">❤️ マイリストルーレット<small>家族の気になる場所から</small></button></div>`;
      return;
    }
    if (mode === "conditional") {
      const count = pickerPool(getState(), getCriteria(), "current").spots
        .length;
      content.innerHTML = `<h2 id="picker-title">🎲 条件付きおまかせ</h2><div class="picker-options"><button data-picker-mode="current">今の検索条件からおまかせ<small>この条件に合う${count}スポット</small></button><button data-picker-mode="category">カテゴリからおまかせ<small>共通条件を使って、何をするかから決める</small></button></div><button class="quiet" data-picker-back>← 選び方に戻る</button>`;
      return;
    }
    const p = pool(),
      categoryCount = new Set(p.spots.map((s) => s.mainCategory)).size;
    const empty =
      mode === "lists"
        ? "家族の候補がありません。対象リストを選ぶか、お気に入りや訪問記録を見直してみてください。"
        : "この条件では候補がありません。条件を少しゆるめてみてください";
    const allowed = mode !== "current" || hasSearchCondition(getCriteria());
    content.innerHTML = `<h2 id="picker-title">${mode === "lists" ? "❤️ マイリストルーレット" : mode === "category" ? "🎲 カテゴリからおまかせ" : "🎲 今の検索条件からおまかせ"}</h2>
      ${
        mode === "lists"
          ? `<div class="picker-lists">${[
              ["favorites", "♡ お気に入り"],
              ["again", "❤️ また行きたい"],
              ["unvisited", "✨ まだ行ってない"],
            ]
              .map(
                ([key, label]) =>
                  `<label><input type="checkbox" data-picker-list="${key}" ${lists.includes(key) ? "checked" : ""}>${label}</label>`,
              )
              .join(
                "",
              )}</div><p class="form-note">複数選択はまとめて抽選。非表示の施設は対象外です。</p>`
          : mode === "category"
            ? `<p class="form-note">移動時間・予算・駐車場・天候・季節・地域などの共通条件を使用。キーワードとカテゴリ専用条件は使いません。</p>`
            : ""
      }
      <p class="picker-count">${mode === "lists" ? "家族の候補" : "この条件に合う"}${p.spots.length}スポットから選びます${mode === "category" ? `（${categoryCount}カテゴリ）` : ""}</p>
      ${!p.spots.length ? `<p class="picker-empty">${empty}</p>` : !allowed ? `<p class="picker-empty">まず検索条件を1つ以上選んでください。何をするか迷ったら「カテゴリからおまかせ」へ。</p>` : ""}
      <div id="picker-stage" class="picker-stage" hidden></div><div id="picker-result" aria-live="polite"></div>
      <div class="picker-actions"><button class="primary" id="picker-draw" ${!p.spots.length || !allowed ? "disabled" : ""}>🎯 選んでみる</button><button class="quiet" data-picker-back>← 選び方に戻る</button></div>`;
  }
  function stop() {
    clearTimeout(timer);
    busy = false;
  }
  function draw() {
    if (busy) return;
    const p = pool();
    if (mode === "current" && !hasSearchCondition(getCriteria())) return;
    const result = drawSpot(p.spots, {
      category: mode === "category",
      previousId,
    });
    if (!result) {
      render();
      return;
    }
    busy = true;
    selected = result.spot;
    content
      .querySelectorAll("button,input")
      .forEach((el) => (el.disabled = true));
    const stage = document.getElementById("picker-stage"),
      output = document.getElementById("picker-result");
    output.innerHTML = "";
    stage.hidden = false;
    const finish = () => {
      if (!dialog.open) return;
      previousId = selected.id;
      busy = false;
      stage.hidden = true;
      const reasons =
        mode === "category"
          ? { ...p.criteria, mainCategory: result.category }
          : p.criteria;
      output.innerHTML = `<p class="picker-celebrate">🎉 今日のおでかけは…</p>${mode === "category" ? `<p class="picker-category">${taxonomy[result.category].icon} ${taxonomy[result.category].label}！</p>` : ""}${mode !== "lists" ? `<p class="form-note">選ばれた理由はカードの ✓ でチェック</p>` : ""}<div class="picker-winner">${renderCard(selected, reasons)}</div><button class="primary" id="picker-detail">この場所を見る</button>`;
      content
        .querySelectorAll("button,input")
        .forEach((el) => (el.disabled = false));
      document.getElementById("picker-draw").textContent = "もう一回！";
      output.scrollIntoView({ behavior: "auto", block: "nearest" });
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    let frame = 0;
    const tick = () => {
      if (!dialog.open) {
        stop();
        return;
      }
      const categoryPhase = mode === "category" && frame < 4;
      const label = categoryPhase
        ? frame === 3
          ? result.category
          : result.categories[frame % result.categories.length]
        : null;
      stage.innerHTML = `<p>${categoryPhase ? "🎲 今日は何する？" : "🎯 今日のおでかけは…"}</p><strong>${categoryPhase ? `${taxonomy[label].icon} ${escape(taxonomy[label].label)}${frame === 3 ? "！" : ""}` : escape(result.candidates[frame % result.candidates.length].name)}</strong>`;
      frame++;
      timer = setTimeout(frame >= 8 ? finish : tick, 250);
    };
    tick();
  }
  document.getElementById("picker-open").addEventListener("click", () => {
    stop();
    mode = "choice";
    previousId = null;
    selected = null;
    render();
    dialog.showModal();
  });
  dialog.addEventListener("close", stop);
  content.addEventListener("change", (event) => {
    const key = event.target.dataset.pickerList;
    if (!key || busy) return;
    lists = event.target.checked
      ? [...new Set([...lists, key])]
      : lists.filter((k) => k !== key);
    selected = null;
    render();
  });
  content.addEventListener("click", (event) => {
    const b = event.target.closest("button");
    if (!b || busy) return;
    if (b.dataset.pickerMode) {
      mode = b.dataset.pickerMode;
      selected = null;
      render();
    } else if (b.hasAttribute("data-picker-back")) {
      mode = "choice";
      selected = null;
      render();
    } else if (b.id === "picker-draw") draw();
    else if (b.id === "picker-detail" && selected) {
      const id = selected.id;
      dialog.close();
      showDetail(id);
    }
  });
}
