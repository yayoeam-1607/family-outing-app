import test from 'node:test';
import assert from 'node:assert/strict';
import { spots, filterSpots } from '../spots.js';
const base = { weather: 'any', travel: '120', transport: 'car', budget: 'any', stay: '4' };
test('サンプルは10件、IDは一意', () => {
  assert.equal(spots.length, 10);
  assert.equal(new Set(spots.map(s => s.id)).size, 10);
});
test('雨・30分・無料・2時間をすべて満たす候補', () => {
  assert.deepEqual(filterSpots({ ...base, weather: 'rainy', travel: '30', budget: '0', stay: '2' }).map(s => s.id), [5]);
});
test('車と電車の移動時間で候補が変わる', () => {
  const criteria = { ...base, travel: '30', stay: '2' };
  assert.deepEqual(filterSpots(criteria).map(s => s.id), [1, 2, 5, 6]);
  assert.deepEqual(filterSpots({ ...criteria, transport: 'train' }).map(s => s.id), [1, 2, 5, 9]);
});
test('予算の境界値を含め、晴れは屋内も候補に含める', () => {
  assert.deepEqual(filterSpots({ ...base, weather: 'sunny', budget: '4000' }).map(s => s.id), [1, 2, 3, 10]);
});
test('1日の候補と候補ゼロ', () => {
  assert.deepEqual(filterSpots({ ...base, stay: '8' }).map(s => s.id), [3, 8, 10]);
  assert.deepEqual(filterSpots({ ...base, weather: 'rainy', stay: '8' }), []);
});
