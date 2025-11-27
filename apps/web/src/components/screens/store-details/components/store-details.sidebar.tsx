import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useStoreDetails } from '../provider/store-details.provider'

export const StoreDetailsSidebar = () => {
  const { tabList, currentTabKey, handleTabChange } = useStoreDetails()

  return (
    <div className="flex flex-col space-y-1 pr-4">
      {tabList.map((tab) => (
        <Button
          key={tab.key}
          variant="ghost"
          className="w-full cursor-pointer justify-between"
          onClick={() => handleTabChange(tab.key)}
          type="button"
        >
          <span className="flex items-center gap-2">
            <tab.icon className="h-4 w-4" />
            {tab.title}
          </span>
          {currentTabKey == tab.key && (
            <ChevronRight className="h-4 w-4 opacity-50" />
          )}
        </Button>
      ))}
    </div>
  )
}
