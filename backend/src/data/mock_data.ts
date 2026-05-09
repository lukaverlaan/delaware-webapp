export interface Site {
  id: number;
  naam: string;
  locatie: string;
}

export const SITES: Site[] = [
  {
    id: 1,
    naam: 'Delaware Gent',
    locatie: 'Gent',
  },
  {
    id: 2,
    naam: 'Delaware Brugge',
    locatie: 'Brugge',
  },
  {
    id: 3,
    naam: 'Delaware Antwerpen',
    locatie: 'Antwerpen',
  },
];
