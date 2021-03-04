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
        defaults: {
          from: '"No Reply" <noreply@asdasd.com>',
        },
        transport: {
          host: 'smtp.googlemail.com',
          auth: {
            user: config.get(CONFIG.GMAIL),
            pass: config.get(CONFIG.GMAIL_PASSWORD),
          },
        },
        template: {
          dir: join(__dirname, 'templates'),

          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],

      // defaults: {
      //   from: '"nest-modules" <modules@nestjs.com>',
      // },
    }),
  ],
})
export class MailModule {}
