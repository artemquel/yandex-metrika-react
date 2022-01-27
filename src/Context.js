import { createContext } from "react";

export const initialState = {
  initialized: false,
  stack: [],
};
export const Context = createContext(initialState);
