export class MachineResponseDto {
  id!: number;
  code!: string | null;
  laatsteonderhoud!: string | null;
  locatie!: string | null;
  productiestatus!: string | null;
  productinfo!: string | null;
  status!: string | null;
  uptime!: string | null;
  siteId!: number | null;
}

export class CreateMachineRequestDTO extends MachineResponseDto {}

export class MachineListResponseDto {
  items!: MachineResponseDto[];
}
