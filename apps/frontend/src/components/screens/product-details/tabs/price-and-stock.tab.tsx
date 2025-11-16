import { TabWrapper } from '@/components/layout/tab-wrapper'
import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { MaskedInput } from '@/components/masked-input'
import { useProductDetails } from '../provider/product-details.provider'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PriceAndStockTabSkeleton } from './price-and-stock.tab.skeleton'

export const PriceAndStockTab = () => {
  const { form, isLoading } = useProductDetails()

  if (isLoading) return <PriceAndStockTabSkeleton />

  return (
    <TabWrapper
      title={ProductDetailsTabs.priceAndStock.title}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="priceStock.priceInCents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <MaskedInput mask="money" disabled {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priceStock.stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade em estoque</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  const val = e.target.valueAsNumber
                  field.onChange(isNaN(val) ? '' : val)
                }}
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priceStock.isActive"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ativo</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} disabled {...field}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabWrapper>
  )
}
