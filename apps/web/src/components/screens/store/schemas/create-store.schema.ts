import { z } from 'zod'

export const storeSchema = z.object({
  name: z.string(),

  manager: z.string().optional(),
  phone: z.string().optional(),
  contactEmail: z.string().optional(),

  address: z.string().optional(),
  addressComplement: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
})

export type StoreInput = z.infer<typeof storeSchema>

export const defaultValues: StoreInput = {
  name: '',
  manager: '',
  phone: '',
  contactEmail: '',
  address: '',
  addressComplement: '',
  city: '',
  state: '',
  zipCode: '',
}
