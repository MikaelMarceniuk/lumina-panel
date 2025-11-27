import { api } from '@/lib/axios'
import type { StoreDetails } from '@/types/store-details.type'
import type { withChildren } from '@/types/with-children.type'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import {
  storeDetailsTabs,
  type StoreDetailsTabs,
  type StoreDetailsTabsKeys,
} from '../constants/tabs.contants'
import { useTabs, type TabList } from '@/hooks/use-tabs.hook'

type Mode = 'read' | 'update'

type StoreDetailsContext = {
  mode: Mode
  store: StoreDetails | undefined
  isFetching: boolean
  tabList: TabList<StoreDetailsTabs>[]
  currentTab: TabList<StoreDetailsTabs>
  currentTabKey: StoreDetailsTabsKeys
  handleTabChange: (key: StoreDetailsTabsKeys) => void
}

const StoreDetailsContext = createContext({} as StoreDetailsContext)

export const StoreDetailsProvider: React.FC<withChildren> = ({ children }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const [mode, setMode] = useState<Mode>('read')
  const { tabList, currentTab, currentTabKey, handleTabChange } = useTabs<
    StoreDetailsTabs,
    StoreDetailsTabsKeys
  >(storeDetailsTabs, 'generalInfo')

  const { data, isFetching } = useQuery({
    queryKey: ['/store-details', id],
    queryFn: async () => (await api.get<StoreDetails>(`/store/${id}`)).data,
  })

  useEffect(() => {
    if (!id) {
      toast.error('Loja não encontrada.')
      navigate('/dashboard/store', { replace: true })
    }
  }, [id])

  return (
    <StoreDetailsContext.Provider
      value={{
        mode,
        store: data,
        isFetching,
        tabList,
        currentTab,
        currentTabKey,
        handleTabChange,
      }}
    >
      {children}
    </StoreDetailsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreDetails = () => {
  const ctx = useContext(StoreDetailsContext)
  if (!ctx) {
    throw new Error('useStoreDetails must be used inside StoreDetailsProvider.')
  }
  return ctx
}
