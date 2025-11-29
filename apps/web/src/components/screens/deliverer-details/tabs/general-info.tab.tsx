import { TabWrapper } from '@/components/layout/tab-wrapper'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MaskedInput } from '@/components/masked-input'
import { GeneralInfoTabSkeleton } from './general-info.tab.skeleton'
import { useDelivererDetails } from '../provider/deliverer-details.provider'
import { delivererDetailsTabs } from '../constants/tabs.contants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { vehicleTypeLabel, vehicleTypeValues } from '@/types/vehicle-type.type'

export const GeneralInfoTab = () => {
  const { isReadMode, form, isFetching, isSubmitting } = useDelivererDetails()

  if (isFetching) {
    return <GeneralInfoTabSkeleton />
  }

  return (
    <TabWrapper
      title={delivererDetailsTabs.generalInfo.title}
      className="space-y-4"
    >
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting || isReadMode} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <MaskedInput
                  mask="phone"
                  placeholder="(00) 00000-0000"
                  disabled={isSubmitting || isReadMode}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="plateNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Número da placa</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting || isReadMode} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // TODO Fix value */}
        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Tipo de veículo</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting || isReadMode}
                >
                  <SelectTrigger
                    disabled={isSubmitting || isReadMode}
                    className="w-full"
                  >
                    <SelectValue placeholder="Selecione o tipo de veículo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypeValues.map((type, i) => (
                      <SelectItem key={i} value={type}>
                        {vehicleTypeLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabWrapper>
  )
}
