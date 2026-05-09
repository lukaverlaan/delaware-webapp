export class CreateSiteRequestDTO {
  id!: number;
  capaciteit!: number | null;
  locatie!: string | null;
  naam!: string | null;
  operationeleStatus!: string | null;
  productieStatus!: string | null;
}

export class SiteResponseDto extends CreateSiteRequestDTO {}

export class SiteListResponseDto {
  items!: SiteResponseDto[];
}
