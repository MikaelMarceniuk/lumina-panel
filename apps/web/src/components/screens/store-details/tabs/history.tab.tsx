import { TabWrapper } from '@/components/layout/tab-wrapper'
import { storeDetailsTabs } from '../constants/tabs.contants'

export const HistoryTab = () => {
  return (
    <TabWrapper title={storeDetailsTabs.history.title}>
      <>History Tab</>
    </TabWrapper>
  )
}
