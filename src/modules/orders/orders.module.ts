import { Module } from '@nestjs/common';
import { OrdersController } from '@modules/orders/controllers/orders.controller';
import { OrdersService } from '@modules/orders/services/orders/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '@modules/orders/entities/order.entity';
import { OrdersGateway } from '@modules/orders/gateways/orders.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from '@config/config-keys';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(CONFIG.JWT_SECRET_KEY),
        signOptions: {
          expiresIn: configService.get(CONFIG.JWT_EXPIRATION_TIME),
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway],
})
export class OrdersModule {}
