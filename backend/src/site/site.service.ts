import { Injectable, NotFoundException } from '@nestjs/common';
import { SiteListResponseDto, SiteResponseDto } from './site.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { sites } from '../drizzle/schema';

@Injectable()
export class SiteService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<SiteListResponseDto> {
    const items = await this.db.query.sites.findMany();
    return { items };
  }

  async getById(id: number): Promise<SiteResponseDto> {
    const site = await this.db.query.sites.findFirst({
      where: eq(sites.id, id),
    });

    if (!site) {
      throw new NotFoundException('Er is geen site met dit ID');
    }

    return site;
  }

  async getByName(naam: string): Promise<SiteResponseDto> {
    const site = await this.db.query.sites.findFirst({
      where: eq(sites.naam, naam),
    });

    if (!site) {
      throw new NotFoundException('Er is geen site met deze naam');
    }

    return site;
  }
}
