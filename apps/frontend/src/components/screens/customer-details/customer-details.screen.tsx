import { Button } from '@/components/ui/button'
import { ChevronRight, User, Mail, MapPin, Clock } from 'lucide-react'
import { BasicInformationsTab } from './basic-informations.tab'
import { useState } from 'react'
import { ContactTab } from './contact.tab'
import { AddressTab } from './address.tab'
import { MetadataTab } from './metadata.tab'

const AvailableTabs = {
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

export function CustomerDetailsScreen() {
  const [currentTab, setCurrentTab] =
    useState<keyof typeof AvailableTabs>('basicInformations')

  return (
    <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
      <div className="flex flex-col space-y-1 pr-4">
        {Object.entries(AvailableTabs).map(([key, { title, icon: Icon }]) => (
          <Button
            key={key}
            variant="ghost"
            className="w-full cursor-pointer justify-between"
            onClick={() => setCurrentTab(key as keyof typeof AvailableTabs)}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {title}
            </span>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </Button>
        ))}
      </div>

      <div className="flex h-full w-full flex-col p-4">
        <div className="flex-1">{AvailableTabs[currentTab].tab}</div>
      </div>
    </div>
  )
}
