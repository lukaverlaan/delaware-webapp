export class GebruikerResponseDto {
  id!: number;
  email!: string | null;
  voornaam!: string | null;
  naam!: string | null;
  rol!: string | null;
  status!: string | null;
  gsm!: string | null;
  personeelsnummer!: string | null;
  adres!: string | null;
}

export class GebruikerListResponseDto {
  items!: GebruikerResponseDto[];
}
