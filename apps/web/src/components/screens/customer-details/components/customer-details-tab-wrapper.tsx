import type React from 'react'
import { useCustomerDetails } from '../providers/customer-details.provider'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type CustomerDetailsTabWrapperProps = {
  children: React.ReactNode
}

export const CustomerDetailsTabWrapper: React.FC<
  CustomerDetailsTabWrapperProps
> = ({ children }) => {
  const { form, isEditing, toggleEditing, update } = useCustomerDetails()

  const handleOnSubmit = form.handleSubmit(
    async (data) =>
      await update(data, {
        onSuccess: () => {
          toast.success('Cliente atualizado com sucesso!')
          toggleEditing(false)
        },
      })
  )

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleOnSubmit}>
        {children}
        <Button
          className={cn(isEditing ? 'block' : 'hidden', 'w-full')}
          isLoading={form.formState.isSubmitting}
        >
          Salvar alterações
        </Button>
      </form>
    </Form>
  )
}
