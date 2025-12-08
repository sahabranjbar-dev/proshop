export interface IAddToCartButtonsContainer {
  price: number;
  productId: string;
  title: string;
}

export type IAddToCartContext = Partial<IAddToCartButtonsContainer>;
