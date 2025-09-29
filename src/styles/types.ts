// TypeScript definitions for the design system
import type { RecipeVariants } from '@vanilla-extract/recipes';
import type {
  interactive,
  flexContainer,
  card,
  button,
  text,
  input,
  timelineCard,
  timelinePoint,
  toolbarButton,
} from './system/recipes.css';
import type { Sprinkles } from './system/sprinkles.css';
import type { tokens } from './tokens/index.css';

// Extract token types for type safety
export type Tokens = typeof tokens;
export type PrimitiveTokens = Tokens['primitive'];
export type SemanticTokens = Tokens['semantic'];
export type ComponentTokens = Tokens['component'];

// Spacing system types
export type SpacingScale = keyof SemanticTokens['spacing'];
export type PrimitiveSpacingScale = keyof PrimitiveTokens['spacing'];

// Color system types
export type TextColors = keyof SemanticTokens['color']['text'];
export type BackgroundColors = keyof SemanticTokens['color']['background'];
export type InteractiveColors = keyof SemanticTokens['color']['interactive'];
export type BorderColors = keyof SemanticTokens['color']['border'];
export type StatusColors = keyof SemanticTokens['color']['status'];

// Typography system types
export type FontSizeScale = keyof SemanticTokens['typography']['fontSize'];
export type FontWeightScale = keyof SemanticTokens['typography']['fontWeight'];
export type LineHeightScale = keyof SemanticTokens['typography']['lineHeight'];

// Visual system types
export type BorderRadiusScale = keyof SemanticTokens['borderRadius'];
export type ShadowScale = keyof SemanticTokens['shadow'];
export type ZIndexScale = keyof SemanticTokens['zIndex'];

// Motion system types
export type MotionDurationScale = keyof SemanticTokens['motion']['duration'];
export type MotionEasingScale = keyof SemanticTokens['motion']['easing'];

// Component-specific types
export type TimelinePointSizeScale =
  keyof ComponentTokens['timeline']['point']['size'];
export type TimelinePointColorScale =
  keyof ComponentTokens['timeline']['point']['color'];

// Recipe variant types
export type InteractiveVariants = RecipeVariants<typeof interactive>;
export type FlexContainerVariants = RecipeVariants<typeof flexContainer>;
export type CardVariants = RecipeVariants<typeof card>;
export type ButtonVariants = RecipeVariants<typeof button>;
export type TextVariants = RecipeVariants<typeof text>;
export type InputVariants = RecipeVariants<typeof input>;
export type TimelineCardVariants = RecipeVariants<typeof timelineCard>;
export type TimelinePointVariants = RecipeVariants<typeof timelinePoint>;
export type ToolbarButtonVariants = RecipeVariants<typeof toolbarButton>;

// Sprinkles type re-export
export type { Sprinkles };

// Responsive breakpoint types
export type ResponsiveCondition = 'mobile' | 'tablet' | 'desktop';
export type ResponsiveValue<T> = T | Partial<Record<ResponsiveCondition, T>>;

// Component prop types that combine variants with common props
export type InteractiveProps = InteractiveVariants & {
  className?: string;
  children?: React.ReactNode;
};

export type FlexContainerProps = FlexContainerVariants & {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
};

export type CardProps = CardVariants & {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  onClick?: () => void;
};

export type ButtonProps = ButtonVariants & {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

export type TextProps = TextVariants & {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  id?: string;
};

export type InputProps = InputVariants & {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export type TimelineCardProps = TimelineCardVariants & {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  'aria-label'?: string;
  'data-testid'?: string;
};

export type TimelinePointProps = TimelinePointVariants & {
  className?: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  'aria-label'?: string;
  'aria-current'?: boolean | 'step';
  'data-testid'?: string;
};

export type ToolbarButtonProps = ButtonVariants & {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  'aria-label': string; // Required for toolbar buttons
  'aria-pressed'?: boolean;
  'data-testid'?: string;
};

// Theme-related types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  tokens: Tokens;
}

// Animation and transition types
export type AnimationType =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'scaleIn'
  | 'scaleOut'
  | 'spin'
  | 'pulse'
  | 'bounce'
  | 'timelineCardEnter'
  | 'timelineCardExit'
  | 'timelinePointPulse';

export interface AnimationProps {
  animation?: AnimationType;
  duration?: MotionDurationScale;
  easing?: MotionEasingScale;
  delay?: string;
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number | 'infinite';
}

// Utility types for conditional styles
export type ConditionalStyle<T> = T | ((condition: boolean) => T);

// Style composition utilities
export interface StyleComposition {
  base?: string;
  variants?: Record<string, string>;
  conditions?: Record<string, string>;
}

// Media query types
export type MediaQueryCondition =
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'reducedMotion'
  | 'highContrast'
  | 'darkMode'
  | 'lightMode'
  | 'hover'
  | 'noHover'
  | 'pointer'
  | 'coarsePointer'
  | 'print';

// Component size variants (standardized across components)
export type ComponentSize = 'sm' | 'md' | 'lg';

// Component state types
export type ComponentState =
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'loading';

// Accessibility types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-selected'?: boolean;
  'aria-pressed'?: boolean;
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  role?: React.AriaRole;
  tabIndex?: number;
}

// Timeline-specific types
export type TimelineMode = 'vertical' | 'horizontal' | 'alternating';
export type TimelineOrientation = 'vertical' | 'horizontal';

export interface TimelineItemData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
}

export interface TimelineProps {
  items: TimelineItemData[];
  mode: TimelineMode;
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  className?: string;
  'data-testid'?: string;
}

// Style utility types
export type ClassNameValue = string | number | boolean | undefined | null;
export type ClassNameArray = ClassNameValue[];
export type ClassNameDictionary = Record<string, boolean | undefined | null>;
export type ClassNameInput =
  | ClassNameValue
  | ClassNameArray
  | ClassNameDictionary;

// CSS custom property types for runtime theming
export type CSSCustomProperties = Record<`--${string}`, string | number>;

// Export utility type for creating component props with design system integration
export type WithDesignSystemProps<T = {}> = T & {
  className?: string;
  sprinkles?: Sprinkles;
  'data-testid'?: string;
};

// Helper type for polymorphic components
export type PolymorphicComponentProps<
  T extends React.ElementType,
  P = {},
> = P & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof P | 'as'>;

// Export commonly used generic types
export type { RecipeVariants } from '@vanilla-extract/recipes';
export type HTMLAttributes<T = HTMLElement> = React.HTMLAttributes<T>;
export type MouseEventHandler<T = Element> = React.MouseEventHandler<T>;
export type KeyboardEventHandler<T = Element> = React.KeyboardEventHandler<T>;
export type FocusEventHandler<T = Element> = React.FocusEventHandler<T>;
export type ChangeEventHandler<T = Element> = React.ChangeEventHandler<T>;

// Re-export React types that are commonly needed
export type {
  ReactNode,
  ReactElement,
  ComponentType,
  ElementType,
  HTMLProps,
  CSSProperties,
} from 'react';
