import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useForm } from 'react-hook-form'
import {
  defaultValues,
  storeSchema,
  type StoreInput,
} from '../schemas/create-store.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MaskedInput } from '@/components/masked-input'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown, Save } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { StoreDetails } from '@/types/store-details.type'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { emptyToUndefined } from '@/lib/empty-to-undefined.utils'

type CreateStoreDialogProps = {
  isOpen: boolean
  onOpenHandler: (isOpen: boolean) => void
}

export const CreateStoreDialog: React.FC<CreateStoreDialogProps> = ({
  isOpen,
  onOpenHandler,
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async (data: StoreInput) => {
      return (
        await api.post<StoreDetails>('/store', { ...emptyToUndefined(data) })
      ).data
    },
    onSuccess: () => {
      toast.success('Loja criada com sucesso!')
      onOpenHandler(false)
      queryClient.invalidateQueries({ exact: false, queryKey: ['/stores'] })
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ??
        'Erro ao criar loja. Tente novamente mais tarde.'

      toast.error(message)
      console.error('CreateStoreDialog.err: ', err)
    },
  })

  const form = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues,
  })
  const isSubmitting = form.formState.isSubmitting

  useEffect(() => {
    if (isOpen) {
      form.reset()
    }
  }, [isOpen])

  const handleOnSubmit = form.handleSubmit(
    async (data) => await mutateAsync(data)
  )

  return (
    <Dialog open={isOpen} onOpenChange={onOpenHandler}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Cadastro de Loja
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Preencha as informações abaixo para criar ou atualizar a loja.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-5" onSubmit={handleOnSubmit}>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nome*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: Loja Centro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manager"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <MaskedInput
                        mask="phone"
                        placeholder="(00) 00000-0000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="contato@empresa.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="mb-4 flex w-full items-center justify-between px-0 text-base font-medium"
                  type="button"
                >
                  <span>Endereço</span>
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <MaskedInput
                            mask="cep"
                            placeholder="00000-000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: SP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Rua / Avenida / Número"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressComplement"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Apto, bloco, sala..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

            <DialogFooter className="pt-2">
              <DialogClose type="button" className="mr-auto">
                Cancelar
              </DialogClose>

              <Button type="submit" isLoading={isSubmitting}>
                {isSubmitting ? (
                  'Salvando...'
                ) : (
                  <>
                    <Save />
                    Salvar
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
