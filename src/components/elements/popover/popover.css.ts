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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
  }),
  {
    background: tokens.semantic.color.background.elevated,
    borderRadius: tokens.semantic.borderRadius.md,
    border: `1px solid ${tokens.semantic.color.border.default}`,
    boxShadow: `0 8px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 16px -2px rgba(0, 0, 0, 0.08)`,
    maxHeight: '400px',
    overflowY: 'auto',
    padding: tokens.semantic.spacing.lg,
    width: '320px',
    opacity: 0,
    transition: `opacity ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}, transform ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    transform: 'translateY(-10px)',
    zIndex: tokens.semantic.zIndex.popover,
    // Smart positioning to stay within container bounds
    maxWidth: 'calc(100vw - 2rem)',
    // Prevent popover from overflowing horizontally
    left: 'auto',
    right: 'auto',
    selectors: {
      '&::-webkit-scrollbar': { width: '6px' },
      '&::-webkit-scrollbar-track': {
        backgroundColor: tokens.semantic.color.background.secondary,
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${tokens.semantic.color.interactive.primary}60`,
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: `${tokens.semantic.color.interactive.primary}80`,
      },
      // Smart horizontal positioning based on container space
      '&[data-position-x="left"]': { left: '0' },
      '&[data-position-x="right"]': { right: '0' },
      '&[data-position-x="center"]': {
        left: '50%',
        transform: 'translateX(-50%) translateY(-10px)',
      },
    },
    '@media': {
      '(max-width: 480px)': {
        width: '280px',
        maxWidth: 'calc(100vw - 1rem)',
        left: '0.5rem !important',
        right: 'auto !important',
        transform: 'translateY(-10px) !important',
      },
    },
  },
]);

export const holderVisible = style({
  opacity: 1,
  selectors: {
    '&[data-position-x="center"]': {
      transform: 'translateX(-50%) translateY(0)',
    },
    '&:not([data-position-x="center"])': {
      transform: 'translateY(0)',
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
    gap: 'xs',
  }),
  {
    background: tokens.semantic.color.background.elevated,
    color: tokens.semantic.color.text.secondary,
    borderRadius: tokens.semantic.borderRadius.lg,
    border: '1px solid',
    borderColor: tokens.semantic.color.border.default,
    boxShadow: tokens.semantic.shadow.card,
    cursor: 'pointer',
    userSelect: 'none',
    marginRight: '0.5rem',
    height: '36px',
    minWidth: '36px',
    width: 'auto',
    padding: '0 0.75rem',
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    selectors: {
      '&:hover': {
        background: `${tokens.semantic.color.interactive.primary}08`,
        borderColor: `${tokens.semantic.color.interactive.primary}40`,
        boxShadow: `0 4px 12px -2px ${tokens.semantic.color.interactive.primary}20, 0 2px 6px -1px rgba(0, 0, 0, 0.1)`,
        transform: 'translateY(-2px)',
        color: tokens.semantic.color.interactive.primary,
      },
      '&:active': {
        transform: 'translateY(0) scale(0.96)',
        background: `${tokens.semantic.color.interactive.primary}12`,
        borderColor: `${tokens.semantic.color.interactive.primary}60`,
        boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px ${tokens.semantic.color.interactive.primary}30`,
      },
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${tokens.semantic.color.interactive.primary}40`,
      },
      '&:focus:not(:focus-visible)': { boxShadow: 'none' },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${tokens.semantic.color.interactive.primary}40`,
        background: `${tokens.semantic.color.interactive.primary}04`,
      },
    },
    '@media': {
      '(max-width: 480px)': {
        height: '44px',
        minWidth: '44px',
        padding: '0 0.6rem',
        // Ensure touch targets are at least 44x44px
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
  transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
  flexShrink: 0,
  selectors: {
    [`${selecter}:hover &`]: {
      color: tokens.semantic.color.interactive.primary,
    },
  },
});

globalStyle(`${selecterIcon} svg`, {
  width: '20px',
  height: '20px',
  '@media': { '(max-width: 480px)': { width: '22px', height: '22px' } },
});

export const selecterIconOpen = style({
  transform: 'none',
});

export const selecterLabel = style({
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, ${tokens.semantic.typography.fontSize.body})`,
  fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.medium})`,
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  textAlign: 'left',
  whiteSpace: 'nowrap',
});

export const header = style({ height: '30px', width: '100%' });

export const content = style({
  height: 'calc(100% - 30px)',
  overflowY: 'auto',
  width: '100%',
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  color: tokens.semantic.color.interactive.primary,
  cursor: 'pointer',
  marginBottom: '0.5rem',
  marginLeft: 'auto',
  padding: '0.5rem',
  borderRadius: '4px',
  minWidth: '32px',
  minHeight: '32px',
  transition: `background-color ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}, transform ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  selectors: {
    '&:hover': {
      background: tokens.semantic.color.background.elevated,
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
    '&:focus': {
      outline: `2px solid ${tokens.semantic.color.interactive.primary}`,
      outlineOffset: '2px',
    },
    '&:focus:not(:focus-visible)': { outline: 'none' },
  },
  '@media': {
    '(max-width: 480px)': {
      minWidth: '44px',
      minHeight: '44px',
      padding: '0.75rem',
    },
  },
});
