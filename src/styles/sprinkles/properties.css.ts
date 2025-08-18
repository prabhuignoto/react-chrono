import { defineProperties } from '@vanilla-extract/sprinkles';
import { vars } from '../tokens.css';

// Responsive, logical spacing, layout, and sizing utilities
export const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'block', 'flex', 'grid', 'inline-flex', 'inline-block'],
    flexDirection: ['row', 'column'],
    alignItems: ['stretch', 'center', 'flex-start', 'flex-end'],
    justifyContent: [
      'flex-start',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ],
    gap: vars.space,
    // logical spacing
    padding: vars.space,
    paddingBlock: vars.space,
    paddingInline: vars.space,
    marginBlock: vars.space,
    marginInline: vars.space,
    // legacy individual spacing (kept for back-compat)
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    // sizing helpers
    width: ['auto', '100%'],
    minWidth: ['0', '100%'],
    borderRadius: vars.radius,
    color: vars.color,
    background: vars.color,
  },
  shorthands: {
    p: ['padding'],
    px: ['paddingInline'],
    py: ['paddingBlock'],
    mx: ['marginInline'],
    my: ['marginBlock'],
    placeCenter: ['alignItems', 'justifyContent'],
  },
});

// Optional container query utilities (progressive enhancement)
export const containersProperties = defineProperties({
  conditions: {
    containerSm: { '@container': '(min-width: 28rem)' },
    containerMd: { '@container': '(min-width: 40rem)' },
  },
  defaultCondition: false,
  properties: {
    fontSize: ['0.875rem', '1rem', '1.125rem'],
  },
});

// Color/border helpers to reduce repetition
export const colorAndBordersProperties = defineProperties({
  properties: {
    color: vars.color,
    background: vars.color,
    borderRadius: vars.radius,
  },
});
