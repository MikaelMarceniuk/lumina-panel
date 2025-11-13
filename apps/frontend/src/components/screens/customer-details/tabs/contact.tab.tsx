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

export const ContactTab = () => {
  const { form, isEditing } = useCustomerDetails()

  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">Contato</h2>

      <CustomerDetailsTabWrapper>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="exemplo@dominio.com"
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
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(11) 99999-9999"
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
