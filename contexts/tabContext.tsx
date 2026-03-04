import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type TabCtx = {
  hideTabBar: boolean;
  setHideTabBar: (v: boolean) => void;
  onScroll: (offset: number) => void;
};

const Ctx = createContext<TabCtx>({
  hideTabBar: false,
  setHideTabBar: () => {},
  onScroll: () => {},
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [hideTabBar, setHideTabBarState] = useState(false);
  const lastOffset = useRef(0);

  const setHideTabBar = (v: boolean) => {
    setHideTabBarState(v);
  };

  const onScroll = (offset: number) => {
    const diff = offset - lastOffset.current;

    if (offset > 100) {
      if (diff > 10) setHideTabBarState(true);
      else if (diff < -10) setHideTabBarState(false);
    } else {
      setHideTabBarState(false);
    }

    lastOffset.current = offset;
  };

  const value = useMemo(
    () => ({ hideTabBar, setHideTabBar, onScroll }),
    [hideTabBar],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useTabs = () => useContext(Ctx);
