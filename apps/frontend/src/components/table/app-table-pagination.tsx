import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type AppPaginationProps = {
  totalPages: number
  currentPage: number
  onChangePage: (page: number) => void
  className?: string
}

export const AppPagination = ({
  totalPages,
  currentPage,
  onChangePage,
  className,
}: AppPaginationProps) => {
  if (totalPages <= 1) return null

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  let startPage = currentPage - 1
  let endPage = currentPage + 1

  if (currentPage <= 2) {
    startPage = 1
    endPage = Math.min(3, totalPages)
  } else if (currentPage >= totalPages - 1) {
    startPage = Math.max(totalPages - 2, 1)
    endPage = totalPages
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem
          className={`cursor-pointer ${!canGoPrev ? 'pointer-events-none opacity-50' : ''}`}
          onClick={() => canGoPrev && onChangePage(currentPage - 1)}
        >
          <PaginationPrevious />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem
            key={page}
            className="cursor-pointer"
            onClick={() => onChangePage(page)}
          >
            <PaginationLink isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem
          className={`cursor-pointer ${!canGoNext ? 'pointer-events-none opacity-50' : ''}`}
          onClick={() => canGoNext && onChangePage(currentPage + 1)}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
