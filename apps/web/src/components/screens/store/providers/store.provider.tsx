import { usePagination } from '@/hooks/use-pagination.hook'
import { api } from '@/lib/axios'
import type { PaginationMeta } from '@/types/pagination-meta.type'
import type { StorePaginated } from '@/types/store-paginated.type'
import type { Store } from '@/types/store.type'
import type { withChildren } from '@/types/with-children.type'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'
import { CreateStoreDialog } from '../components/create-store.dialog'
import { useDebounce } from '@/hooks/use-debounce.hook'

type StoreContext = {
  stores: Store[]
  pagination: PaginationMeta | undefined
  isFetching: boolean
  q: string
  handleQueryChange: (value: string) => void
  handlePageChange: (newPage: number, totalPages?: number | undefined) => void
  openCreateDialog: () => void
}

const StoreContext = createContext({} as StoreContext)

export const StoreProvider: React.FC<withChildren> = ({ children }) => {
  const { limit, page, handlePageChange } = usePagination()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [q, setQuery] = useState('')
  const debouncedQuery = useDebounce(q, 400)

  const { data, isFetching } = useQuery({
    queryKey: ['/stores', limit, page, debouncedQuery],
    queryFn: async () =>
      (
        await api.get<StorePaginated>('/store', {
          params: {
            limit,
            page,
            q: debouncedQuery == '' ? undefined : debouncedQuery,
          },
        })
      ).data,
  })

  const handleQueryChange = (val: string) => setQuery(val)

  const openCreateDialog = () => setDialogOpen(true)

  return (
    <StoreContext.Provider
      value={{
        stores: data?.stores || [],
        pagination: data?.meta,
        isFetching,
        q,
        handleQueryChange,
        handlePageChange,
        openCreateDialog,
      }}
    >
      {children}
      <CreateStoreDialog isOpen={isDialogOpen} onOpenHandler={setDialogOpen} />
    </StoreContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider.')
  }
  return ctx
}
