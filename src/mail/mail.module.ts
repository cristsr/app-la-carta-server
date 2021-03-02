import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      transport: {
        host: 'smtp.googlemail.com',
        port: 465,
        auth: {
          user: '',
          pass: 'pass',
        },
      },
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
