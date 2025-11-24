import {
  ClipboardList,
  Package,
  SquareTerminal,
  Users,
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
    title: 'Clientes',
    url: '/dashboard/customer',
    icon: Users,
  },
  {
    title: 'Produtos',
    url: '/dashboard/product',
    icon: Package,
  },
  {
    title: 'Pedidos',
    url: '/dashboard/order',
    icon: ClipboardList,
  },
]
