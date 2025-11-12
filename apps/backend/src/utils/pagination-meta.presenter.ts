export class PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;

  constructor(page: number, limit: number, totalCount: number) {
    this.page = page;
    this.limit = limit;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / limit);
  }
}
