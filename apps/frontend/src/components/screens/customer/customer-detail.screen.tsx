import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

export const CustomerDetailScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()

  // TODO Improve error handling
  const { data } = useQuery({
    queryKey: ['/customer', id],
    queryFn: async () => await api.get(`/customer/${id}`),
    enabled: !!id,
  })

  if (!id) {
    toast.error('Cliente não foi encontrado.')
    navigate('/dashboard/customer', { replace: true })
  }

  return <div>Customer ID: {id}</div>
}
