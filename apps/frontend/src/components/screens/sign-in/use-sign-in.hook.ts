import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

const SignInSchema = z.object({
  email: z.email('O e-mail é obrigatório').trim().min(5, 'E-mail muito curto'),
  password: z
    .string('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type SignInSchema = z.infer<typeof SignInSchema>

export const useSignIn = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: async (data: SignInSchema) => await api.post('/auth', data),
    onSuccess: () => {
      toast.success('Logado com sucesso!')
      navigate('/dashboard')
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const errData = err.response?.data
        toast.error(errData.message)
      }
    },
  })

  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = form.handleSubmit(
    async (data: SignInSchema) => await mutateAsync(data)
  )

  return {
    form,
    mutateAsync,
    handleSubmit,
  }
}
