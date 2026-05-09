import { Module } from '@nestjs/common';
import { GebruikerService } from './gebruiker.service';
import { GebruikerController } from './gebruiker.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [GebruikerService],
  controllers: [GebruikerController],
})
export class GebruikerModule {}
