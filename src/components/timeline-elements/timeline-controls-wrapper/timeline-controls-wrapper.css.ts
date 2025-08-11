import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';

export const controlsWrapper = style([
  sprinkles({}),
  { position: 'relative', zIndex: 20 },
]);


