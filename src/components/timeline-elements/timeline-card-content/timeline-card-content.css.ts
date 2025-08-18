import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import {
  reveal,
  slideFromRight,
  slideInFromLeft,
  slideInFromTop,
} from './card-animations.css';

export const baseCard = style({
  background: `linear-gradient(135deg, ${vars.color.cardBg} 0%, ${vars.color.cardBg}f5 100%)`,
  borderRadius: '16px',
  border: `1px solid ${vars.color.buttonBorder}`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(20px)',
  transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
  position: 'relative',
  overflow: 'hidden',
  minWidth: '280px',
  maxWidth: '100%',
  
  '@media': {
    '(max-width: 768px)': {
      borderRadius: '12px',
      minWidth: '240px',
    },
    '(max-width: 480px)': {
      borderRadius: '10px',
      minWidth: '200px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.08)',
    },
    '(max-width: 320px)': {
      minWidth: '180px',
      borderRadius: '8px',
    },
  },
  
  // Add subtle border gradient effect
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: `linear-gradient(135deg, ${vars.color.primary}20 0%, transparent 50%, ${vars.color.primary}10 100%)`,
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'xor',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    pointerEvents: 'none',
  },
});

export const itemContentWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    selectors: {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        willChange: 'transform, box-shadow',
      },
      '&:focus:not(:focus-visible):not(.focus-visible)': {
        outline: 'none',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      '&:focus-visible, &.focus-visible': {
        outline: `2px solid ${vars.color.primary}`,
        outlineOffset: '2px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      '&:active': {
        transform: 'translateY(0px)',
        transition: `transform ${vars.transition.duration.fast} ${vars.transition.easing.standard}`,
      },
    },
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    lineHeight: 1.6,
    margin: 0,
    position: 'relative',
    padding: '1rem',
    overflow: 'hidden',
    width: '100%',
    gap: '0.5rem',
    
    '@media': {
      '(max-width: 768px)': {
        padding: '0.875rem',
        gap: '0.375rem',
      },
      '(max-width: 480px)': {
        padding: '0.75rem',
        gap: '0.25rem',
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
  },
]);

export const timelineCardHeader = style({
  width: '100%',
  padding: 0,
  marginBottom: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  
  '@media': {
    '(max-width: 768px)': {
      marginBottom: '0.375rem',
    },
  },
});

export const cardTitleBase = style({
  margin: 0,
  width: '100%',
  textAlign: 'left',
  fontWeight: 600,
  letterSpacing: '-0.025em',
  lineHeight: 1.4,
  wordBreak: 'break-word',
  transition: `color ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
});

export const cardTitle = style([
  cardTitleBase,
  {
    color: vars.color.cardTitle,
    fontSize: '1.5rem',
    marginBottom: '0.25rem',
    
    '@media': {
      '(max-width: 768px)': {
        fontSize: '1.375rem',
      },
      '(max-width: 480px)': {
        fontSize: '1.25rem',
      },
    },
  },
]);

export const cardTitleActive = style({ color: vars.color.primary });

// Optional recipe to compose title state without changing existing exports
export const cardTitleRecipe = recipe({
  base: [
    cardTitleBase,
    {
      color: vars.color.cardTitle,
      fontSize: '1.25rem',
      marginBottom: '0.75rem',
    },
  ],
  variants: {
    active: {
      true: { color: vars.color.primary },
      false: {},
    },
  },
  defaultVariants: { active: false },
});

export const cardSubTitle = style([
  cardTitleBase,
  {
    color: vars.color.cardSubtitle,
    fontWeight: 500,
    letterSpacing: '-0.01em',
    lineHeight: 1.5,
    opacity: 0.85,
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    
    '@media': {
      '(max-width: 768px)': {
        fontSize: '0.8rem',
      },
      '(max-width: 480px)': {
        fontSize: '0.75rem',
      },
    },
  },
]);

export const timelineContentDetails = style({
  fontSize: '0.8rem',
  fontWeight: 400,
  margin: 0,
  width: '100%',
  color: vars.color.cardDetails,
  lineHeight: 1.5,
  letterSpacing: '0.01em',
  wordBreak: 'break-word',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    '(max-width: 480px)': {
      fontSize: '0.7rem',
    },
  },
  
  selectors: { 
    '& + &': { marginTop: '0.5rem' },
  },
});

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

export const timelineSubContent = style({
  marginBottom: '0.5rem',
  display: 'block',
  fontSize: '0.75rem',
  color: vars.color.cardDetails,
  lineHeight: 1.5,
  opacity: 0.8,
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.7rem',
    },
  },
});

export const contentDetailsWrapper = style([
  sprinkles({ display: 'flex', width: '100%' }),
  {
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 0,
    position: 'relative',
    overflowX: 'hidden',
    transition: `max-height ${vars.transition.duration.slow} ${vars.transition.easing.standard}, opacity ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    padding: 0,
    background: 'transparent',
    gap: '0.25rem',
  },
]);

export const showMoreButton = style([
  sprinkles({ display: 'flex' }),
  {
    background: `linear-gradient(135deg, ${vars.color.primary}08 0%, ${vars.color.primary}04 100%)`,
    border: `1px solid ${vars.color.primary}20`,
    borderRadius: '6px',
    padding: '0.375rem 0.5rem',
    margin: '0.5rem 0 0 auto',
    color: vars.color.primary,
    fontSize: '0.75rem',
    fontWeight: 500,
    cursor: 'pointer',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    gap: '0.125rem',
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    
    selectors: {
      '&:hover': {
        background: `linear-gradient(135deg, ${vars.color.primary}12 0%, ${vars.color.primary}08 100%)`,
        borderColor: `${vars.color.primary}30`,
        transform: 'translateY(-1px)',
        willChange: 'transform, background-color, border-color',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
      '&:focus': {
        outline: `2px solid ${vars.color.primary}40`,
        outlineOffset: '2px',
      },
      '&:focus:not(:focus-visible)': {
        outline: 'none',
      },
    },
    
    '@media': {
      '(max-width: 480px)': {
        fontSize: '0.7rem',
        padding: '0.3rem 0.4rem',
      },
      '(prefers-reduced-motion: reduce)': {
        transform: 'none',
        transition: 'none',
        willChange: 'auto',
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
    transition: `transform ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
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
