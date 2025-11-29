export type VehicleType =
  | 'MOTORCYCLE'
  | 'CAR'
  | 'BICYCLE'
  | 'VAN'
  | 'SMALL_TRUCK'

export const vehicleTypeValues: VehicleType[] = [
  'MOTORCYCLE',
  'CAR',
  'BICYCLE',
  'VAN',
  'SMALL_TRUCK',
]

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  MOTORCYCLE: 'Moto',
  CAR: 'Carro',
  BICYCLE: 'Bicicleta',
  VAN: 'Van',
  SMALL_TRUCK: 'Caminhão Pequeno',
}

export const vehicleTypeLabel = (type: VehicleType) => VEHICLE_TYPE_LABELS[type]
