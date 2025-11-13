import { getProductAction } from '@/actions/get-products.action'
import { AppTable } from '@/components/table/app-table'
import { AppPagination } from '@/components/table/app-table-pagination'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePagination } from '@/hooks/use-pagination.hook'
import { formatPriceFromCents } from '@/lib/formatters.utils'
import type { ColumnDef } from '@/types/column-def.type'
import type { Product } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import { Check, EllipsisIcon, Eye, X } from 'lucide-react'

export const ProductScreen = () => {
  const { page, limit, handlePageChange } = usePagination()

  const columns: ColumnDef<Product>[] = [
    {
      key: 'name',
      title: 'Nome',
    },
    {
      key: 'sku',
      title: 'SKU',
    },
    {
      key: 'priceInCents',
      title: 'Preço',
      render: (val) => formatPriceFromCents(Number(val)),
    },
    {
      key: 'stock',
      title: 'Estoque',
    },
    {
      key: 'isActive',
      title: 'Status',
      render: (val) => (
        <Badge variant={val ? 'success' : 'destructive'}>
          {val ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      title: '',
      key: 'id',
      render: (val, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="cursor-pointer">
              <EllipsisIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Eye />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem
              variant={row.isActive ? 'destructive' : 'success'}
            >
              {row.isActive ? (
                <>
                  <X className="text-inherit" />
                  Inativar
                </>
              ) : (
                <>
                  <Check className="text-inherit" />
                  Ativar
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const { data, isFetching } = useQuery({
    queryKey: ['/product', page, limit],
    queryFn: async () => await getProductAction({ page, limit }),
  })

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl">Produtos</h1>
      </div>

      <AppTable
        columns={columns}
        data={data?.products || []}
        isLoading={isFetching}
      />
      <AppPagination
        totalPages={data?.meta.totalPages || 0}
        currentPage={page}
        onChangePage={handlePageChange}
        className="justify-end"
      />
    </div>
  )
}
