// localStorageや既存オブジェクトを書き換えず、新しい状態を返す。
// 架空施設の記録を実在施設へ付け替えることはしない。
export function migrateCatalogue(state, catalogue, revision) {
  const ids = new Set(catalogue.map(spot => spot.id));
  if (catalogue.length < 100 || ids.size !== catalogue.length || catalogue.some(s => typeof s.id !== 'string' || !s.id.startsWith('place-'))) {
    throw Error('公式確認済みの固定ID付き100件以上が揃うまで移行できません。');
  }
  const removedBuiltinIds = state.removedBuiltinIds ?? [];
  const archivedSpots = [...(state.archivedSpots ?? [])];
  const active = [];
  for (const spot of state.spots) {
    if (spot.sample === true || spot.source === 'legacy') {
      if (!archivedSpots.some(s => s.id === spot.id)) archivedSpots.push({ ...spot, source: 'legacy', sample: false });
    } else {
      // ユーザー登録・編集した内容とIDはそのまま残す。
      active.push({ ...spot, source: spot.source ?? 'user', sample: false });
    }
  }
  for (const spot of active) {
    if (ids.has(spot.id) && spot.source !== 'builtin') throw Error('初期スポットと登録スポットのIDが衝突しています。元データは変更していません。');
  }
  for (const spot of catalogue) {
    if (!active.some(s => s.id === spot.id) && !removedBuiltinIds.includes(spot.id)) active.push({ ...structuredClone(spot), source: 'builtin', sample: false });
  }
  // 同じ改訂を再読込しても、削除や編集を戻さない。
  return { ...state, version: 2, catalogRevision: revision, spots: active, archivedSpots,
    removedBuiltinIds: [...removedBuiltinIds], favorites: [...state.favorites], visits: structuredClone(state.visits) };
}
