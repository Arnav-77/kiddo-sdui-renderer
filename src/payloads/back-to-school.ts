import type { CampaignPayload } from '../types/sdui';

export const payload: CampaignPayload = {
  campaignId: 'back-to-school',
  campaignName: 'Back to School Mega-Sale',
  theme: {
    primary: '#FFD700',
    background: '#FFFFFF',
    accent: '#1E40AF',
    text: '#1F2937',
  },
  blocks: [
    {
      id: 'banner-1',
      type: 'BANNER_HERO',
      imageUrl: 'https://picsum.photos/seed/banner1/800/450',
      action: { type: 'DEEP_LINK', payload: { url: '/campaign/back-to-school' } },
    },
    {
      id: 'grid-1',
      type: 'PRODUCT_GRID_2X2',
      products: [
        {
          id: 'p1',
          title: 'Spiral Notebook',
          price: 4.99,
          imageUrl: 'https://picsum.photos/seed/1/200/200',
        },
        {
          id: 'p2',
          title: 'Mechanical Pencil Set',
          price: 6.49,
          imageUrl: 'https://picsum.photos/seed/2/200/200',
        },
        {
          id: 'p3',
          title: 'Highlighter Pack',
          price: 5.25,
          imageUrl: 'https://picsum.photos/seed/3/200/200',
        },
        {
          id: 'p4',
          title: 'Sticky Notes',
          price: 3.99,
          imageUrl: 'https://picsum.photos/seed/4/200/200',
        },
      ],
    },
    // Intentionally malformed entries to exercise the resilience paths — an
    // unknown block type and an action with an unrecognized type. Both should
    // be handled silently.
    {
      id: 'unknown-test',
      type: 'NEW_COMPONENT_V2',
      someProperty: 'should be ignored',
    } as any,
    {
      id: 'corrupt-banner',
      type: 'BANNER_HERO',
      imageUrl: 'https://picsum.photos/seed/corrupt/800/450',
      action: { type: 'GARBAGE_ACTION_TYPE', payload: {} } as any,
    },
    {
      id: 'collection-1',
      type: 'DYNAMIC_COLLECTION',
      title: 'Lunchboxes & Bags',
      products: [
        {
          id: 'p5',
          title: 'Insulated Lunchbox',
          price: 14.99,
          imageUrl: 'https://picsum.photos/seed/5/200/200',
        },
        {
          id: 'p6',
          title: 'Canvas Backpack',
          price: 29.99,
          imageUrl: 'https://picsum.photos/seed/6/200/200',
        },
        {
          id: 'p7',
          title: 'Water Bottle',
          price: 9.99,
          imageUrl: 'https://picsum.photos/seed/7/200/200',
        },
        {
          id: 'p8',
          title: 'Pencil Pouch',
          price: 7.49,
          imageUrl: 'https://picsum.photos/seed/8/200/200',
        },
        {
          id: 'p9',
          title: 'Bento Box',
          price: 16.99,
          imageUrl: 'https://picsum.photos/seed/9/200/200',
        },
        {
          id: 'p10',
          title: 'Rolling Backpack',
          price: 39.99,
          imageUrl: 'https://picsum.photos/seed/10/200/200',
        },
        {
          id: 'p11',
          title: 'Snack Container Set',
          price: 11.99,
          imageUrl: 'https://picsum.photos/seed/11/200/200',
        },
        {
          id: 'p12',
          title: 'Drawstring Gym Bag',
          price: 12.49,
          imageUrl: 'https://picsum.photos/seed/12/200/200',
        },
      ],
    },
    {
      id: 'grid-2',
      type: 'PRODUCT_GRID_2X2',
      products: [
        {
          id: 'p13',
          title: 'Scientific Calculator',
          price: 19.99,
          imageUrl: 'https://picsum.photos/seed/13/200/200',
        },
        {
          id: 'p14',
          title: 'Geometry Set',
          price: 8.99,
          imageUrl: 'https://picsum.photos/seed/14/200/200',
        },
        {
          id: 'p15',
          title: 'Eraser Multipack',
          price: 2.99,
          imageUrl: 'https://picsum.photos/seed/15/200/200',
        },
        {
          id: 'p16',
          title: 'Glue Sticks',
          price: 4.49,
          imageUrl: 'https://picsum.photos/seed/16/200/200',
        },
      ],
    },
  ],
};
