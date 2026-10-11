import { spots, filterSpots } from './spots.js';

const form = document.querySelector('#search-form');
const results = document.querySelector('#results');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty');
const money = new Intl.NumberFormat('ja-JP');

function render(items, transport, searched = false) {
  count.textContent = searched ? `条件に合うスポットが ${items.length} 件見つかりました` : `まずは ${items.length} 件のスポットから、週末のヒントを。`;
  results.replaceChildren();
  empty.hidden = items.length > 0;
  for (const spot of items) {
    const card = document.createElement('article');
    card.className = 'card';
    // 表示内容は、このリポジトリ内の固定サンプルデータのみ。
    card.innerHTML = `
      <div class="card-art ${spot.color}"><span class="type-badge">${spot.type === 'indoor' ? '☂ 屋内' : '☀ 屋外'}</span><span class="spot-icon" aria-hidden="true">${spot.icon}</span><span class="art-dot dot-one"></span><span class="art-dot dot-two"></span></div>
      <div class="card-body"><h3>${spot.name}</h3><p class="description">${spot.description}</p>
        <div class="card-facts"><span>👛 ${spot.cost === 0 ? '無料' : `${money.format(spot.cost)}円`}</span><span>${transport === 'car' ? '🚗 車' : '🚃 電車'} 約${spot.travel[transport]}分</span></div>
        <div class="rating"><span>子ども向け度</span><span class="stars" aria-label="5段階中${spot.rating}">${'★'.repeat(spot.rating)}<span class="muted-stars">${'★'.repeat(5 - spot.rating)}</span></span></div>
      </div>`;
    results.append(card);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const conditions = Object.fromEntries(new FormData(form));
  render(filterSpots(conditions), conditions.transport, true);
  document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
render(spots, form.elements.transport.value);
