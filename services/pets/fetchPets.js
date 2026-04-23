import { petList } from '../../model/pets';

export function fetchPets(page, pageSize, statusFilter) {
  const { delay } = require('../_utils/delay');
  return delay().then(() => {
    const filtered = statusFilter === '全部'
      ? petList
      : petList.filter((p) => p.status === statusFilter);
    const start = page * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return { items, hasMore: start + pageSize < filtered.length };
  });
}

export function fetchPetById(id) {
  const { delay } = require('../_utils/delay');
  return delay().then(() => petList.find((p) => p.id === id) || null);
}
