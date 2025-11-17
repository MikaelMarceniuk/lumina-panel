export type OrderType = 'ONLINE' | 'IN_STORE'

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  ONLINE: 'Online',
  IN_STORE: 'Presencial',
}

export const orderTypeLabel = (type: OrderType) => ORDER_TYPE_LABELS[type]
