import {
  Order,
  OrderStatus,
  OrderType,
  PaymentMethod,
} from 'generated/prisma/client';

export class OrderPresenter {
  id: string;
  orderCode: string;
  type: OrderType;
  paymentMethod: PaymentMethod;
  status: OrderStatus;

  constructor({ id, orderCode, type, paymentMethod, status }: Order) {
    this.id = id;
    this.orderCode = orderCode;
    this.type = type;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }
}
