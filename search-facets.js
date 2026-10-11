import { taxonomy, tagsFor } from "./taxonomy.js";
import { searchResults } from "./store.js";

// 各候補を単独で選んだ場合の実件数。同じ階層のOR条件は除いて数える。
export function searchFacets(state, criteria) {
  const cat = taxonomy[criteria.mainCategory];
  if (!cat) return { subcategories: [], tags: [] };
  const count = (c) => searchResults(state, c).length;
  const subcategories = cat.subs.map((value) => ({
    value,
    count: count({
      ...criteria,
      subcategories: [value],
      tags: [],
      camping: {},
      fishing: {},
      sauna: {},
    }),
    selected: criteria.subcategories.includes(value),
  }));
  const tags = [
    ...new Set([
      ...tagsFor(criteria.mainCategory, criteria.subcategories),
      ...criteria.tags,
    ]),
  ].map((value) => ({
    value,
    count: count({ ...criteria, tags: [value] }),
    selected: criteria.tags.includes(value),
  }));
  return { subcategories, tags };
}
