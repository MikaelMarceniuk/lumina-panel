import React, { createContext, useContext, useState } from 'react'
import type { CreateProductTabs } from '../constants/tabs'

type CreateProductContext = {
  currentTab: keyof typeof CreateProductTabs
  setCurrentTab: (key: keyof typeof CreateProductTabs) => void
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

  return (
    <CreateProductContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
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
