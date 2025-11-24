import { api } from '@/lib/axios'
import type { Customer } from '@/types/customer.type'
import type { PaginationMeta } from '@/types/pagination-meta.type'

type CustomerActionParams = {
  q?: string
  company?: string
  page: number
  limit: number
}

type PaginatedCustomer = {
  customers: Customer[]
  meta: PaginationMeta
}

export const getCustomerAction = async ({
  q,
  company,
  limit,
  page,
}: CustomerActionParams): Promise<PaginatedCustomer> => {
  const { data } = await api.get<PaginatedCustomer>('/customer', {
    params: {
      q: q == '' ? undefined : q,
      company: company == 'all' ? undefined : company,
      limit,
      page,
    },
  })

  return data
}
