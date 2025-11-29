import { AppTable } from '@/components/table/app-table'
import { AppPagination } from '@/components/table/app-table-pagination'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatPhone } from '@/lib/formatters.utils'
import type { ColumnDef } from '@/types/column-def.type'
import type { Deliverer } from '@/types/deliverer.type'
import { Ellipsis, Eye, Trash2Icon } from 'lucide-react'
import { useDeliverers } from '../providers/deliverer.provider'
import { DelivererTableNoResult } from './deliverer-table.no-result'
import { DelivererTableEmpty } from './deliverer-table.empty'
import { useNavigate } from 'react-router'

export const DelivererTable = () => {
  const navigate = useNavigate()
  const { deliverers, pagination, isFetching, handlePageChange } =
    useDeliverers()

  const columns: ColumnDef<Deliverer>[] = [
    {
      key: 'name',
      title: 'Nome',
    },
    {
      key: 'phone',
      title: 'Telefone',
      render: (val) => (!val ? '------' : formatPhone(val as string)),
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
      key: 'id',
      title: '',
      render: (val) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/deliverer/${val}`)}
            >
              <Eye className="text-black dark:text-white" /> Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash2Icon /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <>
      <AppTable
        columns={columns}
        data={deliverers || []}
        isLoading={isFetching}
        emptyState={<DelivererTableEmpty />}
        hasFilters={false}
        noResultsState={<DelivererTableNoResult />}
      />
      <AppPagination
        totalPages={pagination?.totalPages || 0}
        currentPage={pagination?.page || 1}
        onChangePage={handlePageChange}
        className="justify-end"
      />
    </>
  )
}
