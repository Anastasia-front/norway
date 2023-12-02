import React, { ReactNode, createContext, useState } from "react";

interface ContextProps {
  sharedState: boolean;
  setSharedState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [sharedState, setSharedState] = useState(true);

  return (
    <Context.Provider value={{ sharedState, setSharedState }}>
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
