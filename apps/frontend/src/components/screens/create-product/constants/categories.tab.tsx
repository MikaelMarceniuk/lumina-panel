import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'
import { useState } from 'react'
import type { Category } from '@/types/category.type'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { MultiSelect } from '@/components/multi-select'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useCreateProduct } from '../provider/create-product.provider'

export const CategoriesTab = () => {
  const { form } = useCreateProduct()
  const [query, setQuery] = useState('')

  const { data, isFetching } = useQuery({
    queryKey: ['/category', query],
    queryFn: async () =>
      (
        await api.get<Category[]>('/category', {
          params: { q: query != '' ? query : undefined },
        })
      ).data,
  })

  return (
    <TabWrapper title={CreateProductTabs.categories.title}>
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
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabWrapper>
  )
}
