import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RestJwtAuthGuard } from '@modules/auth/guards/rest-jwt-auth.guard';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CONFIG } from '@config/config-keys';
import { TableModule } from '@modules/table/table.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    TableModule,
    OrdersModule,
  ],
  providers: [
    {
      //by default each controller uses this guard
      provide: APP_GUARD,
      useClass: RestJwtAuthGuard,
    },
  ],
})
export class AppModule {
  static port: number; // app port
  constructor(private config: ConfigService) {
    AppModule.port = +config.get(CONFIG.PORT) || 3000;
  }
}
