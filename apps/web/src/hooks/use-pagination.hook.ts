import { useState } from 'react'

type UsePaginationOptions = {
  initialPage?: number
  initialLimit?: number
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const { initialPage = 1, initialLimit = 10 } = options

  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)

  const handlePageChange = (newPage: number, totalPages?: number) => {
    if (newPage < 1) return
    if (totalPages && newPage > totalPages) return
    setPage(newPage)
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  const resetPagination = () => {
    setPage(initialPage)
    setLimit(initialLimit)
  }

  return {
    page,
    limit,
    setPage,
    setLimit,
    handlePageChange,
    handleLimitChange,
    resetPagination,
  }
}
