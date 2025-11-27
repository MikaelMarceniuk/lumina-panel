import { Info, MapPin, History, Phone } from 'lucide-react'
import { GeneralInfoTab } from '../tabs/general-info.tab'
import { ContactTab } from '../tabs/contact.tab'
import { AddressTab } from '../tabs/address.tab'
import { HistoryTab } from '../tabs/history.tab'

export const storeDetailsTabs = {
  generalInfo: {
    title: 'Informações Gerais',
    icon: Info,
    tab: <GeneralInfoTab />,
  },
  contact: {
    title: 'Contato',
    icon: Phone,
    tab: <ContactTab />,
  },
  address: {
    title: 'Endereço',
    icon: MapPin,
    tab: <AddressTab />,
  },
  history: {
    title: 'Histórico',
    icon: History,
    tab: <HistoryTab />,
  },
}

export type StoreDetailsTabs = typeof storeDetailsTabs

export type StoreDetailsTabsKeys = keyof StoreDetailsTabs
