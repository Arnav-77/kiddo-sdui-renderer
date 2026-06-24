import type { CampaignPayload } from '../types/sdui';

export const payload: CampaignPayload = {
  campaignId: 'summer-playhouse',
  campaignName: 'Summer Playhouse Festival',
  theme: {
    primary: '#0EA5E9',
    background: '#F0F9FF',
    accent: '#0369A1',
    text: '#0C4A6E',
  },
  blocks: [
    {
      id: 'banner-summer',
      type: 'BANNER_HERO',
      imageUrl: 'https://picsum.photos/seed/summer-banner/800/450',
      action: {
        type: 'DEEP_LINK',
        payload: { url: '/campaign/summer-playhouse' },
      },
    },
    {
      id: 'grid-summer-1',
      type: 'PRODUCT_GRID_2X2',
      products: [
        {
          id: 'sp1',
          title: 'Inflatable Pool Floatie',
          price: 18.99,
          imageUrl: 'https://picsum.photos/seed/sp1/200/200',
        },
        {
          id: 'sp2',
          title: 'Beach Sandcastle Kit',
          price: 12.49,
          imageUrl: 'https://picsum.photos/seed/sp2/200/200',
        },
        {
          id: 'sp3',
          title: 'Water Blaster Soaker',
          price: 9.99,
          imageUrl: 'https://picsum.photos/seed/sp3/200/200',
        },
        {
          id: 'sp4',
          title: 'Kids Sun Hat',
          price: 7.99,
          imageUrl: 'https://picsum.photos/seed/sp4/200/200',
        },
      ],
    },
    {
      id: 'collection-summer',
      type: 'DYNAMIC_COLLECTION',
      title: 'Petting Zoo Tickets',
      products: [
        {
          id: 'sp5',
          title: 'Pony Ride Pass',
          price: 5.0,
          imageUrl: 'https://picsum.photos/seed/sp5/200/200',
        },
        {
          id: 'sp6',
          title: 'Goat Feeding Token',
          price: 3.5,
          imageUrl: 'https://picsum.photos/seed/sp6/200/200',
        },
        {
          id: 'sp7',
          title: 'Bunny Cuddle Pass',
          price: 4.0,
          imageUrl: 'https://picsum.photos/seed/sp7/200/200',
        },
        {
          id: 'sp8',
          title: 'Duck Pond Ticket',
          price: 2.75,
          imageUrl: 'https://picsum.photos/seed/sp8/200/200',
        },
        {
          id: 'sp9',
          title: 'Llama Walk Pass',
          price: 6.5,
          imageUrl: 'https://picsum.photos/seed/sp9/200/200',
        },
        {
          id: 'sp10',
          title: 'Chick Hatchery Tour',
          price: 4.25,
          imageUrl: 'https://picsum.photos/seed/sp10/200/200',
        },
        {
          id: 'sp11',
          title: 'Mini Horse Photo Op',
          price: 8.0,
          imageUrl: 'https://picsum.photos/seed/sp11/200/200',
        },
        {
          id: 'sp12',
          title: 'Petting Barn Day Pass',
          price: 10.0,
          imageUrl: 'https://picsum.photos/seed/sp12/200/200',
        },
      ],
    },
    {
      id: 'grid-summer-2',
      type: 'PRODUCT_GRID_2X2',
      products: [
        {
          id: 'sp13',
          title: 'Picnic Blanket',
          price: 22.99,
          imageUrl: 'https://picsum.photos/seed/sp13/200/200',
        },
        {
          id: 'sp14',
          title: 'Frisbee Flyer',
          price: 5.49,
          imageUrl: 'https://picsum.photos/seed/sp14/200/200',
        },
        {
          id: 'sp15',
          title: 'Bubble Wand Set',
          price: 6.99,
          imageUrl: 'https://picsum.photos/seed/sp15/200/200',
        },
        {
          id: 'sp16',
          title: 'Cooler Backpack',
          price: 27.99,
          imageUrl: 'https://picsum.photos/seed/sp16/200/200',
        },
      ],
    },
  ],
  overlay: {
    id: 'overlay-summer',
    type: 'FULL_SCREEN_OVERLAY',
    animationUrl:
      'https://lottie.host/4f5b1e8a-3c2d-4e0f-9a1b-1c2d3e4f5a6b/example.json',
  },
};
