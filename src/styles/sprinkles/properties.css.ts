import { defineProperties } from '@vanilla-extract/sprinkles';
import { tokens } from '../tokens/index.css';

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
    gap: tokens.semantic.spacing,
    // logical spacing
    padding: tokens.semantic.spacing,
    paddingBlock: tokens.semantic.spacing,
    paddingInline: tokens.semantic.spacing,
    marginBlock: tokens.semantic.spacing,
    marginInline: tokens.semantic.spacing,
    // legacy individual spacing (kept for back-compat)
    paddingTop: tokens.semantic.spacing,
    paddingBottom: tokens.semantic.spacing,
    paddingLeft: tokens.semantic.spacing,
    paddingRight: tokens.semantic.spacing,
    marginTop: tokens.semantic.spacing,
    marginBottom: tokens.semantic.spacing,
    // sizing helpers
    width: ['auto', '100%'],
    minWidth: ['0', '100%'],
    borderRadius: tokens.semantic.borderRadius,
    // Note: color and background removed - use style() directly for complex color tokens
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

// Note: Color and border properties removed from sprinkles
// Vanilla Extract sprinkles doesn't support deeply nested token structures
// Use style() directly with tokens.semantic.color.* for color properties
