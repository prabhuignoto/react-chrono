import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from './tokens/index.css';

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
    paddingLeft: tokens.semantic.spacing.md,
    paddingRight: tokens.semantic.spacing.md,
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
        paddingLeft: tokens.semantic.spacing.sm,
        paddingRight: tokens.semantic.spacing.sm,
      },
      md: {
        paddingLeft: tokens.semantic.spacing.md,
        paddingRight: tokens.semantic.spacing.md,
      },
      lg: {
        paddingLeft: tokens.semantic.spacing.lg,
        paddingRight: tokens.semantic.spacing.lg,
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
  marginTop: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      marginTop: tokens.semantic.spacing[size],
    }),

  marginBottom: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      marginBottom: tokens.semantic.spacing[size],
    }),

  marginLeft: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      marginLeft: tokens.semantic.spacing[size],
    }),

  marginRight: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      marginRight: tokens.semantic.spacing[size],
    }),

  // Padding
  paddingTop: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      paddingTop: tokens.semantic.spacing[size],
    }),

  paddingBottom: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      paddingBottom: tokens.semantic.spacing[size],
    }),

  paddingLeft: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      paddingLeft: tokens.semantic.spacing[size],
    }),

  paddingRight: (size: keyof typeof tokens.semantic.spacing) =>
    style({
      paddingRight: tokens.semantic.spacing[size],
    }),
};

// Gap utilities for flex/grid
export const gap = recipe({
  variants: {
    size: {
      xs: { gap: tokens.semantic.spacing.xs },
      sm: { gap: tokens.semantic.spacing.sm },
      md: { gap: tokens.semantic.spacing.md },
      lg: { gap: tokens.semantic.spacing.lg },
      xl: { gap: tokens.semantic.spacing.xl },
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
