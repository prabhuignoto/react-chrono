import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

export const timelineVerticalWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '0.25rem',
  outline: 0,
  position: 'relative',
});

export const animateVisible = keyframes({
  from: { opacity: 0, visibility: 'hidden' },
  to: { opacity: 1, visibility: 'visible' },
});

export const verticalItemWrapper = style({
  display: 'flex',
  position: 'relative',
  visibility: 'hidden',
  width: '100%',
  alignItems: 'stretch',
  justifyContent: 'center',
  zIndex: vars.zIndex.verticalItem,
  margin: '1rem 0',
  listStyle: 'none',
});

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

export const timelineTitleWrapper = style({
  alignItems: 'center',
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
});


