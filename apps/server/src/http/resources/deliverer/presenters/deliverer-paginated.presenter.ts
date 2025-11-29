import { Deliverer } from 'generated/prisma/client';
import {
  PaginationMeta,
  PaginationMetaParams,
} from 'src/utils/pagination-meta.presenter';
import { DelivererPresenter } from './deliverer.presenter';

type DelivererPresenterParams = {
  deliverers: Deliverer[];
  pagination: PaginationMetaParams;
};

export class DelivererPaginatedPresenter {
  deliverers: DelivererPresenter[];
  meta: PaginationMeta;

  constructor({ deliverers, pagination }: DelivererPresenterParams) {
    this.deliverers = deliverers.map((d) => new DelivererPresenter(d));
    this.meta = new PaginationMeta(pagination);
  }
}
