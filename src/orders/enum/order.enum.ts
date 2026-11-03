import { OrderStatus } from '../../generated/prisma/enums.js';

export const OrderStatusList = [
  OrderStatus.PENDING,
  OrderStatus.PROCESING,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELED,
];