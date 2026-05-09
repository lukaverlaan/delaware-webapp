export class NotificatieResponseDto {
  id!: number;
  code!: string | null;
  datum!: string | null;
  inhoud!: string | null;
  status!: string | null;
  type!: string | null;
  gebruikerId!: number;
}

export class NotificatieListResponseDto {
  items!: NotificatieResponseDto[];
}
