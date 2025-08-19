import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import { vars } from '../../../styles/tokens.css';

export const wrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    border: 'none',
    borderRadius: '16px',
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    gap: '0.5rem',
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    isolation: 'isolate',
  },
]);

globalStyle(`${wrapper}.vertical`, {
  justifyContent: 'flex-start',
});

globalStyle(`${wrapper}:hover`, {
  transform: 'translateY(-2px) scale(1.01)',
  willChange: 'transform',
});

globalStyle(`${wrapper}:active`, {
  transform: 'translateY(0px) scale(1)',
});

// Reduced motion preferences using separate globalStyle calls
globalStyle(`${wrapper}:hover`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      willChange: 'auto',
    },
  },
});

globalStyle(`${wrapper}:active`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
    },
  },
});

export const timelineTitleContainer = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    background: `linear-gradient(135deg, ${vars.color.cardBg} 0%, ${vars.color.cardBg}f8 100%)`,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${vars.color.buttonBorder}`,
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
  },
]);

globalStyle(`${timelineTitleContainer}.vertical`, {
  marginBottom: '1.5rem',
  alignSelf: 'stretch',
});

globalStyle(`${timelineTitleContainer}.horizontal`, {
  position: 'relative',
  whiteSpace: 'nowrap',
  zIndex: 3,
  marginBottom: '0.5rem',
});

globalStyle(`${timelineTitleContainer}.horizontal_all`, {
  position: 'relative',
  whiteSpace: 'nowrap',
  zIndex: 3,
  marginBottom: '0.5rem',
});
