import type { Category } from './category.type'

export type ProductDetails = {
  id: string
  name: string
  slug: string
  sku: string
  description: string | null
  priceInCents: number
  stock: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  categories: Category[]
}
