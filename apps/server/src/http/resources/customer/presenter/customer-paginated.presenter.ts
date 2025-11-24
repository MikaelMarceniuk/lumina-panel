import { Customer } from 'generated/prisma/client';
import { CustomerPresenter } from './customer.presenter';
import { PaginationMeta } from 'src/utils/pagination-meta.presenter';

type CustomerPaginatedParams = {
  customers: Customer[];
  page: number;
  limit: number;
  totalCount: number;
};

export class CustomerPaginated {
  customers: CustomerPresenter[];
  meta: PaginationMeta;

  constructor({ customers, page, limit, totalCount }: CustomerPaginatedParams) {
    this.customers = customers.map((c) => new CustomerPresenter(c));
    this.meta = new PaginationMeta(page, limit, totalCount);
  }
}
