import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { Public } from '@modules/auth/decorators/public';
import { OrdersService } from '@modules/orders/services/orders/orders.service';
import { CreateOrderDto } from '@modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from '@modules/orders/dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('isCompleted') isCompleted: boolean | undefined,
  ) {
    if (typeof isCompleted === 'undefined') {
      throw new BadRequestException(
        'El parametro de busqueda isCompleted es requerido.',
      );
    }

    return this.ordersService.findAll(req.user._id, isCompleted);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.ordersService.remove(id);
  }
}
