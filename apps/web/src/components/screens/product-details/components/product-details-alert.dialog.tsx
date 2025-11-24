import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type React from 'react'
import { useProductDetails } from '../provider/product-details.provider'

type ProductDetailsAlertProps = {
  isOpen: boolean
  handleOnOpenChange: (open: boolean) => void
}

export const ProductDetailsAlert: React.FC<ProductDetailsAlertProps> = ({
  isOpen,
  handleOnOpenChange,
}) => {
  const { resetForm, toggleEditing } = useProductDetails()

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sair sem salvar?</AlertDialogTitle>
          <AlertDialogDescription>
            Se você tiver alterações não salvas, elas serão perdidas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toggleEditing(false)
              resetForm()
              handleOnOpenChange(false)
            }}
          >
            Sair sem salvar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
