import { CustomerDetailsProvider } from './providers/customer-details.provider'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { CustomerDetailsSidebar } from './components/customer-details.sidebar'
import { CustomerDetailsContent } from './components/customer-details.content'

export function CustomerDetailsScreen() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  if (!id) {
    toast.error('Cliente não foi encontrado.')
    return navigate('/dashboard/customer', { replace: true })
  }

  return (
    <CustomerDetailsProvider id={id}>
      <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
        <CustomerDetailsSidebar />
        <CustomerDetailsContent />
      </div>
    </CustomerDetailsProvider>
  )
}
