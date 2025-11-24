import { Button } from '@/components/ui/button'
import { useProductDetails } from '../provider/product-details.provider'
import { PencilLine, Save, X } from 'lucide-react'

export const ProductDetailsHeader = () => {
  const { isEditing, toggleEditing, isSubmitting } = useProductDetails()

  const renderButton = () => {
    if (!isEditing) {
      return (
        <Button type="button" onClick={() => toggleEditing(true)}>
          <PencilLine />
          Editar
        </Button>
      )
    }

    return (
      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting}>
          <Save className={isSubmitting ? 'hidden' : 'block'} /> Salvar
          alterações
        </Button>
        <Button
          type="button"
          variant={'destructive'}
          onClick={() => toggleEditing(true)}
        >
          <X /> Cancelar
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-between pb-4">
      <h1 className="text-4xl">Detalhes do produto</h1>

      {renderButton()}
    </div>
  )
}
