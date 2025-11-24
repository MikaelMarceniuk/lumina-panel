import type React from 'react'
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query'

type QueryClientProviderParams = {
  children: React.ReactNode
}

export const QueryClientProvider: React.FC<QueryClientProviderParams> = ({
  children,
}) => {
  const queryClient = new QueryClient()

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}
