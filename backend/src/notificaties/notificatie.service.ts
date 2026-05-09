import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificatieListResponseDto } from './notificatie.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { eq, desc } from 'drizzle-orm';
import { notificaties } from '../drizzle/schema';

@Injectable()
export class NotificatieService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(userId: number): Promise<NotificatieListResponseDto> {
    const items = await this.db.query.notificaties.findMany({
      where: eq(notificaties.gebruikerId, userId),
      orderBy: [desc(notificaties.datum)],
    });

    return { items };
  }

  async markAsRead(id: number): Promise<void> {
    const notif = await this.db.query.notificaties.findFirst({
      where: eq(notificaties.id, id),
    });

    if (!notif) {
      throw new NotFoundException('Notificatie niet gevonden');
    }

    await this.db
      .update(notificaties)
      .set({ status: 'GELEZEN' })
      .where(eq(notificaties.id, id));
  }
}
