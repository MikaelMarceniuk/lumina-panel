import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Lightbulb } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React from 'react'
import { Button } from '../../ui/button'
import { useSignIn } from './use-sign-in.hook'

export const SignInScreen = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const { form, handleSubmit } = useSignIn()

  return (
    <div className="bg-muted flex h-screen min-h-svh w-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Lightbulb className="size-4" />
          </div>
          Lumina Panel
        </a>
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@exemplo.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Senha</FormLabel>
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Esqueceu sua senha?
                          </a>
                        </div>
                        <FormControl>
                          <Input id="password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                    isLoading={form.formState.isSubmitting}
                  >
                    Entrar
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
