import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import ConfettiView from 'react-native-confetti';
import type { FullScreenOverlayBlock } from '../types/sdui';

// Sentinel value (set in the mystery-carnival payload) that tells us to render
// confetti instead of a Lottie animation.
const CONFETTI_SENTINEL = 'CONFETTI';

interface FullScreenOverlayProps {
  block: FullScreenOverlayBlock;
}

/**
 * Error boundary around the Lottie path. A bad/404 animation URL must never
 * crash the app — on failure we render nothing (PDF Section 2A).
 */
class LottieErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    if (__DEV__) console.warn('[FullScreenOverlay] Lottie failed:', error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Confetti path. react-native-confetti does not auto-fire — we trigger it
 * imperatively via the ref on mount. Wrapped in try/catch so a misbehaving
 * native module can never crash the overlay (PDF Section 2A: fail silently).
 *
 * react-native-confetti ships no TypeScript types, so the ref is `any` —
 * pragmatic over perfect for this single file.
 */
function ConfettiOverlay() {
  const confettiRef = React.useRef<any>(null);

  React.useEffect(() => {
    try {
      confettiRef.current?.startConfetti();
    } catch (error) {
      if (__DEV__) console.warn('[FullScreenOverlay] Confetti failed:', error);
    }
    return () => {
      try {
        confettiRef.current?.stopConfetti();
      } catch {
        // ignore teardown errors
      }
    };
  }, []);

  return <ConfettiView ref={confettiRef} duration={5000} confettiCount={100} />;
}

function FullScreenOverlayComponent({ block }: FullScreenOverlayProps) {
  // Overlay must not intercept taps; the feed underneath stays fully
  // interactive while the animation plays.
  return (
    <View style={styles.overlay} pointerEvents="none">
      {block.animationUrl === CONFETTI_SENTINEL ? (
        <ConfettiOverlay />
      ) : (
        <LottieErrorBoundary>
          {/* A bad asset URL renders nothing instead of throwing — overlays
              are decorative and shouldn't break the screen if a remote file fails. */}
          <LottieView
            source={{ uri: block.animationUrl }}
            autoPlay
            loop
            resizeMode="cover"
            style={styles.lottie}
          />
        </LottieErrorBoundary>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  lottie: {
    flex: 1,
  },
});

export const FullScreenOverlay = React.memo(FullScreenOverlayComponent);
