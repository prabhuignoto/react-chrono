import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { vars } from '../../../styles/tokens.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { animations, baseStyles } from '../../../styles/system/static.css';

// Base font family with proper CSS custom property fallback for Google Fonts
const baseFontFamily = `var(--timeline-font-family, 'Inter, system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')`;

export const baseCard = style([
  patterns.card({ size: 'lg', elevation: 'high' }),
  baseStyles.willChange,
  {
    borderRadius: tokens.semantic.borderRadius.lg,
    border: `1px solid ${tokens.semantic.color.border.default}`,
    boxShadow: tokens.semantic.shadow.card,
    backdropFilter: 'blur(20px)',
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    position: 'relative',
    overflow: 'hidden',
    minWidth: '280px',
    maxWidth: '400px',
    backgroundColor: tokens.semantic.color.background.elevated,

    '@media': {
      '(max-width: 768px)': {
        borderRadius: tokens.semantic.borderRadius.lg,
        minWidth: '240px',
      },
      '(max-width: 480px)': {
        borderRadius: tokens.semantic.borderRadius.md,
        minWidth: '200px',
        boxShadow: tokens.semantic.shadow.cardHover,
      },
      '(max-width: 320px)': {
        minWidth: '180px',
        borderRadius: tokens.semantic.borderRadius.sm,
      },
    },

    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 'inherit',
      padding: '1px',
      background: `linear-gradient(135deg, ${tokens.semantic.color.interactive.primary}20 0%, transparent 50%, ${tokens.semantic.color.interactive.primary}10 100%)`,
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'xor',
      WebkitMask:
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      pointerEvents: 'none',
    },
  },
]);

export const itemContentWrapper = style([
  patterns.interactive({ hover: 'lift' }),
  sprinkles({ display: 'flex', width: 'full' }),
  {
    selectors: {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: tokens.semantic.shadow.cardHover,
        willChange: 'transform, box-shadow',
      },
      '&:focus:not(:focus-visible):not(.focus-visible)': {
        outline: 'none',
        boxShadow: tokens.semantic.shadow.cardHover,
      },
      '&:focus-visible, &.focus-visible': {
        outline: `2px solid ${tokens.semantic.color.border.interactive}`,
        outlineOffset: '2px',
        boxShadow: tokens.semantic.shadow.cardHover,
      },
      '&:active': {
        transform: 'translateY(0px)',
        transition: `transform ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
      },
    },
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    lineHeight: 1.6,
    margin: 0,
    position: 'relative',
    padding: tokens.semantic.spacing.md,
    overflow: 'hidden',
    gap: tokens.semantic.spacing.sm,

    '@media': {
      '(max-width: 768px)': {
        padding: tokens.semantic.spacing.sm,
        gap: tokens.semantic.spacing.xs,
      },
      '(max-width: 480px)': {
        padding: tokens.semantic.spacing.xs,
        gap: tokens.semantic.spacing.xs,
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
  },
]);

export const timelineCardHeader = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    width: 'full',
    gap: 'xs',
  }),
  {
    padding: 0,
    marginBottom: tokens.semantic.spacing.sm,

    '@media': {
      '(max-width: 768px)': {
        marginBottom: tokens.semantic.spacing.xs,
      },
    },
  },
]);

export const cardTitleBase = style([
  patterns.text({ variant: 'h2' }),
  {
    margin: 0,
    width: '100%',
    textAlign: 'left',
    fontFamily: `var(--timeline-cardTitle-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-cardTitle-font-size, ${tokens.semantic.typography.fontSize.heading1})`,
    fontWeight: `var(--timeline-cardTitle-font-weight, ${tokens.semantic.typography.fontWeight.semibold})`,
    fontStyle: `var(--timeline-cardTitle-font-style, normal)`,
    letterSpacing: '-0.025em',
    lineHeight: 1.4,
    wordBreak: 'break-word',
    transition: `color ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  },
]);

export const cardTitle = style([
  cardTitleBase,
  {
    color: tokens.semantic.color.text.primary,
    marginBottom: tokens.semantic.spacing.xs,

    '@media': {
      '(max-width: 768px)': {
        fontSize: `var(--timeline-cardTitle-font-size, ${tokens.semantic.typography.fontSize.heading2})`,
      },
      '(max-width: 480px)': {
        fontSize: `var(--timeline-cardTitle-font-size, ${tokens.semantic.typography.fontSize.body})`,
      },
    },
  },
]);

export const cardTitleActive = style({
  color: tokens.semantic.color.interactive.primary,
});

// Enhanced title recipe using new tokens
export const cardTitleRecipe = recipe({
  base: [
    cardTitleBase,
    {
      color: tokens.semantic.color.text.primary,
      fontSize: '20px',
      marginBottom: tokens.semantic.spacing.md,
    },
  ],
  variants: {
    active: {
      true: { color: tokens.semantic.color.interactive.primary },
      false: {},
    },
  },
  defaultVariants: { active: false },
});

export const cardSubTitle = style([
  patterns.text({ variant: 'caption' }),
  {
    color: tokens.semantic.color.text.secondary,
    fontFamily: `var(--timeline-cardSubtitle-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-cardSubtitle-font-size, ${tokens.semantic.typography.fontSize.caption})`,
    fontWeight: `var(--timeline-cardSubtitle-font-weight, ${tokens.semantic.typography.fontWeight.medium})`,
    fontStyle: `var(--timeline-cardSubtitle-font-style, normal)`,
    letterSpacing: '-0.01em',
    lineHeight: 1.5,
    opacity: 0.85,
    marginBottom: tokens.semantic.spacing.sm,
    margin: 0,
    width: '100%',
    textAlign: 'left',
    wordBreak: 'break-word',

    '@media': {
      '(max-width: 768px)': {
        fontSize: `var(--timeline-cardSubtitle-font-size, 0.8rem)`,
      },
      '(max-width: 480px)': {
        fontSize: `var(--timeline-cardSubtitle-font-size, 0.75rem)`,
      },
    },
  },
]);

export const timelineContentDetails = style([
  patterns.text({ variant: 'body' }),
  {
    fontFamily: `var(--timeline-cardText-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-cardText-font-size, ${tokens.semantic.typography.fontSize.body})`,
    fontWeight: `var(--timeline-cardText-font-weight, ${tokens.semantic.typography.fontWeight.normal})`,
    fontStyle: `var(--timeline-cardText-font-style, normal)`,
    margin: 0,
    width: '100%',
    color: tokens.semantic.color.text.primary,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    wordBreak: 'break-word',

    '@media': {
      '(max-width: 768px)': {
        fontSize: `var(--timeline-cardText-font-size, 0.75rem)`,
        lineHeight: 1.4,
      },
      '(max-width: 480px)': {
        fontSize: `var(--timeline-cardText-font-size, 0.7rem)`,
      },
    },

    selectors: {
      '& + &': { marginTop: tokens.semantic.spacing.sm },
    },
  },
]);

// Global styles for paragraph elements within content details
globalStyle(`${timelineContentDetails} p`, {
  margin: '0 0 0.5rem 0',
});

globalStyle(`${timelineContentDetails} p:last-child`, {
  marginBottom: 0,
});

// Reduced motion preferences for timeline card content
globalStyle(`${itemContentWrapper}:hover`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      willChange: 'auto',
    },
  },
});

globalStyle(`${itemContentWrapper}:active`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
    },
  },
});

export const timelineSubContent = style([
  patterns.text({ variant: 'caption', color: 'muted' }),
  {
    marginBottom: tokens.semantic.spacing.sm,
    display: 'block',
    fontSize: tokens.semantic.typography.fontSize.caption,
    color: tokens.semantic.color.text.muted,
    lineHeight: 1.5,
    opacity: 0.8,

    '@media': {
      '(max-width: 768px)': {
        fontSize: '0.7rem',
      },
    },
  },
]);

export const contentDetailsWrapper = style([
  sprinkles({
    display: 'flex',
    width: 'full',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'xs',
  }),
  {
    margin: 0,
    position: 'relative',
    overflowX: 'hidden',
    transition: `max-height ${tokens.semantic.motion.duration.slow} ${tokens.semantic.motion.easing.standard}, opacity ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    padding: 0,
    background: 'transparent',
  },
]);

export const showMoreButton = style([
  patterns.button({ variant: 'ghost', size: 'sm' }),
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: 'xs',
  }),
  {
    background: `linear-gradient(135deg, ${tokens.semantic.color.interactive.primary}08 0%, ${tokens.semantic.color.interactive.primary}04 100%)`,
    border: `1px solid ${tokens.semantic.color.interactive.primary}20`,
    borderRadius: tokens.semantic.borderRadius.sm,
    padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
    margin: `${tokens.semantic.spacing.sm} 0 0 auto`,
    color: tokens.semantic.color.interactive.primary,
    fontSize: tokens.semantic.typography.fontSize.caption,
    fontWeight: tokens.semantic.typography.fontWeight.medium,
    cursor: 'pointer',
    alignSelf: 'flex-end',
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,

    selectors: {
      '&:hover': {
        background: `linear-gradient(135deg, ${tokens.semantic.color.interactive.primary}12 0%, ${tokens.semantic.color.interactive.primary}08 100%)`,
        borderColor: `${tokens.semantic.color.interactive.primary}30`,
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.border.interactive}`,
        outlineOffset: '2px',
      },
    },

    '@media': {
      '(max-width: 480px)': {
        fontSize: '0.7rem',
        padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
      },
      '(prefers-reduced-motion: reduce)': {
        transform: 'none',
        transition: 'none',
      },
    },
  },
]);

export const chevronIconWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    height: '1rem',
    width: '1rem',
    transition: `transform ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    color: 'currentColor',

    selectors: {
      [`${showMoreButton}:hover &`]: {
        transform: 'rotate(180deg)',
      },
    },
  },
]);

// Timeline mode-specific adaptations
export const timelineModeVertical = style({
  '@media': {
    '(max-width: 600px)': {
      maxWidth: '100%',
    },
  },
});

export const timelineModeHorizontal = style({
  '@media': {
    '(max-width: 480px)': {
      minWidth: '250px',
    },
    '(max-width: 320px)': {
      minWidth: '200px',
    },
  },
});

export const timelineModeTree = style({
  '@media': {
    '(max-width: 600px)': {
      maxWidth: '300px',
    },
  },
});

// Media card optimizations
export const cardWithMedia = style({
  '@media': {
    '(max-width: 480px)': {
      flexDirection: 'column',
    },
  },
});

export const cardWithoutMedia = style({
  minHeight: '120px',
  '@media': {
    '(max-width: 480px)': {
      minHeight: '100px',
    },
  },
});
