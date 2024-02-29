import { createContext } from "react";
import { IWSConfig } from "../reducers/WSConfigReducer";

export const WSConfigContext = createContext<IWSConfig | null>(null);
export const WSConfigDispatchContext = createContext<React.Dispatch<{
  type: string;
  payload: IWSConfig;
}> | null>(null);
