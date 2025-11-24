import { Category } from 'generated/prisma/client';

type CategoryPresenterParams = {} & Category;

export class CategoryPresenter {
  id: string;
  name: string;

  constructor({ id, name }: CategoryPresenterParams) {
    this.id = id;
    this.name = name;
  }
}
