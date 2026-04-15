import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Pressable,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
};

export default function CardCarousel({
  items,
  autoPlay = true,
  interval = 5000,
}: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const cardWidth = SCREEN_WIDTH * 0.86;
  const spacerWidth = (SCREEN_WIDTH - cardWidth) / 2;
  const gap = tokens.spacing.md;
  const snapInterval = cardWidth + gap;

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * snapInterval,
        animated: true,
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, autoPlay, items.length, snapInterval, interval]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / snapInterval);
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <View style={{ width: "100%", gap: tokens.spacing.sm }}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll },
        )}
        scrollEventThrottle={16}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: spacerWidth,
          gap,
        }}
      >
        {items.map((item, index) => {
          const inputRange = [
            (index - 1) * snapInterval,
            index * snapInterval,
            (index + 1) * snapInterval,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.94, 1, 0.94],
            extrapolate: "clamp",
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [8, 0, 8],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: cardWidth,
                opacity,
                transform: [{ scale }, { translateY }],
              }}
            >
              {item}
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {items.length > 1 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          {items.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <Pressable
                key={index}
                onPress={() =>
                  scrollRef.current?.scrollTo({
                    x: index * snapInterval,
                    animated: true,
                  })
                }
                style={{
                  height: 6,
                  borderRadius: 999,
                  width: isActive ? 18 : 6,
                  backgroundColor: isActive
                    ? colors.primary
                    : colors.outlineVariant,
                  opacity: isActive ? 1 : 0.5,
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
