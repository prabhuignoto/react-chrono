import { globalStyle, style, createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { baseStyles } from '../../../styles/system/static.css';

export const gradientVar = createVar();

export const mediaWrapper = style([
  patterns.card({ size: 'md', elevation: 'low' }),
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
  padding: '0.75rem',
  transition: 'all 0.3s ease-in-out',
  background: `${tokens.semantic.color.background.elevated}ee`,
  backdropFilter: 'blur(8px)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  zIndex: 13,
  maxHeight: '70%',
  overflow: 'hidden',
});

export const mediaDetailsCard = style({
  borderRadius: '10px',
  boxShadow: tokens.semantic.shadow.cardHover,
});

export const mediaDetailsMinimized = style({
  maxHeight: '3.5rem',
  cursor: 'pointer',
  overflow: 'hidden',
  ':hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
  },
});

export const mediaDetailsMaximized = style({
  maxHeight: '80%',
  overflowY: 'auto',
});

export const mediaDetailsGradient = style({});
globalStyle(`${mediaDetailsGradient}::after`, {
  content: '',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '2rem',
  background: `linear-gradient(0deg, ${gradientVar} 0%, rgba(255,255,255,0) 100%)`,
});

export const errorMessage = style({
  color: '#a3a3a3',
  left: '50%',
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
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
    justifyContent: 'center',
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
    justifyContent: 'center',
  }),
  { padding: '0.5rem 0 0.5rem 0.5rem' },
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
