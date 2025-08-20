import { createThemeContract } from '@vanilla-extract/css';

// Centralized design system tokens
export const designTokens = createThemeContract({
  color: {
    // Base colors
    text: null,
    background: null,
    primary: null,
    secondary: null,
    muted: null,

    // Card colors
    card: {
      bg: null,
      title: null,
      subtitle: null,
      details: null,
      border: null,
    },

    // Interactive elements
    interactive: {
      toolbarBg: null,
      toolbarText: null,
      buttonBg: null,
      buttonBorder: null,
      buttonHover: null,
      buttonActive: null,
      focusRing: null,
    },

    // Status/state colors
    status: {
      success: null,
      warning: null,
      error: null,
      info: null,
    },
  },

  // Consistent spacing scale
  spacing: {
    xs: null, // 4px
    sm: null, // 8px
    md: null, // 16px
    lg: null, // 24px
    xl: null, // 32px
    '2xl': null, // 48px
    '3xl': null, // 64px
  },

  // Typography system
  typography: {
    fontSize: {
      xs: null,
      sm: null,
      base: null,
      lg: null,
      xl: null,
      '2xl': null,
    },
    lineHeight: {
      tight: null,
      normal: null,
      relaxed: null,
    },
    fontWeight: {
      normal: null,
      medium: null,
      semibold: null,
      bold: null,
    },
  },

  // Consistent border radius
  radius: {
    sm: null, // 4px
    md: null, // 8px
    lg: null, // 12px
    xl: null, // 16px
    full: null, // 9999px
  },

  // Elevation system (shadows)
  elevation: {
    none: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },

  // Animation tokens
  animation: {
    duration: {
      fast: null, // 150ms
      normal: null, // 300ms
      slow: null, // 500ms
    },
    easing: {
      linear: null,
      ease: null,
      easeIn: null,
      easeOut: null,
      easeInOut: null,
    },
  },

  // Z-index scale
  zIndex: {
    base: null, // 0
    elevated: null, // 10
    sticky: null, // 20
    overlay: null, // 30
    modal: null, // 40
    tooltip: null, // 50
  },
});

// Legacy compatibility - re-export with old structure
export const vars = designTokens;
