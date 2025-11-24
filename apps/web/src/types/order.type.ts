import type { OrderStatus } from './order-status.type'
import type { OrderType } from './order-type.type'
import type { PaymentMethod } from './payment-method.type'

export type Order = {
  id: string
  orderCode: string
  type: OrderType
  paymentMethod: PaymentMethod
  status: OrderStatus
}
