import { Button } from '@/components/ui/button'
import { ChevronRight, Save } from 'lucide-react'
import { useProductDetails } from '../provider/product-details.provider'
import {
  ProductDetailsTabs,
  type ProductDetailsTabsKeys,
} from '../constants/product-details.tabs.constants'

export const ProductDetailsSidebar = () => {
  const { currentTab, setCurrentTab } = useProductDetails()

  return (
    <div className="flex flex-col space-y-2 pr-4">
      {Object.entries(ProductDetailsTabs).map(
        ([key, { title, icon: Icon }]) => (
          <Button
            key={key}
            variant="ghost"
            className="w-full cursor-pointer justify-between"
            type="button"
            onClick={() => setCurrentTab(key as ProductDetailsTabsKeys)}
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
    </div>
  )
}
