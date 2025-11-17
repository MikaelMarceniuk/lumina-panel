import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'
import { useState } from 'react'
import { DebounceMultiSelect } from '@/components/debounce-multi-select'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useCreateProduct } from '../provider/create-product.provider'
import { useCategories } from '@/hooks/use-categories.hook'

export const CategoriesTab = () => {
  const { form } = useCreateProduct()
  const [query, setQuery] = useState('')
  const { categories, isFetching } = useCategories({ query })

  return (
    <TabWrapper title={CreateProductTabs.categories.title}>
      <FormField
        control={form.control}
        name="categories.categories"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <DebounceMultiSelect
                data={categories}
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
