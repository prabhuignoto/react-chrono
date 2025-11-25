import { createSprinkles } from '@vanilla-extract/sprinkles';
import {
  responsiveProperties,
  containersProperties,
} from './properties.css';

export const sprinkles = createSprinkles(
  responsiveProperties,
  containersProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
