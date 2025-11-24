import type { ApiError } from './api-error.type'

export class FormatedApiError {
  message: string
  error: string
  statusCode: number

  constructor({ message, error, statusCode }: ApiError) {
    this.message = message
    this.error = error
    this.statusCode = statusCode
  }
}
