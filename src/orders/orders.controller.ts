import {
  Controller,
  NotImplementedException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderPaginationDto } from './dto/order-pagination.dto.js';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() paginationDto: OrderPaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  update(@Payload() id: number) {
    //return this.ordersService.changeOrderStatus(id);
    throw new NotImplementedException();
  }
}