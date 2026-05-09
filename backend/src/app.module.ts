import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { DrizzleModule } from './drizzle/drizzle.module';
import { SiteModule } from './site/site.module';
import { GebruikerModule } from './gebruiker/gebruiker.module';
import { NotificatieModule } from './notificaties/notificatie.module';
import { TaakModule } from './taken/taak.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LoggerMiddleware } from './lib/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { MachineModule } from 'machine/machine.module';

@Module({
  imports: [
    DrizzleModule,
    SiteModule,
    MachineModule,
    GebruikerModule,
    NotificatieModule,
    TaakModule,
    AuthModule,
    SessionModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}
