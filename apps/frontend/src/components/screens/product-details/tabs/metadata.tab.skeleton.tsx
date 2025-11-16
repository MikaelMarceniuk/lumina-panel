import { Skeleton } from '@/components/ui/skeleton'

export const MetadataSkeleton = () => {
  return (
    <div className="bg-muted/30 rounded-md p-4">
      <h2 className="mb-4 text-lg font-semibold">Metadados</h2>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Última vez atualizado */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
