import { vehicleTypeValues, type VehicleType } from '@/types/vehicle-type.type'
import { z } from 'zod'

export const updateDelivererSchema = z
  .object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório')
      .max(255, 'Máximo de 255 caracteres'),

    phone: z
      .string()
      .min(10, 'Telefone inválido')
      .max(20, 'Telefone inválido')
      .optional(),

    vehicleType: z.enum(vehicleTypeValues).optional(),

    plateNumber: z.string().max(10, 'Máximo de 10 caracteres').optional(),

    isActive: z.boolean(),

    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .refine(
    (data) => {
      const motorized: VehicleType[] = [
        'MOTORCYCLE',
        'CAR',
        'VAN',
        'SMALL_TRUCK',
      ]

      if (motorized.includes(data.vehicleType as VehicleType)) {
        return !!data.plateNumber
      }

      return true
    },
    {
      message: 'Placa é obrigatória para o tipo de veículo selecionado',
      path: ['plateNumber'],
    }
  )

export const defaultValues: UpdateDelivererInput = {
  name: '',
  phone: '',
  vehicleType: '' as VehicleType,
  plateNumber: '',
  isActive: true,
  createdAt: '',
  updatedAt: '',
}

export type UpdateDelivererInput = z.infer<typeof updateDelivererSchema>
