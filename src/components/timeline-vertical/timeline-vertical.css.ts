import { keyframes, style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles/enhanced-sprinkles.css';
import { tokens } from '../../styles/tokens/index.css';

// Main timeline wrapper with proper styling
export const timelineVerticalWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    width: 'full',
  }),
  {
    padding: '0.25rem 0', // Vertical padding only
    outline: '0',
    position: 'relative',
    // Enable container queries for children without affecting layout
    containerType: 'inline-size',
    // Ensure cards are not clipped at edges
    overflowX: 'visible',
    width: '100%',
  },
]);

// Animation keyframe
export const animateVisible = keyframes({
  from: { opacity: 0, visibility: 'hidden' },
  to: { opacity: 1, visibility: 'visible' },
});

// Vertical item wrapper with recipe for variants
export const verticalItemWrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      width: 'full',
    }),
    {
      visibility: 'visible',
      alignItems: 'stretch',
      listStyle: 'none',
      marginBottom: '4rem', // Generous spacing between timeline items for better visual separation
      // minHeight: '8rem', // Increased minimum height for better visual presence and line display
      zIndex: 1,
    },
  ],
  variants: {
    visible: {
      true: {
        visibility: 'visible',
      },
      false: {},
    },
    alignment: {
      left: {},
      right: {},
      center: {},
    },
    alternating: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    visible: true,
    alignment: 'center',
    alternating: true,
  },
  compoundVariants: [
    // Non-alternating left alignment
    {
      variants: { alternating: false, alignment: 'left' },
      style: {
        marginRight: 'auto',
        marginLeft: '0',
      },
    },
    // Non-alternating right alignment
    {
      variants: { alternating: false, alignment: 'right' },
      style: {
        marginLeft: 'auto',
        marginRight: '0',
      },
    },
  ],
});

// Recipe handles variants - no additional globalStyles needed for basic variants

// Nested item wrapper with enhanced visibility
export const verticalItemWrapperNested = style({
  position: 'relative',
  marginBottom: '1rem', // Reduced margin for nested items
  visibility: 'visible',
  opacity: 1,
  transform: 'none', // Ensure no transforms hide the content
});

// Nested timeline connector lines
globalStyle(`${verticalItemWrapperNested}:not(:last-child)::after`, {
  content: '',
  position: 'absolute',
  width: '2px',
  height: '1rem', // Reduced connector height
  background: tokens.component.timeline.point.color.active,
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '-1rem',
});

// Nested timeline wrapper with better containment and spacing
export const nestedTimelineWrapper = style({
  marginTop: '0.5rem',
  marginBottom: '0.25rem',
  // paddingLeft: '1rem',
  borderLeft: `2px solid ${tokens.component.timeline.point.color.active}20`,
  position: 'relative',
});

// Add styling for nested timeline vertical wrapper to reduce excess spacing
globalStyle(`${nestedTimelineWrapper} ${timelineVerticalWrapper}`, {
  paddingTop: '0',
  paddingBottom: '0.5rem',
});

// Ensure nested timeline items are visible
globalStyle(`${nestedTimelineWrapper} li`, {
  visibility: 'visible',
});

// Reduce spacing for first nested item
globalStyle(
  `${nestedTimelineWrapper} ${timelineVerticalWrapper} > li:first-child`,
  {
    marginTop: '0.5rem',
  },
);

// Fix nested timeline point positioning
globalStyle(`${nestedTimelineWrapper} .timeline-vertical-circle`, {
  position: 'relative',
  zIndex: 3,
});

// Timeline card content wrapper
export const timelineCardContentWrapper = style({
  visibility: 'hidden',
  position: 'relative',
  display: 'flex',
  // alignItems: 'center',
  minHeight: '100%', // Ensure cards stretch to full container height
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
});

// Timeline card content visible state
export const timelineCardContentVisible = style({
  visibility: 'visible',
  animationName: animateVisible,
  animationDuration: '0.25s',
  animationTimingFunction: 'ease-in',
});

// Timeline title wrapper
export const timelineTitleWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
  }),
  {
    minWidth: 0,
    overflow: 'hidden',
    minHeight: '100%', // Ensure titles stretch to full container height
    // Remove padding that could affect vertical alignment
    // Vertical centering is handled by alignItems: center
  },
]);

export const timelineItemTitleWrapper = style({
  width: 'fit-content',
  maxWidth: '100%',
  padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
  borderRadius: tokens.semantic.borderRadius.lg,
  background: tokens.semantic.color.background.elevated,
  border: `1px solid ${tokens.semantic.color.border.default}`,
  boxShadow: tokens.semantic.shadow.card,
  marginBottom: tokens.semantic.spacing.md,
  alignSelf: 'flex-start',
});

// Remove focus ring from the list item itself
// The focus ring should only appear on the inner card content, not the wrapper
globalStyle(`li.vertical-item-row:focus`, {
  outline: 'none',
});

globalStyle(`li.vertical-item-row:focus-visible`, {
  outline: 'none',
  boxShadow: 'none',
});

// Additional static variants for common use cases
export const verticalItemWrapperVisible = verticalItemWrapper({
  visible: true,
});
export const verticalItemWrapperLeft = verticalItemWrapper({
  alignment: 'left',
  alternating: false,
});
export const verticalItemWrapperRight = verticalItemWrapper({
  alignment: 'right',
  alternating: false,
});
