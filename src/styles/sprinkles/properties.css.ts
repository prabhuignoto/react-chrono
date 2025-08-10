import { defineProperties } from '@vanilla-extract/sprinkles';
import { vars } from '../tokens.css';

export const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'block', 'flex', 'grid', 'inline-flex', 'inline-block'],
    alignItems: ['stretch', 'center', 'flex-start', 'flex-end'],
    justifyContent: ['flex-start', 'center', 'space-between', 'space-around'],
    gap: vars.space,
    padding: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    borderRadius: vars.radius,
    color: vars.color,
    background: vars.color,
  },
  shorthands: {
    p: ['padding'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
  },
});


