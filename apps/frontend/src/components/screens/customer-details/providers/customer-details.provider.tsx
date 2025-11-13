import { api } from '@/lib/axios'
import { customerSchema, type CustomerSchema } from '@/schemas/customer.schema'
import type { CustomerDetails } from '@/types/customer-details.type'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useMutation,
  useQuery,
  type UseMutateAsyncFunction,
} from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import type { CustomerDetailsTabs } from '../constants/customer-details-tabs.constant'
import { CustomerDetailsAlert } from '../components/customer-details-alert.dialog'

type CustomerDetailsContext = {
  customer: CustomerDetails | undefined
  isFetching: boolean
  form: UseFormReturn<CustomerSchema>
  resetForm: () => void
  isEditing: boolean
  toggleEditing: (needUserConfirmation?: boolean) => void
  currentTab: keyof typeof CustomerDetailsTabs
  changeCurrentTab: (tab: keyof typeof CustomerDetailsTabs) => void
  update: UseMutateAsyncFunction<
    CustomerDetails,
    Error,
    CustomerSchema,
    unknown
  >
}

const CustomerDetailsContext = createContext<CustomerDetailsContext>(
  {} as CustomerDetailsContext
)

type CustomerDetailsProviderProps = {
  children: React.ReactNode
  id: string
}

export const CustomerDetailsProvider: React.FC<
  CustomerDetailsProviderProps
> = ({ children, id }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false)
  const [currentTab, setCurrentTab] =
    useState<keyof typeof CustomerDetailsTabs>('basicInformations')

  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      document: '',
      companyName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  })

  const { data, isFetching } = useQuery({
    queryKey: ['/customer', id],
    queryFn: async () =>
      (await api.get<CustomerDetails>(`/customer/${id}`)).data,
    enabled: !!id,
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CustomerSchema) =>
      (await api.patch<CustomerDetails>(`/customer/${id}`, data)).data,
  })

  const toggleEditing = (needUserConfirmation: boolean = true) => {
    if (needUserConfirmation && isEditing) {
      setAlertOpen(true)
      return
    }

    setIsEditing(!isEditing)
  }

  const changeCurrentTab = (tab: keyof typeof CustomerDetailsTabs) =>
    setCurrentTab(tab)

  const resetForm = () => {
    if (data) {
      form.setValue('name', data.name)
      form.setValue('email', data.email)
      form.setValue('phone', data.phone || undefined)
      form.setValue('document', data.document || undefined)
      form.setValue('companyName', data.companyName || undefined)
      form.setValue('address', data.address || undefined)
      form.setValue('city', data.city || undefined)
      form.setValue('state', data.state || undefined)
      form.setValue('zipCode', data.zipCode || undefined)
      return
    }

    form.reset()
  }

  useEffect(() => {
    resetForm()
  }, [data])

  return (
    <CustomerDetailsContext.Provider
      value={{
        customer: data,
        isFetching,
        form,
        resetForm,
        isEditing,
        toggleEditing,
        currentTab,
        changeCurrentTab,
        update: mutateAsync,
      }}
    >
      {children}
      <CustomerDetailsAlert
        isOpen={isAlertOpen}
        handleOnOpenChange={setAlertOpen}
      />
    </CustomerDetailsContext.Provider>
  )
}

export const useCustomerDetails = () => {
  const ctx = useContext(CustomerDetailsContext)
  if (!ctx) {
    throw new Error(
      'useCustomerDetails must be used within CustomerDetailsProvider'
    )
  }
  return ctx
}
