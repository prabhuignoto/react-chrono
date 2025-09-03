import { style, globalStyle, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { animations, baseStyles } from '../../../styles/system/static.css';

// Use animations from unified system
const show = animations.fadeIn;
const ripple = animations.ripple;
const pulse = animations.timelinePointPulse;

// Base wrapper using new patterns
export const wrapper = style([
  patterns.card({ size: 'md', elevation: 'low' }),
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'full',
  }),
  {
    border: `1px solid ${tokens.semantic.color.border.default}`,
    position: 'relative',
    height: '100%',
    background: tokens.semantic.color.background.elevated,
    borderRadius: tokens.semantic.borderRadius.lg,
  },
]);

globalStyle(`${wrapper}.vertical`, {
  justifyContent: 'flex-start',
});

// Item wrapper
export const item = style({});

// Shape wrapper using new token system
export const shapeWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),
  baseStyles.containLayout,
  {
    width: '5em',
    zIndex: tokens.semantic.zIndex.timelineCard,
    position: 'relative',
  },
]);

// Remove utility function - now handled by recipe variants

// Base shape styles using new tokens
const baseShape = style([
  patterns.interactive({ hover: 'scale' }),
  {
    cursor: 'pointer',
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    position: 'relative',
    overflow: 'hidden',
    border: `2px solid ${tokens.component.timeline.point.color.active}`,
    background: tokens.component.timeline.point.color.active,
    padding: 0,
    zIndex: tokens.semantic.zIndex.timelineCard,
  },
]);

// Shape recipe using new unified system
export const shape = recipe({
  base: baseShape,
  variants: {
    timelinePointShape: {
      circle: sprinkles({ borderRadius: 'full' }),
      square: sprinkles({ borderRadius: 'sm' }),
      diamond: {
        borderRadius: 0,
        transform: 'rotate(45deg)',
      },
    },
    active: {
      true: {
        backgroundColor: tokens.component.timeline.point.color.active,
        borderColor: tokens.component.timeline.point.color.active,
        transform: 'scale(1.1)',
        boxShadow: `0 0 0 4px ${tokens.semantic.color.interactive.primary}20`,
      },
      false: {
        backgroundColor: tokens.component.timeline.point.color.inactive,
        borderColor: tokens.component.timeline.point.color.inactive,
      },
    },
    usingIcon: {
      true: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.semantic.spacing.xs,
      },
      false: {},
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
      false: {},
    },
    size: {
      small: { 
        width: tokens.component.timeline.point.size.sm,
        height: tokens.component.timeline.point.size.sm,
      },
      medium: { 
        width: tokens.component.timeline.point.size.md,
        height: tokens.component.timeline.point.size.md,
      },
      large: { 
        width: tokens.component.timeline.point.size.lg,
        height: tokens.component.timeline.point.size.lg,
      },
      custom: {},
    },
  },
  defaultVariants: {
    timelinePointShape: 'circle',
    active: false,
    usingIcon: false,
    disabled: false,
    size: 'medium',
  },
  compoundVariants: [
    {
      variants: { active: true, usingIcon: true },
      style: {
        animation: `${pulse} 1.5s infinite`,
      },
    },
    {
      variants: { active: true, usingIcon: false },
      style: {
        animation: `${pulse} 1.5s infinite`,
        boxShadow: tokens.semantic.shadow.cardHover,
      },
    },
    {
      variants: { timelinePointShape: 'diamond', active: true, usingIcon: true },
      style: {
        transform: 'rotate(45deg) scale(1.1)',
      },
    },
    {
      variants: { timelinePointShape: 'diamond', active: true, usingIcon: false },
      style: {
        transform: 'rotate(45deg) scale(1.1)',
      },
    },
  ],
});

// Ripple effect pseudo-element
globalStyle(`${shape}::before`, {
  content: '',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '10px',
  height: '10px',
  background: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '50%',
  transform: 'scale(0) translate(-50%, -50%)',
  transformOrigin: 'top left',
  pointerEvents: 'none',
  zIndex: 100 + 1,
  opacity: '0',
});

globalStyle(`${shape}:active::before`, {
  animation: `${ripple} 0.6s ease-out`,
});

// Focus styles
globalStyle(`${shape}:focus-visible`, {
  outline: '3px solid transparent',
  outlineOffset: '2px',
});

globalStyle(`[data-keyboard-focus='true'] ${shape}:focus-visible`, {
  outlineColor: `#3b82f6`,
});

globalStyle(`[data-toolbar-navigation='true'] ${shape}:focus-visible`, {
  outlineColor: 'transparent',
});

// Hover effects
globalStyle(`${shape}:hover:not(:disabled)`, {
  transform: 'scale(1.12)',
  boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.13)',
});

globalStyle(`${shape}.diamond:hover:not(:disabled)`, {
  transform: 'rotate(45deg) scale(1.12)',
});

globalStyle(`${shape}:active:not(:disabled)`, {
  transform: 'scale(0.98)',
  transition: 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
});

globalStyle(`${shape}.diamond:active:not(:disabled)`, {
  transform: 'rotate(45deg) scale(0.98)',
});

// Active state after element
globalStyle(`${shape}.active::after`, {
  content: '',
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
  zIndex: 100 - 1,
  transition: 'all 0.3s ease-in-out',
  width: '20px',
  height: '20px',
});

globalStyle(`${shape}.active.circle::after`, {
  borderRadius: '50%',
});

globalStyle(`${shape}.active.square::after`, {
  borderRadius: '2px',
});

// Icon image styles
globalStyle(`${shape} img`, {
  maxWidth: '90%',
  maxHeight: '90%',
});

// Timeline title container using new patterns
export const timelineTitleContainer = recipe({
  base: [
    patterns.text({ variant: 'title' }),
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    {
      padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
      borderRadius: tokens.semantic.borderRadius.md,
      backgroundColor: tokens.semantic.color.background.elevated,
      border: `1px solid ${tokens.semantic.color.border.default}`,
      boxShadow: tokens.semantic.shadow.card,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    },
  ],
  variants: {
    mode: {
      vertical: {
        marginBottom: tokens.semantic.spacing.md,
      },
      horizontal: {
        position: 'absolute',
        top: '-2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        zIndex: tokens.semantic.zIndex.controls,
      },
      horizontal_all: {
        position: 'absolute',
        top: '-2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        zIndex: tokens.semantic.zIndex.controls,
      },
      tree: {
        marginBottom: tokens.semantic.spacing.md,
      },
    },
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Base timeline content container using new system
const baseTimelineContentContainer = style([
  patterns.card({ size: 'md', elevation: 'medium' }),
  sprinkles({
    alignItems: 'flex-start',
  }),
  {
    animation: `${show} 0.25s ease-in`,
    outline: '2px solid transparent',
    outlineOffset: '2px',
    borderRadius: tokens.semantic.borderRadius.lg,
    margin: tokens.semantic.spacing.md,
  },
]);

// Timeline content container recipe using new tokens
export const timelineContentContainer = recipe({
  base: baseTimelineContentContainer,
  variants: {
    active: {
      true: {
        borderColor: tokens.semantic.color.border.interactive,
        boxShadow: `0 0 0 2px ${tokens.semantic.color.border.interactive}20`,
        backgroundColor: tokens.semantic.color.background.elevated,
      },
      false: {},
    },
    cardWidth: {
      auto: {},
      custom: {},
    },
    highlight: {
      true: {
        backgroundColor: `${tokens.semantic.color.interactive.primary}08`,
        borderColor: tokens.semantic.color.border.interactive,
      },
      false: {},
    },
    position: {
      top: {},
      bottom: {},
      left: {},
      right: {},
    },
    mode: {
      vertical: {
        width: 'calc(100% - 5em)',
        marginLeft: 'auto',
        flexDirection: 'column',
      },
      horizontal: {},
      horizontal_all: {},
      tree: {
        width: 'calc(100% - 5em)',
        marginLeft: 'auto',
        flexDirection: 'column',
      },
    },
  },
  defaultVariants: {
    active: false,
    cardWidth: 'auto',
    highlight: false,
    position: 'right',
    mode: 'vertical',
  },
  compoundVariants: [
    {
      variants: { highlight: true, active: true },
      style: {
        border: `2px solid ${tokens.semantic.color.interactive.primary}`,
        boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}20`,
        backgroundColor: `${tokens.semantic.color.interactive.primary}10`,
      },
    },
  ],
});

// Keyboard focus outline
globalStyle(`[data-keyboard-focus='true'] ${timelineContentContainer}`, {
  outlineColor: '#3b82f6',
});

globalStyle(`[data-toolbar-navigation='true'] ${timelineContentContainer}`, {
  outlineColor: 'transparent',
});

// Responsive styles
globalStyle(`${timelineContentContainer}`, {
  '@media': {
    '(max-width: 768px)': {
      margin: '0.5rem',
      outlineWidth: '1px',
    },
  },
});

globalStyle(`${timelineContentContainer}.horizontal`, {
  '@media': {
    '(max-width: 768px)': {
      minWidth: 'auto',
      width: '100%',
    },
  },
});

globalStyle(`${timelineContentContainer}.vertical`, {
  '@media': {
    '(max-width: 768px)': {
      width: 'calc(100% - 3.5em)',
    },
  },
});

// Card container using new unified system
export const cardContainer = style([
  patterns.card({ size: 'lg', elevation: 'medium' }),
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  baseStyles.willChange,
  {
    minWidth: tokens.component.timeline.card.width.min,
    maxWidth: tokens.component.timeline.card.width.max,
    margin: tokens.semantic.spacing.sm,
    padding: tokens.semantic.spacing.lg,
    backgroundColor: tokens.semantic.color.background.elevated,
    borderRadius: tokens.semantic.borderRadius.lg,
    boxShadow: tokens.semantic.shadow.card,
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${tokens.semantic.color.border.default}`,
  },
]);

globalStyle(`${cardContainer}:hover`, {
  WebkitTransform: 'translateY(-4px)',
  transform: 'translateY(-4px)',
  WebkitBoxShadow:
    '0 4px 8px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.08)',
  boxShadow:
    '0 4px 8px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.08)',
});

globalStyle(`${cardContainer}`, {
  '@media': {
    '(max-width: 768px)': {
      minWidth: '200px',
      maxWidth: '100%',
      margin: '0.25rem',
      padding: '1rem',
      borderRadius: '8px',
    },
  },
});

globalStyle(`${cardContainer}:hover`, {
  '@media': {
    '(max-width: 768px)': {
      transform: 'none',
      WebkitTransform: 'none',
    },
  },
});
