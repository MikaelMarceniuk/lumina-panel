import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useCustomerDetails } from '../providers/customer-details.provider'
import { Input } from '@/components/ui/input'
import { CustomerDetailsTabWrapper } from '../components/customer-details-tab-wrapper'
import { BasicInformationsTabSkeleton } from './basic-informations.tab.skeleton'
import { MaskedInput } from '@/components/masked-input'

export const BasicInformationsTab = () => {
  const { form, isFetching, isEditing } = useCustomerDetails()

  if (isFetching) {
    return <BasicInformationsTabSkeleton />
  }

  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">Informações Básicas</h2>

      <CustomerDetailsTabWrapper>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome completo"
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
          name="document"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Documento</FormLabel>
              <FormControl>
                <MaskedInput
                  mask="cpfCnpj"
                  placeholder="Digite o CPF ou CNPJ"
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
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da empresa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome da empresa"
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
