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

export const CustomerScreen = () => {
  const { data } = useQuery({
    queryKey: ['/customer'],
    queryFn: async () => {
      const customer = (await api.get<Customer[]>('/customer')).data
      return customer.splice(0, 10)
    },
  })

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

      <Table className="h-[70vh]">
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
