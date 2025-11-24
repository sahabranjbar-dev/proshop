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
