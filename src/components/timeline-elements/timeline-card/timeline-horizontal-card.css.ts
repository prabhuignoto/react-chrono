import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import { vars } from '../../../styles/tokens.css';

export const wrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  {
    border: '1px solid transparent',
    boxShadow: vars.shadow.elevationMd,
    transition: `transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
]);

globalStyle(`${wrapper}.vertical`, {
  justifyContent: 'flex-start',
});

globalStyle(`${wrapper}:hover`, {
  transform: 'translateY(-4px)',
  boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
});

export const timelineTitleContainer = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
]);

globalStyle(`${timelineTitleContainer}.vertical`, { marginBottom: '1em' });

globalStyle(`${timelineTitleContainer}.horizontal`, {
  position: 'absolute',
  top: '-2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  zIndex: 3,
});

globalStyle(`${timelineTitleContainer}.horizontal_all`, {
  position: 'absolute',
  top: '-2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  zIndex: 3,
});


