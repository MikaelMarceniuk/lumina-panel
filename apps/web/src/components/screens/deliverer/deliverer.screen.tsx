import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { DelivererHeader } from './components/deliverer-header'
import { DelivererTable } from './components/deliverer-table'
import { DeliverersProvider } from './providers/deliverer.provider'
import { DelivererFilters } from './components/deliverer-filters'

export const DelivererScreen = () => {
  return (
    <DeliverersProvider>
      <ScreenWrapper>
        <DelivererHeader />
        <DelivererFilters />
        <DelivererTable />
      </ScreenWrapper>
    </DeliverersProvider>
  )
}
