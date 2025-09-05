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
    // Better responsive text handling
    wordBreak: 'break-word',
    hyphens: 'auto',
    
    // Default: single line with ellipsis on larger screens
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    
    // Responsive behavior for smaller screens
    '@media': {
      // On tablets and below, allow text wrapping
      'screen and (max-width: 1023px)': {
        whiteSpace: 'normal',
        textOverflow: 'clip',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        lineHeight: 1.3,
        maxHeight: 'calc(1.3em * 2)', // 2 lines max
      },
      // On mobile, hide completely or show very compact
      'screen and (max-width: 767px)': {
        display: 'var(--timeline-title-mobile-display, none)', // Allow override via CSS variable
        fontSize: 'var(--timeline-title-mobile-size, 0.8rem)',
        padding: '2px 4px',
        WebkitLineClamp: 1,
        maxHeight: '1.3em',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      // On very small screens, hide by default unless overridden
      'screen and (max-width: 479px)': {
        display: 'var(--timeline-title-mobile-display, none)',
      },
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
