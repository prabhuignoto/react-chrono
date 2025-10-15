import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { baseStyles } from '../../../styles/system/static.css';

// Base font family with proper CSS custom property fallback for Google Fonts
const baseFontFamily = `var(--timeline-font-family, 'Inter, system-ui, ui-sans-serif, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif')`;

export const popoverWrapper = style([
  sprinkles({
    position: 'relative',
    display: 'inline-block',
  }),
  baseStyles.containLayout,
]);

export const popoverHolder = style([
  patterns.card({ size: 'md', elevation: 'high' }),
  sprinkles({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'absolute',
  }),
  {
    background: tokens.semantic.color.background.elevated,
    borderRadius: tokens.semantic.borderRadius.lg,
    border: `1px solid ${tokens.semantic.color.border.default}`,
    boxShadow: `0 12px 40px -8px rgba(0, 0, 0, 0.15), 0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)`,
    maxHeight: '420px',
    overflowY: 'hidden',
    overflowX: 'hidden',
    padding: 0,
    width: '320px',
    opacity: 0,
    transition: `opacity ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}, transform ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    transform: 'translateY(-8px) scale(0.98)',
    zIndex: tokens.semantic.zIndex.popover,
    // Smart positioning to stay within container bounds
    maxWidth: 'calc(100vw - 2rem)',
    // Prevent popover from overflowing horizontally
    left: 'auto',
    right: 'auto',
    backdropFilter: 'blur(8px)',
    selectors: {
      '&::-webkit-scrollbar': { width: '8px' },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${tokens.semantic.color.interactive.primary}40`,
        borderRadius: '4px',
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: `${tokens.semantic.color.interactive.primary}60`,
      },
      // Positioning is handled by JavaScript - no CSS positioning overrides
    },
    '@media': {
      '(max-width: 480px)': {
        width: '280px',
        maxWidth: 'calc(100vw - 1rem)',
        left: '0.5rem !important',
        right: 'auto !important',
        transform: 'translateY(-8px) scale(0.98) !important',
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'opacity 0.1s ease-in-out',
        transform: 'none',
      },
    },
  },
]);

export const holderVisible = style({
  opacity: 1,
  transform: 'translateY(0) scale(1)',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
    },
  },
});

export const holderTop = style({ top: '3.5rem' });
export const holderBottom = style({ bottom: '3.5rem' });
export const holderLeftMobile = style({ left: '4px' });

// Optional recipe to compose popover holder state without changing existing exports
export const popoverHolderRecipe = recipe({
  base: [popoverHolder],
  variants: {
    visible: { true: [holderVisible], false: {} },
    position: { top: [holderTop], bottom: [holderBottom] },
    leftMobile: { true: [holderLeftMobile], false: {} },
  },
  defaultVariants: { visible: false, position: 'bottom', leftMobile: false },
});

export const selecter = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'sm',
  }),
  {
    background: tokens.semantic.color.background.elevated,
    color: tokens.semantic.color.text.secondary,
    borderRadius: tokens.semantic.borderRadius.lg,
    border: '1px solid',
    borderColor: tokens.semantic.color.border.default,
    boxShadow: `0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)`,
    cursor: 'pointer',
    userSelect: 'none',
    marginRight: '0.5rem',
    height: '40px',
    minWidth: '40px',
    width: 'auto',
    padding: '0 0.875rem',
    fontWeight: tokens.semantic.typography.fontWeight.medium,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    position: 'relative',
    overflow: 'hidden',
    selectors: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at center, ${tokens.semantic.color.interactive.primary}15, transparent)`,
        opacity: 0,
        transition: `opacity ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
      },
      '&:hover': {
        background: `${tokens.semantic.color.interactive.primary}06`,
        borderColor: `${tokens.semantic.color.interactive.primary}50`,
        boxShadow: `0 2px 8px -1px ${tokens.semantic.color.interactive.primary}20, 0 4px 12px -2px rgba(0, 0, 0, 0.08)`,
        transform: 'translateY(-1px)',
        color: tokens.semantic.color.interactive.primary,
      },
      '&:hover::before': {
        opacity: 1,
      },
      '&:active': {
        transform: 'translateY(0) scale(0.98)',
        background: `${tokens.semantic.color.interactive.primary}10`,
        borderColor: `${tokens.semantic.color.interactive.primary}60`,
        boxShadow: `inset 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px ${tokens.semantic.color.interactive.primary}20`,
      },
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${tokens.semantic.color.interactive.primary}30`,
      },
      '&:focus:not(:focus-visible)': { boxShadow: 'none' },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${tokens.semantic.color.interactive.primary}30, 0 1px 3px rgba(0, 0, 0, 0.1)`,
        background: `${tokens.semantic.color.interactive.primary}05`,
      },
      '&[aria-expanded="true"]': {
        background: `${tokens.semantic.color.interactive.primary}08`,
        borderColor: `${tokens.semantic.color.interactive.primary}50`,
        color: tokens.semantic.color.interactive.primary,
      },
    },
    '@media': {
      '(max-width: 480px)': {
        height: '44px',
        minWidth: '44px',
        padding: '0 0.75rem',
        // Ensure touch targets are at least 44x44px
      },
      '(prefers-reduced-motion: reduce)': {
        transition:
          'background 0.1s ease-in-out, border-color 0.1s ease-in-out',
        transform: 'none',
      },
    },
  },
]);

export const selecterHover = style({
  // Consumers can toggle class for hover-like effects if needed
});

export const selecterIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.semantic.color.text.secondary,
  height: '20px',
  width: '20px',
  transition: `transform ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}, color ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  flexShrink: 0,
  position: 'relative',
  selectors: {
    [`${selecter}:hover &`]: {
      color: tokens.semantic.color.interactive.primary,
      transform: 'scale(1.1)',
    },
    [`${selecter}[aria-expanded="true"] &`]: {
      color: tokens.semantic.color.interactive.primary,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'color 0.1s ease-in-out',
    },
  },
});

globalStyle(`${selecterIcon} svg`, {
  width: '20px',
  height: '20px',
  '@media': { '(max-width: 480px)': { width: '22px', height: '22px' } },
});

export const selecterIconOpen = style({
  transform: 'rotate(180deg)',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
    },
  },
});

export const selecterLabel = style({
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, ${tokens.semantic.typography.fontSize.body})`,
  fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.medium})`,
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  textAlign: 'left',
  whiteSpace: 'nowrap',
});

export const header = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
  {
    height: '48px',
    width: '100%',
    padding: `${tokens.semantic.spacing.sm} ${tokens.semantic.spacing.md}`,
    borderBottom: `1px solid ${tokens.semantic.color.border.muted}`,
    background: `${tokens.semantic.color.background.secondary}50`,
    backdropFilter: 'blur(4px)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    flexShrink: 0,
  },
]);

export const content = style({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  padding: `${tokens.semantic.spacing.md} ${tokens.semantic.spacing.md}`,
  minHeight: 0, // Allow flex child to shrink
  selectors: {
    '&::-webkit-scrollbar': { width: '8px' },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${tokens.semantic.color.interactive.primary}40`,
      borderRadius: '4px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: `${tokens.semantic.color.interactive.primary}60`,
    },
  },
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  color: tokens.semantic.color.text.secondary,
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: tokens.semantic.borderRadius.md,
  minWidth: '36px',
  minHeight: '36px',
  transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  position: 'relative',
  selectors: {
    '&:hover': {
      background: `${tokens.semantic.color.interactive.primary}10`,
      color: tokens.semantic.color.interactive.primary,
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
      background: `${tokens.semantic.color.interactive.primary}15`,
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}40`,
    },
    '&:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}40`,
    },
  },
  '@media': {
    '(max-width: 480px)': {
      minWidth: '40px',
      minHeight: '40px',
      padding: '0.625rem',
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'background 0.1s ease-in-out, color 0.1s ease-in-out',
      transform: 'none',
    },
  },
});
