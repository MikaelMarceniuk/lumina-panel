import { Product } from 'generated/prisma/client';

export class ProductPresenter {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  priceInCents: number;
  stock: number;
  isActive: boolean;

  constructor({
    id,
    name,
    slug,
    sku,
    description,
    priceInCents,
    stock,
    isActive,
  }: Product) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.sku = sku;
    this.slug = slug;
    this.description = description;
    this.priceInCents = priceInCents;
    this.stock = stock;
    this.isActive = isActive;
  }
}
