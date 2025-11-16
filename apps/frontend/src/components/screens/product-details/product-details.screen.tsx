import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { ProductDetailsProvider } from './provider/product-details.provider'
import { ProductDetailsSidebar } from './components/product-details.sidebar'
import { ProductDetailsContent } from './components/product-details.content'

export const ProductDetailsScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  if (!id) {
    toast.warning('Produto não encontrado.')
    navigate('/dashboard/product')
    return null
  }

  return (
    <ScreenWrapper>
      <div className="flex justify-between">
        <h1 className="text-4xl">Detalhes do produto</h1>
      </div>

      <ProductDetailsProvider id={id}>
        <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
          <ProductDetailsSidebar />
          <ProductDetailsContent />
        </div>
      </ProductDetailsProvider>
    </ScreenWrapper>
  )
}
