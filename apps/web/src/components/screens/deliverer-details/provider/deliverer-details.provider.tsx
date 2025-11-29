import { Form } from '@/components/ui/form'
import {
  useDetailsPageMode,
  type UseDetailsPageModeReturn,
} from '@/hooks/use-details-page-mode.hook'
import type { withChildren } from '@/types/with-children.type'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import {
  defaultValues,
  updateDelivererSchema,
  type UpdateDelivererInput,
} from '../schema/update-deliverer.schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { api } from '@/lib/axios'
import type { DelivererDetails } from '@/types/deliverer-details.type'
import { useTabs, type UseTabsReturn } from '@/hooks/use-tabs.hook'
import {
  delivererDetailsTabs,
  type DelivererDetailsTabs,
  type DelivererDetailsTabsKeys,
} from '../constants/tabs.contants'
import type { VehicleType } from '@/types/vehicle-type.type'
import { emptyToUndefined } from '@/lib/empty-to-undefined.utils'
import { toast } from 'sonner'
import { DelivererDetailsCancelAlert } from '../components/deliverer-details.cancel-alert'

type DelivererDetailsContext = {
  deliverer?: DelivererDetails
  isFetching: boolean

  form: UseFormReturn<UpdateDelivererInput>
  isSubmitting: boolean

  openAlertHandler: () => void
} & UseDetailsPageModeReturn &
  UseTabsReturn<DelivererDetailsTabs, DelivererDetailsTabsKeys>

const DelivererDetailsContext = createContext({} as DelivererDetailsContext)

export const DelivererDetailsProvider: React.FC<withChildren> = ({
  children,
}) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const detailsPageMode = useDetailsPageMode()
  const tabs = useTabs<DelivererDetailsTabs, DelivererDetailsTabsKeys>(
    delivererDetailsTabs,
    'generalInfo'
  )
  const [isAlertOpen, setAlertOpen] = useState(false)

  const { data, isFetching } = useQuery({
    queryKey: ['/deliverer-details', id],
    queryFn: async () =>
      (await api.get<DelivererDetails>(`/deliverer/${id}`)).data,
    enabled: !!id,
  })

  const form = useForm({
    resolver: zodResolver(updateDelivererSchema),
    defaultValues,
  })

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        phone: data.phone ?? '',
        vehicleType: data.vehicleType ?? ('' as VehicleType),
        plateNumber: data.plateNumber ?? '',
        isActive: data.isActive,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    }
  }, [data])

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UpdateDelivererInput) =>
      await api.patch(`/deliverer/${id}`, emptyToUndefined(data)),
    onSuccess: () => {
      toast.success('Sucesso ao atualizar entregador')
      navigate('/dashboard/deliverer')
    },
  })

  const onSubmitHandler = form.handleSubmit(
    async (data) => await mutateAsync(data)
  )

  return (
    <DelivererDetailsContext.Provider
      value={{
        deliverer: data,
        isFetching,

        form,
        isSubmitting: form.formState.isSubmitting,

        openAlertHandler: () => setAlertOpen(true),

        ...detailsPageMode,
        ...tabs,
      }}
    >
      <Form {...form}>
        <form onSubmit={onSubmitHandler}>{children}</form>
      </Form>
      <DelivererDetailsCancelAlert
        isOpen={isAlertOpen}
        handleOpenChange={setAlertOpen}
        handleBack={() => setAlertOpen(false)}
        handleAction={() => {
          detailsPageMode.changeModeHandler('read')
          form.reset()
        }}
      />
    </DelivererDetailsContext.Provider>
  )
}

export const useDelivererDetails = () => {
  const ctx = useContext(DelivererDetailsContext)
  if (!ctx) {
    throw new Error(
      'useDelivererDetails must be used inside DelivererDetailsProvider'
    )
  }

  return ctx
}
