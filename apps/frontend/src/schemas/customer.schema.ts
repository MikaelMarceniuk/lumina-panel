import z from 'zod'

const emptyToUndefined = z.literal('').transform(() => undefined)

export const customerSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome não pode ultrapassar 100 caracteres'),
  email: z.email('E-mail inválido'),
  phone: z
    .union([
      z.string().min(8, 'Telefone muito curto').max(20, 'Telefone muito longo'),
      emptyToUndefined,
    ])
    .optional(),
  document: z
    .union([
      z
        .string()
        .min(11, 'Documento muito curto')
        .max(18, 'Documento muito longo'),
      emptyToUndefined,
    ])
    .optional(),
  companyName: z
    .union([
      z.string().min(2, 'Nome da empresa muito curto').max(100),
      emptyToUndefined,
    ])
    .optional(),
  address: z.union([z.string(), emptyToUndefined]).optional(),
  complement: z.union([z.string(), emptyToUndefined]).optional(),
  city: z.union([z.string(), emptyToUndefined]).optional(),
  state: z.union([z.string(), emptyToUndefined]).optional(),
  zipCode: z
    .union([
      z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
      emptyToUndefined,
    ])
    .optional(),
})

export type CustomerSchema = z.infer<typeof CustomerSchema>
