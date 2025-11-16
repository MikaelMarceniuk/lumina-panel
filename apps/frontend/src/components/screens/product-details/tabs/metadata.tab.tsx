import { TabWrapper } from '@/components/layout/tab-wrapper'
import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'
import { useProductDetails } from '../provider/product-details.provider'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MetadataSkeleton } from './metadata.tab.skeleton'

export const MetadataTab = () => {
  const { form, isLoading } = useProductDetails()

  if (isLoading) return <MetadataSkeleton />

  return (
    <TabWrapper title={ProductDetailsTabs.metadata.title} className="space-y-4">
      <FormField
        control={form.control}
        name="metadata.createdAt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Criado em</FormLabel>
            <FormControl>
              <Input disabled value={field.value} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metadata.updatedAt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Atualizado em</FormLabel>
            <FormControl>
              <Input disabled value={field.value} />
            </FormControl>
          </FormItem>
        )}
      />
    </TabWrapper>
  )
}
