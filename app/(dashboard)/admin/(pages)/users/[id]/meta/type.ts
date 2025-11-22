import { IUser } from "@/types/common";

export type IFormValues = Partial<IUser>;

export interface IData {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}
