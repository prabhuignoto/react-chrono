import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

export const timelineVerticalWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    flexDirection: 'column',
    width: '100%',
    padding: '0.25rem',
    outline: 0,
    position: 'relative',
    // Enable container queries for children without affecting layout
    containerType: 'inline-size',
  },
]);

export const animateVisible = keyframes({
  from: { opacity: 0, visibility: 'hidden' },
  to: { opacity: 1, visibility: 'visible' },
});

export const verticalItemWrapper = style([
  sprinkles({ display: 'flex', justifyContent: 'center', my: 'lg' }),
  {
    position: 'relative',
    visibility: 'hidden',
    width: '100%',
    alignItems: 'stretch',
    zIndex: vars.zIndex.verticalItem,
    listStyle: 'none',
  },
]);

globalStyle(`${verticalItemWrapper}.visible`, { visibility: 'visible' });
globalStyle(`${verticalItemWrapper}.no-alt.left`, { marginRight: 'auto' });
globalStyle(`${verticalItemWrapper}.no-alt.right`, { marginLeft: 'auto' });

export const verticalItemWrapperNested = style({ position: 'relative' });
globalStyle(`${verticalItemWrapperNested}:not(:last-child)::after`, {
  content: '',
  position: 'absolute',
  width: '2px',
  height: '2rem',
  background: vars.color.primary,
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '-2rem',
});

export const timelineCardContentWrapper = style({
  visibility: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const timelineCardContentVisible = style({
  visibility: 'visible',
  animationName: animateVisible,
  animationDuration: '0.25s',
  animationTimingFunction: 'ease-in',
});

export const timelineTitleWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { minWidth: 0, overflow: 'hidden' },
]);


