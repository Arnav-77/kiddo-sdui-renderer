// A hashmap rather than a switch: adding a new block type touches only this
// map, never the renderer or any control flow. Unknown types resolve to null
// and are dropped silently, so one malformed payload entry can't crash the view tree.
import type React from 'react';
import type { BlockProps, BlockType } from '../types/sdui';
import { BannerHero } from '../blocks/BannerHero';
import { ProductGrid2x2 } from '../blocks/ProductGrid2x2';
import { DynamicCollection } from '../blocks/DynamicCollection';
import { FullScreenOverlay } from '../blocks/FullScreenOverlay';

export const blockRegistry: Record<
  BlockType,
  React.ComponentType<BlockProps<any>>
> = {
  BANNER_HERO: BannerHero,
  PRODUCT_GRID_2X2: ProductGrid2x2,
  DYNAMIC_COLLECTION: DynamicCollection,
  FULL_SCREEN_OVERLAY: FullScreenOverlay,
};

export function getBlockComponent(
  type: string
): React.ComponentType<BlockProps<any>> | null {
  const component = blockRegistry[type as BlockType];
  if (!component) {
    if (__DEV__) console.warn('[registry] Unknown block type:', type);
    return null;
  }
  return component;
}
