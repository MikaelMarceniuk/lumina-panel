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
import { Trash2 } from 'lucide-react'
import type React from 'react'

type StoreDeleteAlertAlertProps = {
  isOpen: boolean
  handleOpenChange: (open: boolean) => void
  handleBack: () => void
  handleAction: () => void
}

export const StoreDeleteAlert: React.FC<StoreDeleteAlertAlertProps> = ({
  isOpen,
  handleOpenChange,
  handleBack,
  handleAction,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar loja?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é permanente e não poderá ser desfeita. A loja será
            removida do sistema e todos os dados associados serão excluídos.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleBack}>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            className="bg-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white"
            onClick={handleAction}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Deletar loja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
