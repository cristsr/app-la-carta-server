import {
  Injectable,
  Logger,
  Request,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateOrderDto } from '@modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from '@modules/orders/dto/update-order.dto';
import { Order, OrderDocument } from '@modules/orders/entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseOrderDto } from '@modules/orders/dto/response-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const totalPrice = createOrderDto.order
      .map((order) => order.price * order.quantity)
      .reduce((state: number, order: number) => state + order, 0);

    const orderRecord: any = await this.orderModel
      .create({
        userId: createOrderDto.userId,
        tableId: createOrderDto.tableId,
        order: createOrderDto.order,
        totalPrice,
      })
      .then((record: OrderDocument) =>
        record.populate({ path: 'tableId' }).execPopulate(),
      )
      .catch((e) => {
        throw new UnprocessableEntityException(e.message);
      });

    const orderResponse: ResponseOrderDto = {
      id: orderRecord.id,
      table: orderRecord.tableId.name,
      order: orderRecord.order,
      isCompleted: orderRecord.isCompleted,
      totalPrice,
    };

    Logger.log(orderResponse, 'Order created');

    this.eventEmitter.emit('order.created', orderResponse, orderRecord.userId);
    return orderResponse;
  }

  findAll(userId: string) {
    return this.orderModel.find({
      userId,
    });
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
