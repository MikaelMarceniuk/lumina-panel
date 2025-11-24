import type { BadgeVariants } from '@/components/ui/badge'
import type { OrderStatus } from '@/types/order-status.type'

const ORDER_STATUS_TO_VARIANT: Record<OrderStatus, BadgeVariants['variant']> = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PREPARING_SHIPMENT: 'preparing',
  SHIPPED: 'success',
  DELIVERED: 'success',
  CANCELED: 'canceled',
  REFUNDED: 'refunded',
}

export const orderStatusVariant = (status: OrderStatus) =>
  ORDER_STATUS_TO_VARIANT[status]
