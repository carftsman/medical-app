import React, { useRef, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';

const CategoryBar = React.memo(({
  categories,
  activeCategory,
  setActiveCategory,
  loadingCategories,
  routeCategoryName,
  styles
}) => {

  const scrollRef = useRef(null);
  const chipPositions = useRef({});
  const hasScrolledFromRoute = useRef(false);

  useEffect(() => {
    if (!routeCategoryName) return;

    const position = chipPositions.current[routeCategoryName];

    if (
      position !== undefined &&
      !hasScrolledFromRoute.current
    ) {
      scrollRef.current?.scrollTo({
        x: position - 20,
        animated: false,
      });

      hasScrolledFromRoute.current = true;
    }
  }, [categories, routeCategoryName]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', padding:8 }}
    >
      {loadingCategories
        ? [1, 2, 3, 4].map(i => (
            <View key={i} style={styles.skeletonChip} />
          ))
        : categories.map(item => (
            <TouchableOpacity
              key={item.name}
              onLayout={(event) => {
                chipPositions.current[item.name] =
                  event.nativeEvent.layout.x;
              }}
              style={[
                styles.filterButton,
                activeCategory === item.name &&
                  styles.activeFilter,
              ]}
              onPress={() => setActiveCategory(item.name)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeCategory === item.name &&
                    styles.activeFilterText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
    </ScrollView>
  );
});

export default CategoryBar;