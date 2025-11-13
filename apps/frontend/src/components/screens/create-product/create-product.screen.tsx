import { ScreenWrapper } from '@/components/layout/screen-wrapper.layout'
import { CreateProductSidebar } from './components/create-product.sidebar'
import { CreateProductContent } from './components/create-product.content'
import { CreateProductProvider } from './provider/create-product.provider'

export const CreateProductScreen = () => {
  return (
    <ScreenWrapper>
      <div className="flex justify-between">
        <h1 className="text-4xl">Novo Produto</h1>
      </div>

      <CreateProductProvider>
        <div className="grid h-full min-h-screen grid-cols-[250px_1fr] gap-6">
          <CreateProductSidebar />
          <CreateProductContent />
        </div>
      </CreateProductProvider>
    </ScreenWrapper>
  )
}
