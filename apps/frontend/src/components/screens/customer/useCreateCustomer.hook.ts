import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { Customer } from '@/types/customer.type'
import { toast } from 'sonner'
import z from 'zod'

const emptyToUndefined = z.literal('').transform(() => undefined)

export const CreateCustomerSchema = z.object({
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

type CreateCustomerSchema = z.infer<typeof CreateCustomerSchema>

export const useCreateCustomer = () => {
  const form = useForm<CreateCustomerSchema>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      document: '',
      companyName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CreateCustomerSchema) =>
      await api.post<Customer>('/customer', data),
    onSuccess() {
      toast.success('Cliente criado com sucesso!')
      form.reset()
    },
  })

  return {
    form,
    mutateAsync,
  }
}
