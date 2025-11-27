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

type StoreDetailsCancelAlertProps = {
  isOpen: boolean
  handleOpenChange: (open: boolean) => void
  handleBack: () => void
  handleAction: () => void
}

export const StoreDetailsCancelAlert: React.FC<
  StoreDetailsCancelAlertProps
> = ({ isOpen, handleOpenChange, handleBack, handleAction }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Descartar alterações?</AlertDialogTitle>
          <AlertDialogDescription>
            Você fez modificações que ainda não foram salvas. Se continuar,
            todas as alterações serão perdidas.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleBack}>Voltar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white"
            onClick={handleAction}
          >
            Descartar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
