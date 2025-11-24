import { Button } from '@/components/ui/button'
import { ChevronRight, Eye, Pencil } from 'lucide-react'
import { useCustomerDetails } from '../providers/customer-details.provider'
import { CustomerDetailsTabs } from '../constants/customer-details-tabs.constant'

export const CustomerDetailsSidebar = () => {
  const { isEditing, toggleEditing, currentTab, changeCurrentTab } =
    useCustomerDetails()

  return (
    <div className="flex flex-col space-y-1 pr-4">
      {Object.entries(CustomerDetailsTabs).map(
        ([key, { title, icon: Icon }]) => (
          <Button
            key={key}
            variant="ghost"
            className="w-full cursor-pointer justify-between"
            onClick={() =>
              changeCurrentTab(key as keyof typeof CustomerDetailsTabs)
            }
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {title}
            </span>
            {currentTab == key && (
              <ChevronRight className="h-4 w-4 opacity-50" />
            )}
          </Button>
        )
      )}
      <Button
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
      </Button>
    </div>
  )
}
