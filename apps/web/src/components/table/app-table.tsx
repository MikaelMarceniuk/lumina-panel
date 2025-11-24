import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { ColumnDef } from '@/types/column-def.type'
import { AppTableSkeleton } from './app-table.skeleton'

type AppTableProps<T extends { id: string | number }> = {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading: boolean
}

export const AppTable = <T extends { id: string | number }>({
  columns,
  data,
  isLoading,
}: AppTableProps<T>) => {
  if (isLoading) {
    return <AppTableSkeleton columns={columns} />
  }

  return (
    <Table className="max-h-[70vh]">
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.key)}>{col.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((col) => (
              <TableCell key={String(col.key)}>
                {col.render
                  ? col.render(row[col.key], row)
                  : (row[col.key] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
