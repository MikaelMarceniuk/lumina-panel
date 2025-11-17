import { TabWrapper } from '@/components/layout/tab-wrapper'
import { OrderDetailsTabs } from '../constants/order-details.tabs.constants'

export const HistoryTab = () => {
  return (
    <TabWrapper title={OrderDetailsTabs.history.title} className="space-y-4">
      <span>Hello World!</span>
    </TabWrapper>
  )
}
