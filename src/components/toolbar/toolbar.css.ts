import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens/index.css';
import { vars } from '../../styles/tokens.css';
import { sprinkles } from '../../styles/system/sprinkles.css';
import { baseStyles, mediaQueries } from '../../styles/system/static.css';
import { patterns } from '../../styles/system/recipes.css';

// Responsive utility classes
export const hideOnMobile = style({
  '@media': {
    '(max-width: 767px)': {
      display: 'none !important',
    },
  },
});

export const hideOnTabletAndBelow = style({
  '@media': {
    '(max-width: 1023px)': {
      display: 'none !important',
    },
  },
});

// Base font family with proper CSS custom property fallback for Google Fonts
const baseFontFamily = `var(--timeline-font-family, 'Inter, system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')`;

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
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: tokens.semantic.spacing.xs,
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
            padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
            minHeight: '48px',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.semantic.spacing.xs,
            overflow: 'hidden',
          },
        },
      },
      false: {},
    },
    sticky: {
      true: {
        position: 'sticky',
        top: 0,
        zIndex: tokens.semantic.zIndex.controls,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: `${tokens.component.toolbar.background}f0`,
        borderBottom: `1px solid ${tokens.semantic.color.border.muted}20`,
        boxShadow: `0 2px 8px -2px rgba(0, 0, 0, 0.1)`,
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    layout: 'horizontal',
    responsive: true,
    sticky: false,
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
    overflow: 'hidden',
    '@media': {
      '(max-width: 767px)': {
        gap: tokens.semantic.spacing.xs,
        flexShrink: 1,
      },
    },
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

// Search input using new typography tokens and Google Fonts integration
export const searchInput = style([
  patterns.text({ variant: 'body' }),
  {
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: tokens.semantic.color.text.primary,
    fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-controls-font-size, ${tokens.semantic.typography.fontSize.body})`,
    fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.normal})`,
    fontStyle: `var(--timeline-controls-font-style, normal)`,
    padding: tokens.semantic.spacing.xs,
    minWidth: 0,

    selectors: {
      '&::placeholder': {
        color: tokens.semantic.color.text.muted,
        opacity: 0.7,
        fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
        fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.normal})`,
        fontStyle: `var(--timeline-controls-font-style, normal)`,
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

// Search info text with Google Fonts integration
export const searchInfo = style([
  patterns.text({ variant: 'caption', color: 'muted' }),
  {
    margin: `0 ${tokens.semantic.spacing.xs}`,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-controls-font-size, ${tokens.semantic.typography.fontSize.caption})`,
    fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.medium})`,
    fontStyle: `var(--timeline-controls-font-style, normal)`,

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
    width: '28px',
    height: '28px',
    minWidth: '28px',
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
        backgroundColor: tokens.semantic.color.interactive.primary,
        borderColor: tokens.semantic.color.interactive.primary,
        boxShadow: `0 2px 8px -2px ${tokens.semantic.color.interactive.primary}40`,
        transform: 'translateY(-1px)',
        color: '#ffffff',
      },
      '&:active:not(:disabled)': {
        transform: 'translateY(0) scale(0.96)',
        backgroundColor: tokens.semantic.color.interactive.primaryActive,
        borderColor: tokens.semantic.color.interactive.primaryActive,
        color: '#ffffff',
        boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.1)`,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}40`,
        borderColor: tokens.semantic.color.interactive.primary,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        backgroundColor: tokens.semantic.color.background.secondary,
        color: tokens.semantic.color.text.muted,
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
      borderRadius: tokens.semantic.borderRadius.lg,
      border: `1px solid ${tokens.semantic.color.interactive.primary}20`,
      backgroundColor: tokens.semantic.color.background.elevated,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      fontSize: tokens.semantic.typography.fontSize.caption,
      fontWeight: tokens.semantic.typography.fontWeight.medium,
      color: tokens.semantic.color.text.secondary,
      boxShadow: `0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 1px 4px -1px rgba(0, 0, 0, 0.06)`,
      transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
      userSelect: 'none',
      outline: 'none',

      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: tokens.semantic.color.interactive.primary,
          borderColor: tokens.semantic.color.interactive.primary,
          color: '#ffffff',
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 12px -2px ${tokens.semantic.color.interactive.primary}40, 0 2px 8px -2px rgba(0, 0, 0, 0.12)`,
        },
        '&:active:not(:disabled)': {
          transform: 'translateY(0px) scale(0.96)',
          backgroundColor: tokens.semantic.color.interactive.primaryActive,
          borderColor: tokens.semantic.color.interactive.primaryActive,
          color: '#ffffff',
          boxShadow: `0 1px 4px -1px ${tokens.semantic.color.interactive.primary}50, inset 0 1px 2px rgba(0, 0, 0, 0.1)`,
          transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.emphasized}`,
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 3px ${tokens.semantic.color.interactive.primary}60, 0 2px 8px -2px rgba(0, 0, 0, 0.1)`,
          borderColor: tokens.semantic.color.interactive.primary,
          backgroundColor: `${tokens.semantic.color.interactive.primary}10`,
          color: tokens.semantic.color.interactive.primary,
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
          pointerEvents: 'none',
          transform: 'none',
          backgroundColor: tokens.semantic.color.background.secondary,
          color: tokens.semantic.color.text.muted,
          borderColor: tokens.semantic.color.border.muted,
          boxShadow: 'none',
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
        backgroundColor: `${tokens.semantic.color.interactive.primary}15`,
        borderColor: `${tokens.semantic.color.interactive.primary}70`,
        color: tokens.semantic.color.interactive.primary,
        boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}25, 0 2px 8px -2px ${tokens.semantic.color.interactive.primary}20`,
        fontWeight: tokens.semantic.typography.fontWeight.semibold,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: tokens.semantic.color.interactive.primaryHover,
            borderColor: tokens.semantic.color.interactive.primaryHover,
            color: '#ffffff',
            transform: 'translateY(-1px)',
            boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}40, 0 4px 12px -2px ${tokens.semantic.color.interactive.primary}30`,
          },
        },
      },
      minimized: {
        backgroundColor: `${tokens.semantic.color.interactive.primary}12`,
        borderColor: `${tokens.semantic.color.interactive.primary}50`,
        color: tokens.semantic.color.interactive.primary,
        opacity: 0.8,
        selectors: {
          '&:hover:not(:disabled)': {
            opacity: 1,
            backgroundColor: tokens.semantic.color.interactive.primary,
            borderColor: tokens.semantic.color.interactive.primary,
            color: '#ffffff',
            transform: 'translateY(-1px)',
          },
        },
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
    responsive: true,
  }),

  // Compact toolbar for mobile
  compact: toolbarWrapper({
    size: 'sm',
    layout: 'vertical',
    responsive: true,
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
