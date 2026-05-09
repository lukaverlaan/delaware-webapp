export class CreateTaakRequestDto {
  type!: string;
  duurtijd!: number | null;
  omschrijving!: string | null;
  status!: string | null;
  medewerkerId!: number | null;
  datum!: string | null;
}

export class UpdateTaakRequestDto {
  type!: string;
  duurtijd!: number | null;
  omschrijving!: string | null;
  status!: string | null;
  medewerkerId!: number | null;
  datum!: string | null;
}

export class TaakResponseDto {
  id!: number;
  type!: string;
  duurtijd!: number | null;
  omschrijving!: string | null;
  status!: string | null;
  datum!: string | null;

  medewerker!: {
    id: number;
    naam: string | null;
  } | null;
}

export class TaakListResponseDto {
  items!: TaakResponseDto[];
}
