import type { Deliverer } from './deliverer.type'
import type { PaginationMeta } from './pagination-meta.type'

export type DelivererPaginated = {
  deliverers: Deliverer[]
  meta: PaginationMeta
}
