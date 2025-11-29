import { useDebounce } from '@/hooks/use-debounce.hook'
import { usePagination } from '@/hooks/use-pagination.hook'
import { api } from '@/lib/axios'
import type { DelivererPaginated } from '@/types/deliverer-paginated.type'
import type { Deliverer } from '@/types/deliverer.type'
import type { PaginationMeta } from '@/types/pagination-meta.type'
import type { withChildren } from '@/types/with-children.type'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'

type DeliverersContext = {
  deliverers?: Deliverer[]
  pagination?: PaginationMeta
  isFetching: boolean

  q: string
  queryChangeHandler: (q: string) => void

  handlePageChange: (newPage: number, totalPages?: number | undefined) => void
}

const DeliverersContext = createContext({} as DeliverersContext)

export const DeliverersProvider: React.FC<withChildren> = ({ children }) => {
  const { limit, page, handlePageChange } = usePagination()
  const [q, setQuery] = useState('')
  const debouncedQuery = useDebounce(q, 400)

  const { data, isFetching } = useQuery({
    queryKey: ['/deliverers', limit, page, debouncedQuery],
    queryFn: async () =>
      (
        await api.get<DelivererPaginated>('/deliverer', {
          params: {
            limit,
            page,
            q: debouncedQuery == '' ? undefined : debouncedQuery,
          },
        })
      ).data,
  })

  return (
    <DeliverersContext.Provider
      value={{
        deliverers: data?.deliverers,
        pagination: data?.meta,
        isFetching,

        q,
        queryChangeHandler: setQuery,

        handlePageChange,
      }}
    >
      {children}
    </DeliverersContext.Provider>
  )
}

export const useDeliverers = () => {
  const ctx = useContext(DeliverersContext)
  if (!ctx) {
    throw new Error('useDeliverer must be used inside DeliverersProvider')
  }

  return ctx
}
