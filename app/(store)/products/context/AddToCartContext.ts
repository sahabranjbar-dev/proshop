import { createContext } from "react";
import { IAddToCartContext } from "../meta/types";

export const AddToCartContext = createContext<IAddToCartContext>({});
