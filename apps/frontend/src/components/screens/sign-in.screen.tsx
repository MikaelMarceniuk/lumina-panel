import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Lightbulb } from 'lucide-react'

export const SignInScreen = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
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
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@exemplo.com"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <Button type="submit">Entrar</Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            Ao continuar, você concorda com nossos{' '}
            <a href="#">Termos de Serviço</a> e{' '}
            <a href="#">Política de Privacidade</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}
