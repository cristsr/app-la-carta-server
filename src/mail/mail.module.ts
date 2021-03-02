import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      transport: {
        auth: {
          user: 'username',
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
