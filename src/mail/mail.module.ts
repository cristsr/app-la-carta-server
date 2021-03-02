import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from '@config/config-keys';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        transport: {
          host: 'smtp.googlemail.com',
          auth: {
            user: config.get(CONFIG.GMAIL),
            pass: config.get(CONFIG.GMAIL_PASSWORD),
          },
        },
      }),
      inject: [ConfigService],

      // defaults: {
      //   from: '"nest-modules" <modules@nestjs.com>',
      // },
      // template: {
      //   // dir: __dirname + '/templates',
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
})
export class MailModule {}
