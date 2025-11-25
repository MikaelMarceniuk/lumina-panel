import {
  PaginationMeta,
  PaginationMetaParams,
} from 'src/utils/pagination-meta.presenter';
import { StorePresenter } from './store.presenter';
import { Store } from 'generated/prisma/client';

type StorePaginatedParams = {
  stores: Store[];
  pagination: PaginationMetaParams;
};

export class StorePaginated {
  stores: StorePresenter[];
  meta: PaginationMeta;

  constructor({ stores, pagination }: StorePaginatedParams) {
    this.stores = stores.map((store) => new StorePresenter(store));
    this.meta = new PaginationMeta(pagination);
  }
}
