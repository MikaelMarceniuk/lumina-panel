import { getOrderAction } from '@/actions/get-oders.action'
import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { AppTable } from '@/components/table/app-table'
import { AppPagination } from '@/components/table/app-table-pagination'
import { Badge, type BadgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePagination } from '@/hooks/use-pagination.hook'
import { orderStatusVariant } from '@/lib/order-status.variant.utils'
import type { ColumnDef } from '@/types/column-def.type'
import { orderStatusLabel, type OrderStatus } from '@/types/order-status.type'
import { orderTypeLabel, type OrderType } from '@/types/order-type.type'
import type { Order } from '@/types/order.type'
import {
  paymentMethodLabel,
  type PaymentMethod,
} from '@/types/payment-method.type'
import { useQuery } from '@tanstack/react-query'
import { EllipsisIcon, Eye, Plus } from 'lucide-react'
import { useNavigate } from 'react-router'

export const OrderScreen = () => {
  const navigate = useNavigate()
  const { page, limit, handlePageChange } = usePagination()
  const { data, isFetching } = useQuery({
    queryKey: ['/order', page, limit],
    queryFn: () => getOrderAction({ page, limit }),
  })

  const columns: ColumnDef<Order>[] = [
    {
      key: 'orderCode',
      title: 'Código',
    },
    {
      key: 'type',
      title: 'Tipo',
      render: (val) => orderTypeLabel(val as OrderType),
    },
    {
      key: 'paymentMethod',
      title: 'Método de pagamento',
      render: (val) => paymentMethodLabel(val as PaymentMethod),
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => (
        <Badge variant={orderStatusVariant(val as OrderStatus)}>
          {orderStatusLabel(val as OrderStatus)}
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
              onClick={() => navigate(`/dashboard/order/${val}`)}
            >
              <Eye />
              Visualizar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <ScreenWrapper>
      <div className="flex justify-between">
        <h1 className="text-4xl">Pedidos</h1>
        <Button type="button">
          <Plus />
          Novo pedido
        </Button>
      </div>

      <AppTable
        columns={columns}
        data={data?.orders || []}
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
