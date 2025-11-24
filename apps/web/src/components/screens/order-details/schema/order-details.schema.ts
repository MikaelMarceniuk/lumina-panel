import { orderStatusValues } from '@/types/order-status.type'
import z from 'zod'

const basicInfoSchema = z.object({
  orderCode: z.string(),
  status: z.enum(orderStatusValues),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  notes: z.string().optional().nullable(),
})

const priceSchema = z.object({
  subtotalInCents: z.number(),
  discountInCents: z.number(),
  totalInCents: z.number(),
})

const addressSchema = z.object({
  address: z.string(),
  complement: z.string().optional().nullable(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
})

const itemsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      unitPriceInCents: z.number(),
      totalInCents: z.number(),
      product: z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        sku: z.string(),
        description: z.string().nullable(),
        priceInCents: z.number(),
        stock: z.number(),
        isActive: z.boolean(),
      }),
    })
  ),
})

const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  document: z.string(),
  companyName: z.string().optional(),
  zipCode: z.string(),
  state: z.string(),
  city: z.string(),
  address: z.string(),
  complement: z.string().optional(),
})

const paymentSchema = z.object({
  paymentMethod: z.string(),
})

const historySchema = z.object({
  history: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        message: z.string(),
        createdAt: z.string(),
      })
    )
    .optional(),
})

export const orderDetailsSchema = z.object({
  basicInfo: basicInfoSchema,
  price: priceSchema,
  address: addressSchema,
  items: itemsSchema,
  customer: customerSchema,
  payment: paymentSchema,
  history: historySchema.optional(),
})

export type OrderDetailsSchema = z.infer<typeof orderDetailsSchema>
