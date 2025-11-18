import { OrderItem, Product } from 'generated/prisma/client';
import { ProductPresenter } from '../../product/presenter/product.presenter';

type OrderItemPresenterParams = {
  product: Product;
} & OrderItem;

export class OrderItemPresenter {
  id: string;
  quantity: number;
  unitPriceInCents: number;
  totalInCents: number;
  product: ProductPresenter;

  constructor({
    id,
    quantity,
    unitPriceInCents,
    totalInCents,
    product,
  }: OrderItemPresenterParams) {
    this.id = id;
    this.quantity = quantity;
    this.unitPriceInCents = unitPriceInCents;
    this.totalInCents = totalInCents;
    this.product = new ProductPresenter(product);
  }
}
