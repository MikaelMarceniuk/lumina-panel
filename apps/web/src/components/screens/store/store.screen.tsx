import { StoreProvider } from './providers/store.provider'
import { StoreTable } from './components/store-table'
import { StoreHeader } from './components/store-header'
import { StoreFilter } from './components/store-filter'
import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'

export const StoreScreen = () => {
  return (
    <StoreProvider>
      <ScreenWrapper>
        <StoreHeader />
        <StoreFilter />
        <StoreTable />
      </ScreenWrapper>
    </StoreProvider>
  )
}
