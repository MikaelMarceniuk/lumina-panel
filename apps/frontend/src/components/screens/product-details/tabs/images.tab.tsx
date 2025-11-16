import { TabWrapper } from '@/components/layout/tab-wrapper'
import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'

export const ImagesTab = () => {
  return (
    <TabWrapper title={ProductDetailsTabs.images.title}>
      <span>Hello World!</span>
    </TabWrapper>
  )
}
