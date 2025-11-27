import { TabWrapper } from '@/components/layout/tab-wrapper'
import { storeDetailsTabs } from '../constants/tabs.contants'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useStoreDetails } from '../provider/store-details.provider'
import { MaskedInput } from '@/components/masked-input'
import { Input } from '@/components/ui/input'
import { AddressTabSkeleton } from './address.tab.skeleton'

export const AddressTab = () => {
  const { mode, form, isFetching, isSubmitting } = useStoreDetails()
  const isReadMode = mode == 'read'

  if (isFetching) {
    return <AddressTabSkeleton />
  }

  return (
    <TabWrapper title={storeDetailsTabs.address.title} className="space-y-4">
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="address.zipCode"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <MaskedInput
                  mask="cep"
                  placeholder="00000-000"
                  disabled={isSubmitting || isReadMode}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address.state"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: SP"
                  disabled={isSubmitting || isReadMode}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address.city"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <Input
                placeholder="Ex.: São Paulo"
                disabled={isSubmitting || isReadMode}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address.address"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <Input
                placeholder="Rua / Avenida / Número"
                disabled={isSubmitting || isReadMode}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address.addressComplement"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Complemento</FormLabel>
            <FormControl>
              <Input
                placeholder="Apto, bloco, sala..."
                disabled={isSubmitting || isReadMode}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabWrapper>
  )
}
