import { getMeAction } from '@/actions/get-me.action'
import { api } from '@/lib/axios'
import { FormatedApiError } from '@/types/formated-api-error'
import type { User } from '@/types/user.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

type AuthContext = {
  user: User | null
  isAuthenticated: boolean
  signOut: () => Promise<void>
  refetchUser: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  const { refetch } = useQuery({
    queryKey: ['/me'],
    queryFn: async () => {
      try {
        let user = await getMeAction()

        if (
          user instanceof FormatedApiError &&
          user.statusCode === 401 &&
          user.message === 'Token de acesso ausente' &&
          location.pathname.startsWith('/dashboard')
        ) {
          try {
            await api.post('/auth/refresh')
            user = await getMeAction()
          } catch {
            toast.error('Sessão expirada. Faça login novamente.')
            navigate('/sign-in', { replace: true })
            throw new Error('Falha ao atualizar token')
          }
        }

        setUser(user as User)
        return user as User
      } catch (error) {
        throw error
      }
    },
    retry: 0,
  })

  const { mutateAsync: signOutMutation } = useMutation({
    mutationFn: async () => await api.post('/auth/sign-out'),
    onSuccess: () => {
      toast.success('Deslogado com sucesso')
      navigate('/sign-in', { replace: true })
    },
  })

  const signOut = async () => {
    await signOutMutation()
  }

  const refetchUser = async () => {
    await refetch()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signOut,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')

  return ctx
}
