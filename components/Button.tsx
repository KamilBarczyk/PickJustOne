import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../utils/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const buttonStyle: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    ...(disabled ? [styles.disabled] : []),
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !disabled && !loading && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : colors.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.backgroundSecondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  // Sizes
  smallSize: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 32,
  },
  mediumSize: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  largeSize: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 52,
  },
  // Text styles
  text: {
    ...typography.body,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: colors.text,
  },
  outlineText: {
    color: colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
