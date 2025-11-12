import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

type AppTableSkeletonProps = {
  columns: { title: string }[]
  rows?: number
}

export const AppTableSkeleton = ({
  columns,
  rows = 10,
}: AppTableSkeletonProps) => {
  return (
    <Table className="max-h-[70vh]">
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.title}>{col.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="h-10">
            {columns.map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-6 w-[80%]" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
