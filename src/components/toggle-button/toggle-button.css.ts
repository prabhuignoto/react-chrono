import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';
import { vars } from '../../styles/tokens.css';

export const buttonWrapper = style([
  sprinkles({
    display: 'inline-flex',
    placeCenter: 'center',
    py: 'xs',
    px: 'sm',
  }),
  {
    cursor: 'pointer',
    borderRadius: '9999px',
    border: `1px solid ${vars.color.muted}`,
    userSelect: 'none',
  },
]);

export const toggleSwitch = style([
  sprinkles({ display: 'inline-flex', placeCenter: 'center' }),
  { color: vars.color.text },
]);
