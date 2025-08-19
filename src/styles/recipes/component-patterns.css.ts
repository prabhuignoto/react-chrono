import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { sprinkles } from '../sprinkles/enhanced-sprinkles.css';
import { semanticTokens } from '../tokens/semantic-tokens.css';

// Base container pattern for all components
export const baseContainer = recipe({
  base: [
    sprinkles({
      position: 'relative',
      display: 'flex',
    }),
  ],
  variants: {
    direction: {
      row: sprinkles({ flexDirection: 'row' }),
      column: sprinkles({ flexDirection: 'column' }),
      rowReverse: sprinkles({ flexDirection: 'row-reverse' }),
      columnReverse: sprinkles({ flexDirection: 'column-reverse' }),
    },
    alignment: {
      start: sprinkles({ alignItems: 'flex-start' }),
      center: sprinkles({ alignItems: 'center' }),
      end: sprinkles({ alignItems: 'flex-end' }),
      stretch: sprinkles({ alignItems: 'stretch' }),
      baseline: sprinkles({ alignItems: 'baseline' }),
    },
    distribution: {
      start: sprinkles({ justifyContent: 'flex-start' }),
      center: sprinkles({ justifyContent: 'center' }),
      end: sprinkles({ justifyContent: 'flex-end' }),
      between: sprinkles({ justifyContent: 'space-between' }),
      around: sprinkles({ justifyContent: 'space-around' }),
      evenly: sprinkles({ justifyContent: 'space-evenly' }),
    },
    spacing: {
      none: sprinkles({ gap: 'xs' }),  // Use xs instead of '0'
      xs: sprinkles({ gap: 'xs' }),
      sm: sprinkles({ gap: 'sm' }),
      md: sprinkles({ gap: 'md' }),
      lg: sprinkles({ gap: 'lg' }),
      xl: sprinkles({ gap: 'xl' }),
    },
    wrap: {
      true: sprinkles({ flexWrap: 'wrap' }),
      false: sprinkles({ flexWrap: 'nowrap' }),
    },
  },
  defaultVariants: {
    direction: 'row',
    alignment: 'stretch',
    distribution: 'start',
    spacing: 'md',
    wrap: false,
  },
});

// Interactive element base pattern
export const baseInteractive = recipe({
  base: [
    sprinkles({
      position: 'relative',
      display: 'inline-flex',
      cursor: 'pointer',
    }),
    {
      outline: 'none',
      transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeOut}`,
    },
  ],
  variants: {
    state: {
      default: {},
      hover: {
        opacity: semanticTokens.states.hover.opacity,
        transform: semanticTokens.states.hover.transform,
      },
      active: {
        opacity: semanticTokens.states.active.opacity,
        transform: semanticTokens.states.active.transform,
      },
      focus: {
        boxShadow: `0 0 0 ${semanticTokens.states.focus.ring.width} ${semanticTokens.states.focus.ring.color}`,
      },
      disabled: [
        sprinkles({
          cursor: 'not-allowed',
          pointerEvents: 'none',
        }),
        {
          opacity: semanticTokens.states.disabled.opacity,
          filter: semanticTokens.states.disabled.filter,
        },
      ],
    },
    focusRing: {
      true: {
        selectors: {
          '&:focus-visible': {
            outline: semanticTokens.states.focus.outline,
            outlineOffset: semanticTokens.states.focus.ring.offset,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    state: 'default',
    focusRing: true,
  },
});

// Card pattern
export const baseCard = recipe({
  base: [
    sprinkles({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }),
    {
      background: semanticTokens.card.background.gradient,
      border: `1px solid ${semanticTokens.card.border.color}`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      overflow: 'hidden',
      transition: `all ${semanticTokens.motion.duration.normal} ${semanticTokens.motion.easing.easeInOut}`,
    },
  ],
  variants: {
    size: {
      sm: [
        sprinkles({ padding: 'sm' }),
        {
          borderRadius: semanticTokens.card.border.radius.sm,
          minWidth: '200px',
        },
      ],
      md: [
        sprinkles({ padding: 'md' }),
        {
          borderRadius: semanticTokens.card.border.radius.md,
          minWidth: '280px',
        },
      ],
      lg: [
        sprinkles({ padding: 'lg' }),
        {
          borderRadius: semanticTokens.card.border.radius.lg,
          minWidth: '320px',
        },
      ],
    },
    elevation: {
      flat: { boxShadow: semanticTokens.card.shadow.flat },
      low: { boxShadow: semanticTokens.card.shadow.low },
      medium: { boxShadow: semanticTokens.card.shadow.medium },
      high: { boxShadow: semanticTokens.card.shadow.high },
    },
    interactive: {
      true: [
        baseInteractive(),
        {
          selectors: {
            '&:hover': {
              boxShadow: semanticTokens.card.shadow.interactive,
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0px)',
              transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeIn}`,
            },
          },
        },
      ],
      false: {},
    },
    bordered: {
      true: {
        '::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: semanticTokens.card.border.gradient,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none',
        },
      },
      false: {},
    },
    fullWidth: {
      true: sprinkles({ width: 'full' }),
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    elevation: 'medium',
    interactive: false,
    bordered: false,
    fullWidth: false,
  },
  compoundVariants: [
    {
      variants: { size: 'lg' },
      style: {
        '@media': {
          '(max-width: 768px)': { minWidth: '240px' },
          '(max-width: 480px)': { minWidth: '200px' },
        },
      },
    },
  ],
});

// Button pattern
export const baseButton = recipe({
  base: [
    baseInteractive(),
    sprinkles({
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'md',
      fontSize: 'sm',
      fontWeight: 'medium',
    }),
    {
      border: '1px solid transparent',
      textDecoration: 'none',
      userSelect: 'none',
    },
  ],
  variants: {
    variant: {
      primary: {
        background: `linear-gradient(135deg, ${semanticTokens.toolbar.button.background.default} 0%, ${semanticTokens.toolbar.button.background.default}f0 100%)`,
        color: semanticTokens.toolbar.button.text.default,
        selectors: {
          '&:hover': {
            background: semanticTokens.toolbar.button.background.hover,
            borderColor: semanticTokens.toolbar.button.border.hover,
          },
          '&:active': {
            background: semanticTokens.toolbar.button.background.active,
          },
        },
      },
      secondary: {
        background: 'transparent',
        color: semanticTokens.toolbar.button.text.default,
        borderColor: semanticTokens.toolbar.button.border.default,
        selectors: {
          '&:hover': {
            background: semanticTokens.toolbar.button.background.hover,
            borderColor: semanticTokens.toolbar.button.border.hover,
          },
        },
      },
      ghost: {
        background: 'transparent',
        color: semanticTokens.toolbar.button.text.default,
        selectors: {
          '&:hover': {
            background: semanticTokens.toolbar.button.background.hover,
          },
        },
      },
    },
    size: {
      sm: [
        sprinkles({ padding: 'xs', fontSize: 'xs' }),
        { minWidth: semanticTokens.toolbar.button.size.sm, height: semanticTokens.toolbar.button.size.sm },
      ],
      md: [
        sprinkles({ padding: 'sm', fontSize: 'sm' }),
        { minWidth: semanticTokens.toolbar.button.size.md, height: semanticTokens.toolbar.button.size.md },
      ],
      lg: [
        sprinkles({ padding: 'md', fontSize: 'base' }),
        { minWidth: semanticTokens.toolbar.button.size.lg, height: semanticTokens.toolbar.button.size.lg },
      ],
    },
    shape: {
      square: {},
      rounded: sprinkles({ borderRadius: 'md' }),
      pill: sprinkles({ borderRadius: 'full' }),
    },
    fullWidth: {
      true: sprinkles({ width: 'full' }),
      false: {},
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md',
    shape: 'rounded',
    fullWidth: false,
  },
});

// Text element pattern
export const baseText = recipe({
  base: {
    margin: 0,
    padding: 0,
  },
  variants: {
    variant: {
      heading1: sprinkles({ fontSize: 'xl', fontWeight: 'bold' }),
      heading2: sprinkles({ fontSize: 'lg', fontWeight: 'semibold' }),
      heading3: sprinkles({ fontSize: 'base', fontWeight: 'semibold' }),
      body: sprinkles({ fontSize: 'base', fontWeight: 'normal' }),
      caption: sprinkles({ fontSize: 'sm', fontWeight: 'normal' }),
      small: sprinkles({ fontSize: 'xs', fontWeight: 'normal' }),
    },
    color: {
      primary: { color: semanticTokens.timeline.point.background.active },
      secondary: { color: semanticTokens.toolbar.button.text.default },
      muted: { color: semanticTokens.toolbar.button.text.disabled },
      inherit: { color: 'inherit' },
    },
    align: {
      left: sprinkles({ textAlign: 'left' }),
      center: sprinkles({ textAlign: 'center' }),
      right: sprinkles({ textAlign: 'right' }),
      justify: sprinkles({ textAlign: 'justify' }),
    },
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'inherit',
    align: 'left',
    truncate: false,
  },
});

// Input/form element pattern
export const baseInput = recipe({
  base: [
    sprinkles({
      display: 'block',
      width: 'full',
      padding: 'sm',
      borderRadius: 'md',
      fontSize: 'base',
    }),
    {
      border: `1px solid ${semanticTokens.card.border.color}`,
      outline: 'none',
      transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeOut}`,
      selectors: {
        '&:focus': {
          borderColor: semanticTokens.states.focus.ring.color,
          boxShadow: `0 0 0 ${semanticTokens.states.focus.ring.width} ${semanticTokens.states.focus.ring.color}`,
        },
        '&:disabled': {
          opacity: semanticTokens.states.disabled.opacity,
          cursor: 'not-allowed',
        },
      },
    },
  ],
  variants: {
    size: {
      sm: [sprinkles({ padding: 'xs', fontSize: 'sm' })],
      md: [sprinkles({ padding: 'sm', fontSize: 'base' })],
      lg: [sprinkles({ padding: 'md', fontSize: 'lg' })],
    },
    variant: {
      default: {
        background: semanticTokens.card.background.default,
      },
      filled: {
        background: semanticTokens.toolbar.background.default,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// Layout container pattern
export const layoutContainer = recipe({
  base: [
    sprinkles({
      width: 'full',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
  ],
  variants: {
    size: {
      sm: { maxWidth: semanticTokens.layout.container.maxWidth.sm },
      md: { maxWidth: semanticTokens.layout.container.maxWidth.md },
      lg: { maxWidth: semanticTokens.layout.container.maxWidth.lg },
      xl: { maxWidth: semanticTokens.layout.container.maxWidth.xl },
      full: { maxWidth: 'none' },
    },
    padding: {
      none: sprinkles({ padding: 'xs' }),  // Use xs instead of '0'
      sm: [
        sprinkles({ paddingX: { mobile: 'sm', tablet: 'md', desktop: 'lg' } }),
      ],
      md: [
        sprinkles({ paddingX: { mobile: 'md', tablet: 'lg', desktop: 'xl' } }),
      ],
      lg: [
        sprinkles({ paddingX: { mobile: 'lg', tablet: 'xl', desktop: '2xl' } }),
      ],
    },
  },
  defaultVariants: {
    size: 'full',
    padding: 'md',
  },
});

// Utility patterns for common layouts
export const utilityPatterns = {
  // Visually hidden but accessible
  visuallyHidden: style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  }),
  
  // Reset button styles
  resetButton: style({
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    font: 'inherit',
    cursor: 'pointer',
  }),
  
  // Reset list styles
  resetList: style({
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  }),
  
  // Smooth scroll
  smoothScroll: style({
    scrollBehavior: 'smooth',
  }),
  
  // Focus trap helper
  focusTrap: style({
    selectors: {
      '&:focus': {
        outline: 'none',
      },
    },
  }),
};

// Export all patterns
export const componentPatterns = {
  container: baseContainer,
  interactive: baseInteractive,
  card: baseCard,
  button: baseButton,
  text: baseText,
  input: baseInput,
  layout: layoutContainer,
  utils: utilityPatterns,
};