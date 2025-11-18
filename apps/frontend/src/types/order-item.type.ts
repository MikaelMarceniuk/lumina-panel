import type { Product } from './product.type'

export interface OrderItem {
  id: string
  quantity: number
  unitPriceInCents: number
  totalInCents: number
  product: Product
}
