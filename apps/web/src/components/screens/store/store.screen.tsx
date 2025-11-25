import { StoreProvider } from './providers/store.provider'
import { StoreTable } from './components/store-table'
import { StoreHeader } from './components/store-header'

export const StoreScreen = () => {
  return (
    <StoreProvider>
      <StoreHeader />
      {/* <StoreFilter /> */}
      <StoreTable />
    </StoreProvider>
  )
}
