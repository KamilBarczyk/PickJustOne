// Design System - Colors and Typography
// Centralized place for all design tokens

export const colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#5AC8FA',
  
  // Neutral colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  
  // Semantic colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
  
  // Border and divider
  border: '#E5E5EA',
  divider: '#C6C6C8',
};

export const typography = {
  // Font sizes
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};
