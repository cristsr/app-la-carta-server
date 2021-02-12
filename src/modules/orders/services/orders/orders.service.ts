import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from '@modules/orders/dto/update-order.dto';
import { FcmService } from '@modules/orders/services/fcm/fcm.service';

@Injectable()
export class OrdersService {
  constructor(private fcm: FcmService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.fcm.sendMessage();
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
