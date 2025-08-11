import { createSprinkles } from '@vanilla-extract/sprinkles';
import { responsiveProperties, containersProperties, colorAndBordersProperties } from './properties.css';

export const sprinkles = createSprinkles(
  responsiveProperties,
  containersProperties,
  colorAndBordersProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];


