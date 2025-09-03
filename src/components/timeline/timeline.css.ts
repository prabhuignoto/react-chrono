import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens/index.css';
import { lightTheme, darkTheme } from '../../styles/tokens/themes.css';
import { sprinkles } from '../../styles/system/sprinkles.css';
import { baseStyles } from '../../styles/system/static.css';

// Updated timeline wrapper using new unified system
export const wrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: 'full',
      height: 'full',
    }),
    baseStyles.containLayout,
    {
      overflow: 'visible',
      zIndex: tokens.semantic.zIndex.timelineCard,
      isolation: 'isolate',
      selectors: {
        '&:focus': { outline: 0 },
        '&.horizontal': { justifyContent: 'flex-start' },
      },
    },
  ],
  variants: {
    mode: {
      horizontal: sprinkles({ justifyContent: 'flex-start' }),
      vertical: sprinkles({ justifyContent: 'flex-start' }),
      alternating: sprinkles({ justifyContent: 'flex-start' }),
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
        color: tokens.semantic.color.text.primary,
        padding: tokens.semantic.spacing.xl,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxSizing: 'border-box',
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

// Focus management using globalStyle
globalStyle(`${wrapper.classNames.base}.js-focus-visible :focus:not(.focus-visible)`, {
  outline: 0,
});

globalStyle(`${wrapper.classNames.base}[data-toolbar-navigation="true"] :focus`, {
  outline: 0,
});

globalStyle(`${wrapper.classNames.base}:not([data-keyboard-navigation="true"]) :focus`, {
  outline: 0,
});

globalStyle(`${wrapper.classNames.base}[data-keyboard-navigation="true"] :focus-visible`, {
  outline: `2px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '2px',
  borderRadius: tokens.semantic.borderRadius.sm,
});

globalStyle(`${wrapper.classNames.base}[data-keyboard-navigation="true"] [data-testid="vertical-item-row"]:focus`, {
  outline: `2px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '2px',
  borderRadius: tokens.semantic.borderRadius.sm,
});

// Fullscreen styles with theme support
globalStyle(
  `${wrapper.classNames.base}:fullscreen, ${wrapper.classNames.base}:-webkit-full-screen, ${wrapper.classNames.base}:-moz-full-screen`,
  {
    backgroundColor: tokens.semantic.color.background.primary,
    color: tokens.semantic.color.text.primary,
  }
);

globalStyle(
  `${wrapper.classNames.base}:fullscreen::backdrop, ${wrapper.classNames.base}:-webkit-full-screen::backdrop`,
  {
    backgroundColor: tokens.semantic.color.background.primary,
  }
);

// Theme-specific fullscreen backgrounds
globalStyle(
  `${wrapper.classNames.base}.${darkTheme}:fullscreen, ${wrapper.classNames.base}.${darkTheme}:-webkit-full-screen`,
  {
    backgroundColor: tokens.primitive.color.gray[900],
    color: tokens.primitive.color.gray[100],
  }
);

globalStyle(
  `${wrapper.classNames.base}.${lightTheme}:fullscreen, ${wrapper.classNames.base}.${lightTheme}:-webkit-full-screen`,
  {
    backgroundColor: tokens.primitive.color.white,
    color: tokens.primitive.color.gray[900],
  }
);

// Timeline main wrapper - optimized with new system
export const timelineMainWrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      width: 'full',
      position: 'relative',
    }),
    baseStyles.smoothScroll,
    {
      flex: '1 1 auto',
      height: '0',
      overflowY: 'auto',
      overflowX: 'hidden',
      overscrollBehavior: 'contain',
      background: 'transparent',
      padding: `${tokens.semantic.spacing.sm} 0`,
      WebkitOverflowScrolling: 'touch',
    },
  ],
  variants: {
    mode: {
      vertical: {
        minHeight: '500px',
        flexDirection: 'column',
      },
      alternating: {
        minHeight: '500px',
        flexDirection: 'column',
      },
      horizontal: {
        minHeight: '150px',
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Timeline main content area
export const timelineMain = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
    }),
    baseStyles.willChange,
    {
      top: '50%',
      left: 0,
      transform: 'translate(0, -50%)',
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
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
    right: 0,
    left: 0,
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: tokens.semantic.zIndex.timelineCard,
    borderRadius: tokens.semantic.borderRadius.sm,
    height: tokens.component.timeline.line.width,
    backgroundColor: tokens.component.timeline.line.color,
    opacity: 0.3,
  },
]);

// Timeline content renderer - updated with new spacing system
export const timelineContentRender = recipe({
  base: [
    sprinkles({
      display: 'flex',
      width: 'full',
      position: 'relative',
    }),
    baseStyles.smoothScroll,
    {
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: 'auto',
      marginRight: 'auto',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollSnapType: 'x mandatory',
      scrollPadding: tokens.semantic.spacing.lg,
      WebkitOverflowScrolling: 'touch',
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
      alternating: {
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
      },
    },
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Export types for new system
export type TimelineWrapperVariants = Parameters<typeof wrapper>[0];
export type TimelineMainWrapperVariants = Parameters<typeof timelineMainWrapper>[0];
export type TimelineMainVariants = Parameters<typeof timelineMain>[0];
export type TimelineContentRenderVariants = Parameters<typeof timelineContentRender>[0];