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

export const DelivererTableEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PlusCircle className="h-10 w-10" />
        </EmptyMedia>
        <EmptyTitle>Nenhum entregador cadastrado</EmptyTitle>
        <EmptyDescription>
          Você ainda não possui nenhum entregador. Crie o primeiro.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Plus />
          Criar Entregador
        </Button>
      </EmptyContent>
    </Empty>
  )
}
