export function emptyToUndefined<T extends Record<string, any>>(obj: T): T {
  const result: any = {}

  for (const key in obj) {
    const value = obj[key]

    if (value === '') {
      result[key] = undefined
    } else {
      result[key] = value
    }
  }

  return result
}
