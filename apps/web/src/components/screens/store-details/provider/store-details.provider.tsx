import { api } from '@/lib/axios'
import type { StoreDetails } from '@/types/store-details.type'
import type { withChildren } from '@/types/with-children.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import {
  storeDetailsTabs,
  type StoreDetailsTabs,
  type StoreDetailsTabsKeys,
} from '../constants/tabs.contants'
import { useTabs, type TabList } from '@/hooks/use-tabs.hook'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  defaultValues,
  updateStoreSchema,
  type UpdateStoreInput,
} from '../schema/update-store.schema'
import { Form } from '@/components/ui/form'
import { formatDateToBrazil } from '@/lib/date-formatter.utils'
import { emptyToUndefined } from '@/lib/empty-to-undefined.utils'
import type { StorePaginated } from '@/types/store-paginated.type'
import { StoreDetailsCancelAlert } from '../components/store-details.cancel-alert'

type Mode = 'read' | 'update'

type StoreDetailsContext = {
  mode: Mode
  handleChangeMode: (mode: Mode) => void

  store: StoreDetails | undefined
  isFetching: boolean

  tabList: TabList<StoreDetailsTabs>[]
  currentTab: TabList<StoreDetailsTabs>
  currentTabKey: StoreDetailsTabsKeys
  handleTabChange: (key: StoreDetailsTabsKeys) => void

  form: UseFormReturn<UpdateStoreInput>
  isSubmitting: boolean

  openAlert: () => void
}

const StoreDetailsContext = createContext({} as StoreDetailsContext)

export const StoreDetailsProvider: React.FC<withChildren> = ({ children }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const [mode, setMode] = useState<Mode>('read')
  const { tabList, currentTab, currentTabKey, handleTabChange } = useTabs<
    StoreDetailsTabs,
    StoreDetailsTabsKeys
  >(storeDetailsTabs, 'generalInfo')
  const [isAlertOpen, setAlertOpen] = useState(false)

  const { data: store, isFetching } = useQuery({
    queryKey: ['/store-details', id],
    queryFn: async () => (await api.get<StoreDetails>(`/store/${id}`)).data,
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UpdateStoreInput) => {
      const body = {
        name: data.generalInfo.name,
        manager: data.generalInfo.manager,
        phone: data.generalInfo.phone,
        contactEmail: data.generalInfo.contactEmail,
        address: data.address.address,
        addressComplement: data.address.addressComplement,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode,
      }

      return (
        await api.patch<StoreDetails>(`/store/${id}`, {
          ...emptyToUndefined(body),
        })
      ).data
    },
    onSuccess: (updatedStore) => {
      toast.success('Sucesso ao editar loja')

      // Atualiza /stores
      queryClient.setQueriesData(
        { queryKey: ['/stores'], exact: false },
        (old: StorePaginated | undefined) => {
          if (!old) return old
          return {
            ...old,
            data: old.stores.map((s) =>
              s.id === updatedStore.id ? updatedStore : s
            ),
          }
        }
      )

      // Atualiza detalhes da loja
      queryClient.setQueryData(['/store-details', id], updatedStore)

      navigate('/dashboard/store')
    },
  })

  useEffect(() => {
    if (!id) {
      toast.error('Loja não encontrada.')
      navigate('/dashboard/store', { replace: true })
    }
  }, [id])

  useEffect(() => {
    if (store) {
      form.reset({
        generalInfo: {
          name: store.name,
          manager: store.manager || '',
          contactEmail: store.contactEmail || '',
          phone: store.phone || '',
        },
        address: {
          address: store.address || '',
          addressComplement: store.addressComplement || '',
          city: store.city || '',
          state: store.state || '',
          zipCode: store.zipCode || '',
        },
        history: {
          createdAt: formatDateToBrazil(store.createdAt.toString()),
          updatedAt: formatDateToBrazil(store.updatedAt.toString()),
        },
      })
    }
  }, [store])

  const form = useForm({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: defaultValues,
  })

  const handleSubmit = form.handleSubmit(
    async (data) => await mutateAsync(data)
  )

  const handleChangeMode = (mode: Mode) => setMode(mode)

  return (
    <StoreDetailsContext.Provider
      value={{
        mode,
        handleChangeMode,

        store,
        isFetching,

        tabList,
        currentTab,
        currentTabKey,
        handleTabChange,

        form,
        isSubmitting: form.formState.isSubmitting,

        openAlert: () => setAlertOpen(true),
      }}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit}>{children}</form>
      </Form>
      <StoreDetailsCancelAlert
        isOpen={isAlertOpen}
        handleOpenChange={setAlertOpen}
        handleBack={() => setAlertOpen(false)}
        handleAction={() => {
          setMode('read')
          form.reset()
        }}
      />
    </StoreDetailsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreDetails = () => {
  const ctx = useContext(StoreDetailsContext)
  if (!ctx) {
    throw new Error('useStoreDetails must be used inside StoreDetailsProvider.')
  }
  return ctx
}
