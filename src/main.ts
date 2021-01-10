import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';

function listRoutes(app: INestApplication) {
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: [] = router?.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0]?.method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);

  Logger.log('API list:', 'Bootstrap');
  console.table(availableRoutes);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppModule.port || 3000);
  listRoutes(app);
}
bootstrap();
