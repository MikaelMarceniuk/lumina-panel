import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { OrderDetailsProvider } from './provider/order-details.provider'
import { OrderDetailsSidebar } from './components/order-details.sidebar'
import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'

export const OrderDetailsScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  if (!id) {
    toast.error('Pedido não foi encontrado.')
    navigate('/dashboard/order', { replace: true })
    return null
  }

  return (
    <ScreenWrapper>
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl">Detalhes do pedido</h1>
      </div>

      <OrderDetailsProvider id={id}>
        <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
          <OrderDetailsSidebar />
          {/* <OrderDetailsContent /> */}
        </div>
      </OrderDetailsProvider>
    </ScreenWrapper>
  )
}
