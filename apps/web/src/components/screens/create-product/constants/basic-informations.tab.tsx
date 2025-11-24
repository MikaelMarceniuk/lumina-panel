import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useCreateProduct } from '../provider/create-product.provider'
import { Input } from '@/components/ui/input'

export const BasicInformationsTab = () => {
  const { form } = useCreateProduct()

  return (
    <TabWrapper
      title={CreateProductTabs.basicInformations.title}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="basicInfo.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome*</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: Camiseta Básica" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="basicInfo.sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SKU*</FormLabel>
            <FormControl>
              <Input type="text" placeholder="SKU12345" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabWrapper>
  )
}
