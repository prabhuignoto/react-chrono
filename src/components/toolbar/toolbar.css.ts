import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens/index.css';
import { vars } from '../../styles/tokens.css';
import { sprinkles } from '../../styles/system/sprinkles.css';
import { baseStyles, mediaQueries } from '../../styles/system/static.css';
import { patterns } from '../../styles/system/recipes.css';

// Updated toolbar wrapper using new unified system
export const toolbarWrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      padding: 'md',
      borderRadius: 'lg',
      gap: 'sm',
    }),
    baseStyles.backdropBlur,
    {
      listStyle: 'none',
      margin: 0,
      backgroundColor: tokens.component.toolbar.background,
      minHeight: tokens.component.toolbar.height,
      border: `1px solid ${tokens.semantic.color.border.default}`,
      boxShadow: tokens.semantic.shadow.toolbar,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
      containerType: 'inline-size',
      isolation: 'isolate',
    },
  ],
  variants: {
    size: {
      sm: {
        minHeight: '48px',
        padding: tokens.semantic.spacing.sm,
      },
      md: {
        minHeight: tokens.component.toolbar.height,
        padding: tokens.component.toolbar.padding,
      },
      lg: {
        minHeight: '72px',
        padding: tokens.semantic.spacing.lg,
      },
    },
    layout: {
      horizontal: sprinkles({ 
        flexDirection: 'row',
        flexWrap: 'wrap',
      }),
      vertical: [
        sprinkles({
          flexDirection: 'column',
          alignItems: 'stretch',
        }),
        {
          '@media': {
            'screen and (max-width: 767px)': {
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: tokens.semantic.spacing.sm,
            },
          },
        },
      ],
    },
    responsive: {
      true: {
        '@media': {
          'screen and (min-width: 768px) and (max-width: 1023px)': {
            padding: tokens.semantic.spacing.sm,
            justifyContent: 'center',
          },
          'screen and (max-width: 767px)': {
            padding: tokens.semantic.spacing.xs,
            minHeight: '56px',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: tokens.semantic.spacing.xs,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    layout: 'horizontal',
    responsive: true,
  },
});

// Toolbar list item with new interaction patterns
export const toolbarListItem = style([
  patterns.interactive({ hover: 'opacity' }),
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'xs',
    borderRadius: 'sm',
  }),
  {
    flexShrink: 0,
    gap: tokens.component.toolbar.button.spacing,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    selectors: {
      '&:hover': {
        backgroundColor: tokens.semantic.color.interactive.mutedHover,
      },
    },
  },
]);

// Content wrapper with new flex system
export const contentWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: 'sm',
  }),
  {
    flexGrow: 1,
    minWidth: 0,
    position: 'relative',
  },
]);

// Icon wrapper using new token system
export const iconWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    color: tokens.semantic.color.icon.default,
    opacity: 0.8,
    transition: `opacity ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    selectors: {
      '&:hover': {
        opacity: 1,
        color: tokens.semantic.color.interactive.primary,
      },
    },
  },
]);

// Enhanced toolbar section recipe with new design system
export const toolbarSection = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      gap: 'sm',
    }),
    {
      flexShrink: 0,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    },
  ],
  variants: {
    type: {
      navigation: {
        flexWrap: 'nowrap',
        gap: tokens.semantic.spacing.xs,
      },
      search: {
        flex: '1 1 300px',
        maxWidth: '600px',
        justifyContent: 'center',
        minWidth: '200px',
      },
      actions: {
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: tokens.semantic.spacing.sm,
      },
    },
    responsive: {
      true: {
        '@media': {
          'screen and (max-width: 767px)': {
            width: '100%',
            justifyContent: 'center',
          },
        },
      },
      false: {},
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
    responsive: true,
    visible: true,
  },
});

// Search wrapper using new patterns
export const searchWrapper = style([
  patterns.input({ size: 'md' }),
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    width: 'full',
    gap: 'xs',
  }),
  {
    backgroundColor: tokens.semantic.color.background.elevated,
    border: `1px solid ${tokens.semantic.color.border.default}`,
    borderRadius: tokens.semantic.borderRadius.md,
    padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
    minHeight: '36px',
    position: 'relative',
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    
    selectors: {
      '&:focus-within': {
        borderColor: tokens.semantic.color.border.interactive,
        boxShadow: `0 0 0 2px ${tokens.semantic.color.border.interactive}20`,
        backgroundColor: tokens.semantic.color.background.elevated,
      },
      '&:hover': {
        borderColor: tokens.semantic.color.border.interactive,
        backgroundColor: `${tokens.semantic.color.interactive.primary}05`,
      },
    },
    
    '@media': {
      'screen and (max-width: 767px)': {
        minHeight: '32px',
        padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
      },
    },
  },
]);

// Search input using new typography tokens
export const searchInput = style([
  patterns.text({ variant: 'body' }),
  {
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: tokens.semantic.color.text.primary,
    fontSize: tokens.semantic.typography.fontSize.body,
    padding: tokens.semantic.spacing.xs,
    minWidth: 0,
    
    selectors: {
      '&::placeholder': {
        color: tokens.semantic.color.text.muted,
        opacity: 0.7,
        fontWeight: tokens.semantic.typography.fontWeight.normal,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    
    '@media': {
      'screen and (max-width: 767px)': {
        fontSize: tokens.semantic.typography.fontSize.caption,
      },
    },
  },
]);

// Search info text
export const searchInfo = style([
  patterns.text({ variant: 'caption', color: 'muted' }),
  {
    margin: `0 ${tokens.semantic.spacing.xs}`,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    fontWeight: tokens.semantic.typography.fontWeight.medium,
    
    '@media': {
      'screen and (max-width: 767px)': {
        fontSize: '0.7rem',
        margin: `0 ${tokens.semantic.spacing.xs}`,
      },
    },
  },
]);

// Search controls container
export const searchControls = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: 'xs',
  }),
  {
    flexShrink: 0,
    marginLeft: 'auto',
  },
]);

// Enhanced search button using new pattern system
export const searchButton = style([
  patterns.toolbarButton(),
  {
    width: tokens.component.toolbar.button.size,
    height: tokens.component.toolbar.button.size,
    minWidth: tokens.component.toolbar.button.size,
    backgroundColor: tokens.semantic.color.background.elevated,
    border: `1px solid ${tokens.semantic.color.border.default}`,
    borderRadius: tokens.semantic.borderRadius.sm,
    color: tokens.semantic.color.text.secondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    boxShadow: tokens.semantic.shadow.card,
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: tokens.semantic.color.interactive.muted,
        borderColor: tokens.semantic.color.border.interactive,
        boxShadow: tokens.semantic.shadow.cardHover,
        transform: 'translateY(-1px)',
        color: tokens.semantic.color.interactive.primary,
      },
      '&:active:not(:disabled)': {
        transform: 'translateY(0) scale(0.97)',
        backgroundColor: tokens.semantic.color.interactive.mutedHover,
        boxShadow: tokens.semantic.shadow.cardActive,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.border.interactive}`,
        outlineOffset: '2px',
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    
    '@media': {
      'screen and (max-width: 767px)': {
        width: '24px',
        height: '24px',
        minWidth: '24px',
      },
    },
  },
]);

// Search button icon
export const searchButtonIcon = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    width: '16px',
    height: '16px',
    color: 'currentColor',
    transition: `transform ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    flexShrink: 0,
    
    '@media': {
      'screen and (max-width: 767px)': {
        width: '14px',
        height: '14px',
      },
    },
  },
]);

// Enhanced toolbar icon button recipe
export const toolbarIconButton = recipe({
  base: [
    patterns.toolbarButton(),
    baseStyles.willChange,
    {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: tokens.component.toolbar.button.size,
      height: tokens.component.toolbar.button.size,
      cursor: 'pointer',
      borderRadius: tokens.semantic.borderRadius.md,
      border: `1px solid ${tokens.semantic.color.border.default}`,
      backgroundColor: tokens.semantic.color.background.elevated,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      fontSize: tokens.semantic.typography.fontSize.caption,
      color: tokens.semantic.color.text.secondary,
      boxShadow: tokens.semantic.shadow.card,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
      
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: tokens.semantic.color.interactive.mutedHover,
          borderColor: tokens.semantic.color.border.interactive,
          color: tokens.semantic.color.interactive.primary,
          transform: 'translateY(-1px) scale(1.05)',
          boxShadow: tokens.semantic.shadow.cardHover,
        },
        '&:active:not(:disabled)': {
          transform: 'translateY(0px) scale(0.95)',
          backgroundColor: tokens.semantic.color.interactive.mutedHover,
          color: tokens.semantic.color.interactive.primary,
          boxShadow: tokens.semantic.shadow.cardActive,
          transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}`,
          borderColor: tokens.semantic.color.interactive.primary,
        },
        '&:disabled': {
          opacity: 0.4,
          cursor: 'not-allowed',
          pointerEvents: 'none',
          transform: 'none',
        },
      },
      
      '@media': {
        '(prefers-reduced-motion: reduce)': {
          animation: 'none',
          transition: 'none',
        },
      },
    },
  ],
  variants: {
    state: {
      default: {},
      active: {
        backgroundColor: `${tokens.semantic.color.interactive.primary}20`,
        borderColor: `${tokens.semantic.color.interactive.primary}60`,
        color: tokens.semantic.color.interactive.primary,
        boxShadow: `0 0 0 1px ${tokens.semantic.color.interactive.primary}30, ${tokens.semantic.shadow.card}`,
      },
      minimized: {
        backgroundColor: `${tokens.semantic.color.interactive.primary}25`,
        borderColor: `${tokens.semantic.color.interactive.primary}50`,
        color: tokens.semantic.color.interactive.primary,
      },
    },
    size: {
      sm: { 
        width: '24px', 
        height: '24px', 
        fontSize: tokens.semantic.typography.fontSize.caption,
      },
      md: { 
        width: tokens.component.toolbar.button.size, 
        height: tokens.component.toolbar.button.size, 
        fontSize: tokens.semantic.typography.fontSize.caption,
      },
      lg: { 
        width: '32px', 
        height: '32px', 
        fontSize: tokens.semantic.typography.fontSize.body,
      },
    },
    interactive: {
      true: patterns.interactive({ hover: 'scale' }),
      false: {
        cursor: 'default',
        selectors: {
          '&:hover': {
            transform: 'none',
          },
        },
      },
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
    interactive: true,
  },
});

// Extra controls container
export const extraControls = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    padding: 'xs',
    gap: 'sm',
  }),
  {
    listStyle: 'none',
    margin: 0,
    visibility: 'visible',
    flexShrink: 0,
    flexWrap: 'wrap',
  },
]);

export const extraControlChild = style([
  sprinkles({
    display: 'flex',
  }),
  {
    margin: `${tokens.semantic.spacing.xs} 0`,
    marginRight: tokens.semantic.spacing.xs,
  },
]);

// Global styles for SVG icons
globalStyle(`${searchButtonIcon} svg`, {
  width: '100%',
  height: '100%',
  display: 'block',
  margin: 0,
  padding: 0,
});

globalStyle(`${toolbarIconButton.classNames.base} svg`, {
  width: '80%',
  height: '80%',
  fill: 'currentColor',
});

// Container queries for adaptive behavior
globalStyle(`@container (max-width: 600px)`, {
  [`${toolbarWrapper.classNames.base}`]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: tokens.semantic.spacing.sm,
  },
});

// Export types for new system
export type ToolbarWrapperVariants = Parameters<typeof toolbarWrapper>[0];
export type ToolbarSectionVariants = Parameters<typeof toolbarSection>[0];
export type ToolbarIconButtonVariants = Parameters<typeof toolbarIconButton>[0];

// Missing section exports (for backward compatibility)
export const navigationGroup = toolbarSection({ type: 'navigation' });
export const actionGroup = toolbarSection({ type: 'actions' });
export const searchGroup = toolbarSection({ type: 'search' });

// Utility patterns for common toolbar configurations
export const toolbarPatterns = {
  // Basic horizontal toolbar
  basic: toolbarWrapper({ 
    size: 'md', 
    layout: 'horizontal', 
    responsive: true 
  }),
  
  // Compact toolbar for mobile
  compact: toolbarWrapper({ 
    size: 'sm', 
    layout: 'vertical', 
    responsive: true 
  }),
  
  // Fixed toolbar
  fixed: [
    toolbarWrapper({ size: 'md' }),
    {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: tokens.semantic.zIndex.controls,
    },
  ],
};