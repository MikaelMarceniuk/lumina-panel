import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { Plus, PlusCircle } from 'lucide-react'
import { useStore } from '../providers/store.provider'

export const StoreTableEmpty = () => {
  const { openCreateDialog } = useStore()

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PlusCircle className="h-10 w-10" />
        </EmptyMedia>
        <EmptyTitle>Nenhuma loja cadastrada</EmptyTitle>
        <EmptyDescription>
          Você ainda não possui registros. Crie a primeira loja.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={openCreateDialog}>
          <Plus />
          Criar Loja
        </Button>
      </EmptyContent>
    </Empty>
  )
}
