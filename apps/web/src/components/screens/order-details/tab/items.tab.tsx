import { TabWrapper } from '@/components/layout/tab-wrapper'
import { OrderDetailsTabs } from '../constants/order-details.tabs.constants'
import { AppTable } from '@/components/table/app-table'
import { useOrderDetails } from '../provider/order-details.provider'
import type { ColumnDef } from '@/types/column-def.type'
import type { OrderItem } from '@/types/order-item.type'
import { formatPriceFromCents } from '@/lib/formatters.utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const columns: ColumnDef<OrderItem>[] = [
  {
    key: 'product.name',
    title: 'Nome',
    render: (_, row) => row.product.name,
  },
  {
    key: 'product.sku',
    title: 'SKU',
    render: (_, row) => row.product.sku,
  },
  {
    key: 'quantity',
    title: 'Quantidade',
  },
  {
    key: 'unitPriceInCents',
    title: 'Preço',
    render: (val) => formatPriceFromCents(val as number),
  },
  {
    key: 'totalInCents',
    title: 'Total',
    render: (val) => formatPriceFromCents(val as number),
  },
]

export const ItemsTab = () => {
  const { form, isFetching } = useOrderDetails()
  const itemsWatcher = form.watch('items.items')
  const subtotal = form.watch('price.subtotalInCents')
  const discount = form.watch('price.discountInCents')
  const total = form.watch('price.totalInCents')

  return (
    <TabWrapper title={OrderDetailsTabs.items.title} className="space-y-4">
      <ScrollArea className="max-h-128! overflow-auto">
        <AppTable
          data={itemsWatcher || []}
          columns={columns}
          isLoading={isFetching}
        />
      </ScrollArea>

      <div className="flex justify-end gap-6 border-t border-gray-200 p-4">
        {/* Subtotal */}
        <div className="text-right">
          <div className="text-sm text-gray-500">Subtotal</div>
          <div className="font-medium">
            {subtotal ? formatPriceFromCents(subtotal) : ''}
          </div>
        </div>

        {/* Desconto */}
        <div className="text-right">
          <div className="text-sm text-gray-500">Desconto</div>
          <div className="font-medium text-red-600">
            {discount ? `- ${formatPriceFromCents(discount)}` : '-'}
          </div>
        </div>

        {/* Total */}
        <div className="text-right">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-lg font-semibold">
            {total ? formatPriceFromCents(total) : ''}
          </div>
        </div>
      </div>
    </TabWrapper>
  )
}
