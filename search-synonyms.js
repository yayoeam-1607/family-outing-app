export const searchSynonyms = {
  コインゲーム: ["コインゲーム", "メダルゲーム"],
  クレーンゲーム: [
    "クレーンゲーム",
    "UFOキャッチャー",
    "プライズゲーム",
    "プライズ",
  ],
  キッズ施設: ["キッズ施設", "キッズパーク", "子ども遊び場", "室内遊び場"],
};
const entries = Object.entries(searchSynonyms).flatMap(([canonical, aliases]) =>
  aliases.map((alias) => [alias.normalize("NFKC").toLowerCase(), canonical]),
);
const canonical = new Map(entries);
const pattern = new RegExp(
  entries
    .map(([alias]) => alias)
    .sort((a, b) => b.length - a.length)
    .join("|"),
  "g",
);
export function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(pattern, (alias) => canonical.get(alias));
}
