import { api } from '@/lib/axios'
import type { ProductDetails } from '@/types/product-details.type'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'
import type { ProductDetailsTabsKeys } from '../constants/product-details.tabs.constants'
import { Form } from '@/components/ui/form'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatDateToBrazil } from '@/lib/date-formatter.utils'
import {
  formDefaultValues,
  productSchema,
  type ProductSchema,
} from '../schemas/product-details.schema'
import { formatPriceFromCents } from '@/lib/formatters.utils'

type ProductDetailsContext = {
  product: ProductDetails | undefined
  isLoading: boolean
  currentTab: ProductDetailsTabsKeys
  setCurrentTab: (key: ProductDetailsTabsKeys) => void
  form: UseFormReturn<ProductSchema>
  isSubmitting: boolean
}

const ProductDetailsContext = createContext({} as ProductDetailsContext)

type ProductDetailsProviderProps = {
  id: string
  children: React.ReactNode
}

export const ProductDetailsProvider: React.FC<ProductDetailsProviderProps> = ({
  id,
  children,
}) => {
  const [currentTab, setCurrentTab] =
    useState<ProductDetailsTabsKeys>('basicInformations')
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: formDefaultValues,
  })

  const { data, isFetching } = useQuery({
    queryKey: ['/product-details', id],
    queryFn: async () => (await api.get<ProductDetails>(`/product/${id}`)).data,
    enabled: !!id,
  })

  const handleSubmit = form.handleSubmit((data) =>
    console.log('ProductDetailsProvider.submit: ', data)
  )

  const resetForm = () => {
    if (data) {
      form.setValue('basicInfo.name', data.name)
      form.setValue('basicInfo.sku', data.sku)
      form.setValue(
        'priceStock.priceInCents',
        formatPriceFromCents(data.priceInCents, { style: 'decimal' })
      )
      form.setValue('priceStock.stock', data.stock)
      form.setValue('priceStock.isActive', data.isActive ? 'Ativo' : 'Inativo')
      form.setValue('categories.categories', data.categories)
      form.setValue('metadata.createdAt', formatDateToBrazil(data.createdAt))
      form.setValue('metadata.updatedAt', formatDateToBrazil(data.updatedAt))
      return
    }

    form.reset()
  }

  useEffect(() => {
    resetForm()
  }, [data])

  return (
    <ProductDetailsContext.Provider
      value={{
        product: data,
        isLoading: isFetching,
        currentTab,
        setCurrentTab,
        form,
        isSubmitting: form.formState.isSubmitting,
      }}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit}>{children}</form>
      </Form>
    </ProductDetailsContext.Provider>
  )
}

export const useProductDetails = () => {
  const ctx = useContext(ProductDetailsContext)
  if (!ctx) {
    throw new Error(
      'useProductDetails must be used inside ProductDetailsProvider'
    )
  }

  return ctx
}
