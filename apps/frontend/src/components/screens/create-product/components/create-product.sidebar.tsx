import { Button } from '@/components/ui/button'
import { ChevronRight, Save } from 'lucide-react'
import { useCreateProduct } from '../provider/create-product.provider'
import { CreateProductTabs } from '../constants/tabs'

export const CreateProductSidebar = () => {
  const { currentTab, setCurrentTab } = useCreateProduct()

  return (
    <div className="flex flex-col space-y-2 pr-4">
      {Object.entries(CreateProductTabs).map(([key, { title, icon: Icon }]) => (
        <Button
          key={key}
          variant="ghost"
          className="w-full cursor-pointer justify-between"
          onClick={() => setCurrentTab(key as keyof typeof CreateProductTabs)}
        >
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {title}
          </span>
          {currentTab == key && <ChevronRight className="h-4 w-4 opacity-50" />}
        </Button>
      ))}
      <Button
        variant="default"
        className="w-full cursor-pointer justify-between"
      >
        <span className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar produto
        </span>
      </Button>
    </div>
  )
}
