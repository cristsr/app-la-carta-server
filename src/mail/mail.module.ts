import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from '@config/config-keys';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.googlemail.com',
          auth: {
            user: config.get(CONFIG.GMAIL),
            pass: config.get(CONFIG.GMAIL_PASSWORD),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
