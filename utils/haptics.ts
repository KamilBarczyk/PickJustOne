/** Thin wrappers around expo-haptics for consistent call sites. */

import * as Haptics from 'expo-haptics';

/** Subtle tick – for every button press or toggle. */
export function hapticLight() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

/** Stronger tap – for destructive or significant actions. */
export function hapticMedium() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

/** Tiny selection click – ideal for choosing one of two options. */
export function hapticSelection() {
  Haptics.selectionAsync();
}

/** Positive outcome – result reveal, task completed. */
export function hapticSuccess() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

/** Something went wrong or was prevented. */
export function hapticWarning() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
}
