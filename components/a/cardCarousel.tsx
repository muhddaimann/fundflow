import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
};

export default function CardCarousel({ items, autoPlay = true, interval = 4000 }: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  
  const cardWidth = SCREEN_WIDTH - (tokens.spacing.lg * 2);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (cardWidth + tokens.spacing.md),
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, autoPlay, items.length, cardWidth, tokens.spacing.md, interval]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / (cardWidth + tokens.spacing.md));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={cardWidth + tokens.spacing.md}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.md,
        }}
      >
        {items.map((item, index) => (
          <View key={index} style={{ width: cardWidth }}>
            {item}
          </View>
        ))}
      </ScrollView>

      {items.length > 1 && (
        <View style={[styles.pagination, { marginTop: tokens.spacing.md }]}>
          {items.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex ? colors.primary : colors.surfaceVariant,
                  width: index === activeIndex ? 20 : 8,
                  opacity: index === activeIndex ? 1 : 0.5,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
