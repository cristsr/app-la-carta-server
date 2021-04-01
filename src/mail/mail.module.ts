import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from '@config/config-keys';
import { join } from 'path';

console.log(join(__dirname, 'templates'));

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
