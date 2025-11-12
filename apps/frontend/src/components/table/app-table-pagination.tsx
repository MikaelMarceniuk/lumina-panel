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

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem
          className={`cursor-pointer ${!canGoPrev ? 'pointer-events-none opacity-50' : ''}`}
          onClick={() => canGoPrev && onChangePage(currentPage - 1)}
        >
          <PaginationPrevious />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

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
