import { api } from '@/lib/axios'
import type { ApiError } from '@/types/api-error.type'
import { FormatedApiError } from '@/types/formated-api-error'
import type { User } from '@/types/user.type'
import { AxiosError } from 'axios'

export const getMeAction = async (): Promise<
  User | FormatedApiError | undefined
> => {
  try {
    const user = (await api.get<User>('/user/me')).data
    return user
  } catch (err) {
    if (err instanceof AxiosError) {
      const body = err.response?.data as ApiError
      return new FormatedApiError(body)
    }
  }
}
