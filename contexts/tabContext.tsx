import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

type TabContextType = {
  isNavbarVisible: boolean;
  showNavbar: () => void;
  hideNavbar: () => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  setScrollRef: (ref: ScrollView | null) => void;
  scrollToTop: () => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const scrollRef = useRef<ScrollView | null>(null);
  const lastOffset = useRef(0);
  const direction = useRef<"up" | "down" | null>(null);
  const accumulated = useRef(0);

  const SHOW_THRESHOLD = 50;
  const HIDE_THRESHOLD = 80;
  const MIN_SCROLL_Y = 120;
  const TOP_LOCK_RANGE = 60;

  const showNavbar = useCallback(() => setIsNavbarVisible(true), []);
  const hideNavbar = useCallback(() => setIsNavbarVisible(false), []);

  const setScrollRef = useCallback((ref: ScrollView | null) => {
    scrollRef.current = ref;
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let currentOffset = event.nativeEvent.contentOffset.y;

      if (currentOffset < 0) currentOffset = 0;

      if (currentOffset < TOP_LOCK_RANGE) {
        if (!isNavbarVisible) setIsNavbarVisible(true);
        lastOffset.current = currentOffset;
        accumulated.current = 0;
        direction.current = null;
        return;
      }

      const diff = currentOffset - lastOffset.current;

      if (Math.abs(diff) < 2) return;

      const newDirection = diff > 0 ? "down" : "up";

      if (direction.current !== newDirection) {
        accumulated.current = 0;
        direction.current = newDirection;
      }

      accumulated.current += Math.abs(diff);

      if (
        newDirection === "down" &&
        isNavbarVisible &&
        currentOffset > MIN_SCROLL_Y &&
        accumulated.current > HIDE_THRESHOLD
      ) {
        setIsNavbarVisible(false);
        accumulated.current = 0;
      }

      if (
        newDirection === "up" &&
        !isNavbarVisible &&
        accumulated.current > SHOW_THRESHOLD
      ) {
        setIsNavbarVisible(true);
        accumulated.current = 0;
      }

      lastOffset.current = currentOffset;
    },
    [isNavbarVisible],
  );

  return (
    <TabContext.Provider
      value={{
        isNavbarVisible,
        showNavbar,
        hideNavbar,
        handleScroll,
        setScrollRef,
        scrollToTop,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};
