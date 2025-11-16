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
import { CategoriesTabSkeleton } from './categories.tab.skeleton'
import { useCategories } from '@/hooks/use-categories.hook'

export const CategoriesTab = () => {
  const { form, isLoading } = useProductDetails()
  const [query, setQuery] = useState('')
  const { categories, isFetching } = useCategories({ query })

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
