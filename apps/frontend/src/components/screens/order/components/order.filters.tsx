import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ListFilter } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ORDER_TYPE_LABELS, type OrderType } from '@/types/order-type.type'
import {
  PAYMENT_METHOD_LABELS,
  type PaymentMethod,
} from '@/types/payment-method.type'
import {
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from '@/types/order-status.type'
import { useDebounce } from '@/hooks/use-debounce.hook'
import { MultiSelect, type MultiSelectValue } from '@/components/multi-select'
import {
  labelsToMultiSelect,
  toMultiSelectData,
} from '@/lib/multi-select.utils'

type OrderFiltersProps = {
  onChangeHandler: (filters: OrderFilters) => void
}

export type OrderFilters = {
  q?: string
  type?: MultiSelectValue<OrderType>
  paymentMethod?: MultiSelectValue<PaymentMethod>
  status?: MultiSelectValue<OrderStatus>
}

const defaultFiltersValue: OrderFilters = {
  q: '',
  type: [],
  paymentMethod: [],
  status: [],
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({
  onChangeHandler,
}) => {
  const [filters, setFilters] = useState<OrderFilters>(defaultFiltersValue)
  const debouncedFilters = useDebounce(filters, 400)

  useEffect(() => {
    onChangeHandler(debouncedFilters)
  }, [debouncedFilters])

  return (
    <div className="flex gap-4">
      <Input
        className="max-w-72"
        placeholder="Buscar..."
        value={filters.q}
        onChange={(e) =>
          setFilters((oldVal) => ({ ...oldVal, q: e.target.value }))
        }
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button size={'icon'} variant={'outline'}>
            <ListFilter />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col gap-4">
          <MultiSelect
            data={labelsToMultiSelect(ORDER_TYPE_LABELS)}
            itemLabel={{
              singular: 'tipo',
              plural: 'tipos',
            }}
            placeholder="Selecionar tipo"
            value={toMultiSelectData(filters.type, ORDER_TYPE_LABELS)}
            onChangeHandler={(selected) =>
              setFilters((old) => ({
                ...old,
                type: selected.map((s) => s.id as OrderType),
              }))
            }
          />

          <MultiSelect
            data={labelsToMultiSelect(PAYMENT_METHOD_LABELS)}
            itemLabel={{
              singular: 'método',
              plural: 'métodos',
            }}
            placeholder="Selecionar método"
            value={toMultiSelectData(
              filters.paymentMethod,
              PAYMENT_METHOD_LABELS
            )}
            onChangeHandler={(selected) =>
              setFilters((old) => ({
                ...old,
                paymentMethod: selected.map((s) => s.id as PaymentMethod),
              }))
            }
          />

          <MultiSelect
            data={labelsToMultiSelect(ORDER_STATUS_LABELS)}
            itemLabel={{
              singular: 'status',
              plural: 'status',
            }}
            placeholder="Selecionar status"
            value={toMultiSelectData(filters.status, ORDER_STATUS_LABELS)}
            onChangeHandler={(selected) =>
              setFilters((old) => ({
                ...old,
                status: selected.map((s) => s.id as OrderStatus),
              }))
            }
          />
        </PopoverContent>
      </Popover>

      <Button variant="ghost" onClick={() => setFilters(defaultFiltersValue)}>
        Limpar
      </Button>
    </div>
  )
}
