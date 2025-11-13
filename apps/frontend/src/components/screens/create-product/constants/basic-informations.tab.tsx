import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'

export const BasicInformationsTab = () => {
  return (
    <TabWrapper title={CreateProductTabs.basicInformations.title}>
      <span>Hello World!</span>
    </TabWrapper>
  )
}
