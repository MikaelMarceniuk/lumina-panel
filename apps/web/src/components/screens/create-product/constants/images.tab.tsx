import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'

export const ImagesTab = () => {
  return (
    <TabWrapper title={CreateProductTabs.images.title}>
      <span>Hello World!</span>
    </TabWrapper>
  )
}
