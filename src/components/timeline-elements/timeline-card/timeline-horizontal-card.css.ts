import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/sprinkles/enhanced-sprinkles.css';
import { cardWrapper, cardHeader } from '../card-system-v2.css';
import { semanticTokens } from '../../../styles/tokens/semantic-tokens.css';

// Main wrapper using cardWrapper with horizontal mode and interactive features
export const wrapper = recipe({
  base: [
    cardWrapper({
      mode: 'horizontal',
      interactive: true,
      elevation: 'medium',
      theme: 'default',
    }),
    {
      border: 'none',
      borderRadius: '16px',
      flexDirection: 'column',
      gap: '0.5rem',
      isolation: 'isolate',
      // Ensure wrapper is always visible in horizontal modes
      visibility: 'visible',
      display: 'flex',

      // Hover effects with proper motion handling
      selectors: {
        '&:hover': {
          transform: 'translateY(-2px) scale(1.01)',
          willChange: 'transform',
        },
        '&:active': {
          transform: 'translateY(0px) scale(1)',
        },
      },

      // Reduced motion support
      '@media': {
        '(prefers-reduced-motion: reduce)': {
          selectors: {
            '&:hover': {
              transform: 'none',
              willChange: 'auto',
            },
            '&:active': {
              transform: 'none',
            },
          },
        },
      },
    },
  ],
  variants: {
    orientation: {
      vertical: {
        justifyContent: 'flex-start',
      },
      horizontal: {
        justifyContent: 'center',
      },
    },
    size: {
      sm: [cardWrapper({ size: 'sm' })],
      md: [cardWrapper({ size: 'md' })],
      lg: [cardWrapper({ size: 'lg' })],
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

// Timeline title container using cardHeader with enhanced styling
export const timelineTitleContainer = recipe({
  base: [
    cardHeader({ variant: 'emphasized' }),
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    {
      padding: '0.5rem 1rem',
      borderRadius: '12px',
      background: `linear-gradient(135deg, ${semanticTokens.card.background.default} 0%, ${semanticTokens.card.background.default}f8 100%)`,
      boxShadow: semanticTokens.card.shadow.low,
      backdropFilter: 'blur(12px)',
      border: `1px solid ${semanticTokens.card.border.color}`,
      transition: `all ${semanticTokens.motion.duration.normal} ${semanticTokens.motion.easing.easeInOut}`,
    },
  ],
  variants: {
    mode: {
      vertical: {
        marginBottom: '1.5rem',
        alignSelf: 'stretch',
      },
      horizontal: {
        position: 'relative',
        whiteSpace: 'nowrap',
        zIndex: 3,
        marginBottom: '0.5rem',
      },
      horizontal_all: {
        position: 'relative',
        whiteSpace: 'nowrap',
        zIndex: 3,
        marginBottom: '0.5rem',
        // Ensure visibility in horizontal_all mode
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            boxShadow: semanticTokens.card.shadow.interactive,
            transform: 'translateY(-1px)',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    mode: 'horizontal',
    interactive: false,
  },
});

// Legacy export for backward compatibility (can be removed later)
export { wrapper as cardWrapper, timelineTitleContainer as titleContainer };
