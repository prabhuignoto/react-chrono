import { createThemeContract, createTheme } from '@vanilla-extract/css';
import { designTokens } from '../design-system.css';

// Semantic token contract for component-specific values
export const semanticTokens = createThemeContract({
  // Timeline-specific tokens
  timeline: {
    line: {
      width: null,
      color: null,
      opacity: null,
      gradient: {
        start: null,
        middle: null,
        end: null,
      },
    },
    point: {
      size: {
        sm: null,
        md: null,
        lg: null,
      },
      border: {
        width: null,
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
      spacing: {
        inner: null,
        outer: null,
      },
      border: {
        radius: null,
        color: null,
        width: null,
      },
      shadow: {
        default: null,
        hover: null,
        active: null,
      },
      background: {
        default: null,
        hover: null,
        active: null,
      },
    },
    item: {
      spacing: {
        vertical: null,
        horizontal: null,
      },
      width: {
        alternating: null,
        nonAlternating: null,
        title: null,
      },
    },
  },
  
  // Toolbar-specific tokens
  toolbar: {
    height: {
      sm: null,
      md: null,
      lg: null,
    },
    padding: {
      sm: null,
      md: null,
      lg: null,
    },
    background: {
      default: null,
      blur: null,
    },
    border: {
      color: null,
      radius: null,
    },
    shadow: null,
    button: {
      size: {
        sm: null,
        md: null,
        lg: null,
      },
      spacing: null,
      background: {
        default: null,
        hover: null,
        active: null,
        disabled: null,
      },
      border: {
        default: null,
        hover: null,
        active: null,
        radius: null,
      },
      text: {
        default: null,
        hover: null,
        active: null,
        disabled: null,
      },
    },
  },
  
  // Card system tokens
  card: {
    padding: {
      sm: null,
      md: null,
      lg: null,
    },
    border: {
      radius: {
        sm: null,
        md: null,
        lg: null,
      },
      color: null,
      gradient: null,
    },
    shadow: {
      flat: null,
      low: null,
      medium: null,
      high: null,
      interactive: null,
    },
    background: {
      default: null,
      gradient: null,
      hover: null,
    },
    content: {
      spacing: {
        tight: null,
        normal: null,
        loose: null,
      },
    },
  },
  
  // Interaction state tokens
  states: {
    hover: {
      opacity: null,
      transform: null,
      duration: null,
      easing: null,
    },
    active: {
      opacity: null,
      transform: null,
      duration: null,
      easing: null,
    },
    focus: {
      outline: null,
      ring: {
        color: null,
        width: null,
        offset: null,
      },
      background: null,
    },
    disabled: {
      opacity: null,
      cursor: null,
      filter: null,
    },
  },
  
  // Animation tokens
  motion: {
    duration: {
      instant: null,
      fast: null,
      normal: null,
      slow: null,
    },
    easing: {
      linear: null,
      ease: null,
      easeIn: null,
      easeOut: null,
      easeInOut: null,
      bounce: null,
    },
    spring: {
      default: null,
      gentle: null,
      wobbly: null,
      stiff: null,
    },
  },
  
  // Layout tokens
  layout: {
    container: {
      maxWidth: {
        sm: null,
        md: null,
        lg: null,
        xl: null,
      },
      padding: {
        mobile: null,
        tablet: null,
        desktop: null,
      },
    },
    grid: {
      columns: {
        mobile: null,
        tablet: null,
        desktop: null,
      },
      gap: {
        mobile: null,
        tablet: null,
        desktop: null,
      },
    },
  },
});

// Default theme implementation
export const defaultSemanticTheme = createTheme(semanticTokens, {
  timeline: {
    line: {
      width: '2px',
      color: designTokens.color.primary,
      opacity: '1',
      gradient: {
        start: 'transparent',
        middle: designTokens.color.primary,
        end: 'transparent',
      },
    },
    point: {
      size: {
        sm: '24px',
        md: '32px',
        lg: '40px',
      },
      border: {
        width: '3px',
        active: designTokens.color.primary,
        inactive: designTokens.color.muted,
        hover: designTokens.color.primary,
      },
      background: {
        active: designTokens.color.primary,
        inactive: designTokens.color.background,
        hover: designTokens.color.primary,
      },
    },
    card: {
      spacing: {
        inner: designTokens.spacing.md,
        outer: designTokens.spacing.lg,
      },
      border: {
        radius: designTokens.radius.xl,
        color: designTokens.color.card.border,
        width: '1px',
      },
      shadow: {
        default: designTokens.elevation.md,
        hover: designTokens.elevation.lg,
        active: designTokens.elevation.sm,
      },
      background: {
        default: designTokens.color.card.bg,
        hover: designTokens.color.card.bg,
        active: designTokens.color.card.bg,
      },
    },
    item: {
      spacing: {
        vertical: designTokens.spacing.xl,
        horizontal: designTokens.spacing.md,
      },
      width: {
        alternating: '37.5%',
        nonAlternating: '85%',
        title: '10%',
      },
    },
  },
  
  toolbar: {
    height: {
      sm: '48px',
      md: '64px',
      lg: '72px',
    },
    padding: {
      sm: designTokens.spacing.sm,
      md: designTokens.spacing.md,
      lg: designTokens.spacing.lg,
    },
    background: {
      default: designTokens.color.interactive.toolbarBg,
      blur: 'blur(8px)',
    },
    border: {
      color: designTokens.color.interactive.buttonBorder,
      radius: designTokens.radius.lg,
    },
    shadow: designTokens.elevation.sm,
    button: {
      size: {
        sm: '32px',
        md: '36px',
        lg: '40px',
      },
      spacing: designTokens.spacing.sm,
      background: {
        default: 'transparent',
        hover: designTokens.color.interactive.buttonBg,
        active: designTokens.color.interactive.buttonBg,
        disabled: 'transparent',
      },
      border: {
        default: 'transparent',
        hover: designTokens.color.interactive.buttonBorder,
        active: designTokens.color.interactive.buttonBorder,
        radius: designTokens.radius.md,
      },
      text: {
        default: designTokens.color.interactive.toolbarText,
        hover: designTokens.color.interactive.toolbarText,
        active: designTokens.color.interactive.toolbarText,
        disabled: designTokens.color.interactive.toolbarText,
      },
    },
  },
  
  card: {
    padding: {
      sm: designTokens.spacing.sm,
      md: designTokens.spacing.md,
      lg: designTokens.spacing.lg,
    },
    border: {
      radius: {
        sm: designTokens.radius.md,
        md: designTokens.radius.lg,
        lg: designTokens.radius.xl,
      },
      color: designTokens.color.card.border,
      gradient: `linear-gradient(135deg, ${designTokens.color.primary}20 0%, transparent 50%, ${designTokens.color.primary}10 100%)`,
    },
    shadow: {
      flat: designTokens.elevation.none,
      low: designTokens.elevation.sm,
      medium: designTokens.elevation.md,
      high: designTokens.elevation.lg,
      interactive: designTokens.elevation.xl,
    },
    background: {
      default: designTokens.color.card.bg,
      gradient: `linear-gradient(135deg, ${designTokens.color.card.bg} 0%, ${designTokens.color.card.bg}f5 100%)`,
      hover: designTokens.color.card.bg,
    },
    content: {
      spacing: {
        tight: designTokens.spacing.xs,
        normal: designTokens.spacing.sm,
        loose: designTokens.spacing.md,
      },
    },
  },
  
  states: {
    hover: {
      opacity: '0.8',
      transform: 'translateY(-1px)',
      duration: '150ms',
      easing: 'ease-out',
    },
    active: {
      opacity: '0.9',
      transform: 'translateY(0px) scale(0.98)',
      duration: '100ms',
      easing: 'ease-in',
    },
    focus: {
      outline: `2px solid ${designTokens.color.interactive.focusRing}`,
      ring: {
        color: designTokens.color.interactive.focusRing,
        width: '2px',
        offset: '2px',
      },
      background: 'transparent',
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      filter: 'grayscale(0.3)',
    },
  },
  
  motion: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    spring: {
      default: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      wobbly: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      stiff: 'cubic-bezier(0.35, 0, 0.25, 1)',
    },
  },
  
  layout: {
    container: {
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      padding: {
        mobile: designTokens.spacing.md,
        tablet: designTokens.spacing.lg,
        desktop: designTokens.spacing.xl,
      },
    },
    grid: {
      columns: {
        mobile: '1',
        tablet: '2',
        desktop: '3',
      },
      gap: {
        mobile: designTokens.spacing.sm,
        tablet: designTokens.spacing.md,
        desktop: designTokens.spacing.lg,
      },
    },
  },
});

// Export theme class for application
export const semanticThemeClass = defaultSemanticTheme;