import { Skeleton } from '@/components/ui/skeleton'

export const AddressTabSkeleton = () => {
  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">Endereço</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
