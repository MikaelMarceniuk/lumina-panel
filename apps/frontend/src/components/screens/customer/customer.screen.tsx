import { Ellipsis, Plus } from 'lucide-react'
import { Button } from '../../ui/button'
import { CreateCustomerDialog } from './create-customer.dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { getCustomerAction } from '@/actions/get-customers.action'
import { AppTable } from '@/components/table/app-table'
import type { ColumnDef } from '@/types/column-def.type'
import type { Customer } from '@/types/customer.type'

const filtersSchema = z.object({
  q: z.string(),
  company: z.string(),
  page: z.number(),
  limit: z.number(),
})

type filtersSchema = z.infer<typeof filtersSchema>

const initialFiltersValue = { q: '', company: 'all', page: 1, limit: 10 }

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
  const [filters, setFilters] = useState<filtersSchema>(initialFiltersValue)
  const debouncedFilters = useDebounce(filters, 600)

  const { data, isFetching } = useQuery({
    queryKey: ['/customer', debouncedFilters],
    queryFn: async () => await getCustomerAction({ ...debouncedFilters }),
  })

  const handlePageChange = (page: number) => {
    if (page < 1 || (data && page > data.meta.totalPages)) return
    setFilters((old) => ({ ...old, page }))
  }

  const handleChange = (key: keyof filtersSchema, value: string) =>
    setFilters((old) => ({ ...old, [key]: value }))

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
        <Button variant="ghost" onClick={() => setFilters(initialFiltersValue)}>
          Limpar
        </Button>
      </div>

      <AppTable
        columns={columns}
        data={data?.customers || []}
        isLoading={isFetching}
      />

      {data && data.meta.totalPages > 1 && (
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem
              className="cursor-pointer"
              onClick={() => handlePageChange(filters.page - 1)}
            >
              <PaginationPrevious />
            </PaginationItem>

            {Array.from({ length: data.meta.totalPages }).map((_, i) => (
              <PaginationItem
                key={i}
                className={`cursor-pointer ${filters.page === i + 1 ? 'font-bold' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                <PaginationLink isActive={filters.page === i + 1}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem
              className="cursor-pointer"
              onClick={() => handlePageChange(filters.page + 1)}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  )
}
