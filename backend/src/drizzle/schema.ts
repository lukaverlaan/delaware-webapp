import {
  mysqlTable,
  unique,
  varchar,
  date,
  int,
  time,
  index,
  datetime,
  bigint,
  tinyint,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const gebruikers = mysqlTable(
  'gebruikers',
  {
    id: bigint('ID', { mode: 'number' }).primaryKey().autoincrement().notNull(),
    eerstelogin: tinyint('EERSTELOGIN').default(0),
    email: varchar('EMAIL', { length: 255 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    geboortedatum: date('GEBOORTEDATUM', { mode: 'string' }),
    gsm: varchar('GSM', { length: 255 }),
    naam: varchar('NAAM', { length: 255 }),
    personeelsnummer: varchar('PERSONEELSNUMMER', { length: 255 }),
    rol: varchar('ROL', { length: 255 }),
    status: varchar('STATUS', { length: 255 }),
    voornaam: varchar('VOORNAAM', { length: 255 }),
    wachtwoord: varchar('WACHTWOORD', { length: 255 }).notNull(),
    huisnr: varchar('HUISNR', { length: 255 }),
    postbus: varchar('POSTBUS', { length: 255 }),
    postcode: int('POSTCODE'),
    stad: varchar('STAD', { length: 255 }),
    straat: varchar('STRAAT', { length: 255 }),
  },
  (table) => [
    unique('EMAIL').on(table.email),
    unique('PERSONEELSNUMMER').on(table.personeelsnummer),
  ],
);

export const machines = mysqlTable('machines', {
  id: bigint('ID', { mode: 'number' }).primaryKey().autoincrement().notNull(),
  code: varchar('CODE', { length: 50 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  laatsteonderhoud: date('LAATSTEONDERHOUD', { mode: 'string' }),
  locatie: varchar('LOCATIE', { length: 255 }),
  productiestatus: varchar('PRODUCTIESTATUS', { length: 255 }),
  productinfo: varchar('PRODUCTINFO', { length: 255 }),
  status: varchar('STATUS', { length: 255 }),
  uptime: time('UPTIME'),
  siteId: bigint('SITE_ID', { mode: 'number' }).references(() => sites.id, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
  }),
});

export const machineWerknemers = mysqlTable(
  'machine_werknemers',
  {
    gebruikerId: bigint('gebruiker_id', { mode: 'number' })
      .notNull()
      .references(() => gebruikers.id, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    machineId: bigint('machine_id', { mode: 'number' })
      .notNull()
      .references(() => machines.id, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.gebruikerId, table.machineId],
    }),
  ],
);

export const notificaties = mysqlTable(
  'notificaties',
  {
    id: bigint('ID', { mode: 'number' }).primaryKey().autoincrement().notNull(),
    code: varchar('CODE', { length: 50 }),
    datum: datetime('DATUM', { mode: 'string' }),
    inhoud: varchar('INHOUD', { length: 255 }),
    status: varchar('STATUS', { length: 255 }),
    type: varchar('TYPE', { length: 255 }),
    gebruikerId: bigint('gebruiker_id', { mode: 'number' })
      .default(1)
      .notNull()
      .references(() => gebruikers.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => [index('idx_notificatie_gebruiker').on(table.gebruikerId)],
);

export const sites = mysqlTable(
  'sites',
  {
    id: bigint('ID', { mode: 'number' }).primaryKey().autoincrement().notNull(),
    capaciteit: int('CAPACITEIT'),
    locatie: varchar('LOCATIE', { length: 255 }),
    naam: varchar('NAAM', { length: 255 }),
    operationeleStatus: varchar('operationele_status', { length: 255 }),
    productieStatus: varchar('productie_status', { length: 255 }),
  },
  (table) => [unique('NAAM').on(table.naam)],
);

export const teams = mysqlTable('teams', {
  id: bigint('ID', { mode: 'number' }).primaryKey().autoincrement().notNull(),
  code: varchar('CODE', { length: 255 }),
  siteId: bigint('SITE_ID', { mode: 'number' }).references(() => sites.id, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
  }),
  verantwoordelijkeId: bigint('VERANTWOORDELIJKE_ID', {
    mode: 'number',
  }).references(() => gebruikers.id, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
  }),
});

export const teamsGebruikers = mysqlTable(
  'teams_gebruikers',
  {
    teamId: bigint('Team_ID', { mode: 'number' })
      .notNull()
      .references(() => teams.id, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    medewerkersId: bigint('medewerkers_ID', { mode: 'number' })
      .notNull()
      .references(() => gebruikers.id, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.teamId, table.medewerkersId],
    }),
  ],
);

export const machinesRelations = relations(machines, ({ one, many }) => ({
  site: one(sites, {
    fields: [machines.siteId],
    references: [sites.id],
  }),
  machineWerknemers: many(machineWerknemers),
}));

export const sitesRelations = relations(sites, ({ many }) => ({
  machines: many(machines),
  teams: many(teams),
}));

export const machineWerknemersRelations = relations(
  machineWerknemers,
  ({ one }) => ({
    gebruiker: one(gebruikers, {
      fields: [machineWerknemers.gebruikerId],
      references: [gebruikers.id],
    }),
    machine: one(machines, {
      fields: [machineWerknemers.machineId],
      references: [machines.id],
    }),
  }),
);

export const gebruikersRelations = relations(gebruikers, ({ many }) => ({
  machineWerknemers: many(machineWerknemers),
  notificaties: many(notificaties),
  teams: many(teams),
  teamsGebruikers: many(teamsGebruikers),
}));

export const notificatiesRelations = relations(notificaties, ({ one }) => ({
  gebruiker: one(gebruikers, {
    fields: [notificaties.gebruikerId],
    references: [gebruikers.id],
  }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  site: one(sites, {
    fields: [teams.siteId],
    references: [sites.id],
  }),
  gebruiker: one(gebruikers, {
    fields: [teams.verantwoordelijkeId],
    references: [gebruikers.id],
  }),
  teamsGebruikers: many(teamsGebruikers),
}));

export const teamsGebruikersRelations = relations(
  teamsGebruikers,
  ({ one }) => ({
    team: one(teams, {
      fields: [teamsGebruikers.teamId],
      references: [teams.id],
    }),
    gebruiker: one(gebruikers, {
      fields: [teamsGebruikers.medewerkersId],
      references: [gebruikers.id],
    }),
  }),
);

export const taken = mysqlTable('taken', {
  id: bigint('ID', { mode: 'number' }).primaryKey().autoincrement().notNull(),
  type: varchar('TYPE', { length: 100 }).notNull(),
  duurtijd: int('DUURTIJD'), // bv. minuten of uren
  omschrijving: varchar('OMSCHRIJVING', { length: 255 }),
  status: varchar('STATUS', { length: 100 }).default('OPEN'),
  datum: datetime('DATUM', { mode: 'string' }),
  medewerkerId: bigint('medewerker_id', { mode: 'number' }),
});

export const takenRelations = relations(taken, ({ one }) => ({
  medewerker: one(gebruikers, {
    fields: [taken.medewerkerId],
    references: [gebruikers.id],
  }),
}));
