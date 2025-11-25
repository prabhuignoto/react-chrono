import { createThemeContract } from '@vanilla-extract/css';

// Unified token system - consolidates all token contracts
export const tokens = createThemeContract({
  // Primitive tokens - raw values
  primitive: {
    color: {
      // Neutral palette
      white: null,
      black: null,
      gray: {
        50: null,
        100: null,
        200: null,
        300: null,
        400: null,
        500: null,
        600: null,
        700: null,
        800: null,
        900: null,
      },
      // Brand palette
      blue: {
        50: null,
        100: null,
        200: null,
        300: null,
        400: null,
        500: null,
        600: null,
        700: null,
        800: null,
        900: null,
      },
      // Status palette
      green: {
        400: null,
        500: null,
        600: null,
      },
      red: {
        400: null,
        500: null,
        600: null,
      },
      yellow: {
        400: null,
        500: null,
        600: null,
      },
    },
    spacing: {
      0: null,
      1: null, // 4px
      2: null, // 8px
      3: null, // 12px
      4: null, // 16px
      5: null, // 20px
      6: null, // 24px
      8: null, // 32px
      10: null, // 40px
      12: null, // 48px
      16: null, // 64px
      20: null, // 80px
      24: null, // 96px
    },
    fontSize: {
      xs: null, // 12px
      sm: null, // 14px
      base: null, // 16px
      lg: null, // 18px
      xl: null, // 20px
      '2xl': null, // 24px
      '3xl': null, // 30px
      '4xl': null, // 36px
    },
    lineHeight: {
      tight: null, // 1.2
      normal: null, // 1.5
      relaxed: null, // 1.8
    },
    fontWeight: {
      normal: null, // 400
      medium: null, // 500
      semibold: null, // 600
      bold: null, // 700
    },
    borderRadius: {
      none: null, // 0
      sm: null, // 4px
      md: null, // 8px
      lg: null, // 12px
      xl: null, // 16px
      '2xl': null, // 24px
      full: null, // 9999px
    },
    shadow: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
    },
    zIndex: {
      base: null, // 0
      elevated: null, // 10
      sticky: null, // 20
      overlay: null, // 30
      modal: null, // 40
      tooltip: null, // 50
    },
    transition: {
      duration: {
        instant: null, // 0ms
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
        spring: null,
      },
    },
  },

  // Semantic tokens - meaningful names that map to primitives
  semantic: {
    // Timeline semantic tokens (maps to component.timeline)
    timeline: {
      point: {
        background: {
          active: null,
          inactive: null,
          hover: null,
        },
      },
    },
    color: {
      // Text colors
      text: {
        primary: null,
        secondary: null,
        muted: null,
        inverse: null,
      },
      // Background colors
      background: {
        primary: null,
        secondary: null,
        elevated: null,
        overlay: null,
      },
      // Interactive colors
      interactive: {
        primary: null,
        primaryHover: null,
        primaryActive: null,
        secondary: null,
        secondaryHover: null,
        muted: null,
        mutedHover: null,
        toolbarBg: null,
        toolbarText: null,
        buttonBg: null,
        buttonBorder: null,
        focusRing: null,
      },
      // Border colors
      border: {
        default: null,
        muted: null,
        emphasis: null,
        interactive: null,
      },
      // Status colors
      status: {
        success: null,
        warning: null,
        error: null,
        info: null,
      },
      // Icon colors
      icon: {
        default: null,
        muted: null,
        emphasis: null,
      },
      // Card colors (legacy compatibility)
      card: {
        bg: null,
        border: null,
        title: null,
        subtitle: null,
        details: null,
      },
      // Primary color (legacy compatibility)
      primary: null,
      muted: null,
      // Nested card colors (legacy compatibility)
      nestedCardBg: null,
      nestedCardTitle: null,
      nestedCardSubtitle: null,
      nestedCardDetails: null,
      // Button colors (legacy compatibility)
      buttonBorder: null,
    },
    spacing: {
      xs: null, // maps to primitive.spacing.1
      sm: null, // maps to primitive.spacing.2
      md: null, // maps to primitive.spacing.4
      lg: null, // maps to primitive.spacing.6
      xl: null, // maps to primitive.spacing.8
      '2xl': null, // maps to primitive.spacing.12
      '3xl': null, // maps to primitive.spacing.16
    },
    typography: {
      fontSize: {
        caption: null, // maps to primitive.fontSize.xs
        body: null, // maps to primitive.fontSize.base
        base: null, // alias for body - maps to primitive.fontSize.base
        heading3: null, // maps to primitive.fontSize.lg
        heading2: null, // maps to primitive.fontSize.xl
        heading1: null, // maps to primitive.fontSize.2xl
        cardTitle: null,
        cardText: null,
        title: null,
        sm: null,
        md: null,
        xs: null,
        lg: null,
        xl: null, // maps to primitive.fontSize.xl
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
    borderRadius: {
      sm: null, // maps to primitive.borderRadius.sm
      md: null, // maps to primitive.borderRadius.md
      lg: null, // maps to primitive.borderRadius.lg
      xl: null, // maps to primitive.borderRadius.xl
      full: null, // maps to primitive.borderRadius.full
    },
    shadow: {
      card: null,
      cardHover: null,
      cardActive: null,
      toolbar: null,
      modal: null,
      none: null,
    },
    zIndex: {
      timelineCard: null,
      controls: null,
      popover: null,
      outline: null,
    },
    motion: {
      duration: {
        fast: null,
        normal: null,
        slow: null,
      },
      easing: {
        standard: null,
        emphasized: null,
        easeIn: null,
        easeOut: null,
        easeInOut: null,
      },
    },
    // Component-specific semantic tokens
    card: {
      background: {
        default: null,
        hover: null,
        active: null,
        gradient: null,
      },
      border: {
        color: null,
        gradient: null,
        radius: {
          sm: null,
          md: null,
          lg: null,
        },
      },
      shadow: {
        default: null,
        hover: null,
        active: null,
        flat: null,
        low: null,
        medium: null,
        high: null,
        interactive: null,
      },
      content: {
        spacing: {
          tight: null,
          normal: null,
          loose: null,
        },
      },
    },
    toolbar: {
      background: {
        default: null,
        hover: null,
      },
      text: {
        default: null,
        muted: null,
      },
      button: {
        background: {
          default: null,
          hover: null,
          active: null,
        },
        border: {
          default: null,
          hover: null,
        },
        text: {
          default: null,
          disabled: null,
        },
        size: {
          sm: null,
          md: null,
          lg: null,
        },
      },
    },
    states: {
      focus: {
        outline: null,
        ring: {
          color: null,
          width: null,
          offset: null,
          outline: null,
        },
      },
      disabled: {
        opacity: null,
        filter: null,
      },
      hover: {
        opacity: null,
        transform: null,
        background: null,
        border: null,
      },
      active: {
        opacity: null,
        transform: null,
        background: null,
        border: null,
      },
    },
    layout: {
      container: {
        maxWidth: {
          sm: null,
          md: null,
          lg: null,
          xl: null,
        },
      },
    },
  },

  // Component-specific tokens
  component: {
    timeline: {
      line: {
        width: null,
        color: null,
      },
      point: {
        size: {
          sm: null,
          md: null,
          lg: null,
        },
        color: {
          active: null,
          inactive: null,
          hover: null,
        },
        background: {
          active: null,
          inactive: null,
          hover: null,
        },
      },
      card: {
        width: {
          vertical: null,
          horizontal: null,
          min: null,
          max: null,
        },
        spacing: {
          vertical: null,
          horizontal: null,
        },
      },
    },
    toolbar: {
      height: null,
      padding: null,
      background: null,
      button: {
        size: null,
        spacing: null,
      },
    },
  },
});

// Legacy compatibility exports (to be removed gradually)
export const vars = tokens.semantic;
export const designTokens = tokens;
