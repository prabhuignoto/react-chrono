import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { sprinkles } from './sprinkles.css';
import { tokens } from '../tokens/index.css';

// Base interactive element pattern
export const interactive = recipe({
  base: [
    sprinkles({
      cursor: 'pointer',
      userSelect: 'none',
      transitionProperty: 'all',
      transitionDuration: 'fast',
    }),
    {
      outline: 'none',
      selectors: {
        '&:focus-visible': {
          outline: `2px solid ${tokens.semantic.color.border.interactive}`,
          outlineOffset: '2px',
        },
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      },
      '@media': {
        '(prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      },
    },
  ],
  variants: {
    hover: {
      scale: {
        transform: 'scale(1.02)',
        selectors: {
          '&:hover': {
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
      },
      lift: {
        selectors: {
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
      },
      opacity: {
        selectors: {
          '&:hover': {
            opacity: 0.8,
          },
        },
      },
      none: {},
    },
  },
  defaultVariants: {
    hover: 'none',
  },
});

// Flexible container pattern
export const flexContainer = recipe({
  base: sprinkles({ display: 'flex' }),
  variants: {
    direction: {
      row: sprinkles({ flexDirection: 'row' }),
      column: sprinkles({ flexDirection: 'column' }),
    },
    align: {
      start: sprinkles({ alignItems: 'flex-start' }),
      center: sprinkles({ alignItems: 'center' }),
      end: sprinkles({ alignItems: 'flex-end' }),
      stretch: sprinkles({ alignItems: 'stretch' }),
    },
    justify: {
      start: sprinkles({ justifyContent: 'flex-start' }),
      center: sprinkles({ justifyContent: 'center' }),
      end: sprinkles({ justifyContent: 'flex-end' }),
      between: sprinkles({ justifyContent: 'space-between' }),
      around: sprinkles({ justifyContent: 'space-around' }),
    },
    gap: {
      none: sprinkles({ gap: 'xs' }),
      xs: sprinkles({ gap: 'xs' }),
      sm: sprinkles({ gap: 'sm' }),
      md: sprinkles({ gap: 'md' }),
      lg: sprinkles({ gap: 'lg' }),
      xl: sprinkles({ gap: 'xl' }),
    },
    wrap: {
      true: sprinkles({ flexWrap: 'wrap' }),
      false: sprinkles({ flexWrap: 'nowrap' }),
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    gap: 'md',
    wrap: false,
  },
});

// Card pattern - simplified from complex base
export const card = recipe({
  base: [
    sprinkles({
      position: 'relative',
      borderRadius: 'lg',
      padding: 'md',
    }),
    {
      backgroundColor: tokens.semantic.color.background.elevated,
      border: `1px solid ${tokens.semantic.color.border.default}`,
      boxShadow: tokens.semantic.shadow.card,
      overflow: 'hidden',
    },
  ],
  variants: {
    size: {
      sm: sprinkles({ padding: 'sm' }),
      md: sprinkles({ padding: 'md' }),
      lg: sprinkles({ padding: 'lg' }),
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: tokens.semantic.shadow.card },
      high: { boxShadow: tokens.semantic.shadow.cardHover },
    },
    interactive: {
      true: {
        selectors: {
          '&:hover': {
            boxShadow: tokens.semantic.shadow.cardHover,
            transform: 'translateY(-1px)',
          },
        },
      },
      false: {},
    },
    fullWidth: {
      true: sprinkles({ width: 'full' }),
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    elevation: 'low',
    interactive: false,
    fullWidth: false,
  },
});

// Button pattern - simplified
export const button = recipe({
  base: [
    interactive({ hover: 'opacity' }),
    sprinkles({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'md',
      fontSize: 'body',
      fontWeight: 'medium',
      borderWidth: 1,
      borderStyle: 'solid',
    }),
    {
      textDecoration: 'none',
      border: '1px solid transparent',
    },
  ],
  variants: {
    variant: {
      primary: {
        backgroundColor: tokens.semantic.color.interactive.primary,
        borderColor: tokens.semantic.color.interactive.primary,
        color: tokens.semantic.color.text.inverse,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.semantic.color.interactive.primaryHover,
            borderColor: tokens.semantic.color.interactive.primaryHover,
          },
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: tokens.semantic.color.border.interactive,
        color: tokens.semantic.color.text.primary,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.semantic.color.interactive.muted,
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: tokens.semantic.color.text.primary,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.semantic.color.interactive.muted,
          },
        },
      },
    },
    size: {
      sm: sprinkles({ padding: 'xs', fontSize: 'caption' }),
      md: sprinkles({ padding: 'sm', fontSize: 'body' }),
      lg: sprinkles({ padding: 'md', fontSize: 'heading3' }),
    },
    shape: {
      square: {},
      rounded: sprinkles({ borderRadius: 'md' }),
      pill: sprinkles({ borderRadius: 'full' }),
    },
    fullWidth: {
      true: sprinkles({ width: 'full' }),
      false: {},
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md',
    shape: 'rounded',
    fullWidth: false,
  },
});

// Text element pattern - simplified
export const text = recipe({
  base: {
    margin: 0,
    padding: 0,
    color: tokens.semantic.color.text.primary,
  },
  variants: {
    variant: {
      h1: sprinkles({ fontSize: 'heading1', fontWeight: 'bold' }),
      h2: sprinkles({ fontSize: 'heading2', fontWeight: 'semibold' }),
      h3: sprinkles({ fontSize: 'heading3', fontWeight: 'semibold' }),
      body: sprinkles({ fontSize: 'body', fontWeight: 'normal' }),
      caption: sprinkles({ fontSize: 'caption', fontWeight: 'normal' }),
    },
    color: {
      primary: { color: tokens.semantic.color.text.primary },
      secondary: { color: tokens.semantic.color.text.secondary },
      muted: { color: tokens.semantic.color.text.muted },
      inverse: { color: tokens.semantic.color.text.inverse },
      interactive: { color: tokens.semantic.color.interactive.primary },
    },
    align: {
      left: sprinkles({ textAlign: 'left' }),
      center: sprinkles({ textAlign: 'center' }),
      right: sprinkles({ textAlign: 'right' }),
    },
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
    align: 'left',
    truncate: false,
  },
});

// Input pattern - simplified
export const input = recipe({
  base: [
    sprinkles({
      display: 'block',
      width: 'full',
      padding: 'sm',
      borderRadius: 'md',
      fontSize: 'body',
      borderWidth: 1,
      borderStyle: 'solid',
    }),
    {
      backgroundColor: tokens.semantic.color.background.elevated,
      borderColor: tokens.semantic.color.border.default,
      color: tokens.semantic.color.text.primary,
      outline: 'none',
      transition: `border-color ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
      selectors: {
        '&:focus': {
          borderColor: tokens.semantic.color.border.interactive,
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
        },
      },
    },
  ],
  variants: {
    size: {
      sm: sprinkles({ padding: 'xs', fontSize: 'caption' }),
      md: sprinkles({ padding: 'sm', fontSize: 'body' }),
      lg: sprinkles({ padding: 'md', fontSize: 'heading3' }),
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Timeline-specific patterns
export const timelineCard = recipe({
  base: [
    card({ interactive: true }),
    {
      minWidth: tokens.component.timeline.card.width.horizontal,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    },
  ],
  variants: {
    mode: {
      vertical: {
        width: tokens.component.timeline.card.width.vertical,
        marginBottom: tokens.component.timeline.card.spacing.vertical,
      },
      horizontal: {
        width: tokens.component.timeline.card.width.horizontal,
        marginRight: tokens.component.timeline.card.spacing.horizontal,
      },
    },
    active: {
      true: {
        borderColor: tokens.semantic.color.border.interactive,
        boxShadow: tokens.semantic.shadow.cardHover,
      },
      false: {},
    },
  },
  defaultVariants: {
    mode: 'vertical',
    active: false,
  },
});

export const timelinePoint = recipe({
  base: [
    sprinkles({
      position: 'relative',
      borderRadius: 'full',
      borderWidth: 2,
      borderStyle: 'solid',
    }),
    {
      width: tokens.component.timeline.point.size.md,
      height: tokens.component.timeline.point.size.md,
      backgroundColor: tokens.semantic.color.background.elevated,
      borderColor: tokens.component.timeline.point.color.inactive,
      transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
      zIndex: tokens.semantic.zIndex.timelineCard,
    },
  ],
  variants: {
    size: {
      sm: {
        width: tokens.component.timeline.point.size.sm,
        height: tokens.component.timeline.point.size.sm,
      },
      md: {
        width: tokens.component.timeline.point.size.md,
        height: tokens.component.timeline.point.size.md,
      },
      lg: {
        width: tokens.component.timeline.point.size.lg,
        height: tokens.component.timeline.point.size.lg,
      },
    },
    state: {
      inactive: {
        borderColor: tokens.component.timeline.point.color.inactive,
        backgroundColor: tokens.semantic.color.background.elevated,
      },
      active: {
        borderColor: tokens.component.timeline.point.color.active,
        backgroundColor: tokens.component.timeline.point.color.active,
      },
      hover: {
        borderColor: tokens.component.timeline.point.color.hover,
        backgroundColor: tokens.component.timeline.point.color.hover,
      },
    },
    interactive: {
      true: [
        interactive({ hover: 'scale' }),
        {
          selectors: {
            '&:hover': {
              borderColor: tokens.component.timeline.point.color.hover,
            },
          },
        },
      ],
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'inactive',
    interactive: false,
  },
});

export const toolbarButton = recipe({
  base: [
    button({ variant: 'ghost', size: 'sm' }),
    {
      width: tokens.component.toolbar.button.size,
      height: tokens.component.toolbar.button.size,
      padding: 0,
    },
  ],
  variants: {
    active: {
      true: {
        backgroundColor: tokens.semantic.color.interactive.primary,
        color: tokens.semantic.color.text.inverse,
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});

// Utility patterns
export const utilityPatterns = {
  // Visually hidden but accessible
  visuallyHidden: style([
    sprinkles({
      position: 'absolute',
      overflow: 'hidden',
    }),
    {
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    },
  ]),

  // Reset styles
  resetButton: style([
    sprinkles({
      borderWidth: 0,
      cursor: 'pointer',
    }),
    {
      background: 'none',
      padding: 0,
      margin: 0,
      font: 'inherit',
    },
  ]),

  resetList: style([
    sprinkles({
      listStyleType: 'none',
    }),
    {
      padding: 0,
      margin: 0,
    },
  ]),

  // Focus management
  focusRing: style({
    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.border.interactive}`,
        outlineOffset: '2px',
      },
    },
  }),
};

// Export types for better TypeScript integration
export type InteractiveVariants = RecipeVariants<typeof interactive>;
export type FlexContainerVariants = RecipeVariants<typeof flexContainer>;
export type CardVariants = RecipeVariants<typeof card>;
export type ButtonVariants = RecipeVariants<typeof button>;
export type TextVariants = RecipeVariants<typeof text>;
export type InputVariants = RecipeVariants<typeof input>;
export type TimelineCardVariants = RecipeVariants<typeof timelineCard>;
export type TimelinePointVariants = RecipeVariants<typeof timelinePoint>;
export type ToolbarButtonVariants = RecipeVariants<typeof toolbarButton>;

// Export all patterns
export const patterns = {
  interactive,
  flexContainer,
  card,
  button,
  text,
  input,
  timelineCard,
  timelinePoint,
  toolbarButton,
  utils: utilityPatterns,
};
