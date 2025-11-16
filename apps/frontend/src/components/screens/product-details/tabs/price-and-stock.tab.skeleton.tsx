import { TabWrapper } from '@/components/layout/tab-wrapper'
import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'
import { Skeleton } from '@/components/ui/skeleton'

export const PriceAndStockTabSkeleton = () => {
  return (
    <TabWrapper
      title={ProductDetailsTabs.priceAndStock.title}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
    </TabWrapper>
  )
}
