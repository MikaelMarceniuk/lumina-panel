import type { VehicleType } from './vehicle-type.type'

export type DelivererDetails = {
  id: string
  name: string
  phone: string | null
  vehicleType: VehicleType | null
  plateNumber: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}
