export type ColumnDef<T> = {
  title: string
  key: keyof T
  render?: (value: T[keyof T], row: T) => React.ReactNode
}
