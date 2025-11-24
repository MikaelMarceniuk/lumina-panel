import {
  Customer,
  Order,
  OrderItem,
  OrderStatus,
  OrderType,
  PaymentMethod,
  Product,
} from 'generated/prisma/client';
import { OrderItemPresenter } from './order-item.presenter';
import { CustomerPresenter } from '../../customer/presenter/customer.presenter';

type OrderDetailsPresenterParams = {
  items: ({
    product: Product;
  } & OrderItem)[];
  customer: Customer | null;
} & Order;

export class OrderDetailsPresenter {
  id: string;
  orderCode: string;
  type: OrderType;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  subtotalInCents: number;
  discountInCents: number;
  totalInCents: number;
  address: string | undefined;
  complement: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zipCode: string | undefined;
  notes: string | undefined;
  createdAt: Date;
  updatedAt: Date;

  items: OrderItemPresenter[];
  customer: CustomerPresenter | undefined;

  constructor({ customer, items, ...order }: OrderDetailsPresenterParams) {
    this.id = order.id;
    this.orderCode = order.orderCode;
    this.type = order.type;
    this.paymentMethod = order.paymentMethod;
    this.status = order.status;
    this.subtotalInCents = order.subtotalInCents;
    this.discountInCents = order.discountInCents;
    this.totalInCents = order.totalInCents;
    this.address = order.address || undefined;
    this.complement = order.complement || undefined;
    this.city = order.city || undefined;
    this.state = order.state || undefined;
    this.zipCode = order.zipCode || undefined;
    this.notes = order.notes || undefined;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;

    this.items = items.map((i) => new OrderItemPresenter(i));
    this.customer = customer ? new CustomerPresenter(customer) : undefined;
  }
}
