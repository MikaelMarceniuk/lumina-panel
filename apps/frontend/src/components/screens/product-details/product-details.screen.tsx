import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { ProductDetailsProvider } from './provider/product-details.provider'
import { ProductDetailsSidebar } from './components/product-details.sidebar'
import { ProductDetailsContent } from './components/product-details.content'
import { ProductDetailsHeader } from './components/product-details.header'

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
      <ProductDetailsProvider id={id}>
        <ProductDetailsHeader />

        <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
          <ProductDetailsSidebar />
          <ProductDetailsContent />
        </div>
      </ProductDetailsProvider>
    </ScreenWrapper>
  )
}
