import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens/index.css';
import { sprinkles } from '../../styles/system/sprinkles.css';
import { patterns } from '../../styles/system/recipes.css';

// Base icon styles using new unified system
export const iconBase = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    color: 'currentColor',
    stroke: 'currentColor',
    fill: 'none',
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  },
]);

// Icon recipe with size variants using new token system
export const icon = recipe({
  base: iconBase,
  variants: {
    size: {
      xs: {
        width: '0.75rem',
        height: '0.75rem',
      },
      sm: {
        width: '0.875rem',
        height: '0.875rem',
      },
      md: {
        width: '1rem',
        height: '1rem',
      },
      lg: {
        width: '1.25rem',
        height: '1.25rem',
      },
      xl: {
        width: '1.5rem',
        height: '1.5rem',
      },
      '2xl': {
        width: '2rem',
        height: '2rem',
      },
    },
    color: {
      primary: { color: tokens.semantic.color.interactive.primary },
      secondary: { color: tokens.semantic.color.text.secondary },
      muted: { color: tokens.semantic.color.text.muted },
      inherit: { color: 'currentColor' },
    },
    state: {
      default: {},
      hover: {
        selectors: {
          '&:hover': {
            color: tokens.semantic.color.interactive.primary,
            transform: 'scale(1.1)',
          },
        },
      },
      active: {
        color: tokens.semantic.color.interactive.primary,
        transform: 'scale(0.95)',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'inherit',
    state: 'default',
  },
});

// Legacy exports for backward compatibility
export const iconSm = icon({ size: 'sm' });
export const iconMd = icon({ size: 'md' });
export const iconLg = icon({ size: 'lg' });
export const iconXl = icon({ size: 'xl' });
export const buttonIcon = icon({ size: 'lg' });

// Export type for TypeScript integration
export type IconVariants = Parameters<typeof icon>[0];

export const toolbarIcon = style([
  iconBase,
  {
    width: '1rem', // 16px - smaller for toolbar
    height: '1rem',
  },
]);

export const controlIcon = style([
  iconBase,
  {
    width: '1.5rem', // 24px - larger for controls
    height: '1.5rem',
  },
]);

// Ensure all SVGs within these containers maintain aspect ratio
globalStyle(`${iconBase} svg`, {
  width: '100%',
  height: '100%',
  display: 'block',
});

// Remove any default margin/padding on SVGs
globalStyle(`${iconBase} svg, ${buttonIcon} svg, ${toolbarIcon} svg, ${controlIcon} svg`, {
  margin: 0,
  padding: 0,
});