import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import type { BannerHeroBlock, BlockProps } from '../types/sdui';
import { useTheme } from '../theme/ThemeContext';

function BannerHeroComponent({ block, onAction }: BlockProps<BannerHeroBlock>) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => onAction(block.action)}>
      <Image
        source={{ uri: block.imageUrl }}
        style={[styles.image, { borderColor: theme.primary }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderBottomWidth: 2,
  },
});

export const BannerHero = React.memo(BannerHeroComponent);
