import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { sites } from '../../src/drizzle/schema';

export const SITES_SEED = [
  {
    id: 1,
    name: 'Loon',
    rating: 5,
  },
  {
    id: 2,
    name: 'Benzine',
    rating: 2,
  },
  {
    id: 3,
    name: 'Irish pub',
    rating: 4,
  },
];

export async function seedSites(drizzle: DatabaseProvider) {
  await drizzle.insert(sites).values(SITES_SEED);
}

export async function clearSites(drizzle: DatabaseProvider) {
  await drizzle.delete(sites);
}
