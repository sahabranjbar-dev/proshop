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
  rowNumber: number;
  fullName: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  updatedAt: string;
  rowNumber: number;
  createdAt: string;
  // TODO: set the type in file
  productImage?: IFiles;
  files: any;
}

export interface IFiles {
  id: string;
  key: string;
  url: string;
  productId: string;
  fileId: string;
  publicUrl: string;
}
