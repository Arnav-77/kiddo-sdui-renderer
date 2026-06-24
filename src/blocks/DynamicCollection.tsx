import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { BlockProps, DynamicCollectionBlock, Product } from '../types/sdui';
import { ProductCard } from './ProductCard';
import { useTheme } from '../theme/ThemeContext';

const Separator = () => <View style={styles.separator} />;

function DynamicCollectionComponent({
  block,
  onAction,
}: BlockProps<DynamicCollectionBlock>) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{block.title}</Text>
      <FlatList
        data={block.products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Product }) => (
          <View style={styles.cardWrapper}>
            <ProductCard product={item} onAction={onAction} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        // These are deliberate: they keep horizontal scrolling cheap and stop
        // the inner list from accumulating offscreen items as users swipe campaigns.
        nestedScrollEnabled
        removeClippedSubviews
        initialNumToRender={5}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  cardWrapper: {
    width: 140,
  },
  separator: {
    width: 8,
  },
});

export const DynamicCollection = React.memo(DynamicCollectionComponent);
