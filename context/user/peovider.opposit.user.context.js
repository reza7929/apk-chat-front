import React from "react";
import { createContext } from "react";

export const OppositUserContext = createContext();

export const OppositUserContextProvider = ({ children, ...rest }) => {
  return (
    <OppositUserContext.Provider value={{ ...rest }}>
      {children}
    </OppositUserContext.Provider>
  );
};
