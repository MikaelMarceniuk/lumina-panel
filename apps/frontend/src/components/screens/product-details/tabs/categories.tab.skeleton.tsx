import { TabWrapper } from '@/components/layout/tab-wrapper'
import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'
import { Skeleton } from '@/components/ui/skeleton'

export const CategoriesTabSkeleton = () => {
  return (
    <TabWrapper title={ProductDetailsTabs.categories.title}>
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
      </div>
    </TabWrapper>
  )
}
