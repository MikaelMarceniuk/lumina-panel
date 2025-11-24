import { api } from '@/lib/axios'
import type { Product } from '@/types/product.type'
import type { PaginationMeta } from '@/types/pagination-meta.type'

type ProductActionParams = {
  q?: string
  status?: 'all' | 'active' | 'inactive'
  page: number
  limit: number
}

type PaginatedProduct = {
  products: Product[]
  meta: PaginationMeta
}

export const getProductAction = async ({
  q,
  status,
  limit,
  page,
}: ProductActionParams): Promise<PaginatedProduct> => {
  const { data } = await api.get<PaginatedProduct>('/product', {
    params: {
      q: q == '' ? undefined : q,
      status: status == 'all' ? undefined : status == 'active',
      limit,
      page,
    },
  })

  return data
}
