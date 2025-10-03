import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/tokens/index.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/system/sprinkles.css';

// Base font family with proper CSS custom property fallback for Google Fonts
const baseFontFamily = `var(--timeline-font-family, 'Inter, system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')`;

export const titleWrapper = style([
  sprinkles({ px: 'xs', py: 'xs' }),
  {
    borderRadius: '0.2rem',
    fontFamily: `var(--timeline-title-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-title-font-size, 1rem)`,
    fontWeight: `var(--timeline-title-font-weight, 600)`,
    fontStyle: `var(--timeline-title-font-style, normal)`,
    overflow: 'hidden',
    minWidth: 0,
    maxWidth: '100%',
    color: tokens.semantic.color.text.primary,
    position: 'relative',
    cursor: 'default',

    // Better responsive text handling with intelligent truncation
    wordBreak: 'break-word',
    hyphens: 'auto',
    lineHeight: 1.4,

    // Desktop: Multi-line clamp for better readability
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    maxHeight: 'calc(1.4em * 2)', // 2 lines max

    // Responsive behavior
    '@media': {
      // Large screens: 2 lines, larger font
      'screen and (min-width: 1440px)': {
        fontSize: `var(--timeline-title-font-size, 1.1rem)`,
        WebkitLineClamp: 2,
        maxHeight: 'calc(1.4em * 2)',
      },
      // Desktop/Laptop: 2 lines
      'screen and (min-width: 1024px) and (max-width: 1439px)': {
        fontSize: `var(--timeline-title-font-size, 1rem)`,
        WebkitLineClamp: 2,
        maxHeight: 'calc(1.4em * 2)',
      },
      // Tablets: 2 lines, slightly smaller
      'screen and (min-width: 768px) and (max-width: 1023px)': {
        fontSize: `var(--timeline-title-font-size, 0.95rem)`,
        WebkitLineClamp: 2,
        maxHeight: 'calc(1.4em * 2)',
      },
      // Mobile landscape: 1 line
      'screen and (min-width: 480px) and (max-width: 767px)': {
        fontSize: `var(--timeline-title-font-size, 0.9rem)`,
        WebkitLineClamp: 1,
        maxHeight: '1.4em',
        padding: '4px 6px',
      },
      // Mobile portrait: 1 line, compact
      'screen and (max-width: 479px)': {
        fontSize: `var(--timeline-title-font-size, 0.85rem)`,
        WebkitLineClamp: 1,
        maxHeight: '1.4em',
        padding: '3px 5px',
      },
    },

    // Hover effect to show full title in tooltip (browser native)
    ':hover': {
      cursor: 'help',
    },
  },
]);

export const titleActive = style({
  background: tokens.semantic.color.background.secondary,
  color: tokens.semantic.color.interactive.primary,
});

export const titleRecipe = recipe({
  base: [titleWrapper],
  variants: {
    active: {
      true: [titleActive],
      false: {},
    },
  },
  defaultVariants: { active: false },
});
