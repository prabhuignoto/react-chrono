import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { designTokens } from './design-system.css';

// Base layout utilities
export const layoutBase = {
  flexRow: style({
    display: 'flex',
    flexDirection: 'row',
  }),

  flexColumn: style({
    display: 'flex',
    flexDirection: 'column',
  }),

  flexCenter: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  flexBetween: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  grid: style({
    display: 'grid',
  }),

  fullWidth: style({
    width: '100%',
  }),

  fullHeight: style({
    height: '100%',
  }),
};

// Responsive container recipe
export const container = recipe({
  base: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: designTokens.spacing.md,
    paddingRight: designTokens.spacing.md,
  },

  variants: {
    size: {
      sm: { maxWidth: '640px' },
      md: { maxWidth: '768px' },
      lg: { maxWidth: '1024px' },
      xl: { maxWidth: '1280px' },
      full: { maxWidth: 'none' },
    },

    padding: {
      none: { paddingLeft: 0, paddingRight: 0 },
      sm: {
        paddingLeft: designTokens.spacing.sm,
        paddingRight: designTokens.spacing.sm,
      },
      md: {
        paddingLeft: designTokens.spacing.md,
        paddingRight: designTokens.spacing.md,
      },
      lg: {
        paddingLeft: designTokens.spacing.lg,
        paddingRight: designTokens.spacing.lg,
      },
    },
  },

  defaultVariants: {
    size: 'full',
    padding: 'md',
  },
});

// Spacing utilities
export const spacing = {
  // Margins
  marginTop: (size: keyof typeof designTokens.spacing) =>
    style({
      marginTop: designTokens.spacing[size],
    }),

  marginBottom: (size: keyof typeof designTokens.spacing) =>
    style({
      marginBottom: designTokens.spacing[size],
    }),

  marginLeft: (size: keyof typeof designTokens.spacing) =>
    style({
      marginLeft: designTokens.spacing[size],
    }),

  marginRight: (size: keyof typeof designTokens.spacing) =>
    style({
      marginRight: designTokens.spacing[size],
    }),

  // Padding
  paddingTop: (size: keyof typeof designTokens.spacing) =>
    style({
      paddingTop: designTokens.spacing[size],
    }),

  paddingBottom: (size: keyof typeof designTokens.spacing) =>
    style({
      paddingBottom: designTokens.spacing[size],
    }),

  paddingLeft: (size: keyof typeof designTokens.spacing) =>
    style({
      paddingLeft: designTokens.spacing[size],
    }),

  paddingRight: (size: keyof typeof designTokens.spacing) =>
    style({
      paddingRight: designTokens.spacing[size],
    }),
};

// Gap utilities for flex/grid
export const gap = recipe({
  variants: {
    size: {
      xs: { gap: designTokens.spacing.xs },
      sm: { gap: designTokens.spacing.sm },
      md: { gap: designTokens.spacing.md },
      lg: { gap: designTokens.spacing.lg },
      xl: { gap: designTokens.spacing.xl },
    },
    direction: {
      both: {},
      row: { columnGap: 'var(--gap-size)' },
      column: { rowGap: 'var(--gap-size)' },
    },
  },
  defaultVariants: {
    size: 'md',
    direction: 'both',
  },
});
