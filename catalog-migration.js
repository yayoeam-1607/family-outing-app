import { upgradeSpot } from "./spot-schema.js";
// 保存データを破壊せず、ユーザーの編集・非表示を優先する。
export function migrateCatalogue(state, catalogue, revision) {
  const ids = new Set(catalogue.map((s) => s.id));
  if (
    catalogue.length < 100 ||
    ids.size !== catalogue.length ||
    catalogue.some(
      (s) => typeof s.id !== "string" || !s.id.startsWith("place-"),
    )
  )
    throw Error("固定ID付き100件以上が揃うまで移行できません。");
  const removedBuiltinIds = [...(state.removedBuiltinIds ?? [])],
    archivedSpots = (state.archivedSpots ?? []).map(upgradeSpot),
    active = [];
  for (const s of state.spots) {
    const spot = upgradeSpot(s);
    if (s.sample || s.source === "legacy" || removedBuiltinIds.includes(s.id)) {
      if (!archivedSpots.some((x) => x.id === s.id))
        archivedSpots.push({
          ...spot,
          source: s.sample ? "legacy" : spot.source,
          sample: false,
        });
    } else active.push({ ...spot, sample: false });
  }
  for (const spot of [...active, ...archivedSpots])
    if (ids.has(spot.id) && spot.source !== "builtin")
      throw Error(
        "初期スポットと登録スポットのIDが衝突しています。元データは変更していません。",
      );
  for (const s of catalogue)
    if (
      !active.some((x) => x.id === s.id) &&
      !archivedSpots.some((x) => x.id === s.id)
    ) {
      if (removedBuiltinIds.includes(s.id))
        archivedSpots.push(structuredClone(s));
      else active.push(structuredClone(s));
    }
  return {
    ...state,
    version: 3,
    catalogRevision: revision,
    spots: active,
    archivedSpots,
    removedBuiltinIds,
    favorites: [...state.favorites],
    visits: structuredClone(state.visits),
  };
}
