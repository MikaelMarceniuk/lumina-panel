import { TabWrapper } from '@/components/layout/tab-wrapper'
import { storeDetailsTabs } from '../constants/tabs.contants'

export const ContactTab = () => {
  return (
    <TabWrapper title={storeDetailsTabs.contact.title}>
      <>Contact Tab</>
    </TabWrapper>
  )
}
