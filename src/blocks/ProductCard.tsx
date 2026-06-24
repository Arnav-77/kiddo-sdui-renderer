import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Action, Product } from '../types/sdui';
import { useCartStore } from '../store/cart';
import { useTheme } from '../theme/ThemeContext';

interface ProductCardProps {
  product: Product;
  onAction: (action: Action) => void;
}

function ProductCardComponent({ product, onAction }: ProductCardProps) {
  // Narrow selector by product id; selecting the whole store (or even the full
  // quantities object) would re-render every card whenever any quantity changed.
  const quantity = useCartStore((s) => s.quantities[product.id] ?? 0);
  const theme = useTheme();

  return (
    <View style={[styles.card, { borderColor: theme.primary }]}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
        {product.title}
      </Text>
      <Text style={[styles.price, { color: theme.text }]}>₹{product.price}</Text>
      <Pressable
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() =>
          onAction({ type: 'ADD_TO_CART', payload: { id: product.id } })
        }
      >
        <Text style={[styles.buttonText, { color: theme.background }]}>
          {quantity > 0 ? `Add to Cart (${quantity})` : 'Add to Cart'}
        </Text>
      </Pressable>
      {quantity > 0 && (
        <View style={[styles.badge, { backgroundColor: theme.accent }]}>
          <Text style={[styles.badgeText, { color: theme.background }]}>
            {quantity}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    marginTop: 2,
    fontSize: 13,
  },
  button: {
    marginTop: 8,
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export const ProductCard = React.memo(ProductCardComponent);
