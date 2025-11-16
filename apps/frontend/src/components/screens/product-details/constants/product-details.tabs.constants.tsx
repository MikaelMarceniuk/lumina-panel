import { Clock, DollarSign, Image, Info, Tag } from 'lucide-react'
import { BasicInformationsTab } from '../tabs/basic-informations.tab'
import { PriceAndStockTab } from '../tabs/price-and-stock.tab'
import { CategoriesTab } from '../tabs/categories.tab'
import { ImagesTab } from '../tabs/images.tab'
import { MetadataTab } from '../tabs/metadata.tab'

export const ProductDetailsTabs = {
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
  metadata: {
    title: 'Metadados',
    icon: Clock,
    tab: <MetadataTab />,
  },
}

export type ProductDetailsTabsKeys = keyof typeof ProductDetailsTabs
