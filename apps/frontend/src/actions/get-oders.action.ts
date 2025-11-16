import { api } from '@/lib/axios'
import type { PaginationMeta } from '@/types/pagination-meta.type'
import type { Order } from '@/types/order.type'

type ProductActionParams = {
  q?: string
  page: number
  limit: number
}

type PaginatedOrder = {
  orders: Order[]
  meta: PaginationMeta
}

export const getOrderAction = async ({
  q,
  limit,
  page,
}: ProductActionParams): Promise<PaginatedOrder> => {
  const { data } = await api.get<PaginatedOrder>('/order', {
    params: {
      q: q == '' ? undefined : q,
      limit,
      page,
    },
  })

  return data
}
