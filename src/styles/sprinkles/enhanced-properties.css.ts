import { defineProperties } from '@vanilla-extract/sprinkles';
import { designTokens } from '../design-system.css';

// Define responsive conditions
const responsiveConditions = {
  mobile: {},
  tablet: { '@media': 'screen and (min-width: 768px)' },
  desktop: { '@media': 'screen and (min-width: 1024px)' },
};

// Enhanced property definitions for comprehensive coverage
export const responsiveProperties = defineProperties({
  conditions: responsiveConditions,
  defaultCondition: 'mobile',
  properties: {
    // Layout & Structure
    display: ['none', 'block', 'flex', 'inline-flex', 'grid', 'inline-grid'],
    position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    overflow: ['visible', 'hidden', 'scroll', 'auto'],
    overflowX: ['visible', 'hidden', 'scroll', 'auto'],
    overflowY: ['visible', 'hidden', 'scroll', 'auto'],

    // Flexbox & Grid
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    justifyContent: [
      'flex-start',
      'center',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly',
    ],
    alignItems: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    alignSelf: [
      'auto',
      'flex-start',
      'center',
      'flex-end',
      'stretch',
      'baseline',
    ],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
    gap: designTokens.spacing,
    columnGap: designTokens.spacing,
    rowGap: designTokens.spacing,

    // Grid
    gridTemplateColumns: {
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      auto: 'auto',
    },
    gridColumn: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      span1: 'span 1 / span 1',
      span2: 'span 2 / span 2',
      span3: 'span 3 / span 3',
      span4: 'span 4 / span 4',
    },

    // Spacing with responsive support
    padding: designTokens.spacing,
    paddingTop: designTokens.spacing,
    paddingBottom: designTokens.spacing,
    paddingLeft: designTokens.spacing,
    paddingRight: designTokens.spacing,
    paddingX: designTokens.spacing,
    paddingY: designTokens.spacing,
    margin: {
      ...designTokens.spacing,
      auto: 'auto',
      '-1': '-0.25rem',
    },
    marginTop: {
      ...designTokens.spacing,
      auto: 'auto',
    },
    marginBottom: {
      ...designTokens.spacing,
      auto: 'auto',
    },
    marginLeft: {
      ...designTokens.spacing,
      auto: 'auto',
    },
    marginRight: {
      ...designTokens.spacing,
      auto: 'auto',
    },
    marginX: {
      ...designTokens.spacing,
      auto: 'auto',
    },
    marginY: {
      ...designTokens.spacing,
      auto: 'auto',
    },

    // Dimensions
    width: {
      auto: 'auto',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '3/4': '75%',
      '1': '0.25rem',
    },
    height: {
      auto: 'auto',
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      '1': '0.25rem',
    },
    minWidth: {
      '0': '0',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      full: '100%',
    },
    maxWidth: {
      none: 'none',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      full: '100%',
      screen: '100vw',
    },
    minHeight: {
      0: '0',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      full: '100%',
      screen: '100vh',
    },
    maxHeight: {
      none: 'none',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      full: '100%',
      screen: '100vh',
    },

    // Visual
    borderRadius: designTokens.radius,
    borderTopLeftRadius: designTokens.radius,
    borderTopRightRadius: designTokens.radius,
    borderBottomLeftRadius: designTokens.radius,
    borderBottomRightRadius: designTokens.radius,
    boxShadow: designTokens.elevation,
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
    },

    // Typography
    fontSize: designTokens.typography.fontSize,
    fontWeight: designTokens.typography.fontWeight,
    lineHeight: designTokens.typography.lineHeight,
    textAlign: ['left', 'center', 'right', 'justify'],
    textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
    textDecoration: ['none', 'underline', 'line-through'],

    // Z-Index
    zIndex: designTokens.zIndex,

    // Cursor
    cursor: [
      'auto',
      'default',
      'pointer',
      'wait',
      'text',
      'move',
      'help',
      'not-allowed',
    ],

    // User interaction
    pointerEvents: ['auto', 'none'],
    userSelect: ['auto', 'none', 'text', 'all'],

    // Visibility
    visibility: ['visible', 'hidden'],

    // Transform
    transform: {
      none: 'none',
      translateY1: 'translateY(-1px)',
      translateY2: 'translateY(-2px)',
      scale95: 'scale(0.95)',
      scale98: 'scale(0.98)',
      scale102: 'scale(1.02)',
      scale105: 'scale(1.05)',
    },
  },
});

// Static properties that don't need responsive variants
export const staticProperties = defineProperties({
  properties: {
    // Border properties
    borderWidth: {
      '0': '0',
      '1': '1px',
      '2': '2px',
      '4': '4px',
    },
    borderStyle: ['solid', 'dashed', 'dotted', 'none'],

    // Background properties
    backgroundRepeat: ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'],
    backgroundSize: ['auto', 'cover', 'contain'],
    backgroundPosition: [
      'center',
      'top',
      'right',
      'bottom',
      'left',
      'top left',
      'top right',
      'bottom left',
      'bottom right',
    ],

    // List properties
    listStyleType: ['none', 'disc', 'decimal'],
    listStylePosition: ['inside', 'outside'],

    // Table properties
    borderCollapse: ['separate', 'collapse'],

    // Animation properties
    transitionProperty: [
      'none',
      'all',
      'colors',
      'opacity',
      'shadow',
      'transform',
    ],
    transitionDuration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionTimingFunction: [
      'linear',
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
    ],

    // Order for flexbox/grid
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
    },
  },
});
