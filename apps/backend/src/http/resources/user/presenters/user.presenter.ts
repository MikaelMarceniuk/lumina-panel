import { User } from 'generated/prisma/client';

export class UserPresenter {
  id: string;
  name: string;
  email: string;

  constructor({ id, name, email }: User) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
