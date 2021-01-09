import { Test, TestingModule } from '@nestjs/testing';
import {
  closeMongodConnection,
  rootMongooseTestModule,
} from '@database/mongodb-testing.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '@modules/auth/services/auth.service';
import { User, UserSchema } from '@modules/user/entities/user.entity';
import { UserModule } from '@modules/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule,
        JwtModule.register({}),
        UserModule,
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/register 200', () => {
    expect(
      controller.register({
        image: 'test',
        email: 'test',
        password: 'test',
        name: 'test',
      }),
    ).toEqual(
      Promise.resolve({
        image: 'test',
        email: 'test',
        password: 'test',
        name: 'test',
      } as User),
    );
  });

  it('/register 200 success', () => {
    expect(
      controller.register({
        image: 'test',
        email: 'test',
        password: 'test',
        name: 'test',
      }),
    ).toEqual(
      Promise.resolve({
        image: 'test',
        email: 'test',
        password: 'test',
        name: 'test',
      } as User),
    );
  });

  it('/register 400 bad request', async () => {
    jest
      .spyOn(authService, 'register')
      .mockImplementation(() => Promise.reject(new BadRequestException()));

    const response = await controller
      .register({
        image: 'test',
        email: 'fake',
        password: 'test',
        name: 'test',
      })
      .catch((e) => e);

    expect(response).toBeInstanceOf(BadRequestException);
    expect(response).toMatchObject({
      message: 'Bad Request',
      response: {
        statusCode: 400,
        message: 'Bad Request',
      },
      status: 400,
    });
  });

  afterAll(async () => {
    await closeMongodConnection();
  });
});
