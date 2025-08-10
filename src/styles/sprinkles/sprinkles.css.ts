import { createSprinkles } from '@vanilla-extract/sprinkles';
import { responsiveProperties } from './properties.css';

export const sprinkles = createSprinkles(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];


