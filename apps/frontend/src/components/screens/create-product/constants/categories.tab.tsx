import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'

export const CategoriesTab = () => {
  return (
    <TabWrapper title={CreateProductTabs.categories.title}>
      <span>Hello World!</span>
    </TabWrapper>
  )
}
