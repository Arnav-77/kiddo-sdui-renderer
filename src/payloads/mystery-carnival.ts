import type { CampaignPayload } from '../types/sdui';

export const payload: CampaignPayload = {
  campaignId: 'mystery-carnival',
  campaignName: 'Mystery Gift Carnival',
  theme: {
    primary: '#DC2626',
    background: '#FEF2F2',
    accent: '#7F1D1D',
    text: '#450A0A',
  },
  blocks: [
    {
      id: 'banner-carnival',
      type: 'BANNER_HERO',
      imageUrl: 'https://picsum.photos/seed/carnival-banner/800/450',
      // BANNER_HERO carries the coupon action so we can demonstrate the
      // APPLY_MYSTERY_GIFT_COUPON path firing (ProductCard always emits
      // ADD_TO_CART, so the banner is the place to wire this up).
      action: {
        type: 'APPLY_MYSTERY_GIFT_COUPON',
        payload: { couponCode: 'MYSTERY50' },
      },
    },
    {
      id: 'grid-carnival-1',
      type: 'PRODUCT_GRID_2X2',
      products: [
        {
          id: 'mc1',
          title: 'Mystery Prize Box',
          price: 14.99,
          imageUrl: 'https://picsum.photos/seed/mc1/200/200',
        },
        {
          id: 'mc2',
          title: 'Carnival Plush Toy',
          price: 11.49,
          imageUrl: 'https://picsum.photos/seed/mc2/200/200',
        },
        {
          id: 'mc3',
          title: 'Ring Toss Game',
          price: 8.99,
          imageUrl: 'https://picsum.photos/seed/mc3/200/200',
        },
        {
          id: 'mc4',
          title: 'Cotton Candy Maker',
          price: 24.99,
          imageUrl: 'https://picsum.photos/seed/mc4/200/200',
        },
      ],
    },
    {
      id: 'collection-carnival',
      type: 'DYNAMIC_COLLECTION',
      title: 'Mystery Gifts',
      products: [
        {
          id: 'mc5',
          title: 'Surprise Sticker Pack',
          price: 3.99,
          imageUrl: 'https://picsum.photos/seed/mc5/200/200',
        },
        {
          id: 'mc6',
          title: 'Blind Bag Figure',
          price: 5.99,
          imageUrl: 'https://picsum.photos/seed/mc6/200/200',
        },
        {
          id: 'mc7',
          title: 'Lucky Dip Pouch',
          price: 4.5,
          imageUrl: 'https://picsum.photos/seed/mc7/200/200',
        },
        {
          id: 'mc8',
          title: 'Scratch & Win Card',
          price: 1.99,
          imageUrl: 'https://picsum.photos/seed/mc8/200/200',
        },
        {
          id: 'mc9',
          title: 'Mystery Snack Crate',
          price: 9.99,
          imageUrl: 'https://picsum.photos/seed/mc9/200/200',
        },
        {
          id: 'mc10',
          title: 'Hidden Gem Necklace',
          price: 12.99,
          imageUrl: 'https://picsum.photos/seed/mc10/200/200',
        },
        {
          id: 'mc11',
          title: 'Wonder Egg Capsule',
          price: 6.49,
          imageUrl: 'https://picsum.photos/seed/mc11/200/200',
        },
        {
          id: 'mc12',
          title: 'Treasure Chest Box',
          price: 15.99,
          imageUrl: 'https://picsum.photos/seed/mc12/200/200',
        },
      ],
    },
    {
      id: 'grid-carnival-2',
      type: 'PRODUCT_GRID_2X2',
      products: [
        {
          id: 'mc13',
          title: 'Carnival Ticket Roll',
          price: 7.99,
          imageUrl: 'https://picsum.photos/seed/mc13/200/200',
        },
        {
          id: 'mc14',
          title: 'Prize Wheel Spinner',
          price: 19.99,
          imageUrl: 'https://picsum.photos/seed/mc14/200/200',
        },
        {
          id: 'mc15',
          title: 'Funhouse Mirror',
          price: 16.49,
          imageUrl: 'https://picsum.photos/seed/mc15/200/200',
        },
        {
          id: 'mc16',
          title: 'Popcorn Bucket',
          price: 5.49,
          imageUrl: 'https://picsum.photos/seed/mc16/200/200',
        },
      ],
    },
  ],
  overlay: {
    id: 'overlay-carnival',
    type: 'FULL_SCREEN_OVERLAY',
    // Sentinel: the overlay component renders confetti (not Lottie) for this.
    animationUrl: 'CONFETTI',
  },
};
