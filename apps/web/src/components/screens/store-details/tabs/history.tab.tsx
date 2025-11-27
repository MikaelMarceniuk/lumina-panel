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
import { Input } from '@/components/ui/input'
import { HistoryTabSkeleton } from './history.tab.skeleton'

export const HistoryTab = () => {
  const { form, isFetching } = useStoreDetails()

  if (isFetching) {
    return <HistoryTabSkeleton />
  }

  return (
    <TabWrapper title={storeDetailsTabs.history.title}>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="history.createdAt"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Criado em:</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="history.updatedAt"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Atualizado em:</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabWrapper>
  )
}
