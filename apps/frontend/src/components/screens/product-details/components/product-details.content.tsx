import { ProductDetailsTabs } from '../constants/product-details.tabs.constants'
import { useProductDetails } from '../provider/product-details.provider'

export const ProductDetailsContent = () => {
  const { currentTab } = useProductDetails()

  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="flex-1">{ProductDetailsTabs[currentTab].tab}</div>
    </div>
  )
}
