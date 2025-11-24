import { DollarSign, Image, Info, Tag } from 'lucide-react'
import { BasicInformationsTab } from './basic-informations.tab'
import { PriceAndStockTab } from './price-and-stock.tab'
import { CategoriesTab } from './categories.tab'
import { ImagesTab } from './images.tab'

export const CreateProductTabs = {
  basicInformations: {
    title: 'Informações Básicas',
    icon: Info,
    tab: <BasicInformationsTab />,
  },
  priceAndStock: {
    title: 'Preço e estoque',
    icon: DollarSign,
    tab: <PriceAndStockTab />,
  },
  categories: {
    title: 'Categorias',
    icon: Tag,
    tab: <CategoriesTab />,
  },
  images: {
    title: 'Imagens do produto',
    icon: Image,
    tab: <ImagesTab />,
  },
}
