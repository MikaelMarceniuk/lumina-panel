import { TabWrapper } from '@/components/layout/tab-wrapper'
import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'
import { useProductDetails } from '../provider/product-details.provider'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BasicInformationsTabSkeleton } from './basic-informations.tab.skeleton'

export const BasicInformationsTab = () => {
  const { form, isLoading, isEditing } = useProductDetails()

  if (isLoading) return <BasicInformationsTabSkeleton />

  return (
    <TabWrapper
      title={ProductDetailsTabs.basicInformations.title}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="basicInfo.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome*</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Ex: Camiseta Básica"
                disabled={!isEditing}
                {...field}
              />
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
              <Input
                type="text"
                placeholder="SKU12345"
                disabled={!isEditing}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabWrapper>
  )
}
