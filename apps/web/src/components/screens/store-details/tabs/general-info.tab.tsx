import { TabWrapper } from '@/components/layout/tab-wrapper'
import { storeDetailsTabs } from '../constants/tabs.contants'

export const GeneralInfoTab = () => {
  return (
    <TabWrapper title={storeDetailsTabs.generalInfo.title}>
      <>General Info Tab</>
    </TabWrapper>
  )
}
