import { useDelivererDetails } from '../provider/deliverer-details.provider'

export const DelivererDetailsContent = () => {
  const { currentTab } = useDelivererDetails()

  return (
    <div className="flex h-full w-full flex-col px-4">
      <div className="flex-1">{currentTab.tab}</div>
    </div>
  )
}
