export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'PREPARING_SHIPMENT'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELED'
  | 'REFUNDED'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pendente',
  PROCESSING: 'Processando',
  PREPARING_SHIPMENT: 'Preparando envio',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELED: 'Cancelado',
  REFUNDED: 'Reembolsado',
}

export const orderStatusValues: OrderStatus[] = [
  'PENDING',
  'PROCESSING',
  'PREPARING_SHIPMENT',
  'PREPARING_SHIPMENT',
  'SHIPPED',
  'DELIVERED',
  'CANCELED',
  'REFUNDED',
]

export const orderStatusLabel = (status: OrderStatus) =>
  ORDER_STATUS_LABELS[status]
