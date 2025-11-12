import { api } from '@/lib/axios'
import { customerSchema, type CustomerSchema } from '@/schemas/customer.schema'
import type { CustomerDetails } from '@/types/customer-details.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'

type CustomerDetailsContext = {
  customer: CustomerDetails | undefined
  isFetching: boolean
  form: UseFormReturn<CustomerSchema>
}

const CustomerDetailsContext = createContext<CustomerDetailsContext>(
  {} as CustomerDetailsContext
)

type CustomerDetailsProviderProps = {
  children: React.ReactNode
  id: string
}

export const CustomerDetailsProvider: React.FC<
  CustomerDetailsProviderProps
> = ({ children, id }) => {
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

  const { data, isFetching } = useQuery({
    queryKey: ['/customer', id],
    queryFn: async () =>
      (await api.get<CustomerDetails>(`/customer/${id}`)).data,
    enabled: !!id,
  })

  useEffect(() => {
    if (data) {
      form.setValue('name', data.name)
      form.setValue('email', data.email)
      form.setValue('phone', data.phone || undefined)
      form.setValue('document', data.document || undefined)
      form.setValue('companyName', data.companyName || undefined)
      form.setValue('address', data.address || undefined)
      form.setValue('city', data.city || undefined)
      form.setValue('state', data.state || undefined)
      form.setValue('zipCode', data.zipCode || undefined)
    }
  }, [data])

  return (
    <CustomerDetailsContext.Provider
      value={{
        customer: data,
        isFetching,
        form,
      }}
    >
      {children}
    </CustomerDetailsContext.Provider>
  )
}

export const useCustomerDetails = () => {
  const ctx = useContext(CustomerDetailsContext)
  if (!ctx) {
    throw new Error(
      'useCustomerDetails must be used within CustomerDetailsProvider'
    )
  }
  return ctx
}
