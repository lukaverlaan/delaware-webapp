import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDrizzle } from '../drizzle/drizzle.provider';
import type { DatabaseProvider } from '../drizzle/drizzle.provider';
import { gebruikers } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import {
  GebruikerResponseDto,
  GebruikerListResponseDto,
} from './gebruiker.dto';

@Injectable()
export class GebruikerService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  private mapToDto(u: typeof gebruikers.$inferSelect): GebruikerResponseDto {
    return {
      id: u.id,
      email: u.email,
      voornaam: u.voornaam,
      naam: u.naam,
      rol: u.rol,
      status: u.status,
      gsm: u.gsm,
      personeelsnummer: u.personeelsnummer,
      adres: [
        `${u.straat || ''} ${u.huisnr || ''}`.trim(),
        `${u.postcode || ''} ${u.stad || ''}`.trim(),
      ]
        .filter(Boolean)
        .join(', '),
    };
  }

  async findAll(): Promise<GebruikerListResponseDto> {
    const gebruikersList = await this.db.query.gebruikers.findMany();

    const items = gebruikersList.map((u) => this.mapToDto(u));

    return { items };
  }

  async findById(id: number): Promise<GebruikerResponseDto> {
    const gebruiker = await this.db.query.gebruikers.findFirst({
      where: eq(gebruikers.id, id),
    });

    if (!gebruiker) {
      throw new NotFoundException('Gebruiker niet gevonden');
    }

    return this.mapToDto(gebruiker);
  }
}
