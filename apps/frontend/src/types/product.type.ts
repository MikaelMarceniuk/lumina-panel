export type Product = {
  id: string
  name: string
  slug: string
  sku: string
  description: string | null
  priceInCents: number
  stock: number
  isActive: boolean
}
