import type { Customer } from './customer.type'
import type { OrderItem } from './order-item.type'
import type { OrderStatus } from './order-status.type'
import type { OrderType } from './order-type.type'
import type { PaymentMethod } from './payment-method.type'

export type OrderDetails = {
  id: string
  orderCode: string
  type: OrderType
  paymentMethod: PaymentMethod
  status: OrderStatus
  subtotalInCents: number
  discountInCents: number
  totalInCents: number
  address: string | undefined
  complement: string | undefined
  city: string | undefined
  state: string | undefined
  zipCode: string | undefined
  notes: string | undefined
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  customer: Customer | undefined
}
