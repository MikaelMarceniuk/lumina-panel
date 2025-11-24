import type { MultiSelectData } from '@/components/multi-select'

export const labelsToMultiSelect = <
  T extends string,
  R extends Record<T, string>,
>(
  labels: R
): { id: T; name: string }[] => {
  return (Object.keys(labels) as T[]).map((key) => ({
    id: key,
    name: labels[key],
  }))
}

export const toMultiSelectData = <T extends string>(
  values: T[] | undefined,
  labels: Record<T, string>
): MultiSelectData[] => {
  if (!values) return []
  return values.map((v) => ({
    id: v,
    name: labels[v],
  }))
}
