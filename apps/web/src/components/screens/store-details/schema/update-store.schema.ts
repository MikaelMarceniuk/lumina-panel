import { z } from 'zod'

const generalInfoSchema = z.object({
  name: z.string(),
  manager: z.string().optional(),
  phone: z.string().optional(),
  contactEmail: z.string().optional(),
})

const addressSchema = z.object({
  address: z.string().optional(),
  addressComplement: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
})

const historySchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const updateStoreSchema = z.object({
  generalInfo: generalInfoSchema,
  address: addressSchema,
  history: historySchema,
})

export type UpdateStoreInput = z.infer<typeof updateStoreSchema>

export const defaultValues: UpdateStoreInput = {
  generalInfo: {
    name: '',
    manager: '',
    contactEmail: '',
    phone: '',
  },
  address: {
    address: '',
    addressComplement: '',
    city: '',
    state: '',
    zipCode: '',
  },
  history: {
    createdAt: '',
    updatedAt: '',
  },
}
