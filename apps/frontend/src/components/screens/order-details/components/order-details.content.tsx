import { OrderDetailsTabs } from '../constants/order-details.tabs.constants'
import { useOrderDetails } from '../provider/order-details.provider'

export const OrderDetailsContent = () => {
  const { currentTab } = useOrderDetails()

  return (
    <div className="flex h-full w-full flex-col px-4">
      <div className="flex-1">{OrderDetailsTabs[currentTab].tab}</div>
    </div>
  )
}
