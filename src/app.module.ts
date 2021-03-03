import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CONFIG } from '@config/config-keys';
import { TableModule } from '@modules/table/table.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    TableModule,
    OrdersModule,
    MailModule,
  ],
})
export class AppModule {
  static port: number; // app port
  constructor(private config: ConfigService) {
    AppModule.port = +config.get(CONFIG.PORT) || 3000;
  }
}
