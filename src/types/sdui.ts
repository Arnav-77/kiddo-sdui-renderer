export type BlockType =
  | 'BANNER_HERO'
  | 'PRODUCT_GRID_2X2'
  | 'DYNAMIC_COLLECTION'
  | 'FULL_SCREEN_OVERLAY';

export interface AddToCartAction {
  type: 'ADD_TO_CART';
  payload: { id: string };
}

export interface DeepLinkAction {
  type: 'DEEP_LINK';
  payload: { url: string };
}

export interface ApplyMysteryGiftCouponAction {
  type: 'APPLY_MYSTERY_GIFT_COUPON';
  payload: { couponCode: string };
}

export type Action =
  | AddToCartAction
  | DeepLinkAction
  | ApplyMysteryGiftCouponAction;

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export interface BannerHeroBlock {
  id: string;
  type: 'BANNER_HERO';
  imageUrl: string;
  action: Action;
}

export interface ProductGrid2x2Block {
  id: string;
  type: 'PRODUCT_GRID_2X2';
  products: Product[];
}

export interface DynamicCollectionBlock {
  id: string;
  type: 'DYNAMIC_COLLECTION';
  title: string;
  products: Product[];
}

export interface FullScreenOverlayBlock {
  id: string;
  type: 'FULL_SCREEN_OVERLAY';
  animationUrl: string;
}

export type Block =
  | BannerHeroBlock
  | ProductGrid2x2Block
  | DynamicCollectionBlock
  | FullScreenOverlayBlock;

export interface Theme {
  primary: string;
  background: string;
  accent?: string;
  text?: string;
}

export interface CampaignPayload {
  campaignId: string;
  campaignName: string;
  theme: Theme;
  blocks: Block[];
  overlay?: FullScreenOverlayBlock;
}

export interface BlockProps<T extends Block = Block> {
  block: T;
  onAction: (action: Action) => void;
}
