import React from "react";
import { createContext } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children, ...rest }) => {
  return (
    <SocketContext.Provider value={{ ...rest }}>
      {children}
    </SocketContext.Provider>
  );
};
