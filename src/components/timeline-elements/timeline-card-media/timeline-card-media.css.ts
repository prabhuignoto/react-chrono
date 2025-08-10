import { globalStyle, style, createVar } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const gradientVar = createVar();

export const mediaWrapper = style({
  alignItems: 'flex-start',
  alignSelf: 'center',
  background: vars.color.cardBg,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5em',
  position: 'relative',
  textAlign: 'left',
  width: 'calc(100% - 1em)',
  overflow: 'hidden',
  zIndex: 12,
});

export const justifyStart = style({ justifyContent: 'flex-start' });
export const justifyEnd = style({ justifyContent: 'flex-end' });

export const imageWrapper = style({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '6px',
  position: 'relative',
});

globalStyle(`${imageWrapper} img`, {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

export const cardImage = style({
  justifySelf: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '100%',
  width: '100%',
  objectPosition: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

export const imageVisible = style({ visibility: 'visible' });
export const imageHidden = style({ visibility: 'hidden' });
export const imageRounded = style({ borderRadius: '6px' });

export const cardVideo = style({
  maxWidth: '100%',
  maxHeight: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const mediaDetailsWrapper = style({
  bottom: 0,
  left: 0,
  right: 0,
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden',
});

export const mediaDetailsAbsolute = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '0.25rem',
  transition: 'height 0.25s ease-out, width 0.25s ease-out, bottom 0.25s ease-out, background 0.25s ease-out',
  background: vars.color.cardBg,
  zIndex: 13,
});

export const mediaDetailsCard = style({
  borderRadius: '10px',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
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

export const iframeVideo = style({ position: 'relative', height: '100%', width: '100%' });

export const detailsTextWrapper = style({
  alignSelf: 'center',
  display: 'flex',
  transition: 'height 0.5s ease',
  width: '100%',
  color: vars.color.cardDetails,
  padding: '0.5rem',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  position: 'relative',
  alignItems: 'flex-start',
  justifyContent: 'center',
  background: vars.color.cardBg,
});

export const cardMediaHeader = style({
  padding: '0.5rem 0 0.5rem 0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const buttonWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  marginLeft: 'auto',
});


