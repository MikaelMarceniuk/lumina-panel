import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'

export const PriceAndStockTab = () => {
  return (
    <TabWrapper title={CreateProductTabs.priceAndStock.title}>
      <span>Hello World!</span>
    </TabWrapper>
  )
}
