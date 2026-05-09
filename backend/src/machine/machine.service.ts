import { Injectable, NotFoundException } from '@nestjs/common';
import { MachineListResponseDto, MachineResponseDto } from './machine.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { machines } from '../drizzle/schema';

@Injectable()
export class MachineService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<MachineListResponseDto> {
    const items = await this.db.query.machines.findMany();
    return { items };
  }

  async getById(id: number): Promise<MachineResponseDto> {
    const machine = await this.db.query.machines.findFirst({
      where: eq(machines.id, id),
    });

    if (!machine) {
      throw new NotFoundException('Er is geen machine met dit ID');
    }

    return machine;
  }

  async getBySiteId(id: number): Promise<MachineListResponseDto> {
    const items = await this.db.query.machines.findMany({
      where: eq(machines.siteId, id),
    });

    if (!items) {
      throw new NotFoundException('Er zijn geen machines met dit site ID');
    }

    return { items };
  }
}
