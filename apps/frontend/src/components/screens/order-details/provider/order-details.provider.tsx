import React, { createContext, useContext, useState } from 'react'
import type { OrderDetailsTabsKeys } from '../constants/order-details.tabs.constants'

type OrderDetailsContext = {
  currentTab: OrderDetailsTabsKeys
  setCurrentTab: (key: OrderDetailsTabsKeys) => void
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

  return (
    <OrderDetailsContext.Provider
      value={{
        currentTab,
        setCurrentTab,
      }}
    >
      {children}
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
