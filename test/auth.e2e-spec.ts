import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    // const server = app.getHttpServer();
    //
    // const router = server._events.request._router;
    //
    // const availableRoutes: [] = router.stack
    //   .map((layer) => {
    //     if (layer.route) {
    //       return {
    //         route: {
    //           path: layer.route?.path,
    //           method: layer.route?.stack[0].method,
    //         },
    //       };
    //     }
    //   })
    //   .filter((item) => item !== undefined);
    //
    // console.log(availableRoutes);

    return request(app.getHttpServer()).post('/auth/register').expect(200);
    // .expect('Hello World!');
  });
});
