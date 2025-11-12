import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { Customer } from '@/types/customer.type'
import { toast } from 'sonner'
import { customerSchema, type CustomerSchema } from '@/schemas/customer.schema'

export const useCreateCustomer = () => {
  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
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
    mutationFn: async (data: CustomerSchema) =>
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
