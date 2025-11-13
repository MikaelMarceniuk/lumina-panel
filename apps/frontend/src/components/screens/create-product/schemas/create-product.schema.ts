import { z } from 'zod'

const basicInfoSchema = z.object({
  name: z.string().min(1, 'O nome do produto é obrigatório'),
  sku: z.string().min(1, 'O SKU é obrigatório'),
  description: z.string().optional(),
})

const priceStockSchema = z.object({
  priceInCents: z.number().min(0, 'O preço não pode ser negativo'),
  stock: z.number().min(0, 'O estoque não pode ser negativo'),
  isActive: z.boolean(),
})

const categoriesSchema = z.object({
  categories: z.array(z.string()).optional(),
})

const imagesSchema = z.object({
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        order: z.number().optional(),
      })
    )
    .optional(),
})

export const createProductSchema = z.object({
  basicInfo: basicInfoSchema,
  priceStock: priceStockSchema,
  categories: categoriesSchema,
  images: imagesSchema,
})

export type CreateProductSchema = z.infer<typeof createProductSchema>

export const formDefaultValues: CreateProductSchema = {
  basicInfo: {
    name: '',
    sku: '',
    description: '',
  },
  priceStock: {
    priceInCents: 0,
    stock: 0,
    isActive: true,
  },
  categories: {
    categories: [],
  },
  images: {
    images: [],
  },
}
