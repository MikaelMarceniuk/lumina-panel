import { Clock, Mail, MapPin, User } from 'lucide-react'
import { BasicInformationsTab } from '../tabs/basic-informations.tab'
import { ContactTab } from '../tabs/contact.tab'
import { AddressTab } from '../tabs/address.tab'
import { MetadataTab } from '../tabs/metadata.tab'

export const CustomerDetailsTabs = {
  basicInformations: {
    title: 'Informações Básicas',
    icon: User,
    tab: <BasicInformationsTab />,
  },
  contact: {
    title: 'Contato',
    icon: Mail,
    tab: <ContactTab />,
  },
  address: {
    title: 'Endereço',
    icon: MapPin,
    tab: <AddressTab />,
  },
  metadata: {
    title: 'Metadados',
    icon: Clock,
    tab: <MetadataTab />,
  },
}
