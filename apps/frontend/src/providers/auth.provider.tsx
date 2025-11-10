import { api } from '@/lib/axios'
import type { User } from '@/types/user.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
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
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  const { refetch } = useQuery({
    queryKey: ['/me'],
    queryFn: async () => {
      const apiResponse = await api.get<User>('/user/me')

      if (apiResponse.status !== 200) {
        toast.error('Erro ao buscar /user/me')
        navigate('/sign-in', { replace: true })
      }

      setUser(apiResponse.data)
      return apiResponse.data
    },
    retry: 1,
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
