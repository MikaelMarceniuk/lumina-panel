import React, { createContext, useContext, useState } from 'react'
import type { CreateProductTabs } from '../constants/tabs'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createProductSchema,
  formDefaultValues,
  type CreateProductSchema,
} from '../schemas/create-product.schema'
import { Form } from '@/components/ui/form'
import { useMutation } from '@tanstack/react-query'
import { toCents } from '@/lib/formatters.utils'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

type CreateProductContext = {
  currentTab: keyof typeof CreateProductTabs
  setCurrentTab: (key: keyof typeof CreateProductTabs) => void
  form: UseFormReturn<CreateProductSchema>
  isSubmitting: boolean
}

const CreateProductContext = createContext({} as CreateProductContext)

type CreateProductProviderProps = {
  children: React.ReactNode
}

export const CreateProductProvider: React.FC<CreateProductProviderProps> = ({
  children,
}) => {
  const [currentTab, setCurrentTab] =
    useState<keyof typeof CreateProductTabs>('basicInformations')
  const navigate = useNavigate()

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: formDefaultValues,
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CreateProductSchema) => {
      await api.post('/product', {
        name: data.basicInfo.name,
        sku: data.basicInfo.sku,
        priceInCents: toCents(data.priceStock.priceInCents),
        stock: data.priceStock.stock,
        isActive: data.priceStock.isActive,
        categories: data.categories.categories,
      })
    },
  })

  const handleSubmit = form.handleSubmit(
    async (data) =>
      await mutateAsync(data, {
        onSuccess: () => {
          toast.success('Produto criado com sucesso!')
          navigate('/dashboard/product', { replace: true })
        },
      })
  )

  return (
    <CreateProductContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        form,
        isSubmitting: form.formState.isSubmitting,
      }}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit}>{children}</form>
      </Form>
    </CreateProductContext.Provider>
  )
}

export const useCreateProduct = () => {
  const ctx = useContext(CreateProductContext)

  if (!ctx) {
    throw new Error('useCreateProduct needs to be inside CreateProductProvider')
  }

  return ctx
}
