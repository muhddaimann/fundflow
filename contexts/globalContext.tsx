import React, { createContext, useContext, useState, useMemo } from "react";

type GlobalCtx = {
  isEmpty: boolean;
  setIsEmpty: (v: boolean) => void;
};

const Ctx = createContext<GlobalCtx>({
  isEmpty: false,
  setIsEmpty: () => {},
});

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [isEmpty, setIsEmpty] = useState(false);

  const value = useMemo(() => ({ isEmpty, setIsEmpty }), [isEmpty]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useGlobalContext = () => useContext(Ctx);
