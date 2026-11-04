import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatus } from '../../generated/prisma/enums.js';
import { OrderStatusList } from '../enum/order.enum.js';

export class ChangeOrderStatusDto {
  @IsUUID()
  id!: string;

  @IsEnum(OrderStatusList, {
    message: `valid status are ${OrderStatusList.join(', ')}`,
  })
  status!: OrderStatus;
}
