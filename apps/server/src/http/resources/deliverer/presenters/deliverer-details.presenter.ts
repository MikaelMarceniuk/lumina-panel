import { Deliverer, VehicleType } from 'generated/prisma/client';

export class DelivererDetailsPresenter {
  id: string;
  name: string;
  phone: string | null;
  vehicleType: VehicleType | null;
  plateNumber: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    phone,
    vehicleType,
    plateNumber,
    isActive,
    createdAt,
    updatedAt,
  }: Deliverer) {
    this.id = id;
    this.name = name;
    this.phone = phone || null;
    this.vehicleType = vehicleType;
    this.plateNumber = plateNumber;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
