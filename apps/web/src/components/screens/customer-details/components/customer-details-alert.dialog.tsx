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
import { useCustomerDetails } from '../providers/customer-details.provider'
import type React from 'react'

type CustomerDetailsAlertProps = {
  isOpen: boolean
  handleOnOpenChange: (open: boolean) => void
}

export const CustomerDetailsAlert: React.FC<CustomerDetailsAlertProps> = ({
  isOpen,
  handleOnOpenChange,
}) => {
  const { resetForm, toggleEditing } = useCustomerDetails()

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sair sem salvar?</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem alterações não salvas. Se sair agora, elas serão perdidas.
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
