import { TabWrapper } from '@/components/layout/tab-wrapper'
import { OrderDetailsTabs } from '../constants/order-details.tabs.constants'

export const AddressTab = () => {
  return (
    <TabWrapper title={OrderDetailsTabs.address.title} className="space-y-4">
      <span>Hello World!</span>
    </TabWrapper>
  )
}
