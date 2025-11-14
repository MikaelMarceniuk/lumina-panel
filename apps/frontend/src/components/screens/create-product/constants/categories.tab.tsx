import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'
import { useState } from 'react'
import type { Category } from '@/types/category.type'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { MultiSelect } from '@/components/multi-select'

export const CategoriesTab = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
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
      <MultiSelect
        data={data || []}
        placeholder="Selecionar categorias..."
        itemLabel={{
          singular: 'categoria',
          plural: 'categorias',
        }}
        value={selectedCategories}
        onChangeHandler={setSelectedCategories}
        onQueryChange={setQuery}
        isLoading={isFetching}
      />
    </TabWrapper>
  )
}
