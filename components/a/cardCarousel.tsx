import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

const { width } = Dimensions.get("window");

type Props = {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
};

export default function CardCarousel({ items, autoPlay = true, interval = 5000 }: Props) {
  if (items.length === 0) return null;

  const { colors } = useTheme();
  const tokens = useDesign();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // For infinite loop, we prepend the last item and append the first item
  const extendedItems = [items[items.length - 1], ...items, items[0]];
  
  // Real index starts at 1 (because 0 is the prepended last item)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const cardWidth = width - tokens.spacing.lg * 2;
  const snapInterval = cardWidth + tokens.spacing.md;

  // Initial scroll to the first real item
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: snapInterval,
        animated: false,
      });
    }, 10);
    return () => clearTimeout(timer);
  }, [snapInterval]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isAutoPlaying && items.length > 1) {
      timer = setInterval(() => {
        scrollViewRef.current?.scrollTo({
          x: (currentIndex + 1) * snapInterval,
          animated: true,
        });
      }, interval);
    }

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying, items.length, snapInterval, interval]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    let index = Math.round(contentOffset / snapInterval);

    // Silent Jump Logic
    if (index === 0) {
      // We are at the prepended last item, jump to the real last item
      index = items.length;
      scrollViewRef.current?.scrollTo({
        x: index * snapInterval,
        animated: false,
      });
    } else if (index === extendedItems.length - 1) {
      // We are at the appended first item, jump to the real first item
      index = 1;
      scrollViewRef.current?.scrollTo({
        x: index * snapInterval,
        animated: false,
      });
    }

    setCurrentIndex(index);
  };

  const handleTouchStart = () => setIsAutoPlaying(false);
  const handleTouchEnd = () => {
    setTimeout(() => setIsAutoPlaying(autoPlay), 2000);
  };

  // Convert internal index (1 to length) to dot index (0 to length-1)
  const dotIndex = (currentIndex - 1 + items.length) % items.length;

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollAnimationEnd={handleScrollEnd}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.md,
        }}
      >
        {extendedItems.map((item, index) => (
          <View key={index} style={{ width: cardWidth }}>
            {item}
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: tokens.spacing.sm,
          gap: 6,
        }}
      >
        {items.map((_, index) => (
          <View
            key={index}
            style={{
              width: dotIndex === index ? 16 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: dotIndex === index 
                ? colors.primary
                : colors.surfaceVariant,
            }}
          />
        ))}
      </View>
    </View>
  );
}
