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
import type React from 'react'

type AppTableProps<T extends { id: string | number }> = {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading: boolean
  hasFilters: boolean
  emptyState: React.ReactElement
  noResultsState: React.ReactElement
}

export const AppTable = <T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  hasFilters,
  emptyState,
  noResultsState,
}: AppTableProps<T>) => {
  if (isLoading) {
    return <AppTableSkeleton columns={columns} />
  }

  // 🔎 No data at all
  if (data.length === 0 && !hasFilters) {
    return emptyState ?? null
  }

  // 🔎 Has filters, but no results
  if (data.length === 0 && hasFilters) {
    return noResultsState ?? null
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
