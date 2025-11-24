import { CustomerDetailsTabs } from '../constants/customer-details-tabs.constant'
import { useCustomerDetails } from '../providers/customer-details.provider'

export const CustomerDetailsContent = () => {
  const { currentTab } = useCustomerDetails()

  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="flex-1">{CustomerDetailsTabs[currentTab].tab}</div>
    </div>
  )
}
