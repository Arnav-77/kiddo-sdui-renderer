# Kiddo SDUI Renderer

A React Native homepage renderer for Kiddo. The screen is built from a JSON payload at runtime, so marketing can swap banners, products, themes, and animations without an app store release.

## What it does

The app reads a campaign payload (just a TypeScript object for this assignment, but it's shaped like something a server would send) and renders the homepage from it. There are three campaigns bundled in, and you can switch between them at the top of the screen:

- **Back to School** — yellow and blue theme, plus a couple of intentionally broken blocks to test that the app doesn't crash on bad data.
- **Summer Playhouse** — ocean blue theme with a Lottie overlay (the URL is a placeholder, so it fails silently, which is the point).
- **Mystery Gift Carnival** — red theme with confetti and a coupon action wired to the banner.

Switching campaigns flips the theme across every block instantly because all colors come from a Context, not from hardcoded values.

## Demo videos

Three short screen recordings, one per campaign. Each shows the campaign loading, the theme applying, scrolling behavior, and one or two interactions:

[View the demos on Google Drive](https://drive.google.com/drive/folders/1Zm-ZwesT2tXtgH-i-SXviBO8t64bdVkB?usp=sharing)

- `1-back-to-school.mp4` — yellow + blue theme, vertical feed, horizontal "Lunchboxes & Bags" collection, add to cart
- `2-summer-playhouse.mp4` — ocean blue theme, campaign switch from Back to School
- `3-mystery-gift-carnival.mp4` — red theme, confetti overlay firing on switch, coupon action on banner tap

## Running it

```bash
npm install
npx expo start --clear
```

Then scan the QR with Expo Go on your phone. Built and tested against Expo SDK 54 on Android.

## Project structure

```
src/
  types/sdui.ts          discriminated unions for the payload schema
  registry/index.ts      maps block type strings to React components
  blocks/                BannerHero, ProductGrid2x2, DynamicCollection, ProductCard, FullScreenOverlay, Placeholder
  store/cart.ts          Zustand cart store
  actions/dispatcher.ts  central handler for ADD_TO_CART, DEEP_LINK, APPLY_MYSTERY_GIFT_COUPON
  theme/ThemeContext.tsx React Context that exposes payload.theme to all blocks
  payloads/              three campaign JSON payloads as TypeScript modules
App.tsx                  campaign switcher + FlashList feed + overlay
declaration.d.ts         module declaration for react-native-confetti (no shipped types)
```

## Design choices

### Component registry as a hashmap

The registry is a `Record<BlockType, React.ComponentType<...>>`. Looking up a block type is just a property access.

I thought of using a switch statement first because that's what comes to mind for "match this string to that component," but a switch means every new block type requires editing the renderer itself. With a hashmap, adding a new block is one line in the registry file. The renderer never changes.

Unknown block types return `null` from the lookup and the renderer drops them. There's a `__DEV__` warning so you notice in development, but nothing throws. A single bad entry in the payload doesn't take the screen down.

### Zustand with narrow per-card selectors

The cart is a flat `Record<string, number>` keyed by product id. Each `ProductCard` subscribes only to its own quantity:

```typescript
const quantity = useCartStore(s => s.quantities[product.id] ?? 0);
```

I thought of just selecting the whole `quantities` object and reading the id off it inside the component, but that would cause every card on the screen to re-render whenever any single quantity changed. The narrow selector means tapping "Add to Cart" on one card only re-renders that card. Verified with the React DevTools profiler.

Every block component is also wrapped in `React.memo` so they don't re-render when their parent (the FlashList) re-renders for unrelated reasons.

### React Context for theming

The theme (`primary`, `background`, `accent`, `text`) lives in the payload. A `ThemeProvider` at the root reads `payload.theme` and exposes it through `useTheme()`. No component has hardcoded hex codes except `Placeholder`, which is dev-only.

I thought of putting the theme in Zustand alongside the cart, but the theme doesn't really change in response to user actions inside a campaign, it changes when the whole payload swaps. Context felt closer to the actual mental model: "this is ambient information that doesn't update often." If it did update on every interaction, Zustand would be the better fit.

### Centralized action dispatcher

Blocks emit raw `Action` objects through an `onAction` prop. They have no idea what those actions do. `src/actions/dispatcher.ts` is the only file that knows `ADD_TO_CART` should update the cart store and `DEEP_LINK` should log a URL. Unknown action types fall through to a `default` case that logs a warning instead of throwing.

This means the same block components could be reused across different apps with different action handlers. They're decoupled from business logic on purpose.

### Single FlashList for the feed, nested horizontal FlatList for collections

The whole feed is one `FlashList` (Shopify's, v2). Inside the `DynamicCollection` block there's a horizontal `FlatList` for the product carousel. I set `nestedScrollEnabled`, `removeClippedSubviews`, and a bounded `windowSize` on the inner list because without those, scrolling horizontally tends to interfere with the vertical feed's momentum on Android.

### Overlay with `pointerEvents="none"`

`FullScreenOverlay` covers the screen but doesn't capture taps. Users can still scroll and tap the feed underneath while the animation plays. The Lottie path silently renders nothing if the asset URL fails to load, which is what happens with the Summer Playhouse placeholder URL.

## Resilience

The Back to School payload includes two intentionally broken blocks:

- An unknown block type (`NEW_COMPONENT_V2`) that the registry doesn't know about.
- A `BANNER_HERO` with an action type the dispatcher doesn't handle (`GARBAGE_ACTION_TYPE`).

Neither crashes the app. The unknown block is silently dropped from the feed. Tapping the bad banner logs a warning from the dispatcher's `default` case. This was the easiest way to convince myself the resilience paths actually work end-to-end rather than just looking right in code.

## Things I'd do differently with more time

- `SafeAreaView` from `react-native` is deprecated. The right move is to switch to `react-native-safe-area-context`. I left it because changing it now is a small refactor and the deprecation is a warning, not an error.
- The Lottie URL for Summer Playhouse is a placeholder. With more time, I'd pick a real asset that fits the campaign theme.
- The product images are from picsum.photos with seeded URLs, so they're random photos rather than actual products. Real product images would obviously make more sense.
- The campaign switcher buttons at the top could use better styling, especially on smaller screens where they wrap awkwardly.

## Stack

- Expo SDK 54, React Native 0.81, React 19
- TypeScript in strict mode
- `@shopify/flash-list` v2 for the main feed
- `zustand` v5 for the cart store
- `lottie-react-native` for the overlay animation
- `react-native-confetti` for the carnival confetti (chose this over `react-native-fast-confetti` after the latter pulled in `@shopify/react-native-skia` and `react-native-reanimated` as hard dependencies, which felt like overkill for a single confetti effect)
