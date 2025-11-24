import { Order } from 'generated/prisma/client';
import { OrderPresenter } from './order.presenter';
import { PaginationMeta } from 'src/utils/pagination-meta.presenter';

type OrderPaginatedParams = {
  orders: Order[];
  page: number;
  limit: number;
  totalCount: number;
};

export class OrderPaginated {
  orders: OrderPresenter[];
  meta: PaginationMeta;

  constructor({ orders, page, limit, totalCount }: OrderPaginatedParams) {
    this.orders = orders.map((c) => new OrderPresenter(c));
    this.meta = new PaginationMeta(page, limit, totalCount);
  }
}
