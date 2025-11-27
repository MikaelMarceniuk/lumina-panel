import { TabWrapper } from '@/components/layout/tab-wrapper'
import { storeDetailsTabs } from '../constants/tabs.contants'
import { Skeleton } from '@/components/ui/skeleton'

export const GeneralInfoTabSkeleton = () => {
  return (
    <TabWrapper
      title={storeDetailsTabs.generalInfo.title}
      className="space-y-4"
    >
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </TabWrapper>
  )
}
