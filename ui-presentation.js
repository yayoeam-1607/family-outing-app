// UI-only labels derived from existing data; no new recommendation scoring.
export function spotBadges(spot, transport = "car") {
  const badges = [];
  const minutes =
    spot.travel?.[transport === "train" ? "trainMinutes" : "carMinutes"];
  if (minutes != null && minutes <= 30)
    badges.push({ text: "30分以内の目安", kind: "near" });
  if (spot.weather?.includes("rainy"))
    badges.push({ text: "雨の日OK", kind: "rain" });
  return badges;
}

const glyphs = {
  outdoor: '<path d="m32 13-13 22h26Zm0 14-18 22h36ZM32 49v13M14 65h37"/>',
  shopping: '<path d="M16 27h32l4 35H12ZM24 28V18a8 8 0 0 1 16 0v10"/>',
  animals:
    '<path d="M17 40c-8 2-7 17 3 18 4 1 7-4 12-4s8 5 12 4c10-1 11-16 3-18-7-2-9-12-15-12S24 38 17 40Z"/><ellipse cx="15" cy="24" rx="5" ry="8"/><ellipse cx="27" cy="15" rx="5" ry="8"/><ellipse cx="41" cy="16" rx="5" ry="8"/><ellipse cx="52" cy="28" rx="5" ry="8"/>',
  leisure:
    '<circle cx="32" cy="29" r="20"/><circle cx="32" cy="29" r="4"/><path d="M32 9v16M12 29h16M36 29h16M32 33v16M18 15l11 11M35 32l11 11M46 15 35 26M29 32 18 43M32 29 18 66M32 29 46 66M13 66h38"/>',
  indoor:
    '<path d="M10 36 24 22l15 14v26H10ZM35 19l14-10 14 10v23H42M18 46h10v16M45 21h9v10"/>',
  learning:
    '<path d="M25 9h14M28 9v24L14 58q-2 7 5 7h26q7 0 5-7L36 33V9M21 46h22"/><circle cx="30" cy="54" r="2"/><circle cx="37" cy="59" r="2"/>',
  activity:
    '<ellipse cx="30" cy="26" rx="17" ry="23" transform="rotate(25 30 26)"/><path d="m23 45-9 23M19 18l25 12M17 28l24 12M30 8 19 40M40 13 30 46"/>',
  relax:
    '<path d="M10 39h44l-6 23H17ZM7 39h50M23 32c-11-9 9-12-1-23M34 29c-11-9 9-12-1-23M44 32c-11-9 9-12-1-23"/>',
  sightseeing:
    '<path d="M10 60h46M12 60V35h12v25M26 60V23h14v37M44 60V42h10v18M32 23V8M27 12h10"/>',
  nature:
    '<path d="M32 66V33M32 40Q7 42 10 16q25 0 22 24ZM32 47q26 1 22-24-24 1-22 24Z"/>',
};
export function categoryGlyph(category) {
  return `<svg viewBox="0 0 68 76" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${glyphs[category] ?? glyphs.nature}</svg>`;
}
// Decorative category art is intentionally labelled: it is not a photograph of the venue.
const artPositions = {outdoor:[0,0], shopping:[1,0], leisure:[0,1], animals:[1,1], indoor:[0,2], learning:[1,2], activity:[0,3], relax:[1,3], sightseeing:[0,4], nature:[1,4]};
export function categoryArtwork(category) {
  const [x,y] = artPositions[category] ?? artPositions.nature;
  return `<div class="card-visual category-scene" style="--scene-x:${x*100}%;--scene-y:${y*25}%" aria-hidden="true"><span class="scene-caption">カテゴリのイメージ</span></div>`;
}
