import { Customer } from 'generated/prisma/client';

export class CustomerDetailsPresenter {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  document: string | null;
  companyName: string | null;
  zipCode: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  complement: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    email,
    phone,
    document,
    companyName,
    zipCode,
    state,
    city,
    address,
    complement,
    createdAt,
    updatedAt,
  }: Customer) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.document = document;
    this.companyName = companyName;
    this.zipCode = zipCode;
    this.state = state;
    this.city = city;
    this.address = address;
    this.complement = complement;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
