import React from "react";
import { createContext } from "react";

export const SetisActiveChatContext = createContext();

export const SetisActiveChatContextProvider = ({ children, ...rest }) => {
  return (
    <SetisActiveChatContext.Provider value={{ ...rest }}>
      {children}
    </SetisActiveChatContext.Provider>
  );
};
