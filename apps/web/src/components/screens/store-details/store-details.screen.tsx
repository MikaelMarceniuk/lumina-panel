import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { StoreDetailsProvider } from './provider/store-details.provider'
import { StoreDetailsSidebar } from './components/store-details.sidebar'
import { StoreDetailsContent } from './components/store-details.content'
import { StoreDetailsHeader } from './components/store-details.header'

export const StoreDetailsScreen = () => {
  return (
    <StoreDetailsProvider>
      <ScreenWrapper>
        <StoreDetailsHeader />
        <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
          <StoreDetailsSidebar />
          <StoreDetailsContent />
        </div>
      </ScreenWrapper>
    </StoreDetailsProvider>
  )
}
