import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';
import { recipe } from '@vanilla-extract/recipes';
import { designTokens } from '../../styles/design-system.css';
import { transitions, animationUtils } from '../../styles/animations.css';

export const toolbarWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    listStyle: 'none',
    margin: 0,
    padding: '0.75rem 1rem',
    backgroundColor: vars.color.toolbarBg,
    width: '100%',
    minHeight: '64px',
    borderRadius: '10px',
    flexWrap: 'wrap',
    columnGap: '0.75rem',
    rowGap: '0.5rem',
    border: `1px solid ${vars.color.buttonBorder}`,
    boxShadow: vars.shadow.elevationSm,
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    containerType: 'inline-size',
    '@media': {
      '(max-width: 768px)': {
        padding: '0.75rem 0.75rem',
        justifyContent: 'center',
        gap: '0.75rem',
      },
      '(max-width: 480px)': {
        padding: '0.5rem',
        minHeight: '56px',
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
  },
]);

export const toolbarListItem = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  {
    flexShrink: 0,
    gap: '0.5rem',
    padding: '0.25rem',
    borderRadius: '6px',
    transition: `background-color ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    ':hover': {
      backgroundColor: `${vars.color.primary}08`,
    },
  },
]);

export const contentWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    gap: '0.5rem',
    flexGrow: 1,
    minWidth: 0,
    position: 'relative',
  },
]);

export const iconWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  {
    flexShrink: 0,
    width: '1.5rem',
    height: '1.5rem',
    color: vars.color.toolbarText,
    opacity: 0.8,
    transition: `opacity ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    ':hover': {
      opacity: 1,
    },
  },
]);

// Enhanced toolbar section with responsive behavior
export const toolbarSectionRecipe = recipe({
  base: [
    sprinkles({ display: 'flex', alignItems: 'center' }),
    {
      gap: '0.5rem',
      flexShrink: 0,
      transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    },
  ],
  variants: {
    type: {
      navigation: {
        flexWrap: 'nowrap',
        gap: '0.25rem',
      },
      search: {
        flex: '1 1 300px',
        maxWidth: '600px',
        justifyContent: 'center',
        minWidth: '200px',
      },
      action: {
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: '0.75rem',
      },
    },
    visible: {
      true: {
        visibility: 'visible',
        opacity: 1,
      },
      false: {
        visibility: 'hidden',
        opacity: 0,
        width: 0,
        overflow: 'hidden',
      },
    },
  },
  defaultVariants: {
    type: 'navigation',
    visible: true,
  },
});

// Legacy class support for easy migration
export const toolbarSection = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: '0.5rem', flexShrink: 0 },
]);

export const navigationGroup = style([
  toolbarSection,
  {
    flexWrap: 'nowrap',
    gap: '0.25rem',
    '@media': {
      '(max-width: 768px)': {
        gap: '0.125rem',
      },
    },
  },
]);

export const searchGroup = style([
  toolbarSection,
  {
    flex: '1 1 300px',
    maxWidth: '600px',
    justifyContent: 'center',
    minWidth: '200px',
    '@media': {
      '(max-width: 768px)': {
        flex: '1 1 100%',
        maxWidth: '100%',
        order: -1,
        marginBottom: '0.5rem',
      },
    },
  },
]);

export const actionGroup = style([
  toolbarSection,
  {
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    '@media': {
      '(max-width: 768px)': {
        gap: '0.5rem',
      },
    },
  },
]);

// Search-specific styles
export const searchWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    backgroundColor: vars.color.toolbarBtnBg,
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    border: `1px solid ${vars.color.buttonBorder}`,
    width: '100%',
    minHeight: '38px',
    position: 'relative',
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    selectors: {
      '&:focus-within': {
        borderColor: vars.color.primary,
        boxShadow: vars.shadow.focusRing,
        backgroundColor: vars.color.toolbarBtnBg,
      },
      '&:hover': {
        borderColor: vars.color.primary,
        backgroundColor: `${vars.color.primary}05`,
      },
    },
    '@media': {
      '(max-width: 768px)': {
        minHeight: '36px',
        padding: '0.35rem 0.65rem',
      },
    },
  },
]);

export const searchInput = style({
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: vars.color.text,
  fontSize: '0.875rem',
  padding: '0.25rem',
  minWidth: 0,
  selectors: {
    '&::placeholder': {
      color: vars.color.text,
      opacity: 0.6,
      fontWeight: 400,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.85rem',
    },
  },
});

export const searchInfo = style({
  fontSize: '0.75rem',
  color: vars.color.text,
  opacity: 0.7,
  margin: '0 0.5rem',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  fontWeight: 500,
  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.7rem',
      margin: '0 0.25rem',
    },
  },
});

export const searchControls = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    gap: '0.25rem',
    flexShrink: 0,
    marginLeft: 'auto',
  },
]);

// Container queries for adaptive toolbar behavior
globalStyle(`@container (max-width: 600px)`, {
  [`${toolbarWrapper}`]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '0.5rem',
  },
  [`${navigationGroup}`]: {
    width: '100%',
    justifyContent: 'center',
  },
  [`${searchGroup}`]: {
    width: '100%',
  },
  [`${actionGroup}`]: {
    width: '100%',
    justifyContent: 'center',
  },
});

// Extra controls for additional toolbar items
export const extraControls = style([
  sprinkles({ display: 'flex', alignItems: 'center', p: 'xs' }),
  {
    listStyle: 'none',
    margin: 0,
    visibility: 'visible',
    flexShrink: 0,
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
]);

export const extraControlChild = style([
  sprinkles({ display: 'flex' }),
  { margin: '0.5rem 0', marginRight: '0.5rem' },
]);

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