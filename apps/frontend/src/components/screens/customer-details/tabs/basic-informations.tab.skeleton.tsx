import { Skeleton } from '@/components/ui/skeleton'

export const BasicInformationsTabSkeleton = () => {
  return (
    <div className="bg-muted/30 animate-pulse space-y-4 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">Informações Básicas</h2>

      <div className="space-y-3">
        <div className="w-full">
          <Skeleton className="mb-1 h-5 w-32 rounded"></Skeleton>
          <Skeleton className="h-10 w-full rounded"></Skeleton>
        </div>

        <div className="w-full">
          <Skeleton className="mb-1 h-5 w-32 rounded"></Skeleton>
          <Skeleton className="h-10 w-full rounded"></Skeleton>
        </div>

        <div className="w-full">
          <Skeleton className="mb-1 h-5 w-36 rounded"></Skeleton>
          <Skeleton className="h-10 w-full rounded"></Skeleton>
        </div>
      </div>
    </div>
  )
}
