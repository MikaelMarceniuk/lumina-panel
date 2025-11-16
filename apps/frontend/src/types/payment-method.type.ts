export type PaymentMethod = 'CREDIT_CARD' | 'PIX' | 'BOLETO' | 'CASH'

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CREDIT_CARD: 'Cartão de crédito',
  PIX: 'Pix',
  BOLETO: 'Boleto',
  CASH: 'Dinheiro',
}

export const paymentMethodLabel = (method: PaymentMethod) =>
  PAYMENT_METHOD_LABELS[method]
