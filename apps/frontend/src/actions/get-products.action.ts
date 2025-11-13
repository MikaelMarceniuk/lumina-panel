import { api } from '@/lib/axios'
import type { Product } from '@/types/product.type'
import type { PaginationMeta } from '@/types/pagination-meta.type'

type ProductActionParams = {
  page: number
  limit: number
}

type PaginatedProduct = {
  products: Product[]
  meta: PaginationMeta
}

export const getProductAction = async ({
  limit,
  page,
}: ProductActionParams): Promise<PaginatedProduct> => {
  const { data } = await api.get<PaginatedProduct>('/product', {
    params: {
      limit,
      page,
    },
  })

  return data
}
