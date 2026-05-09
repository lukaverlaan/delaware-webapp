import { Module } from '@nestjs/common';
import { TaakController } from './taak.controller';
import { TaakService } from './taak.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [TaakController],
  providers: [TaakService],
  exports: [TaakService],
})
export class TaakModule {}
