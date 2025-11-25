export type PaginationMetaParams = {
  page: number;
  limit: number;
  totalCount: number;
};

export class PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;

  constructor({ page, limit, totalCount }: PaginationMetaParams) {
    this.page = page;
    this.limit = limit;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / limit);
  }
}
