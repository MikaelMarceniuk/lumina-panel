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

type CreateProductContext = {
  currentTab: keyof typeof CreateProductTabs
  setCurrentTab: (key: keyof typeof CreateProductTabs) => void
  form: UseFormReturn<CreateProductSchema>
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

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: formDefaultValues,
  })

  return (
    <CreateProductContext.Provider value={{ currentTab, setCurrentTab, form }}>
      <Form {...form}>
        <form>{children}</form>
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
