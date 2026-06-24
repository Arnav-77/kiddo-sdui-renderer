# Kiddo SDUI Renderer — Project Constraints

## Non-negotiable architectural rules
1. **Component registry is a hashmap**, never a switch. Type `Record<BlockType, React.ComponentType<BlockProps>>`. Switch-on-block-type loses points.
2. **Unknown block types fail silently**: lookup returns undefined → render null → `if (__DEV__) console.warn(...)`. Never throw.
3. **Every block component is wrapped in `React.memo`**. No exceptions.
4. **Zustand cart store uses narrow per-card selectors**: `useCartStore(s => s.quantities[id])`. Never `useCartStore(s => s)` inside a card. A re-render of one card MUST NOT re-render the other 30+ cards.
5. **Single vertical FlashList** for the whole feed. Horizontal FlatList nested inside DYNAMIC_COLLECTION only.
6. **Stable `keyExtractor`**: `item => item.id`. Never index-based.
7. **No hardcoded colors anywhere.** All colors come from `useTheme()` reading the payload's `theme` object via React Context.
8. **`handleAction(action)` is centralized.** Block components receive an `onAction` prop and call it with the raw action object. They contain zero business logic.

## TypeScript
- Strict mode is on. Don't relax it.
- Block, Action, Theme, Campaign are discriminated unions keyed by `type`.

## Stack
- Expo SDK 54 + React Native 0.81, React 19, TypeScript strict
- @shopify/flash-list v2 for the outer list
- zustand v5 for cart state
- lottie-react-native for animations
- react-native-fast-confetti for the Mystery Carnival confetti (do NOT implement confetti from scratch with Skia/canvas)

## Folder layout
src/
  types/sdui.ts          — discriminated unions
  registry/index.ts      — block hashmap
  blocks/                — BannerHero, ProductGrid2x2, DynamicCollection, ProductCard, FullScreenOverlay
  store/cart.ts          — zustand cart
  actions/dispatcher.ts  — handleAction
  theme/ThemeContext.tsx — theme provider + hook
  payloads/              — three mock JSON files (back-to-school, summer-playhouse, mystery-carnival)
App.tsx                  — renderer + campaign switcher (root level, not in src/)

## Workflow rules for Claude Code
- Build phase by phase. Do not jump ahead.
- After each phase, stop and let me verify on Expo Go before continuing.
- Never edit more than one phase's files in one turn.
- When in doubt about an API (FlashList v2, Zustand v5, RN 0.81), check the actual installed version in node_modules before writing code, do not guess.