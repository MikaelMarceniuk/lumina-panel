import { getProductAction } from '@/actions/get-products.action'
import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { AppTable } from '@/components/table/app-table'
import { AppPagination } from '@/components/table/app-table-pagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/use-debounce.hook'
import { usePagination } from '@/hooks/use-pagination.hook'
import { api } from '@/lib/axios'
import { formatPriceFromCents } from '@/lib/formatters.utils'
import type { ColumnDef } from '@/types/column-def.type'
import type { Product } from '@/types/product.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, EllipsisIcon, Eye, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import z from 'zod'

const filtersSchema = z.object({
  q: z.string(),
  status: z.enum(['all', 'active', 'inactive']),
})
type FiltersSchema = z.infer<typeof filtersSchema>

const AvailableStatus = {
  all: 'Todos os status',
  active: 'Ativo',
  inactive: 'Inativo',
}

const initialFiltersValue: FiltersSchema = {
  q: '',
  status: 'all',
}

export const ProductScreen = () => {
  const navigate = useNavigate()
  const { page, limit, handlePageChange, resetPagination } = usePagination()
  const [filters, setFilters] = useState(initialFiltersValue)
  const debouncedFilters = useDebounce(filters, 600)

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
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/product/${val}`)}
            >
              <Eye />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem
              variant={row.isActive ? 'destructive' : 'success'}
              onClick={async () =>
                await toggleActive(val as string, {
                  onSuccess: () => refetch(),
                })
              }
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

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['/product', debouncedFilters, page, limit],
    queryFn: async () =>
      await getProductAction({ ...debouncedFilters, page, limit }),
  })

  const { mutateAsync: toggleActive } = useMutation({
    mutationFn: async (id: string) => await api.put(`/product/${id}/is_active`),
  })

  const handleChange = (key: keyof FiltersSchema, value: string) => {
    setFilters((old) => ({ ...old, [key]: value }))
    resetPagination()
  }

  return (
    <ScreenWrapper>
      <div className="flex justify-between">
        <h1 className="text-4xl">Produtos</h1>
        <Button onClick={() => navigate('/dashboard/product/create')}>
          <Plus />
          Novo produto
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          className="max-w-72"
          placeholder="Buscar..."
          value={filters.q}
          onChange={(e) => handleChange('q', e.target.value)}
        />
        <Select
          value={filters.status}
          onValueChange={(v) => handleChange('status', v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(AvailableStatus).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          onClick={() => {
            setFilters(initialFiltersValue)
            resetPagination()
          }}
        >
          Limpar
        </Button>
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
    </ScreenWrapper>
  )
}
