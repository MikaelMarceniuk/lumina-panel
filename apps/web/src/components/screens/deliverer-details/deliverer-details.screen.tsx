import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { DelivererDetailsProvider } from './provider/deliverer-details.provider'
import { DelivererDetailsHeader } from './components/deliverer-details-header'
import { DelivererDetailsSidebar } from './components/deliverer-details.sidebar'
import { DelivererDetailsContent } from './components/deliverer-details.content'

export const DelivererDetailsScreen = () => {
  return (
    <DelivererDetailsProvider>
      <ScreenWrapper>
        <DelivererDetailsHeader />
        <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
          <DelivererDetailsSidebar />
          <DelivererDetailsContent />
        </div>
      </ScreenWrapper>
    </DelivererDetailsProvider>
  )
}
