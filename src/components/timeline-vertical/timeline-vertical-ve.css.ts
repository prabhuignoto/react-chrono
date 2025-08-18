import { style, globalStyle, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

// Fade-in animation for timeline items
const animateVisible = keyframes({
  from: {
    opacity: 0,
    visibility: 'hidden',
  },
  to: {
    opacity: 1,
    visibility: 'visible',
  },
});

// Timeline vertical wrapper
export const timelineVerticalWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  {
    padding: '0.25rem',
    outline: '0',
    position: 'relative',
  },
]);

// Continuous timeline line - positioned behind all items
globalStyle(`${timelineVerticalWrapper}::before`, {
  content: '',
  position: 'absolute',
  left: '50%',
  top: '0',
  bottom: '0',
  width: '2px',
  background: 'linear-gradient(to bottom, transparent 0%, var(--timeline-primary-color, #3b82f6) 5%, var(--timeline-primary-color, #3b82f6) 95%, transparent 100%)',
  transform: 'translateX(-50%)',
  zIndex: '1',
  pointerEvents: 'none',
});

// Ensure the timeline line doesn't show for cardless mode
globalStyle(`${timelineVerticalWrapper}[data-cardless="true"]::before`, {
  display: 'none',
});

// Base vertical item wrapper
const baseVerticalItemWrapper = style([
  sprinkles({
    display: 'flex',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
  }),
  {
    position: 'relative',
    visibility: 'hidden',
    zIndex: 100 - 1,
    margin: '1rem 0',
    listStyle: 'none',
  },
]);

// Vertical item wrapper recipe
export const verticalItemWrapper = recipe({
  base: baseVerticalItemWrapper,
  variants: {
    alternateCards: {
      true: {},
      false: {
        // Applied via globalStyle below for left/right alignment
      },
    },
    cardHeight: {
      auto: {},
      custom: {}, // Will be overridden by inline styles
    },
    cardLess: {
      true: {},
      false: {},
    },
    isNested: {
      true: {
        position: 'relative',
      },
      false: {},
    },
    visible: {
      true: {
        visibility: 'visible',
      },
      false: {},
    },
  },
  defaultVariants: {
    alternateCards: true,
    cardHeight: 'auto',
    cardLess: false,
    isNested: false,
    visible: false,
  },
});

// Non-alternating card alignment
globalStyle(`${verticalItemWrapper}.left`, {
  marginRight: 'auto',
});

globalStyle(`${verticalItemWrapper}.right`, {
  marginLeft: 'auto',
});

// Nested timeline connector lines
globalStyle(`${verticalItemWrapper}:not(:last-child)::after`, {
  content: '',
  position: 'absolute',
  width: '2px',
  height: '2rem',
  background: `#3b82f6`,
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '-2rem',
});

// Base timeline card content wrapper
const baseCardContentWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
  }),
  {
    visibility: 'hidden',
    position: 'relative',
  },
]);

// Timeline card content wrapper recipe
export const timelineCardContentWrapper = recipe({
  base: baseCardContentWrapper,
  variants: {
    alternateCards: {
      true: {},
      false: {},
    },
    cardLess: {
      true: {},
      false: {},
    },
    flip: {
      true: {},
      false: {},
    },
    isMobile: {
      true: {},
      false: {},
    },
    noTitle: {
      true: {},
      false: {},
    },
    visible: {
      true: {
        visibility: 'visible',
        animation: `${animateVisible} 0.25s ease-in`,
      },
      false: {},
    },
    width: {
      // Width variants for different scenarios
      mobile75: { width: '75%' },
      mobile85: { width: '85%' },
      desktop37_5: { width: '37.5%' },
      desktop85: { width: '85%' },
      full95: { width: '95%' },
    },
    alignment: {
      // Order and justification variants
      leftStandard: {
        order: '1',
        justifyContent: 'flex-end',
      },
      rightStandard: {
        order: '3',
        justifyContent: 'flex-start',
      },
      leftFlipped: {
        order: '3',
        justifyContent: 'flex-end',
      },
      rightFlipped: {
        order: '1',
        justifyContent: 'flex-end',
      },
    },
  },
  defaultVariants: {
    alternateCards: true,
    cardLess: false,
    flip: false,
    isMobile: false,
    noTitle: false,
    visible: false,
    width: 'desktop85',
    alignment: 'rightStandard',
  },
  compoundVariants: [
    // Width calculations based on props
    {
      variants: { alternateCards: true, isMobile: true },
      style: { width: '75%' },
    },
    {
      variants: { alternateCards: true, isMobile: false },
      style: { width: '37.5%' },
    },
    {
      variants: { noTitle: true },
      style: { width: '95%' },
    },
    {
      variants: { alternateCards: false, isMobile: true },
      style: { width: '75%' },
    },
    {
      variants: { alternateCards: false, isMobile: false },
      style: { width: '85%' },
    },
  ],
});

// Base timeline title wrapper
const baseTitleWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
  }),
  {
    minWidth: '0',
    overflow: 'hidden',
  },
]);

// Timeline title wrapper recipe
export const timelineTitleWrapper = recipe({
  base: baseTitleWrapper,
  variants: {
    alternateCards: {
      true: {},
      false: {},
    },
    flip: {
      true: {},
      false: {},
    },
    hide: {
      true: {},
      false: {},
    },
    mode: {
      vertical: {},
      vertical_alternating: {},
      horizontal: {},
      horizontal_all: {},
      tree: {},
    },
    width: {
      alternating: { width: '37.5%' },
      standard: { width: '10%' },
    },
    alignment: {
      // Justification and order variants
      leftStandard: {
        justifyContent: 'flex-start',
        order: '3',
      },
      leftFlipped: {
        justifyContent: 'flex-end',
        order: '1',
      },
      rightStandard: {
        justifyContent: 'flex-end',
        order: '1',
      },
      rightFlipped: {
        justifyContent: 'flex-start',
        order: '3',
      },
    },
    display: {
      show: { display: 'flex' },
      hide: { display: 'none' },
    },
  },
  defaultVariants: {
    alternateCards: true,
    flip: false,
    hide: false,
    mode: 'vertical_alternating',
    width: 'alternating',
    alignment: 'rightStandard',
    display: 'show',
  },
  compoundVariants: [
    // Width based on alternating cards
    {
      variants: { alternateCards: true },
      style: { width: '37.5%' },
    },
    {
      variants: { alternateCards: false },
      style: { width: '10%' },
    },
    // Hide title in vertical mode when hide prop is true
    {
      variants: { hide: true, mode: 'vertical' },
      style: { display: 'none' },
    },
  ],
});

// Additional class-based styles for left/right positioning
globalStyle(`${timelineCardContentWrapper}.left`, {
  order: '1',
  justifyContent: 'flex-end',
});

globalStyle(`${timelineCardContentWrapper}.right`, {
  order: '3',
  justifyContent: 'flex-start',
});

// Flipped layout styles
globalStyle(`${timelineCardContentWrapper}.left.flipped`, {
  order: '3',
  justifyContent: 'flex-end',
});

globalStyle(`${timelineCardContentWrapper}.right.flipped`, {
  order: '1',
  justifyContent: 'flex-end',
});

// Title wrapper left/right styles
globalStyle(`${timelineTitleWrapper}.left`, {
  justifyContent: 'flex-start',
  order: '3',
});

globalStyle(`${timelineTitleWrapper}.right`, {
  justifyContent: 'flex-end',
  order: '1',
});

// Title wrapper flipped styles
globalStyle(`${timelineTitleWrapper}.left.flipped`, {
  justifyContent: 'flex-end',
  order: '1',
});

globalStyle(`${timelineTitleWrapper}.right.flipped`, {
  justifyContent: 'flex-start',
  order: '3',
});

// Vertical alternating mode specific adjustments - improved date positioning
globalStyle(`${timelineTitleWrapper}.left[data-mode="VERTICAL_ALTERNATING"]`, {
  order: '3',
  justifyContent: 'flex-start',
  textAlign: 'left',
  paddingLeft: '1rem',
});

globalStyle(`${timelineTitleWrapper}.right[data-mode="VERTICAL_ALTERNATING"]`, {
  order: '1',
  justifyContent: 'flex-end',
  textAlign: 'right',
  paddingRight: '1rem',
});

globalStyle(`${timelineTitleWrapper}.left[data-mode="VERTICAL_ALTERNATING"].flipped`, {
  order: '1',
  justifyContent: 'flex-end',
  textAlign: 'right',
  paddingRight: '1rem',
  paddingLeft: '0',
});

globalStyle(`${timelineTitleWrapper}.right[data-mode="VERTICAL_ALTERNATING"].flipped`, {
  order: '3',
  justifyContent: 'flex-start',
  textAlign: 'left',
  paddingLeft: '1rem',
  paddingRight: '0',
});

// Ensure proper date alignment in vertical mode
globalStyle(`${timelineTitleWrapper}[data-mode="VERTICAL"]`, {
  width: '10%',
  minWidth: '80px',
  textAlign: 'center',
});