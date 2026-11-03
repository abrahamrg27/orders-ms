import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderPaginationDto } from './dto/order-pagination.dto.js';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({ data: createOrderDto });
  }

  async findAll(paginationDto: OrderPaginationDto) {
    const { page = 1, limit = 10, status } = paginationDto;
    const where = status ? { status } : undefined;

    const [totalOrders, orders] = await this.prisma.$transaction([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: orders,
      meta: {
        total: totalOrders,
        page,
        lastPage: Math.ceil(totalOrders / limit),
      },
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new RpcException({
        status: 404,
        message: `Order with ID ${id} not found`,
      });
    }

    return order;
  }

  changeSOrderStatus() {}
}