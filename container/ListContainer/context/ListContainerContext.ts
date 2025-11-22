"use client";

import { createContext } from "react";
import { IListContainerContext } from "../meta/types";

export const ListContainerContext = createContext<IListContainerContext | null>(
  null
);
