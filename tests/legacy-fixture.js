import { spots } from '../spots.js';

// 公開カタログから独立した旧v1バックアップ。旧データ互換の回帰検証用。
export function legacyState() {
  return { version: 1, spots: structuredClone(spots), favorites: [], visits: [] };
}
