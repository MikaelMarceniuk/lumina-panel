import { TabWrapper } from '@/components/layout/tab-wrapper'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HistoryTabSkeleton } from './history.tab.skeleton'
import { useDelivererDetails } from '../provider/deliverer-details.provider'
import { delivererDetailsTabs } from '../constants/tabs.contants'
import { formatDateToBrazil } from '@/lib/date-formatter.utils'

export const HistoryTab = () => {
  const { form, isFetching } = useDelivererDetails()

  if (isFetching) {
    return <HistoryTabSkeleton />
  }

  return (
    <TabWrapper title={delivererDetailsTabs.history.title}>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Criado em:</FormLabel>
              <FormControl>
                <Input
                  disabled
                  value={field.value ? formatDateToBrazil(field.value) : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="updatedAt"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Atualizado em:</FormLabel>
              <FormControl>
                <Input
                  disabled
                  value={field.value ? formatDateToBrazil(field.value) : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabWrapper>
  )
}
