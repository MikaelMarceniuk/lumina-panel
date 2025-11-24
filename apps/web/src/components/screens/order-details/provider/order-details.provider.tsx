import React, { createContext, useContext, useEffect, useState } from 'react'
import type { OrderDetailsTabsKeys } from '../constants/order-details.tabs.constants'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { OrderDetails } from '@/types/order-details.type'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  orderDetailsSchema,
  type OrderDetailsSchema,
} from '../schema/order-details.schema'
import { Form } from '@/components/ui/form'

type OrderDetailsContext = {
  order: OrderDetails | undefined
  isFetching: boolean
  currentTab: OrderDetailsTabsKeys
  setCurrentTab: (key: OrderDetailsTabsKeys) => void
  form: UseFormReturn<OrderDetailsSchema>
}

const OrderDetailsContext = createContext({} as OrderDetailsContext)

type OrderDetailsProviderProps = {
  id: string
  children: React.ReactNode
}

export const OrderDetailsProvider: React.FC<OrderDetailsProviderProps> = ({
  id,
  children,
}) => {
  const [currentTab, setCurrentTab] = useState<OrderDetailsTabsKeys>('details')

  const form = useForm<OrderDetailsSchema>({
    resolver: zodResolver(orderDetailsSchema),
  })

  const { data, isFetching } = useQuery({
    queryKey: ['/order-details', id],
    queryFn: async () => (await api.get<OrderDetails>(`/order/${id}`)).data,
  })

  useEffect(() => {
    if (data) {
      form.setValue('basicInfo.orderCode', data.orderCode)
      form.setValue('basicInfo.status', data.status)
      form.setValue('basicInfo.type', data.type)
      form.setValue('basicInfo.createdAt', data.createdAt)
      form.setValue('basicInfo.updatedAt', data.updatedAt)
      form.setValue('basicInfo.notes', data.notes)

      form.setValue('customer.name', data.customer?.name || '')
      form.setValue('customer.email', data.customer?.email || '')
      form.setValue('customer.phone', data.customer?.phone || '')
      form.setValue('customer.companyName', data.customer?.companyName || '')

      form.setValue('price.subtotalInCents', data.subtotalInCents)
      form.setValue('price.discountInCents', data.discountInCents)
      form.setValue('price.totalInCents', data.totalInCents)

      form.setValue('items.items', data.items)
    }
  }, [data])

  return (
    <OrderDetailsContext.Provider
      value={{
        order: data,
        isFetching,
        currentTab,
        setCurrentTab,
        form,
      }}
    >
      <Form {...form}>
        <form>{children}</form>
      </Form>
    </OrderDetailsContext.Provider>
  )
}

export const useOrderDetails = () => {
  const ctx = useContext(OrderDetailsContext)

  if (!ctx) {
    throw new Error('useOrderDetails must be used inside OrderDetailsProvider')
  }

  return ctx
}
