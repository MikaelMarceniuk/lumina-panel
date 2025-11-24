import { Product } from 'generated/prisma/client';
import { ProductPresenter } from './product.presenter';
import { PaginationMeta } from 'src/utils/pagination-meta.presenter';

type ProductPaginatedParams = {
  products: Product[];
  page: number;
  limit: number;
  totalCount: number;
};

export class ProductPaginated {
  products: ProductPresenter[];
  meta: PaginationMeta;

  constructor({ products, page, limit, totalCount }: ProductPaginatedParams) {
    this.products = products.map((c) => new ProductPresenter(c));
    this.meta = new PaginationMeta(page, limit, totalCount);
  }
}
