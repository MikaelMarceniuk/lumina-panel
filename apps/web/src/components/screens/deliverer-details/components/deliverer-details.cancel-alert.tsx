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

type DelivererDetailsCancelAlertProps = {
  isOpen: boolean
  handleOpenChange: (open: boolean) => void
  handleBack: () => void
  handleAction: () => void
}

export const DelivererDetailsCancelAlert: React.FC<
  DelivererDetailsCancelAlertProps
> = ({ isOpen, handleOpenChange, handleBack, handleAction }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Descartar alterações do entregador?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Você realizou mudanças nas informações do entregador que ainda não
            foram salvas. Se continuar, todas as alterações serão perdidas.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleBack}>Voltar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive dark:bg-destructive/60 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white"
            onClick={handleAction}
          >
            Descartar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
