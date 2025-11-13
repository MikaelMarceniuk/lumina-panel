import { CreateProductTabs } from '../constants/tabs'
import { useCreateProduct } from '../provider/create-product.provider'

export const CreateProductContent = () => {
  const { currentTab } = useCreateProduct()

  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="flex-1">{CreateProductTabs[currentTab].tab}</div>
    </div>
  )
}
