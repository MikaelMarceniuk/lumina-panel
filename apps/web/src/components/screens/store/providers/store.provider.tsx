import { usePagination } from '@/hooks/use-pagination.hook'
import { api } from '@/lib/axios'
import type { PaginationMeta } from '@/types/pagination-meta.type'
import type { StorePaginated } from '@/types/store-paginated.type'
import type { Store } from '@/types/store.type'
import type { withChildren } from '@/types/with-children.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'
import { CreateStoreDialog } from '../components/create-store.dialog'
import { useDebounce } from '@/hooks/use-debounce.hook'
import { toast } from 'sonner'
import { StoreDeleteAlert } from '../components/store.delete-alert'

type StoreContext = {
  stores: Store[]
  pagination: PaginationMeta | undefined
  isFetching: boolean

  q: string
  handleQueryChange: (value: string) => void

  handlePageChange: (newPage: number, totalPages?: number | undefined) => void

  openCreateDialog: () => void
  openDeleteAlert: (id: string) => void
}

const StoreContext = createContext({} as StoreContext)

export const StoreProvider: React.FC<withChildren> = ({ children }) => {
  const { limit, page, handlePageChange } = usePagination()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isAlertOpen, setAlertOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined)
  const [q, setQuery] = useState('')
  const debouncedQuery = useDebounce(q, 400)

  const { data, isFetching, refetch } = useQuery({
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

  const { mutateAsync: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => await api.delete(`/store/${id}`),
    onSuccess: () => {
      refetch()
      toast.success('Loja deletado com sucesso!')
      setAlertOpen(false)
    },
  })

  const handleQueryChange = (val: string) => setQuery(val)

  const openCreateDialog = () => setDialogOpen(true)

  const openDeleteAlert = (id: string) => {
    setDeleteId(id)
    setAlertOpen(true)
  }

  return (
    <StoreContext.Provider
      value={{
        stores: data?.stores || [],
        pagination: data?.meta,
        isFetching: isFetching || isDeleting,

        q,
        handleQueryChange,

        handlePageChange,

        openCreateDialog,
        openDeleteAlert,
      }}
    >
      {children}
      <CreateStoreDialog isOpen={isDialogOpen} onOpenHandler={setDialogOpen} />
      <StoreDeleteAlert
        isOpen={isAlertOpen}
        handleOpenChange={setAlertOpen}
        handleBack={() => setAlertOpen(false)}
        handleAction={() => deleteMutation(deleteId)}
      />
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
