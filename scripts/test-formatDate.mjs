import { formatDate } from '../src/utils/formatDate.js';

const tests = [
  '2026-01-16',                     // date-only (should be local 16/01/2026)
  '2026-01-16T00:00:00Z',           // UTC midnight (may show 15/01 in UTC-3 if converted incorrectly)
  '2026-01-16T03:00:00Z',           // UTC 03:00 (same day in UTC-3)
  '2026-01-16T00:00:00',            // local datetime without timezone
  '2026-01-16T00:00:00-03:00'       // explicit -03:00 timezone
];

console.log('Teste de formatDate');
for (const t of tests) {
  console.log(`${t} => ${formatDate(t)}`);
}
