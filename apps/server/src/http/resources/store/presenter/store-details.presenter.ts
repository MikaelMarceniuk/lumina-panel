import { Store } from 'generated/prisma/client';

type StoreDetailsPresenterParams = {} & Store;

export class StoreDetailsPresenter {
  id: string;
  name: string;
  manager: string | null;
  phone: string | null;
  contactEmail: string | null;
  address: string | null;
  addressComplement: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(store: StoreDetailsPresenterParams) {
    this.id = store.id;
    this.name = store.name;
    this.manager = store.manager;
    this.phone = store.phone;
    this.contactEmail = store.contactEmail;
    this.address = store.address;
    this.addressComplement = store.addressComplement;
    this.city = store.city;
    this.state = store.state;
    this.zipCode = store.zipCode;
    this.createdAt = store.createdAt;
    this.updatedAt = store.updatedAt;
  }
}
