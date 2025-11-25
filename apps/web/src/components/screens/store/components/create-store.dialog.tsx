import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type React from 'react'

type CreateStoreDialogProps = {
  isOpen: boolean
  onOpenHandler: (isOpen: boolean) => void
}

export const CreateStoreDialog: React.FC<CreateStoreDialogProps> = ({
  isOpen,
  onOpenHandler,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
