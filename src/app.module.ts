import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CONFIG } from '@config/config-keys';
import { TableModule } from '@modules/table/table.module';
import { OrdersModule } from '@modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  static port: number; // app port
  constructor(private config: ConfigService) {
    AppModule.port = +config.get(CONFIG.PORT) || 3000;
  }
}
