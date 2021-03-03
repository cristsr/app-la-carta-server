import { Module } from '@nestjs/common';
import { OrdersController } from '@modules/orders/controllers/orders.controller';
import { OrdersService } from '@modules/orders/services/orders/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '@modules/orders/entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
