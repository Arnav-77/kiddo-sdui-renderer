import { create } from 'zustand';

interface CartState {
  quantities: Record<string, number>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  totalItems: () => number;
}

// State is a flat Record<string, number> so a card can subscribe to a single
// key; a nested shape would force broader selectors and wider re-renders.
export const useCartStore = create<CartState>((set, get) => ({
  quantities: {},
  addToCart: (id) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [id]: (state.quantities[id] ?? 0) + 1,
      },
    })),
  removeFromCart: (id) =>
    set((state) => {
      const current = state.quantities[id] ?? 0;
      const next = current - 1;
      const quantities = { ...state.quantities };
      if (next <= 0) {
        delete quantities[id];
      } else {
        quantities[id] = next;
      }
      return { quantities };
    }),
  totalItems: () =>
    Object.values(get().quantities).reduce((sum, qty) => sum + qty, 0),
}));

export default useCartStore;
