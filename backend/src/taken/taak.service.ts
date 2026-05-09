import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  CreateTaakRequestDto,
  TaakListResponseDto,
  TaakResponseDto,
  UpdateTaakRequestDto,
} from './taak.dto';
import {
  InjectDrizzle,
  type DatabaseProvider,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { gebruikers, taken } from '../drizzle/schema';
import { JwtPayload } from '../types/auth';

@Injectable()
export class TaakService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  private canSeeAll(user: JwtPayload): boolean {
    return user.rol === 'MANAGER' || user.rol === 'ADMINISTRATOR';
  }

  async getAll(user: JwtPayload): Promise<TaakListResponseDto> {
    const baseQuery = this.db
      .select({
        id: taken.id,
        type: taken.type,
        duurtijd: taken.duurtijd,
        omschrijving: taken.omschrijving,
        status: taken.status,
        datum: taken.datum,
        medewerkerId: taken.medewerkerId,
        medewerkerVoornaam: gebruikers.voornaam,
        medewerkerNaam: gebruikers.naam,
      })
      .from(taken)
      .leftJoin(gebruikers, eq(taken.medewerkerId, gebruikers.id));

    const rows = this.canSeeAll(user)
      ? await baseQuery
      : await baseQuery.where(eq(taken.medewerkerId, user.sub));

    return {
      items: rows.map((r) => ({
        id: r.id,
        type: r.type,
        duurtijd: r.duurtijd,
        omschrijving: r.omschrijving,
        status: r.status,
        datum: r.datum,
        medewerker: r.medewerkerId
          ? {
              id: r.medewerkerId,
              naam: [r.medewerkerVoornaam, r.medewerkerNaam]
                .filter(Boolean)
                .join(' '),
            }
          : null,
      })),
    };
  }

  async getById(id: number, user?: JwtPayload): Promise<TaakResponseDto> {
    const [taak] = await this.db
      .select({
        id: taken.id,
        type: taken.type,
        duurtijd: taken.duurtijd,
        omschrijving: taken.omschrijving,
        status: taken.status,
        datum: taken.datum,
        medewerkerId: taken.medewerkerId,
        medewerkerVoornaam: gebruikers.voornaam,
        medewerkerNaam: gebruikers.naam,
      })
      .from(taken)
      .leftJoin(gebruikers, eq(taken.medewerkerId, gebruikers.id))
      .where(eq(taken.id, id));

    if (!taak) {
      throw new NotFoundException('Taak niet gevonden');
    }

    if (user && !this.canSeeAll(user) && taak.medewerkerId !== user.sub) {
      throw new ForbiddenException('Geen toegang tot deze taak');
    }

    return {
      id: taak.id,
      type: taak.type,
      duurtijd: taak.duurtijd,
      omschrijving: taak.omschrijving,
      status: taak.status,
      datum: taak.datum,
      medewerker: taak.medewerkerId
        ? {
            id: taak.medewerkerId,
            naam: [taak.medewerkerVoornaam, taak.medewerkerNaam]
              .filter(Boolean)
              .join(' '),
          }
        : null,
    };
  }

  async create(data: CreateTaakRequestDto): Promise<TaakResponseDto> {
    if (data.medewerkerId) {
      const medewerker = await this.db.query.gebruikers.findFirst({
        where: eq(gebruikers.id, data.medewerkerId),
      });

      if (!medewerker) {
        throw new NotFoundException('Medewerker niet gevonden');
      }
    }

    const result = await this.db.insert(taken).values(data);

    return this.getById(Number(result[0].insertId));
  }

  async update(
    id: number,
    data: UpdateTaakRequestDto,
  ): Promise<TaakResponseDto> {
    if (data.medewerkerId !== undefined) {
      if (data.medewerkerId !== null) {
        const medewerker = await this.db.query.gebruikers.findFirst({
          where: eq(gebruikers.id, data.medewerkerId),
        });

        if (!medewerker) {
          throw new NotFoundException('Medewerker niet gevonden');
        }
      }
    }

    await this.db.update(taken).set(data).where(eq(taken.id, id));

    return this.getById(id);
  }
}
