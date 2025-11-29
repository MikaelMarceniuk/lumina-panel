import {
  ClipboardList,
  Package,
  SquareTerminal,
  Store,
  type LucideIcon,
} from 'lucide-react'

type MenuItem = {
  title: string
  url: string
  icon: LucideIcon
  items?: {
    title: string
    url: string
  }[]
}

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: SquareTerminal,
  },
  {
    title: 'Lojas',
    url: '/dashboard/store',
    icon: Store,
  },
  {
    title: 'Entregadores',
    url: '/dashboard/deliverer',
    icon: Package,
  },
  {
    title: 'Pedidos',
    url: '/dashboard/order',
    icon: ClipboardList,
  },
]
