import { api } from '@/lib/axios'
import type { PaginationMeta } from '@/types/pagination-meta.type'
import type { Order } from '@/types/order.type'
import type { OrderType } from '@/types/order-type.type'
import type { PaymentMethod } from '@/types/payment-method.type'
import type { OrderStatus } from '@/types/order-status.type'
import type { MultiSelectValue } from '@/components/multi-select'

type ProductActionParams = {
  q?: string
  type?: MultiSelectValue<OrderType>
  paymentMethod?: MultiSelectValue<PaymentMethod>
  status?: MultiSelectValue<OrderStatus>
  page: number
  limit: number
}

type PaginatedOrder = {
  orders: Order[]
  meta: PaginationMeta
}

export const getOrderAction = async ({
  q,
  type,
  paymentMethod,
  status,
  limit,
  page,
}: ProductActionParams): Promise<PaginatedOrder> => {
  const { data } = await api.get<PaginatedOrder>('/order', {
    params: {
      q: q == '' ? undefined : q,
      type: type?.length == 0 ? undefined : type,
      paymentMethod: paymentMethod?.length == 0 ? undefined : paymentMethod,
      status: status?.length == 0 ? undefined : status,
      limit,
      page,
    },
  })

  return data
}
