import { IProduct } from "@/types/common";

export type IProductFormValues = Partial<IProduct>;

export interface IData {
  id?: string;
  title?: string;
  price?: number;
}
