import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { SearchX } from 'lucide-react'

export const DelivererTableNoResult = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX className="h-10 w-10" />
        </EmptyMedia>
        <EmptyTitle>Nada encontrado</EmptyTitle>
        <EmptyDescription>
          Nenhum entregador corresponde aos filtros aplicados.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Limpar filtros</Button>
      </EmptyContent>
    </Empty>
  )
}
