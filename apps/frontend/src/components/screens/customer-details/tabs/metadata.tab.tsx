import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCustomerDetails } from '../providers/customer-details.provider'
import { formatDateToBrazil } from '@/lib/date-formatter.utils'
import { MetadataSkeleton } from './metadata.tab.skeleton'

export const MetadataTab = () => {
  const { customer, isFetching } = useCustomerDetails()

  if (isFetching) {
    return <MetadataSkeleton />
  }

  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">Metadados</h2>

      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="createdAt">Criado em</FieldLabel>
          <Input
            id="createdAt"
            disabled
            value={
              customer?.createdAt ? formatDateToBrazil(customer.createdAt) : ''
            }
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="updatedAt">Última vez atualizado</FieldLabel>
          <Input
            id="updatedAt"
            disabled
            value={
              customer?.updatedAt ? formatDateToBrazil(customer.updatedAt) : ''
            }
          />
        </Field>
      </div>
    </div>
  )
}
