import { TabWrapper } from '@/components/layout/tab-wrapper'
import { storeDetailsTabs } from '../constants/tabs.contants'
import { useStoreDetails } from '../provider/store-details.provider'
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

export const GeneralInfoTab = () => {
  const { mode, form, isFetching, isSubmitting } = useStoreDetails()
  const isReadMode = mode == 'read'

  if (isFetching) {
    return <GeneralInfoTabSkeleton />
  }

  return (
    <TabWrapper
      title={storeDetailsTabs.generalInfo.title}
      className="space-y-4"
    >
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="generalInfo.name"
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
          name="generalInfo.manager"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting || isReadMode} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="generalInfo.phone"
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

        <FormField
          control={form.control}
          name="generalInfo.contactEmail"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="contato@empresa.com"
                  disabled={isSubmitting || isReadMode}
                  {...field}
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
