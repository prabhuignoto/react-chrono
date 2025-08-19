import { recipe } from '@vanilla-extract/recipes';
import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/enhanced-sprinkles.css';
import { componentPatterns } from '../../styles/recipes/component-patterns.css';
import { semanticTokens } from '../../styles/tokens/semantic-tokens.css';

// Toolbar container - replaces toolbar wrapper globalStyles
export const toolbarContainer = recipe({
  base: [
    componentPatterns.container({
      direction: 'row',
      alignment: 'center',
      distribution: 'between',
      spacing: 'sm',
    }),
    sprinkles({
      position: 'sticky',
      width: 'full',
      borderRadius: 'lg',
    }),
    {
      top: '10px',
      zIndex: semanticTokens.layout.container.maxWidth.sm,
      backdropFilter: semanticTokens.toolbar.background.blur,
      WebkitBackdropFilter: semanticTokens.toolbar.background.blur,
      background: semanticTokens.toolbar.background.default,
      border: `1px solid ${semanticTokens.toolbar.border.color}`,
      boxShadow: semanticTokens.toolbar.shadow,
    },
  ],
  variants: {
    size: {
      sm: [
        sprinkles({ padding: 'xs' }),
        { height: semanticTokens.toolbar.height.sm },
      ],
      md: [
        sprinkles({ padding: 'sm' }),
        { height: semanticTokens.toolbar.height.md },
      ],
      lg: [
        sprinkles({ padding: 'md' }),
        { height: semanticTokens.toolbar.height.lg },
      ],
    },
    position: {
      top: { top: '10px' },
      bottom: { bottom: '10px' },
      center: {
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
    alignment: {
      left: [
        componentPatterns.container({ distribution: 'start' }),
      ],
      center: [
        componentPatterns.container({ distribution: 'center' }),
      ],
      right: [
        componentPatterns.container({ distribution: 'end' }),
      ],
      between: [
        componentPatterns.container({ distribution: 'between' }),
      ],
    },
    variant: {
      default: {},
      minimal: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      },
      glass: {
        background: `${semanticTokens.toolbar.background.default}cc`,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      },
    },
    hidden: {
      true: [
        sprinkles({ 
          visibility: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }),
        { 
          transform: 'translateY(-100%)',
          transition: `all ${semanticTokens.motion.duration.normal} ${semanticTokens.motion.easing.easeIn}`,
        },
      ],
      false: [
        sprinkles({ visibility: 'visible', opacity: 100 }),
        { 
          transform: 'translateY(0)',
          transition: `all ${semanticTokens.motion.duration.normal} ${semanticTokens.motion.easing.easeOut}`,
        },
      ],
    },
  },
  defaultVariants: {
    size: 'md',
    position: 'top',
    alignment: 'between',
    variant: 'default',
    hidden: false,
  },
  compoundVariants: [
    {
      variants: { position: 'bottom' },
      style: {
        transform: 'none',
        top: 'auto',
      },
    },
    {
      variants: { position: 'center' },
      style: {
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
    // Responsive adjustments
    {
      variants: { size: 'lg' },
      style: {
        '@media': {
          '(max-width: 768px)': { 
            height: semanticTokens.toolbar.height.md,
            padding: semanticTokens.toolbar.padding.sm,
          },
        },
      },
    },
  ],
});

// Toolbar button - enhanced version replacing multiple button styles
export const toolbarButton = recipe({
  base: [
    componentPatterns.button({
      variant: 'ghost',
      size: 'md',
      shape: 'rounded',
    }),
    sprinkles({
      position: 'relative',
    }),
    {
      transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeOut}`,
      
      // Enhanced micro-animations
      selectors: {
        '&:hover': {
          background: semanticTokens.toolbar.button.background.hover,
          borderColor: semanticTokens.toolbar.button.border.hover,
          transform: 'translateY(-1px) scale(1.02)',
          boxShadow: `0 2px 8px ${semanticTokens.toolbar.button.background.hover}40`,
        },
        '&:active': {
          background: semanticTokens.toolbar.button.background.active,
          transform: 'translateY(0px) scale(0.98)',
          transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeIn}`,
        },
        '&:focus-visible': {
          outline: semanticTokens.states.focus.outline,
          outlineOffset: semanticTokens.states.focus.ring.offset,
        },
        '&[aria-pressed="true"]': {
          background: semanticTokens.toolbar.button.background.active,
          color: semanticTokens.toolbar.button.text.active,
          borderColor: semanticTokens.toolbar.button.border.active,
        },
      },
    },
  ],
  variants: {
    variant: {
      ghost: {
        background: 'transparent',
        border: '1px solid transparent',
      },
      filled: {
        background: semanticTokens.toolbar.button.background.default,
        border: `1px solid ${semanticTokens.toolbar.button.border.default}`,
      },
      outline: {
        background: 'transparent',
        border: `1px solid ${semanticTokens.toolbar.button.border.default}`,
      },
    },
    size: {
      sm: [
        sprinkles({ padding: 'xs' }),
        {
          minWidth: semanticTokens.toolbar.button.size.sm,
          height: semanticTokens.toolbar.button.size.sm,
          fontSize: '0.75rem',
        },
      ],
      md: [
        sprinkles({ padding: 'sm' }),
        {
          minWidth: semanticTokens.toolbar.button.size.md,
          height: semanticTokens.toolbar.button.size.md,
          fontSize: '0.875rem',
        },
      ],
      lg: [
        sprinkles({ padding: 'md' }),
        {
          minWidth: semanticTokens.toolbar.button.size.lg,
          height: semanticTokens.toolbar.button.size.lg,
          fontSize: '1rem',
        },
      ],
    },
    state: {
      default: {},
      active: {
        background: semanticTokens.toolbar.button.background.active,
        color: semanticTokens.toolbar.button.text.active,
        borderColor: semanticTokens.toolbar.button.border.active,
      },
      disabled: [
        sprinkles({
          cursor: 'not-allowed',
          pointerEvents: 'none',
        }),
        {
          background: semanticTokens.toolbar.button.background.disabled,
          color: semanticTokens.toolbar.button.text.disabled,
          opacity: semanticTokens.states.disabled.opacity,
        },
      ],
    },
    shape: {
      square: { borderRadius: '0' },
      rounded: { borderRadius: semanticTokens.toolbar.button.border.radius },
      circular: { borderRadius: '50%' },
    },
    loading: {
      true: [
        sprinkles({ cursor: 'wait' }),
        {
          '::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            border: `2px solid transparent`,
            borderTopColor: 'currentColor',
            animation: 'spin 1s linear infinite',
          },
        },
      ],
      false: {},
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md',
    state: 'default',
    shape: 'rounded',
    loading: false,
  },
});

// Toolbar section - for grouping related buttons
export const toolbarSection = recipe({
  base: [
    componentPatterns.container({
      direction: 'row',
      alignment: 'center',
      spacing: 'xs',
    }),
  ],
  variants: {
    variant: {
      default: {},
      separated: {
        '::after': {
          content: '""',
          width: '1px',
          height: '50%',
          background: semanticTokens.toolbar.border.color,
          marginLeft: semanticTokens.toolbar.button.spacing,
        },
      },
    },
    spacing: {
      none: [componentPatterns.container({ spacing: 'none' })],
      xs: [componentPatterns.container({ spacing: 'xs' })],
      sm: [componentPatterns.container({ spacing: 'sm' })],
      md: [componentPatterns.container({ spacing: 'md' })],
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'xs',
  },
});

// Toolbar dropdown container
export const toolbarDropdown = recipe({
  base: [
    componentPatterns.card({
      size: 'sm',
      elevation: 'high',
      bordered: false,
    }),
    sprinkles({
      position: 'absolute',
      minWidth: '0',
      width: 'max',
    }),
    {
      top: 'calc(100% + 8px)',
      right: 0,
      zIndex: semanticTokens.layout.container.maxWidth.lg,
      background: semanticTokens.card.background.default,
      border: `1px solid ${semanticTokens.card.border.color}`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      animation: `slideInDown ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeOut}`,
    },
  ],
  variants: {
    position: {
      left: { left: 0, right: 'auto' },
      right: { right: 0, left: 'auto' },
      center: {
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
      },
    },
    size: {
      sm: { minWidth: '160px' },
      md: { minWidth: '200px' },
      lg: { minWidth: '240px' },
    },
    hidden: {
      true: [
        sprinkles({ 
          visibility: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }),
        {
          transform: 'translateY(-8px) scale(0.95)',
          transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeIn}`,
        },
      ],
      false: [
        sprinkles({ visibility: 'visible', opacity: 100 }),
        {
          transform: 'translateY(0) scale(1)',
          transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeOut}`,
        },
      ],
    },
  },
  defaultVariants: {
    position: 'right',
    size: 'sm',
    hidden: true,
  },
});

// Toolbar badge/indicator
export const toolbarBadge = style([
  sprinkles({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'xs',
    fontWeight: 'bold',
    borderRadius: 'full',
  }),
  {
    top: '-2px',
    right: '-2px',
    minWidth: '16px',
    height: '16px',
    padding: '0 4px',
    background: semanticTokens.timeline.point.background.active,
    color: 'white',
    fontSize: '0.625rem',
    lineHeight: 1,
    boxShadow: `0 0 0 1px ${semanticTokens.card.background.default}`,
  },
]);

// Toolbar tooltip
export const toolbarTooltip = recipe({
  base: [
    sprinkles({
      position: 'absolute',
      fontSize: 'xs',
      fontWeight: 'medium',
      padding: 'xs',
      borderRadius: 'sm',
      pointerEvents: 'none',
    }),
    {
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: semanticTokens.card.background.default,
      color: semanticTokens.toolbar.button.text.default,
      border: `1px solid ${semanticTokens.card.border.color}`,
      boxShadow: semanticTokens.card.shadow.medium,
      whiteSpace: 'nowrap',
      zIndex: semanticTokens.layout.container.maxWidth.xl,
      
      // Arrow
      '::after': {
        content: '""',
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderTop: `4px solid ${semanticTokens.card.background.default}`,
      },
    },
  ],
  variants: {
    visible: {
      true: [
        sprinkles({ opacity: 100, visibility: 'visible' }),
        {
          animation: `fadeIn ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.easeOut}`,
        },
      ],
      false: [
        sprinkles({ opacity: 0, visibility: 'hidden' }),
      ],
    },
    position: {
      top: {
        bottom: 'calc(100% + 8px)',
        top: 'auto',
      },
      bottom: {
        top: 'calc(100% + 8px)',
        bottom: 'auto',
      },
    },
  },
  defaultVariants: {
    visible: false,
    position: 'top',
  },
});

// Animation keyframes
const slideInDownKeyframes = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-8px) scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
});

const spinKeyframes = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const fadeInKeyframes = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const pulseKeyframes = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

export const toolbarAnimations = {
  slideInDown: slideInDownKeyframes,
  spin: spinKeyframes,
  fadeIn: fadeInKeyframes,
  pulse: pulseKeyframes,
};

// Export the complete toolbar system
export const toolbarSystem = {
  container: toolbarContainer,
  button: toolbarButton,
  section: toolbarSection,
  dropdown: toolbarDropdown,
  badge: toolbarBadge,
  tooltip: toolbarTooltip,
  animations: toolbarAnimations,
};

// Utility functions for toolbar styling
export const toolbarUtils = {
  // Calculate button spacing based on toolbar size
  getButtonSpacing: (toolbarSize: 'sm' | 'md' | 'lg') => {
    switch (toolbarSize) {
      case 'sm': return semanticTokens.toolbar.padding.sm;
      case 'md': return semanticTokens.toolbar.padding.md;
      case 'lg': return semanticTokens.toolbar.padding.lg;
      default: return semanticTokens.toolbar.padding.md;
    }
  },
  
  // Get appropriate button size for toolbar
  getButtonSize: (toolbarSize: 'sm' | 'md' | 'lg') => {
    switch (toolbarSize) {
      case 'sm': return 'sm' as const;
      case 'md': return 'md' as const;
      case 'lg': return 'lg' as const;
      default: return 'md' as const;
    }
  },
  
  // Check if button should be active
  isButtonActive: (currentValue: string, buttonValue: string) => {
    return currentValue === buttonValue;
  },
};