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
import { api } from '@/lib/axios'
import type { Customer } from '@/types/customer.type'
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

const filtersSchema = z.object({
  q: z.string(),
  company: z.string(),
})

type filtersSchema = z.infer<typeof filtersSchema>

const initialFiltersValue = { q: '', company: 'all' }

export const CustomerScreen = () => {
  const [filters, setFilters] = useState<filtersSchema>(initialFiltersValue)
  const debouncedFilters = useDebounce(filters, 600)

  const { data } = useQuery({
    queryKey: ['/customer'],
    queryFn: async () => {
      const customer = (await api.get<Customer[]>('/customer')).data
      return customer.splice(0, 10)
    },
  })

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

      <Table className="max-h-[70vh]">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.phone ? formatPhone(c.phone) : '-----'}</TableCell>
              <TableCell>
                {c.document
                  ? isValidCNPJ(c.document)
                    ? formatCNPJ(c.document)
                    : formatCPF(c.document)
                  : '-----'}
              </TableCell>
              <TableCell>{c.companyName}</TableCell>
              <TableCell>
                <Ellipsis />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
