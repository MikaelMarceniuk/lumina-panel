import { useCustomerDetails } from '../providers/customer-details.provider'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CustomerDetailsTabWrapper } from '../components/customer-details-tab-wrapper'
import { AddressTabSkeleton } from './address.tab.skeleton'

export const AddressTab = () => {
  const { form, isFetching, isEditing } = useCustomerDetails()

  if (isFetching) {
    return <AddressTabSkeleton />
  }

  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">Endereço</h2>

      <CustomerDetailsTabWrapper>
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="00000-000"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: SP"
                  maxLength={2}
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a cidade"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input
                  placeholder="Rua e número"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input
                  placeholder="Apto, bloco ou referência"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CustomerDetailsTabWrapper>
    </div>
  )
}
