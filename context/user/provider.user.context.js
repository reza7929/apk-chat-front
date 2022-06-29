import React from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children, ...rest }) => {
  return (
    <UserContext.Provider value={{ ...rest }}>{children}</UserContext.Provider>
  );
};
