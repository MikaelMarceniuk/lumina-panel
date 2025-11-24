import { TabWrapper } from '@/components/layout/tab-wrapper'
import { OrderDetailsTabs } from '../constants/order-details.tabs.constants'

export const PaymentTab = () => {
  return (
    <TabWrapper title={OrderDetailsTabs.payment.title} className="space-y-4">
      <span>Hello World!</span>
    </TabWrapper>
  )
}
