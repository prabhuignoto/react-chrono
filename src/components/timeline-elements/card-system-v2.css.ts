import { recipe } from '@vanilla-extract/recipes';
import { style, keyframes } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/enhanced-sprinkles.css';
import { componentPatterns } from '../../styles/recipes/component-patterns.css';
import { tokens } from '../../styles/tokens/index.css';

// Card wrapper - replaces card-related globalStyles
export const cardWrapper = recipe({
  base: [
    componentPatterns.card({
      size: 'md',
      elevation: 'medium',
      interactive: false,
      bordered: false,
    }),
    sprinkles({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
    }),
    {
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.easeInOut}`,
      transformOrigin: 'center',
    },
  ],
  variants: {
    mode: {
      horizontal: {
        minWidth: '280px',
        maxWidth: '320px',
      },
      vertical: {
        width: '100%',
        maxWidth: '100%',
      },
      alternating: {
        width: '100%',
        maxWidth: '100%',
      },
    },
    side: {
      left: {},
      right: {},
      center: [sprinkles({ marginLeft: 'auto', marginRight: 'auto' })],
    },
    size: {
      sm: [componentPatterns.card({ size: 'sm' }), { minHeight: '120px' }],
      md: [componentPatterns.card({ size: 'md' }), { minHeight: '160px' }],
      lg: [componentPatterns.card({ size: 'lg' }), { minHeight: '200px' }],
    },
    elevation: {
      flat: [componentPatterns.card({ elevation: 'flat' })],
      low: [componentPatterns.card({ elevation: 'low' })],
      medium: [componentPatterns.card({ elevation: 'medium' })],
      high: [componentPatterns.card({ elevation: 'high' })],
    },
    interactive: {
      true: [
        componentPatterns.card({ interactive: true }),
        {
          cursor: 'pointer',
          selectors: {
            '&:hover': {
              boxShadow: tokens.semantic.card.shadow.interactive,
              transform: 'translateY(-2px) scale(1.02)',
            },
            '&:active': {
              transform: 'translateY(0px) scale(0.98)',
              transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.easeIn}`,
            },
          },
        },
      ],
      false: {},
    },
    selected: {
      true: {
        borderColor: tokens.semantic.timeline.point.background.active,
        boxShadow: `0 0 0 2px ${tokens.semantic.timeline.point.background.active}20, ${tokens.semantic.card.shadow.interactive}`,
      },
      false: {},
    },
    theme: {
      default: {},
      primary: {
        borderColor: tokens.semantic.timeline.point.background.active,
        '::before': {
          background: `linear-gradient(135deg, ${tokens.semantic.timeline.point.background.active}10 0%, transparent 50%, ${tokens.semantic.timeline.point.background.active}05 100%)`,
        },
      },
      minimal: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      },
    },
    visible: {
      true: [
        sprinkles({ opacity: 100, visibility: 'visible' }),
        {
          animationName: 'slideInCard',
          animationDuration: tokens.semantic.motion.duration.normal,
          animationTimingFunction: tokens.semantic.motion.easing.easeOut,
          animationFillMode: 'both',
        },
      ],
      false: [
        sprinkles({ opacity: 0, visibility: 'hidden' }),
        { transform: 'translateY(20px) scale(0.9)' },
      ],
    },
  },
  defaultVariants: {
    mode: 'vertical',
    side: 'left',
    size: 'md',
    elevation: 'medium',
    interactive: false,
    selected: false,
    theme: 'default',
    visible: false,
  },
  compoundVariants: [
    {
      variants: { mode: 'horizontal' },
      style: {
        '@media': {
          '(max-width: 768px)': {
            minWidth: '240px',
            maxWidth: '280px',
          },
        },
      },
    },
    {
      variants: { mode: 'alternating', side: 'left' },
      style: {
        marginRight: 'auto',
      },
    },
    {
      variants: { mode: 'alternating', side: 'right' },
      style: {
        marginLeft: 'auto',
      },
    },
  ],
});

// Card header
export const cardHeader = recipe({
  base: [
    componentPatterns.container({
      direction: 'row',
      alignment: 'center',
      spacing: 'sm',
    }),
    sprinkles({
      width: 'full',
      padding: 'xs', // Use valid padding value
      marginBottom: 'sm',
    }),
    {
      borderBottom: `1px solid ${tokens.semantic.card.border.color}20`,
      paddingBottom: tokens.semantic.card.content.spacing.normal,
    },
  ],
  variants: {
    variant: {
      default: {},
      minimal: {
        border: 'none',
        paddingBottom: 0,
      },
      emphasized: {
        background: `${tokens.semantic.timeline.point.background.active}05`,
        borderRadius: tokens.semantic.card.border.radius.sm,
        padding: tokens.semantic.card.content.spacing.normal,
        marginBottom: tokens.semantic.card.content.spacing.normal,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Card title
export const cardTitle = recipe({
  base: [
    componentPatterns.text({
      variant: 'heading3',
      color: 'primary',
      truncate: false,
    }),
    sprinkles({
      width: 'full',
      fontWeight: 'semibold',
    }),
    {
      lineHeight: '1.4',
      wordBreak: 'break-word',
    },
  ],
  variants: {
    size: {
      sm: [componentPatterns.text({ variant: 'body' })],
      md: [componentPatterns.text({ variant: 'heading3' })],
      lg: [componentPatterns.text({ variant: 'heading2' })],
    },
    truncate: {
      true: [componentPatterns.text({ truncate: true })],
      false: {},
    },
    align: {
      left: [componentPatterns.text({ align: 'left' })],
      center: [componentPatterns.text({ align: 'center' })],
      right: [componentPatterns.text({ align: 'right' })],
    },
  },
  defaultVariants: {
    size: 'md',
    truncate: false,
    align: 'left',
  },
});

// Card subtitle
export const cardSubtitle = recipe({
  base: [
    componentPatterns.text({
      variant: 'caption',
      color: 'secondary',
      truncate: false,
    }),
    sprinkles({
      width: 'full',
      marginTop: 'xs',
    }),
    {
      lineHeight: '1.3',
    },
  ],
  variants: {
    truncate: {
      true: [componentPatterns.text({ truncate: true })],
      false: {},
    },
    align: {
      left: [componentPatterns.text({ align: 'left' })],
      center: [componentPatterns.text({ align: 'center' })],
      right: [componentPatterns.text({ align: 'right' })],
    },
  },
  defaultVariants: {
    truncate: false,
    align: 'left',
  },
});

// Card content
export const cardContent = recipe({
  base: [
    sprinkles({
      width: 'full',
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
    }),
    {
      flex: 1,
      minHeight: 0, // Allow content to shrink
    },
  ],
  variants: {
    spacing: {
      tight: [sprinkles({ gap: 'xs' })],
      normal: [sprinkles({ gap: 'sm' })],
      loose: [sprinkles({ gap: 'md' })],
    },
    scrollable: {
      true: [
        sprinkles({ overflow: 'auto' }),
        {
          maxHeight: '300px',
          scrollBehavior: 'smooth',
        },
      ],
      false: {},
    },
  },
  defaultVariants: {
    spacing: 'normal',
    scrollable: false,
  },
});

// Card media container
export const cardMedia = recipe({
  base: [
    sprinkles({
      position: 'relative',
      width: 'full',
      overflow: 'hidden',
    }),
    {
      borderRadius: tokens.semantic.card.border.radius.md,
      backgroundColor: `${tokens.semantic.card.border.color}10`,
    },
  ],
  variants: {
    aspectRatio: {
      auto: { aspectRatio: 'auto' },
      square: { aspectRatio: '1/1' },
      video: { aspectRatio: '16/9' },
      photo: { aspectRatio: '4/3' },
      wide: { aspectRatio: '21/9' },
    },
    size: {
      sm: { height: '120px' },
      md: { height: '180px' },
      lg: { height: '240px' },
      auto: { height: 'auto' },
    },
    position: {
      top: {
        order: -1,
        marginBottom: tokens.semantic.card.content.spacing.normal,
      },
      bottom: {
        order: 1,
        marginTop: tokens.semantic.card.content.spacing.normal,
      },
      background: [
        sprinkles({ position: 'absolute' }),
        {
          inset: 0,
          zIndex: -1,
          '::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
          },
        },
      ],
    },
  },
  defaultVariants: {
    aspectRatio: 'auto',
    size: 'md',
    position: 'top',
  },
});

// Card actions
export const cardActions = recipe({
  base: [
    componentPatterns.container({
      direction: 'row',
      alignment: 'center',
      spacing: 'xs',
    }),
    sprinkles({
      width: 'full',
      marginTop: 'sm',
      paddingTop: 'sm',
    }),
    {
      borderTop: `1px solid ${tokens.semantic.card.border.color}20`,
    },
  ],
  variants: {
    alignment: {
      start: [componentPatterns.container({ distribution: 'start' })],
      center: [componentPatterns.container({ distribution: 'center' })],
      end: [componentPatterns.container({ distribution: 'end' })],
      between: [componentPatterns.container({ distribution: 'between' })],
    },
    variant: {
      default: {},
      minimal: {
        border: 'none',
        paddingTop: 0,
        marginTop: tokens.semantic.card.content.spacing.tight,
      },
    },
  },
  defaultVariants: {
    alignment: 'end',
    variant: 'default',
  },
});

// Card button
export const cardButton = recipe({
  base: [
    componentPatterns.button({
      variant: 'ghost',
      size: 'sm',
      shape: 'rounded',
    }),
    {
      color: tokens.semantic.timeline.point.background.active,
      selectors: {
        '&:hover': {
          background: `${tokens.semantic.timeline.point.background.active}10`,
          borderColor: `${tokens.semantic.timeline.point.background.active}20`,
        },
        '&:active': {
          background: `${tokens.semantic.timeline.point.background.active}20`,
        },
      },
    },
  ],
  variants: {
    variant: {
      ghost: {},
      filled: {
        background: tokens.semantic.timeline.point.background.active,
        color: 'white',
        selectors: {
          '&:hover': {
            background: tokens.semantic.timeline.point.background.hover,
            borderColor: tokens.semantic.timeline.point.background.hover,
          },
        },
      },
      outline: {
        border: `1px solid ${tokens.semantic.timeline.point.background.active}`,
        color: tokens.semantic.timeline.point.background.active,
        selectors: {
          '&:hover': {
            background: tokens.semantic.timeline.point.background.active,
            color: 'white',
          },
        },
      },
    },
    size: {
      sm: [componentPatterns.button({ size: 'sm' })],
      md: [componentPatterns.button({ size: 'md' })],
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'sm',
  },
});

// Card badge/tag
export const cardBadge = recipe({
  base: [
    sprinkles({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'xs',
      fontWeight: 'medium',
      padding: 'xs',
      borderRadius: 'md',
    }),
    {
      background: `${tokens.semantic.timeline.point.background.active}15`,
      color: tokens.semantic.timeline.point.background.active,
      border: `1px solid ${tokens.semantic.timeline.point.background.active}30`,
      lineHeight: 1,
    },
  ],
  variants: {
    variant: {
      default: {},
      filled: {
        background: tokens.semantic.timeline.point.background.active,
        color: 'white',
        border: `1px solid ${tokens.semantic.timeline.point.background.active}`,
      },
      outline: {
        background: 'transparent',
        border: `1px solid ${tokens.semantic.timeline.point.background.active}`,
      },
    },
    size: {
      sm: [sprinkles({ fontSize: 'xs', padding: 'xs' }), { minHeight: '20px' }],
      md: [sprinkles({ fontSize: 'sm', padding: 'sm' }), { minHeight: '24px' }],
    },
    position: {
      inline: {},
      absolute: [
        sprinkles({ position: 'absolute' }),
        {
          top: tokens.semantic.card.content.spacing.tight,
          right: tokens.semantic.card.content.spacing.tight,
        },
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
    position: 'inline',
  },
});

// Card skeleton loader
export const cardSkeleton = recipe({
  base: [
    sprinkles({
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
      width: 'full',
    }),
    {
      animation: `pulse ${tokens.semantic.motion.duration.slow} ${tokens.semantic.motion.easing.easeInOut} infinite`,
    },
  ],
  variants: {
    lines: {
      1: {},
      2: {},
      3: {},
      4: {},
    },
  },
  defaultVariants: {
    lines: 3,
  },
});

// Skeleton line
export const skeletonLine = style([
  sprinkles({
    width: 'full',
    borderRadius: 'sm',
  }),
  {
    height: '12px',
    background: `${tokens.semantic.card.border.color}20`,
    animation: `pulse ${tokens.semantic.motion.duration.slow} ${tokens.semantic.motion.easing.easeInOut} infinite`,

    selectors: {
      '&:nth-child(1)': { width: '100%' },
      '&:nth-child(2)': { width: '85%' },
      '&:nth-child(3)': { width: '70%' },
      '&:nth-child(4)': { width: '60%' },
    },
  },
]);

// Animation keyframes for cards
const slideInCardKeyframes = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(20px) scale(0.95)',
    visibility: 'hidden',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
    visibility: 'visible',
  },
});

const slideInFromLeftKeyframes = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-30px) scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0) scale(1)',
  },
});

const slideInFromRightKeyframes = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(30px) scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0) scale(1)',
  },
});

const pulseKeyframes = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.4 },
});

const bounceKeyframes = keyframes({
  '0%, 100%': {
    transform: 'translateY(0) scale(1)',
    animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
  },
  '50%': {
    transform: 'translateY(-5px) scale(1.02)',
    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
  },
});

export const cardAnimations = {
  slideInCard: slideInCardKeyframes,
  slideInFromLeft: slideInFromLeftKeyframes,
  slideInFromRight: slideInFromRightKeyframes,
  pulse: pulseKeyframes,
  bounce: bounceKeyframes,
};

// Export the complete card system
export const cardSystem = {
  wrapper: cardWrapper,
  header: cardHeader,
  title: cardTitle,
  subtitle: cardSubtitle,
  content: cardContent,
  media: cardMedia,
  actions: cardActions,
  button: cardButton,
  badge: cardBadge,
  skeleton: cardSkeleton,
  skeletonLine,
  animations: cardAnimations,
};

// Utility functions for card styling
export const cardUtils = {
  // Calculate card width based on mode and constraints
  getCardWidth: (
    mode: 'horizontal' | 'vertical' | 'alternating',
    isMobile: boolean,
  ) => {
    if (mode === 'horizontal') {
      return isMobile ? '280px' : '320px';
    }
    return '100%';
  },

  // Get animation delay for staggered animations
  getAnimationDelay: (index: number, staggerDelay = 100) => {
    return `${index * staggerDelay}ms`;
  },

  // Calculate if card should be truncated
  shouldTruncateContent: (content: string, maxLength = 200) => {
    return content.length > maxLength;
  },

  // Get appropriate card elevation based on interaction
  getElevation: (
    isInteractive: boolean,
    isSelected: boolean,
    isHovered: boolean,
  ) => {
    if (isSelected) return 'high' as const;
    if (isHovered && isInteractive) return 'high' as const;
    if (isInteractive) return 'medium' as const;
    return 'low' as const;
  },
};
