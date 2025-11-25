import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useStore } from '../providers/store.provider'

export const StoreHeader = () => {
  const { openCreateDialog } = useStore()

  return (
    <div className="flex justify-between">
      <h1 className="text-4xl">Lojas</h1>
      <Button onClick={openCreateDialog}>
        <Plus />
        Criar Loja
      </Button>
    </div>
  )
}
