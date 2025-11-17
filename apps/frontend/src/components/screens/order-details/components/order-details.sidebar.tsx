import { Button } from '@/components/ui/button'
import { OrderDetailsTabs } from '../constants/order-details.tabs.constants'
import { useOrderDetails } from '../provider/order-details.provider'
import { ChevronRight } from 'lucide-react'

export const OrderDetailsSidebar = () => {
  const { currentTab, setCurrentTab } = useOrderDetails()

  return (
    <div className="flex flex-col space-y-1 pr-4">
      {Object.entries(OrderDetailsTabs).map(([key, { title, icon: Icon }]) => (
        <Button
          key={key}
          variant="ghost"
          className="w-full cursor-pointer justify-between"
          onClick={() => setCurrentTab(key as keyof typeof OrderDetailsTabs)}
        >
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {title}
          </span>
          {currentTab == key && <ChevronRight className="h-4 w-4 opacity-50" />}
        </Button>
      ))}
      {/* <Button
        variant="ghost"
        className="w-full cursor-pointer justify-between"
        onClick={toggleEditing}
      >
        {isEditing ? (
          <span className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Editando
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visualizando
          </span>
        )}
      </Button> */}
    </div>
  )
}
