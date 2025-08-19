import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { designTokens } from '../../styles/design-system.css';
import { layoutBase, gap } from '../../styles/layout.css';
import {
  transitions,
  animationUtils,
  keyframeAnimations,
} from '../../styles/animations.css';

// Base toolbar container
const toolbarBase = style([
  layoutBase.flexRow,
  {
    backgroundColor: designTokens.color.interactive.toolbarBg,
    borderRadius: designTokens.radius.lg,
    border: `1px solid ${designTokens.color.interactive.buttonBorder}`,
    boxShadow: designTokens.elevation.sm,
    transition: transitions.normal,
    containerType: 'inline-size',
  },
]);

// Toolbar recipe with responsive behavior
export const toolbar = recipe({
  base: [toolbarBase, gap({ size: 'md' })],

  variants: {
    size: {
      sm: {
        padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
        minHeight: '48px',
      },
      md: {
        padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
        minHeight: '64px',
      },
      lg: {
        padding: `${designTokens.spacing.lg} ${designTokens.spacing.xl}`,
        minHeight: '72px',
      },
    },

    layout: {
      spread: {
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      start: {
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },

    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' },
    },
  },

  defaultVariants: {
    size: 'md',
    layout: 'spread',
    wrap: true,
  },
});

// Responsive toolbar behavior
globalStyle(`${toolbar.classNames.base}`, {
  '@media': {
    '(max-width: 768px)': {
      justifyContent: 'center',
      gap: designTokens.spacing.sm,
    },
    '(max-width: 480px)': {
      flexDirection: 'column',
      gap: designTokens.spacing.md,
    },
  },
});

// Toolbar section groups
export const toolbarSection = recipe({
  base: [layoutBase.flexRow, gap({ size: 'sm' })],

  variants: {
    type: {
      navigation: {
        flexShrink: 0,
        flexWrap: 'nowrap',
      },
      search: {
        flex: '2 1 300px',
        maxWidth: '600px',
        justifyContent: 'center',
      },
      actions: {
        flexShrink: 0,
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
      },
    },

    priority: {
      primary: {
        order: 1,
      },
      secondary: {
        order: 2,
      },
      tertiary: {
        order: 3,
      },
    },
  },

  defaultVariants: {
    type: 'navigation',
    priority: 'secondary',
  },

  compoundVariants: [
    // Mobile responsive behavior
    {
      variants: { type: 'search' },
      style: {
        '@media': {
          '(max-width: 768px)': {
            flex: '1 1 auto',
          },
          '(max-width: 480px)': {
            order: -1,
            width: '100%',
          },
        },
      },
    },
    {
      variants: { type: 'actions' },
      style: {
        '@media': {
          '(max-width: 768px)': {
            justifyContent: 'center',
          },
          '(max-width: 480px)': {
            width: '100%',
          },
        },
      },
    },
  ],
});

// Enhanced button system for toolbar
export const toolbarButton = recipe({
  base: [
    animationUtils.respectsReducedMotion,
    {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${designTokens.color.interactive.buttonBg} 0%, ${designTokens.color.interactive.buttonBg}f0 100%)`,
      border: '1px solid transparent',
      borderRadius: designTokens.radius.lg,
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
      cursor: 'pointer',
      transition: `${transitions.normal}, box-shadow 0.2s ease`,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      color: designTokens.color.interactive.toolbarText,
      boxShadow: `0 1px 3px ${designTokens.color.interactive.buttonBorder}20, inset 0 1px 0 ${designTokens.color.background}10`,

      // Subtle gradient border effect
      '::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1px',
        background: `linear-gradient(135deg, ${designTokens.color.primary}30 0%, transparent 50%, ${designTokens.color.primary}15 100%)`,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor',
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        opacity: 0,
        transition: transitions.normal,
      },

      selectors: {
        '&:hover': {
          backgroundColor: designTokens.color.interactive.buttonBg,
          borderColor: `${designTokens.color.interactive.buttonBorder}40`,
          boxShadow: `0 2px 8px ${designTokens.color.interactive.buttonBorder}30, inset 0 1px 0 ${designTokens.color.background}20`,
          transform: 'translateY(-1px)',
        },
        '&:hover::before': {
          opacity: 1,
        },
        '&:active': {
          transform: 'translateY(0px) scale(0.98)',
          boxShadow: `0 1px 2px ${designTokens.color.interactive.buttonBorder}40, inset 0 2px 4px ${designTokens.color.interactive.buttonBorder}10`,
          transition: transitions.fast,
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${designTokens.color.interactive.focusRing}, 0 2px 8px ${designTokens.color.interactive.buttonBorder}30`,
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
          pointerEvents: 'none',
          transform: 'none',
        },
      },
    },
  ],

  variants: {
    variant: {
      ghost: {
        background: 'transparent',
        selectors: {
          '&:hover': {
            background: `linear-gradient(135deg, ${designTokens.color.interactive.buttonBg} 0%, ${designTokens.color.interactive.buttonBg}f0 100%)`,
          },
        },
      },
      filled: {
        backgroundColor: designTokens.color.interactive.buttonBg,
        borderColor: `${designTokens.color.interactive.buttonBorder}60`,
      },
      primary: {
        background: `linear-gradient(135deg, ${designTokens.color.primary} 0%, ${designTokens.color.primary}f0 100%)`,
        color: designTokens.color.background,
        borderColor: designTokens.color.primary,
        selectors: {
          '&:hover': {
            background: `linear-gradient(135deg, ${designTokens.color.primary} 0%, ${designTokens.color.primary}e0 100%)`,
          },
        },
      },
      minimize: {
        background: `linear-gradient(135deg, ${designTokens.color.interactive.toolbarBg} 0%, ${designTokens.color.interactive.toolbarBg}f0 100%)`,
        color: `${designTokens.color.interactive.toolbarText}80`,
        selectors: {
          '&:hover': {
            background: `linear-gradient(135deg, ${designTokens.color.primary}10 0%, ${designTokens.color.primary}05 100%)`,
            color: designTokens.color.interactive.toolbarText,
          },
        },
      },
    },

    size: {
      sm: {
        padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
        fontSize: designTokens.typography.fontSize.sm,
        minWidth: '32px',
        height: '32px',
      },
      md: {
        padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
        fontSize: designTokens.typography.fontSize.base,
        minWidth: '36px',
        height: '36px',
      },
      lg: {
        padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
        fontSize: designTokens.typography.fontSize.lg,
        minWidth: '40px',
        height: '40px',
      },
    },

    shape: {
      square: {},
      rounded: { borderRadius: designTokens.radius.lg },
      pill: { borderRadius: designTokens.radius.full },
    },

    animation: {
      none: {},
      bounce: animationUtils.iconBounceOnHover,
      press: animationUtils.buttonPressAnimation,
      glow: animationUtils.glowOnFocus,
    },
  },

  defaultVariants: {
    variant: 'ghost',
    size: 'md',
    shape: 'rounded',
    animation: 'press',
  },

  compoundVariants: [
    {
      variants: { variant: 'minimize', animation: 'bounce' },
      style: {
        selectors: {
          '&:hover': {
            transform: 'translateY(-1px) scale(1.02)',
          },
        },
      },
    },
  ],
});

// Search input system
export const searchInput = recipe({
  base: {
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: designTokens.color.interactive.toolbarText,
    fontSize: designTokens.typography.fontSize.base,
    padding: `${designTokens.spacing.sm} ${designTokens.spacing.xs}`,

    selectors: {
      '&::placeholder': {
        color: designTokens.color.interactive.toolbarText,
        opacity: 0.7,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },

  variants: {
    size: {
      sm: {
        fontSize: designTokens.typography.fontSize.sm,
        padding: designTokens.spacing.xs,
      },
      md: {
        fontSize: designTokens.typography.fontSize.base,
        padding: designTokens.spacing.sm,
      },
      lg: {
        fontSize: designTokens.typography.fontSize.lg,
        padding: designTokens.spacing.md,
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

// Enhanced icon button specifically for minimize/maximize actions
export const toolbarIconButton = recipe({
  base: [
    animationUtils.respectsReducedMotion,
    {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${designTokens.color.interactive.toolbarBg}80 0%, ${designTokens.color.interactive.toolbarBg}60 100%)`,
      border: `1px solid ${designTokens.color.interactive.buttonBorder}30`,
      borderRadius: designTokens.radius.md,
      width: '28px',
      height: '28px',
      cursor: 'pointer',
      transition: `${transitions.normal}, transform 0.15s ease`,
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      fontSize: '12px',
      color: `${designTokens.color.interactive.toolbarText}70`,
      boxShadow: `0 1px 2px ${designTokens.color.interactive.buttonBorder}15, inset 0 1px 0 ${designTokens.color.background}08`,

      selectors: {
        '&:hover': {
          background: `linear-gradient(135deg, ${designTokens.color.primary}15 0%, ${designTokens.color.primary}08 100%)`,
          borderColor: `${designTokens.color.primary}40`,
          color: designTokens.color.interactive.toolbarText,
          transform: 'translateY(-1px) scale(1.05)',
          boxShadow: `0 2px 4px ${designTokens.color.primary}20, inset 0 1px 0 ${designTokens.color.background}15`,
        },
        '&:active': {
          transform: 'translateY(0px) scale(0.95)',
          boxShadow: `0 1px 2px ${designTokens.color.primary}30, inset 0 1px 2px ${designTokens.color.primary}10`,
          transition: transitions.fast,
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${designTokens.color.interactive.focusRing}, 0 2px 4px ${designTokens.color.primary}20`,
          borderColor: designTokens.color.interactive.focusRing,
        },
        '&:disabled': {
          opacity: 0.4,
          cursor: 'not-allowed',
          pointerEvents: 'none',
          transform: 'none',
        },
      },
    },
  ],

  variants: {
    state: {
      minimized: {
        background: `linear-gradient(135deg, ${designTokens.color.primary}20 0%, ${designTokens.color.primary}10 100%)`,
        borderColor: `${designTokens.color.primary}50`,
        color: designTokens.color.primary,
      },
      expanded: {
        background: `linear-gradient(135deg, ${designTokens.color.interactive.toolbarBg}80 0%, ${designTokens.color.interactive.toolbarBg}60 100%)`,
      },
    },

    size: {
      sm: { width: '24px', height: '24px', fontSize: '10px' },
      md: { width: '28px', height: '28px', fontSize: '12px' },
      lg: { width: '32px', height: '32px', fontSize: '14px' },
    },

    animation: {
      none: {},
      bounce: animationUtils.iconBounceOnHover,
      press: animationUtils.buttonPressAnimation,
    },
  },

  defaultVariants: {
    state: 'expanded',
    size: 'md',
    animation: 'bounce',
  },
});
