import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { BlockProps, ProductGrid2x2Block } from '../types/sdui';
import { ProductCard } from './ProductCard';

function ProductGrid2x2Component({
  block,
  onAction,
}: BlockProps<ProductGrid2x2Block>) {
  const products = block.products.slice(0, 4);
  const topRow = products.slice(0, 2);
  const bottomRow = products.slice(2, 4);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {topRow.map((product) => (
          <ProductCard key={product.id} product={product} onAction={onAction} />
        ))}
      </View>
      {bottomRow.length > 0 && (
        <View style={styles.row}>
          {bottomRow.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAction={onAction}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});

export const ProductGrid2x2 = React.memo(ProductGrid2x2Component);
