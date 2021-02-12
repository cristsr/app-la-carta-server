import { Module } from '@nestjs/common';
import { OrdersController } from '@modules/orders/controllers/orders.controller';
import { OrdersService } from '@modules/orders/services/orders/orders.service';
import { FcmService } from '@modules/orders/services/fcm/fcm.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, FcmService],
})
export class OrdersModule {}
