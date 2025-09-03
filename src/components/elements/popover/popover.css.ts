import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { baseStyles } from '../../../styles/system/static.css';

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
    boxShadow: tokens.semantic.shadow.modal,
    maxHeight: '400px',
    overflowY: 'auto',
    padding: tokens.semantic.spacing.sm,
    width: '300px',
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
      '&::-webkit-scrollbar': { width: '0.3em' },
      '&::-webkit-scrollbar-track': { backgroundColor: tokens.semantic.color.background.elevated },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: tokens.semantic.color.interactive.primary,
        borderRadius: '3px',
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

export const holderTop = style({ top: '4rem' });
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
  }),
  {
    background: tokens.semantic.color.background.elevated,
    color: tokens.semantic.color.text.secondary,
    borderRadius: '6px',
    border: '1px solid',
    borderColor: tokens.semantic.color.border.default,
    boxShadow: tokens.semantic.shadow.card,
    cursor: 'pointer',
    userSelect: 'none',
    marginRight: '0.5rem',
    height: '36px',
    minWidth: '36px',
    width: 'auto',
    padding: '0 0.5rem',
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    selectors: {
      '&:hover': {
        background: tokens.semantic.color.interactive.muted,
        borderColor: tokens.semantic.color.border.interactive,
        boxShadow: tokens.semantic.shadow.cardHover,
        transform: 'translateY(-1px)',
        color: tokens.semantic.color.interactive.primary,
      },
      '&:active': {
        transform: 'translateY(0) scale(0.97)',
        boxShadow: tokens.semantic.shadow.card,
      },
      '&:focus': {
        outline: `2px solid ${tokens.semantic.color.interactive.primary}`,
        outlineOffset: '2px',
      },
      '&:focus:not(:focus-visible)': { outline: 'none' },
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.interactive.primary}`,
        outlineOffset: '2px',
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
  transition: 'transform 0.2s ease-in-out',
  flexShrink: 0,
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
  fontSize: '0.9rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  fontWeight: 500,
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
