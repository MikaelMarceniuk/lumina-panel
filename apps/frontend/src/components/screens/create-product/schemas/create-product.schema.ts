import { z } from 'zod'

const basicInfoSchema = z.object({
  name: z.string().min(1, 'O nome do produto é obrigatório'),
  sku: z.string().min(1, 'O SKU é obrigatório'),
})

const priceStockSchema = z.object({
  priceInCents: z.string().refine(
    (val) => {
      if (val === '') return true
      const numeric = Number(val.replace(/\D/g, ''))
      return !isNaN(numeric) && numeric >= 0
    },
    { message: 'O preço não pode ser negativo' }
  ),
  stock: z.number().min(0, 'O estoque não pode ser negativo'),
  isActive: z.enum(['Ativo', 'Inativo']),
})

const categoriesSchema = z.object({
  categories: z
    .array(
      z.object({
        id: z.cuid(),
        name: z.string(),
      })
    )
    .optional(),
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
  },
  priceStock: {
    priceInCents: '',
    stock: 0,
    isActive: 'Ativo',
  },
  categories: {
    categories: [],
  },
  images: {
    images: [],
  },
}
