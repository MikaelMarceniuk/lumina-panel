import { api } from '@/lib/axios'
import type { Category } from '@/types/category.type'
import { useQuery } from '@tanstack/react-query'

type useCategoriesParams = {
  query: string
}

export const useCategories = ({ query }: useCategoriesParams) => {
  const { data, isFetching } = useQuery({
    queryKey: ['/category', query],
    queryFn: async () =>
      (
        await api.get<Category[]>('/category', {
          params: { q: query != '' ? query : undefined },
        })
      ).data,
  })

  return {
    categories: data || [],
    isFetching,
  }
}
