import { Ellipsis, Plus } from 'lucide-react'
import { Button } from '../../ui/button'
import { CreateCustomerDialog } from './create-customer.dialog'
import { useQuery } from '@tanstack/react-query'
import {
  formatCNPJ,
  formatCPF,
  formatPhone,
  isValidCNPJ,
} from '@/lib/formatters.utils'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import z from 'zod'
import { useDebounce } from '@/hooks/use-debounce.hook'
import { getCustomerAction } from '@/actions/get-customers.action'
import { AppTable } from '@/components/table/app-table'
import type { ColumnDef } from '@/types/column-def.type'
import type { Customer } from '@/types/customer.type'
import { AppPagination } from '@/components/table/app-table-pagination'
import { usePagination } from '@/hooks/use-pagination.hook'

const filtersSchema = z.object({
  q: z.string(),
  company: z.string(),
})
type FiltersSchema = z.infer<typeof filtersSchema>

const initialFiltersValue: FiltersSchema = {
  q: '',
  company: 'all',
}

const columns: ColumnDef<Customer>[] = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  {
    title: 'Telefone',
    key: 'phone',
    render: (val) => (val ? formatPhone(val) : '-----'),
  },
  {
    title: 'Documento',
    key: 'document',
    render: (val) =>
      val ? (isValidCNPJ(val) ? formatCNPJ(val) : formatCPF(val)) : '-----',
  },
  { title: 'Empresa', key: 'companyName' },
  { title: '', key: 'id', render: () => <Ellipsis /> },
]

export const CustomerScreen = () => {
  const [filters, setFilters] = useState<FiltersSchema>(initialFiltersValue)
  const { page, limit, handlePageChange, resetPagination } = usePagination()
  const debouncedFilters = useDebounce(filters, 600)

  const { data, isFetching } = useQuery({
    queryKey: ['/customer', debouncedFilters, page, limit],
    queryFn: async () =>
      await getCustomerAction({ ...debouncedFilters, page, limit }),
  })

  const handleChange = (key: keyof FiltersSchema, value: string) => {
    setFilters((old) => ({ ...old, [key]: value }))
    resetPagination()
  }

  return (
    <main className="space-y-4 px-4 py-2">
      <div className="flex justify-between">
        <h1 className="text-4xl">Clientes</h1>
        <CreateCustomerDialog>
          <Button>
            <Plus />
            Criar Cliente
          </Button>
        </CreateCustomerDialog>
      </div>

      <div className="flex gap-4">
        <Input
          className="max-w-72"
          placeholder="Buscar..."
          value={filters.q}
          onChange={(e) => handleChange('q', e.target.value)}
        />
        <Select
          value={filters.company}
          onValueChange={(v) => handleChange('company', v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as empresas</SelectItem>
            <SelectItem value="lumine">Lumine</SelectItem>
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
        data={data?.customers || []}
        isLoading={isFetching}
      />
      <AppPagination
        totalPages={data?.meta.totalPages || 0}
        currentPage={page}
        onChangePage={handlePageChange}
        className="justify-end"
      />
    </main>
  )
}
