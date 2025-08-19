import { recipe } from '@vanilla-extract/recipes';
import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/enhanced-sprinkles.css';
import { componentPatterns } from '../../styles/recipes/component-patterns.css';
import { semanticTokens } from '../../styles/tokens/semantic-tokens.css';

// Timeline wrapper - replaces multiple wrapper globalStyles
export const timelineWrapper = recipe({
  base: [
    componentPatterns.container({
      direction: 'column',
      spacing: 'none',
    }),
    sprinkles({
      width: 'full',
      position: 'relative',
    }),
    {
      outline: 'none',
      containerType: 'inline-size',
    },
  ],
  variants: {
    mode: {
      horizontal: [
        componentPatterns.container({ direction: 'row' }),
        sprinkles({ overflowX: 'auto' }),
      ],
      vertical: [
        componentPatterns.container({ direction: 'column' }),
      ],
      alternating: [
        componentPatterns.container({ direction: 'column' }),
      ],
    },
    focusManagement: {
      enabled: {
        selectors: {
          '&:focus': {
            outline: `2px solid ${semanticTokens.states.focus.ring.color}`,
            outlineOffset: '2px',
          },
        },
      },
      disabled: {
        selectors: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
      // Accessibility polyfill patterns (legitimate globalStyle replacement)
      jsPolyfill: {
        selectors: {
          '&.js-focus-visible :focus:not(.focus-visible)': {
            outline: 'none',
          },
          '&.js-focus-visible .focus-visible': {
            outline: `2px solid ${semanticTokens.states.focus.ring.color}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    cardless: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    mode: 'vertical',
    focusManagement: 'enabled',
    cardless: false,
  },
  compoundVariants: [
    {
      variants: { mode: 'horizontal' },
      style: {
        '@media': {
          '(max-width: 768px)': {
            flexDirection: 'column',
          },
        },
      },
    },
  ],
});

// Timeline line - replaces pseudo-element globalStyles with component-based approach
export const timelineLine = recipe({
  base: [
    sprinkles({
      position: 'absolute',
      pointerEvents: 'none',
    }),
    {
      backgroundColor: semanticTokens.timeline.line.color,
      width: semanticTokens.timeline.line.width,
      opacity: semanticTokens.timeline.line.opacity,
    },
  ],
  variants: {
    orientation: {
      vertical: {
        left: '50%',
        top: 'var(--line-start, 0)',
        bottom: 'var(--line-end, 0)',
        transform: 'translateX(-50%)',
        background: `linear-gradient(to bottom, ${semanticTokens.timeline.line.gradient.start} 0%, ${semanticTokens.timeline.line.gradient.middle} 5%, ${semanticTokens.timeline.line.gradient.middle} 95%, ${semanticTokens.timeline.line.gradient.end} 100%)`,
      },
      horizontal: {
        top: '50%',
        left: 'var(--line-start, 0)',
        right: 'var(--line-end, 0)',
        height: semanticTokens.timeline.line.width,
        width: 'auto',
        transform: 'translateY(-50%)',
        background: `linear-gradient(to right, ${semanticTokens.timeline.line.gradient.start} 0%, ${semanticTokens.timeline.line.gradient.middle} 5%, ${semanticTokens.timeline.line.gradient.middle} 95%, ${semanticTokens.timeline.line.gradient.end} 100%)`,
      },
    },
    variant: {
      continuous: {},
      segmented: {
        background: `repeating-linear-gradient(
          var(--line-direction, to bottom),
          ${semanticTokens.timeline.line.color} 0,
          ${semanticTokens.timeline.line.color} 10px,
          transparent 10px,
          transparent 20px
        )`,
      },
    },
    hidden: {
      true: sprinkles({ display: 'none' }),
      false: {},
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    variant: 'continuous',
    hidden: false,
  },
});

// Timeline item container - replaces item-related globalStyles
export const timelineItem = recipe({
  base: [
    componentPatterns.container({
      direction: 'row',
      alignment: 'stretch',
      spacing: 'md',
    }),
    sprinkles({
      position: 'relative',
      width: 'full',
      listStyleType: 'none',
    }),
    {
      marginBottom: semanticTokens.timeline.item.spacing.vertical,
    },
  ],
  variants: {
    side: {
      left: { order: 1 },
      right: { order: 3 },
      center: {
        order: 1,
        justifyContent: 'center',
      },
    },
    layout: {
      alternating: {},
      nonAlternating: [
        componentPatterns.container({ distribution: 'center' }),
      ],
    },
    visible: {
      true: [
        sprinkles({ opacity: 100 }),
        {
          visibility: 'visible',
          animationName: 'fadeIn',
          animationDuration: semanticTokens.motion.duration.normal,
          animationTimingFunction: semanticTokens.motion.easing.easeIn,
        },
      ],
      false: [
        sprinkles({ opacity: 0, visibility: 'hidden' }),
      ],
    },
    active: {
      true: {
        zIndex: semanticTokens.timeline.point.size.lg,
      },
      false: {},
    },
    nested: {
      true: {
        marginBottom: semanticTokens.card.content.spacing.normal,
      },
      false: {},
    },
  },
  defaultVariants: {
    side: 'left',
    layout: 'alternating',
    visible: false,
    active: false,
    nested: false,
  },
  compoundVariants: [
    // Layout combinations that replace complex globalStyles
    {
      variants: { side: 'left', layout: 'nonAlternating' },
      style: [
        sprinkles({ justifyContent: 'flex-end' }),
        { marginRight: 'auto' },
      ],
    },
    {
      variants: { side: 'right', layout: 'nonAlternating' },
      style: [
        sprinkles({ justifyContent: 'flex-start' }),
        { marginLeft: 'auto' },
      ],
    },
    {
      variants: { side: 'left', layout: 'alternating' },
      style: { order: 1 },
    },
    {
      variants: { side: 'right', layout: 'alternating' },
      style: { order: 3 },
    },
  ],
});

// Timeline content wrapper - consolidates content-related styles
export const timelineContent = recipe({
  base: [
    componentPatterns.container({
      direction: 'row',
      alignment: 'center',
    }),
    sprinkles({
      position: 'relative',
      visibility: 'hidden',
    }),
  ],
  variants: {
    side: {
      left: {
        order: 1,
        justifyContent: 'flex-end',
      },
      right: {
        order: 3,
        justifyContent: 'flex-start',
      },
    },
    layout: {
      alternating: {},
      nonAlternating: {},
    },
    width: {
      narrow: [
        sprinkles({ width: { mobile: '3/4', tablet: 'full', desktop: 'full' } }),
        { maxWidth: semanticTokens.timeline.item.width.alternating },
      ],
      standard: [
        sprinkles({ width: { mobile: '3/4', tablet: 'full', desktop: 'full' } }),
        { maxWidth: semanticTokens.timeline.item.width.nonAlternating },
      ],
      full: [
        sprinkles({ width: 'full' }),
        { maxWidth: '95%' },
      ],
    },
    visible: {
      true: [
        sprinkles({ visibility: 'visible' }),
        {
          animationName: 'slideIn',
          animationDuration: semanticTokens.motion.duration.normal,
          animationTimingFunction: semanticTokens.motion.easing.easeOut,
        },
      ],
      false: {},
    },
    flip: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    side: 'right',
    layout: 'alternating',
    width: 'narrow',
    visible: false,
    flip: false,
  },
  compoundVariants: [
    // Flipped layout combinations
    {
      variants: { side: 'left', flip: true },
      style: {
        order: 3,
        justifyContent: 'flex-end',
      },
    },
    {
      variants: { side: 'right', flip: true },
      style: {
        order: 1,
        justifyContent: 'flex-end',
      },
    },
    // Width adjustments for different layouts
    {
      variants: { layout: 'alternating' },
      style: { maxWidth: semanticTokens.timeline.item.width.alternating },
    },
    {
      variants: { layout: 'nonAlternating' },
      style: { maxWidth: semanticTokens.timeline.item.width.nonAlternating },
    },
    // Mobile responsive adjustments
    {
      variants: { layout: 'alternating' },
      style: {
        '@media': {
          '(max-width: 768px)': { 
            width: '75%',
            maxWidth: '75%',
          },
        },
      },
    },
  ],
});

// Timeline title wrapper - consolidates title-related styles
export const timelineTitle = recipe({
  base: [
    componentPatterns.container({
      direction: 'row',
      alignment: 'center',
    }),
    sprinkles({
      minWidth: '0',
      overflow: 'hidden',
    }),
  ],
  variants: {
    side: {
      left: [
        sprinkles({ justifyContent: 'flex-start', textAlign: 'left' }),
        { order: 3 },
      ],
      right: [
        sprinkles({ justifyContent: 'flex-end', textAlign: 'right' }),
        { order: 1 },
      ],
    },
    layout: {
      alternating: {},
      nonAlternating: {},
    },
    width: {
      narrow: { 
        width: semanticTokens.timeline.item.width.alternating,
        minWidth: '80px',
      },
      standard: { 
        width: semanticTokens.timeline.item.width.title,
        minWidth: '80px',
      },
    },
    visible: {
      true: sprinkles({ display: 'flex' }),
      false: sprinkles({ display: 'none' }),
    },
    mode: {
      vertical: [
        sprinkles({ textAlign: 'center' }),
        { width: semanticTokens.timeline.item.width.title },
      ],
      alternating: {},
      horizontal: {},
    },
    flip: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    side: 'right',
    layout: 'alternating',
    width: 'narrow',
    visible: true,
    mode: 'alternating',
    flip: false,
  },
  compoundVariants: [
    // Flipped layouts
    {
      variants: { side: 'left', flip: true },
      style: {
        order: 1,
        justifyContent: 'flex-end',
        textAlign: 'right',
        paddingRight: semanticTokens.card.padding.md,
        paddingLeft: '0',
      },
    },
    {
      variants: { side: 'right', flip: true },
      style: {
        order: 3,
        justifyContent: 'flex-start',
        textAlign: 'left',
        paddingLeft: semanticTokens.card.padding.md,
        paddingRight: '0',
      },
    },
    // Layout-specific adjustments
    {
      variants: { layout: 'alternating' },
      style: { width: semanticTokens.timeline.item.width.alternating },
    },
    {
      variants: { layout: 'nonAlternating' },
      style: { width: semanticTokens.timeline.item.width.title },
    },
    // Mode-specific adjustments for vertical alternating
    {
      variants: { side: 'left', mode: 'alternating' },
      style: {
        order: 3,
        justifyContent: 'flex-start',
        textAlign: 'left',
        paddingLeft: semanticTokens.card.padding.md,
      },
    },
    {
      variants: { side: 'right', mode: 'alternating' },
      style: {
        order: 1,
        justifyContent: 'flex-end',
        textAlign: 'right',
        paddingRight: semanticTokens.card.padding.md,
      },
    },
  ],
});

// Nested timeline connector - replaces pseudo-element globalStyles
export const nestedConnector = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    content: '""',
    width: '2px',
    height: semanticTokens.card.content.spacing.normal,
    backgroundColor: semanticTokens.timeline.line.color,
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: `-${semanticTokens.card.content.spacing.normal}`,
  },
]);

// Animation keyframes (replaces globalStyle animations)
const fadeInKeyframes = keyframes({
  from: { opacity: 0, visibility: 'hidden' },
  to: { opacity: 1, visibility: 'visible' },
});

const slideInKeyframes = keyframes({
  from: { 
    opacity: 0, 
    transform: 'translateY(20px)',
  },
  to: { 
    opacity: 1, 
    transform: 'translateY(0)',
  },
});

const slideInFromLeftKeyframes = keyframes({
  from: { 
    opacity: 0, 
    transform: 'translateX(-24px)',
  },
  to: { 
    opacity: 1, 
    transform: 'translateX(0)',
  },
});

const slideInFromRightKeyframes = keyframes({
  from: { 
    opacity: 0, 
    transform: 'translateX(24px)',
  },
  to: { 
    opacity: 1, 
    transform: 'translateX(0)',
  },
});

export const timelineAnimations = {
  fadeIn: fadeInKeyframes,
  slideIn: slideInKeyframes,
  slideInFromLeft: slideInFromLeftKeyframes,
  slideInFromRight: slideInFromRightKeyframes,
};

// Export the complete timeline system
export const timelineSystem = {
  wrapper: timelineWrapper,
  line: timelineLine,
  item: timelineItem,
  content: timelineContent,
  title: timelineTitle,
  nestedConnector,
  animations: timelineAnimations,
};

// Utility functions for dynamic styling
export const timelineUtils = {
  // Calculate item width based on props
  getItemWidth: (alternateCards: boolean, isMobile: boolean, hasTitle: boolean) => {
    if (alternateCards) {
      return isMobile ? '75%' : semanticTokens.timeline.item.width.alternating;
    }
    if (!hasTitle) {
      return '95%';
    }
    return isMobile ? '75%' : semanticTokens.timeline.item.width.nonAlternating;
  },
  
  // Calculate order for flexbox layout
  getOrder: (side: 'left' | 'right', alternateCards: boolean, flipped: boolean) => {
    if (alternateCards) {
      return side === 'left' ? 1 : 3;
    }
    const flip = !alternateCards && flipped;
    return side === 'left' 
      ? (flip ? 3 : 1) 
      : (flip ? 1 : 3);
  },
  
  // Calculate justify content
  getJustifyContent: (side: 'left' | 'right', alternateCards: boolean, flipped: boolean) => {
    const flip = !alternateCards && flipped;
    if (flip) return 'flex-end';
    return side === 'left' ? 'flex-end' : 'flex-start';
  },
};