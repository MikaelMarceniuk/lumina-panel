import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value)

  const debouncer = useMemo(
    () =>
      debounce((v: T) => {
        setDebounced(v)
      }, delay),
    [delay]
  )

  useEffect(() => {
    debouncer(value)
    return () => {
      debouncer.cancel()
    }
  }, [value, debouncer])

  return debounced
}
