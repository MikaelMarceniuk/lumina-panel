import { Store } from 'generated/prisma/client';

export class StorePresenter {
  id: string;
  name: string;
  manager: string | null;
  phone: string | null;
  contactEmail: string | null;

  constructor({ id, name, manager, phone, contactEmail }: Store) {
    this.id = id;
    this.name = name;
    this.manager = manager;
    this.phone = phone;
    this.contactEmail = contactEmail;
  }
}
