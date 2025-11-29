import { globalStyle, style, createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { baseStyles } from '../../../styles/system/static.css';

export const gradientVar = createVar();

export const mediaWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    alignItems: 'flex-start',
    alignSelf: 'center',
    background: tokens.semantic.color.background.elevated,
    borderRadius: tokens.semantic.borderRadius.sm,
    flexDirection: 'row',
    padding: tokens.semantic.spacing.sm,
    position: 'relative',
    textAlign: 'left',
    width: 'calc(100% - 1em)',
    overflow: 'hidden',
    zIndex: tokens.semantic.zIndex.timelineCard,
    boxShadow: tokens.semantic.shadow.card,
    border: `1px solid ${tokens.semantic.color.border.default}`,
  },
]);

export const justifyStart = style({ justifyContent: 'flex-start' });
export const justifyEnd = style({ justifyContent: 'flex-end' });

export const imageWrapper = style([
  baseStyles.containLayout,
  {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: tokens.semantic.borderRadius.md,
    position: 'relative',
  },
]);

globalStyle(`${imageWrapper} img`, {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

export const cardImage = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    justifySelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    width: '100%',
    objectPosition: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
]);

export const imageVisible = style({ visibility: 'visible' });
export const imageHidden = style({ visibility: 'hidden' });
export const imageRounded = style({ borderRadius: '6px' });

// Optional recipe to drive image visibility and rounding variants
export const cardImageRecipe = recipe({
  base: [cardImage],
  variants: {
    visible: { true: [imageVisible], false: [imageHidden] },
    rounded: { true: [imageRounded], false: {} },
  },
  defaultVariants: { visible: true, rounded: false },
});

export const cardVideo = style({
  maxWidth: '100%',
  maxHeight: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const mediaDetailsWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    bottom: 0,
    left: 0,
    right: 0,
    marginRight: 'auto',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
]);

export const mediaDetailsAbsolute = style({
  position: 'absolute',
  left: '0.5rem',
  right: '0.5rem',
  bottom: '0.5rem',
  padding: '1rem',
  transition: 'all 0.3s ease-in-out',
  background: tokens.semantic.color.background.elevated, // Solid background for maximum readability
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${tokens.semantic.color.border.default}60`,
  zIndex: 13,
  maxHeight: '50%',
  overflow: 'hidden',
});

export const mediaDetailsCard = style({
  borderRadius: '10px',
  boxShadow: tokens.semantic.shadow.cardHover,
});

export const mediaDetailsMinimized = style({
  maxHeight: '4rem',
  cursor: 'pointer',
  overflow: 'hidden',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    background: `${tokens.semantic.color.background.elevated}f2`,
  },
});

export const mediaDetailsMaximized = style({
  maxHeight: '50%',
  overflowY: 'hidden', // Hide overflow when collapsed to show "Read More"
});

export const mediaDetailsExpanded = style({
  maxHeight: '100%', // Take full card height when expanded
  overflowY: 'auto',
});

export const readMoreButton = style({
  background: `linear-gradient(to bottom, transparent, ${tokens.semantic.color.background.elevated} 40%)`,
  border: 'none',
  color: tokens.semantic.color.interactive.primary,
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 600,
  padding: '1rem 0 0.5rem 0',
  textDecoration: 'none',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 20,
  textAlign: 'center',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const mediaDetailsGradient = style({});
globalStyle(`${mediaDetailsGradient}::after`, {
  content: '',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '3rem',
  background: `linear-gradient(0deg, ${gradientVar} 0%, rgba(255,255,255,0) 100%)`,
  pointerEvents: 'none',
});

export const errorMessage = style({
  color: tokens.semantic.color.text.muted,
  left: '50%',
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
});

// Text overlay toggle button
export const textOverlayButton = style({
  background: tokens.semantic.color.interactive.primary,
  border: 'none',
  color: tokens.semantic.color.text.inverse,
  cursor: 'pointer',
  padding: tokens.semantic.spacing.xs,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  boxShadow: tokens.semantic.shadow.card,
  marginLeft: '0.5rem',

  selectors: {
    '&:hover': {
      background: tokens.semantic.color.interactive.primaryHover,
      transform: 'scale(1.1)',
      boxShadow: tokens.semantic.shadow.cardHover,
    },
    '&:active': {
      transform: 'scale(0.95)',
      background: tokens.semantic.color.interactive.primaryActive,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.semantic.color.interactive.primary}`,
      outlineOffset: '2px',
    },
  },
});

export const iframeVideo = style({
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const detailsTextWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }),
  {
    alignSelf: 'center',
    transition: 'height 0.5s ease',
    width: '100%',
    color: tokens.semantic.color.text.secondary,
    padding: '0.5rem',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    position: 'relative',
    background: tokens.semantic.color.background.elevated,
  },
]);

export const cardMediaHeader = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),
  {
    padding: '0.5rem 0 0.5rem 0.5rem',
    height: '100%',
  },
]);

export const buttonWrapper = style([
  sprinkles({ display: 'flex', flexDirection: 'row' }),
  {
    justifyContent: 'flex-end',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginLeft: 'auto',
  },
]);
