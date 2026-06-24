import type { Action } from '../types/sdui';
import { useCartStore } from '../store/cart';

// Blocks emit raw action objects via onAction and stay ignorant of business
// logic; this module is the only place that knows how to interpret them, which
// keeps components reusable across campaigns.
export function handleAction(action: Action): void {
  console.log('[action]', action);

  switch (action.type) {
    case 'ADD_TO_CART':
      useCartStore.getState().addToCart(action.payload.id);
      break;
    case 'DEEP_LINK':
      // Real navigation is out of scope for the assignment.
      console.log('[deep-link]', action.payload.url);
      break;
    case 'APPLY_MYSTERY_GIFT_COUPON':
      // Placeholder — coupon application wired up in a later phase.
      console.log('[coupon]', action.payload.couponCode);
      break;
    default:
      // Unknown action types are logged, not thrown — a corrupt server payload
      // shouldn't take down the UI.
      if (__DEV__) console.warn('[dispatcher] Unknown action type:', action);
      return;
  }
}

export default handleAction;
