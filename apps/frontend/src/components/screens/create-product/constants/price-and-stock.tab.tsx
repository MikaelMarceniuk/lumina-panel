import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateProduct } from '../provider/create-product.provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MaskedInput } from '@/components/masked-input'

export const PriceAndStockTab = () => {
  const { form } = useCreateProduct()

  return (
    <TabWrapper
      title={CreateProductTabs.priceAndStock.title}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="priceStock.priceInCents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <MaskedInput mask="money" {...field} />
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
              <Select onValueChange={field.onChange} {...field}>
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
