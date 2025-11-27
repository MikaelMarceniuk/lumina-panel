import { AppTable } from '@/components/table/app-table'
import { AppPagination } from '@/components/table/app-table-pagination'
import type { ColumnDef } from '@/types/column-def.type'
import type { Store } from '@/types/store.type'
import { Ellipsis, Eye, Trash2Icon } from 'lucide-react'
import { useStore } from '../providers/store.provider'
import { StoreTableEmpty } from './store-table.empty'
import { formatPhone } from '@/lib/formatters.utils'
import { useNavigate } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const StoreTable = () => {
  const navigate = useNavigate()
  const { stores, pagination, isFetching, handlePageChange } = useStore()

  const columns: ColumnDef<Store>[] = [
    {
      key: 'name',
      title: 'Nome',
    },
    {
      key: 'manager',
      title: 'Gerente',
      render: (val) => (!val ? '------' : val),
    },
    {
      key: 'contactEmail',
      title: 'Email',
      render: (val) => (!val ? '------' : val),
    },
    {
      key: 'phone',
      title: 'Telefone',
      render: (val) => (!val ? '------' : formatPhone(val)),
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
              onClick={() => navigate(`/dashboard/store/${val}`)}
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
        data={stores}
        isLoading={isFetching}
        emptyState={<StoreTableEmpty />}
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
