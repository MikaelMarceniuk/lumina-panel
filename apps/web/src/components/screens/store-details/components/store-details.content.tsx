import { useStoreDetails } from '../provider/store-details.provider'

export const StoreDetailsContent = () => {
  const { currentTab } = useStoreDetails()

  return (
    <div className="flex h-full w-full flex-col px-4">
      <div className="flex-1">{currentTab.tab}</div>
    </div>
  )
}
