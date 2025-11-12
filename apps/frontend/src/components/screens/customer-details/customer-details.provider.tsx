import { api } from '@/lib/axios'
import { customerSchema, type CustomerSchema } from '@/schemas/customer.schema'
import type { CustomerDetails } from '@/types/customer-details.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

type CustomerDetailsContext = {
  customer: CustomerDetails | undefined
  isFetching: boolean
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
      form.setValue('phone', data.phone)
      form.setValue('document', data.document)
      form.setValue('companyName', data.companyName)
      form.setValue('address', data.address)
      form.setValue('city', data.city)
      form.setValue('state', data.state)
      form.setValue('zipCode', data.zipCode)
    }
  }, [data])

  return (
    <CustomerDetailsContext.Provider
      value={{
        customer: data,
        isFetching,
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
      'useCustomerDetails hook must be used inside CustomerDetailsProvider'
    )
  }

  return ctx
}
