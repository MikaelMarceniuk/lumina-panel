import { TabWrapper } from '@/components/layout/tab-wrapper'
import { OrderDetailsTabs } from '../constants/order-details.tabs.constants'
import { useOrderDetails } from '../provider/order-details.provider'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ORDER_STATUS_LABELS } from '@/types/order-status.type'
import { orderTypeLabel, type OrderType } from '@/types/order-type.type'
import { formatDateToBrazil } from '@/lib/date-formatter.utils'
import { MaskedInput } from '@/components/masked-input'
import { formatPriceFromCents } from '@/lib/formatters.utils'
import { Separator } from '@/components/ui/separator'

export const DetailsTab = () => {
  const { form } = useOrderDetails()

  return (
    <TabWrapper title={OrderDetailsTabs.details.title} className="space-y-8">
      {/* --- SEÇÃO: Pedido --- */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground text-sm font-medium">Pedido</h3>
        <Separator />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="basicInfo.orderCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basicInfo.status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ORDER_STATUS_LABELS).map(
                        ([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basicInfo.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={orderTypeLabel(field.value as OrderType)}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basicInfo.createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Criado em</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? formatDateToBrazil(field.value) : ''}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basicInfo.updatedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Última atualização</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? formatDateToBrazil(field.value) : ''}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* --- SEÇÃO: Cliente --- */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground text-sm font-medium">Cliente</h3>
        <Separator />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="customer.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <MaskedInput {...field} mask="phone" disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* --- SEÇÃO: Valores --- */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground text-sm font-medium">Valores</h3>
        <Separator />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="price.subtotalInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtotal</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? formatPriceFromCents(field.value) : ''}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price.discountInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desconto</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? formatPriceFromCents(field.value) : ''}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price.totalInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? formatPriceFromCents(field.value) : ''}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </TabWrapper>
  )
}
