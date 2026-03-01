/**
 * Animation utilities and shared config.
 *
 * Basics (React Native + Reanimated):
 * - Animations are driven by "shared values" (useSharedValue) that live on the UI thread,
 *   so they stay smooth even when JS is busy.
 * - useAnimatedStyle maps those values to style props (opacity, transform, etc.).
 * - withTiming / withSpring change values over time; withDelay / withSequence compose them.
 * - Keep duration 200–400 ms for feedback (e.g. press), 300–500 ms for enter/exit.
 */

export const animationDurations = {
  /** Quick feedback (e.g. button/card press) */
  fast: 150,
  /** Default enter/exit and transitions */
  normal: 300,
  /** Emphasized reveal (e.g. result card) */
  slow: 450,
} as const;

export const animationDelays = {
  /** Stagger between list items */
  stagger: 80,
  /** Short pause before next element */
  short: 120,
} as const;
