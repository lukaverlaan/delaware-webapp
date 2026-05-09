import { gebruikers } from '../drizzle/schema';

export type User = typeof gebruikers.$inferInsert;
