import { Info, ListOrdered, MapPin, DollarSign, History } from 'lucide-react'
import { DetailsTab } from '../tab/details.tab'
import { ItemsTab } from '../tab/items.tab'
import { AddressTab } from '../tab/address.tab'
import { PaymentTab } from '../tab/payment.tab'
import { HistoryTab } from '../tab/history.tab'

export const OrderDetailsTabs = {
  details: {
    title: 'Detalhes',
    icon: Info,
    tab: <DetailsTab />,
  },
  items: {
    title: 'Itens',
    icon: ListOrdered,
    tab: <ItemsTab />,
  },
  address: {
    title: 'Endereço',
    icon: MapPin,
    tab: <AddressTab />,
  },
  payment: {
    title: 'Pagamento',
    icon: DollarSign,
    tab: <PaymentTab />,
  },
  history: {
    title: 'Histórico',
    icon: History,
    tab: <HistoryTab />,
  },
}

export type OrderDetailsTabsKeys = keyof typeof OrderDetailsTabs
