import type { Customer } from './customer.type'

export type CustomerDetails = {
  createdAt: string
  updatedAt: string
} & Customer
