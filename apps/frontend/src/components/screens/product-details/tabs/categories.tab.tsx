import { TabWrapper } from '@/components/layout/tab-wrapper'
import { useProductDetails } from '../provider/product-details.provider'
import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { MultiSelect } from '@/components/multi-select'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { Category } from '@/types/category.type'
import { CategoriesTabSkeleton } from './categories.tab.skeleton'

export const CategoriesTab = () => {
  const { form, isLoading } = useProductDetails()
  const [query, setQuery] = useState('')

  // TODO Create a useCategoryHook
  const { data, isFetching } = useQuery({
    queryKey: ['/category', query],
    queryFn: async () =>
      (
        await api.get<Category[]>('/category', {
          params: { q: query != '' ? query : undefined },
        })
      ).data,
  })

  if (isLoading) return <CategoriesTabSkeleton />

  return (
    <TabWrapper title={ProductDetailsTabs.categories.title}>
      <FormField
        control={form.control}
        name="categories.categories"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <MultiSelect
                data={data || []}
                placeholder="Selecionar categorias..."
                itemLabel={{
                  singular: 'categoria',
                  plural: 'categorias',
                }}
                value={field.value || []}
                onChangeHandler={field.onChange}
                onQueryChange={setQuery}
                isLoading={isFetching}
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabWrapper>
  )
}
