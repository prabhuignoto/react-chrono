// New optimized timeline styles using the unified design system
import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/system/sprinkles.css';
import { tokens } from '../../styles/tokens/index.css';
import { animationStyles, stateStyles } from '../../styles/system/static.css';

// Main timeline wrapper - optimized for performance
export const wrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: 'full',
      height: 'full',
    }),
    {
      overflow: 'visible',
      zIndex: tokens.semantic.zIndex.timelineCard,
      // Performance optimizations
      contain: 'layout',
      willChange: 'transform',
    },
  ],
  variants: {
    mode: {
      horizontal: sprinkles({
        justifyContent: 'flex-start',
      }),
      vertical: sprinkles({
        justifyContent: 'flex-start',
      }),
      alternating: sprinkles({
        justifyContent: 'flex-start',
      }),
      horizontalAll: sprinkles({
        justifyContent: 'flex-start',
      }),
    },
    fullscreen: {
      true: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: tokens.semantic.color.background.primary,
        padding: tokens.semantic.spacing.xl,
        overflow: 'auto',
      },
      false: {},
    },
    keyboardNavigation: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    mode: 'vertical',
    fullscreen: false,
    keyboardNavigation: false,
  },
});

// Main timeline content container
export const mainWrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      width: 'full',
      position: 'relative',
    }),
    {
      flex: '1 1 auto',
      overflowY: 'auto',
      overflowX: 'hidden',
      overscrollBehavior: 'contain',
      background: 'transparent',
      padding: `${tokens.semantic.spacing.sm} 0`,
      // Scroll performance
      WebkitOverflowScrolling: 'touch',
      scrollBehavior: 'smooth',
    },
  ],
  variants: {
    mode: {
      vertical: {
        minHeight: '500px',
        flexDirection: 'column',
        height: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
      },
      horizontal: {
        minHeight: '150px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      horizontalAll: {
        minHeight: '200px',
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      alternating: {
        minHeight: '500px',
        flexDirection: 'column',
        height: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    },
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Timeline content renderer - handles different modes
export const contentRenderer = recipe({
  base: [
    sprinkles({
      display: 'flex',
      width: 'full',
      position: 'relative',
    }),
    {
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: 'auto',
      marginRight: 'auto',
      overflowX: 'auto',
      overflowY: 'hidden',
      // Scroll snap for better UX
      scrollSnapType: 'x mandatory',
      scrollPadding: tokens.semantic.spacing.lg,
    },
  ],
  variants: {
    mode: {
      vertical: {
        minHeight: '200px',
        padding: `${tokens.semantic.spacing.md} 0`,
        flexDirection: 'column',
        scrollSnapType: 'y mandatory',
      },
      horizontal: {
        minHeight: `calc(${tokens.component.timeline.card.width.horizontal} + 120px)`,
        padding: `${tokens.semantic.spacing.xl} ${tokens.semantic.spacing.md}`,
        paddingTop: tokens.semantic.spacing.lg,
        paddingBottom: `calc(${tokens.semantic.spacing.xl} + ${tokens.semantic.spacing.lg})`,
        scrollSnapType: 'x mandatory',
        overflow: 'visible', // Ensure timeline line is not clipped
      },
      alternating: {
        minHeight: '200px',
        padding: `${tokens.semantic.spacing.md} 0`,
        flexDirection: 'column',
        scrollSnapType: 'y mandatory',
      },
      horizontalAll: {
        minHeight: `calc(${tokens.component.timeline.card.width.horizontal} + 120px)`,
        padding: `${tokens.semantic.spacing.xl} ${tokens.semantic.spacing.md}`,
        paddingTop: tokens.semantic.spacing.lg,
        paddingBottom: `calc(${tokens.semantic.spacing.xl} + ${tokens.semantic.spacing.lg})`,
        scrollSnapType: 'x mandatory',
        overflowX: 'auto',
        overflowY: 'visible', // Ensure timeline line is not clipped vertically
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
    },
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Timeline main content - the draggable/scrollable area
export const main = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
    }),
    {
      top: '50%',
      left: 0,
      transform: 'translate(0, -50%)',
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
      // Performance optimization
      willChange: 'transform',
    },
  ],
  variants: {
    mode: {
      vertical: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        position: 'static',
        transform: 'none',
      },
      horizontal: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      alternating: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        position: 'static',
        transform: 'none',
      },
      horizontalAll: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        position: 'static',
        transform: 'none',
      },
    },
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Timeline outline/background line
export const outline = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    right: '0',
    left: '0',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: tokens.semantic.zIndex.timelineCard - 1, // Behind timeline points
    borderRadius: tokens.semantic.borderRadius.sm,
    height: tokens.component.timeline.line.width,
    backgroundColor: tokens.component.timeline.line.color,
    opacity: 0.4,
    
    // Ensure the line extends fully across horizontal timelines
    selectors: {
      '[data-mode="HORIZONTAL"] &': {
        // For horizontal mode, align with timeline points
        top: '80px', // Adjust based on typical point position
        transform: 'translateY(-50%)',
        margin: '0 -20px', // Extend beyond container padding
        width: 'calc(100% + 40px)',
        left: '-20px',
        right: 'auto',
      },
      '[data-mode="HORIZONTAL_ALL"] &': {
        // For horizontal-all mode
        top: '80px',
        transform: 'translateY(-50%)',
        margin: '0 -20px',
        width: 'calc(100% + 40px)',
        left: '-20px',
        right: 'auto',
      },
    },
  },
]);

// Focus management styles using globalStyle for complex selectors
globalStyle(`${wrapper.classNames.base}:focus`, {
  outline: 0,
});

globalStyle(
  `${wrapper.classNames.base}:not([data-keyboard-navigation="true"]) :focus`,
  {
    outline: 0,
  },
);

globalStyle(
  `${wrapper.classNames.base}[data-keyboard-navigation="true"] :focus-visible`,
  {
    outline: `2px solid ${tokens.semantic.color.border.interactive}`,
    outlineOffset: '2px',
    borderRadius: tokens.semantic.borderRadius.sm,
  },
);

// Fullscreen mode styles
globalStyle(
  `${wrapper.classNames.base}:fullscreen, ${wrapper.classNames.base}:-webkit-full-screen, ${wrapper.classNames.base}:-moz-full-screen`,
  {
    backgroundColor: tokens.semantic.color.background.primary,
    color: tokens.semantic.color.text.primary,
    padding: tokens.semantic.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999999,
    boxSizing: 'border-box',
  },
);

globalStyle(
  `${wrapper.classNames.base}:fullscreen::backdrop, ${wrapper.classNames.base}:-webkit-full-screen::backdrop`,
  {
    backgroundColor: tokens.semantic.color.background.primary,
  },
);

// Animation classes for timeline items
export const timelineAnimations = {
  cardEnter: animationStyles.timelineCardEnter,
  cardExit: animationStyles.timelineCardExit,
  pointPulse: animationStyles.timelinePointPulse,
  slideInLeft: animationStyles.slideInLeft,
  slideInRight: animationStyles.slideInRight,
  slideInUp: animationStyles.slideInUp,
  fadeIn: animationStyles.fadeIn,
};

// State classes for different timeline states
export const timelineStates = {
  loading: style([
    stateStyles.loading,
    {
      position: 'relative',
      '::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `${tokens.semantic.color.background.overlay}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: tokens.semantic.zIndex.popover,
      },
    },
  ]),

  error: style({
    border: `2px solid ${tokens.semantic.color.status.error}`,
    borderRadius: tokens.semantic.borderRadius.md,
    padding: tokens.semantic.spacing.lg,
    backgroundColor: `${tokens.semantic.color.status.error}10`,
    color: tokens.semantic.color.status.error,
  }),

  empty: style([
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'xl',
    }),
    {
      minHeight: '200px',
      color: tokens.semantic.color.text.muted,
      backgroundColor: tokens.semantic.color.background.secondary,
      borderRadius: tokens.semantic.borderRadius.lg,
      border: `1px dashed ${tokens.semantic.color.border.muted}`,
    },
  ]),
};

// Toolbar container styles for positioning
export const toolbarContainer = recipe({
  base: [
    sprinkles({
      display: 'flex',
      width: 'full',
      position: 'relative',
    }),
    {
      flexShrink: 0,
      zIndex: tokens.semantic.zIndex.controls,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    },
  ],
  variants: {
    position: {
      top: {
        order: -1, // Ensure toolbar appears before main content
        borderBottom: `1px solid ${tokens.semantic.color.border.muted}`,
        marginBottom: tokens.semantic.spacing.xs,
      },
      bottom: {
        order: 1, // Ensure toolbar appears after main content
        borderTop: `1px solid ${tokens.semantic.color.border.muted}`,
        marginTop: tokens.semantic.spacing.xs,
      },
    },
    sticky: {
      true: {
        position: 'sticky',
        backgroundColor: `${tokens.semantic.color.background.primary}f5`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: `0 2px 8px -2px ${tokens.semantic.color.background.overlay}`,
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { position: 'top', sticky: true },
      style: {
        top: 0,
        borderBottom: `1px solid ${tokens.semantic.color.border.default}`,
        boxShadow: `0 2px 12px -4px ${tokens.semantic.color.background.overlay}`,
      },
    },
    {
      variants: { position: 'bottom', sticky: true },
      style: {
        bottom: 0,
        borderTop: `1px solid ${tokens.semantic.color.border.default}`,
        boxShadow: `0 -2px 12px -4px ${tokens.semantic.color.background.overlay}`,
      },
    },
  ],
  defaultVariants: {
    position: 'top',
    sticky: false,
  },
});

// Export recipe variants for type safety
export type TimelineWrapperVariants = Parameters<typeof wrapper>[0];
export type TimelineMainWrapperVariants = Parameters<typeof mainWrapper>[0];
export type TimelineContentRendererVariants = Parameters<
  typeof contentRenderer
>[0];
export type TimelineMainVariants = Parameters<typeof main>[0];
export type ToolbarContainerVariants = Parameters<typeof toolbarContainer>[0];
