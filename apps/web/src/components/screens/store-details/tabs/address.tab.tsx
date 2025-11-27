import { TabWrapper } from '@/components/layout/tab-wrapper'
import { storeDetailsTabs } from '../constants/tabs.contants'

export const AddressTab = () => {
  return (
    <TabWrapper title={storeDetailsTabs.address.title}>
      <>Address Tab</>
    </TabWrapper>
  )
}
