import { usePagination } from '@/hooks/use-pagination.hook'
import { api } from '@/lib/axios'
import type { PaginationMeta } from '@/types/pagination-meta.type'
import type { StorePaginated } from '@/types/store-paginated.type'
import type { Store } from '@/types/store.type'
import type { withChildren } from '@/types/with-children.type'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'
import { CreateStoreDialog } from '../components/create-store.dialog'

type StoreContext = {
  stores: Store[]
  pagination: PaginationMeta | undefined
  isFetching: boolean
  handlePageChange: (newPage: number, totalPages?: number | undefined) => void
  openCreateDialog: () => void
}

const StoreContext = createContext({} as StoreContext)

export const StoreProvider: React.FC<withChildren> = ({ children }) => {
  const { limit, page, handlePageChange } = usePagination()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const { data, isFetching } = useQuery({
    queryKey: ['/stores', limit, page],
    queryFn: async () =>
      (await api.get<StorePaginated>('/store', { params: { limit, page } }))
        .data,
  })

  const openCreateDialog = () => setDialogOpen(true)

  return (
    <StoreContext.Provider
      value={{
        stores: data?.stores || [],
        pagination: data?.meta,
        isFetching,
        handlePageChange,
        openCreateDialog,
      }}
    >
      {children}
      <CreateStoreDialog isOpen={isDialogOpen} onOpenHandler={setDialogOpen} />
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider.')
  }
  return ctx
}
