import { Deliverer } from 'generated/prisma/client';

export class DelivererPresenter {
  id: string;
  name: string;
  phone: string | null;
  isActive: boolean;

  constructor({ id, name, phone, isActive }: Deliverer) {
    this.id = id;
    this.name = name;
    this.phone = phone || null;
    this.isActive = isActive;
  }
}
