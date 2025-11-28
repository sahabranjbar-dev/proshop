export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  id: string;
  firstName: any;
  lastName: any;
  email: any;
  createdAt: string;
  phone: string;
  role: string;
  updatedAt: string;
  fullName: string;
}

export interface ICart {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export interface IProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  price: number;
  comparePrice: any;
  stock: number;
  sku: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
