import type { PaginationMeta } from './pagination-meta.type'
import type { Store } from './store.type'

export type StorePaginated = {
  stores: Store[]
  meta: PaginationMeta
}
