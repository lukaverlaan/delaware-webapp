import { Module } from '@nestjs/common';
import { NotificatieController } from './notificatie.controller';
import { NotificatieService } from './notificatie.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [NotificatieController],
  providers: [NotificatieService],
  exports: [NotificatieService],
})
export class NotificatieModule {}
