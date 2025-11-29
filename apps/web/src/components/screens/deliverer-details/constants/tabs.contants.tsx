import { Info, ClipboardList, History } from 'lucide-react'
import { GeneralInfoTab } from '../tabs/general-info.tab'
import { HistoryTab } from '../tabs/history.tab'

export const delivererDetailsTabs = {
  generalInfo: {
    title: 'Informações Gerais',
    icon: Info,
    tab: <GeneralInfoTab />,
  },
  // orders: {
  //   title: 'Entregas',
  //   icon: ClipboardList,
  //   tab: <DelivererOrdersTab />,
  // },
  history: {
    title: 'Histórico',
    icon: History,
    tab: <HistoryTab />,
  },
}

export type DelivererDetailsTabs = typeof delivererDetailsTabs
export type DelivererDetailsTabsKeys = keyof DelivererDetailsTabs
