import { Category, Product } from 'generated/prisma/client';

type ProductDetailsPresenterParams = {
  categories: Category[] | undefined;
} & Product;

export class ProductDetailsPresenter {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  priceInCents: number;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[] | undefined;

  constructor({
    id,
    name,
    slug,
    sku,
    description,
    priceInCents,
    stock,
    isActive,
    createdAt,
    updatedAt,
    categories,
  }: ProductDetailsPresenterParams) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.sku = sku;
    this.slug = slug;
    this.description = description;
    this.priceInCents = priceInCents;
    this.stock = stock;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.categories = categories;
  }
}
