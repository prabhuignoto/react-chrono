/**
 * Font styles using vanilla-extract for the design system
 * 
 * Provides modular font styling that can be enhanced with Google Fonts
 */

import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../tokens/index.css';

// Base font family with CSS custom property fallback
const baseFontFamily = `var(--timeline-font-family, ${tokens.semantic.typography.fontFamily.default})`;

// Base typography styles
export const typography = {
  base: style({
    fontFamily: baseFontFamily,
    lineHeight: tokens.semantic.typography.lineHeight.normal,
    color: tokens.semantic.color.text.primary,
  }),
};

// Title styles
export const titleStyles = styleVariants({
  default: [typography.base, {
    fontFamily: `var(--timeline-title-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-title-font-size, ${tokens.semantic.typography.fontSize.lg})`,
    fontWeight: `var(--timeline-title-font-weight, ${tokens.semantic.typography.fontWeight.semibold})`,
    fontStyle: `var(--timeline-title-font-style, normal)`,
    lineHeight: tokens.semantic.typography.lineHeight.tight,
  }],
  
  card: [typography.base, {
    fontFamily: `var(--timeline-cardTitle-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-cardTitle-font-size, ${tokens.semantic.typography.fontSize.md})`,
    fontWeight: `var(--timeline-cardTitle-font-weight, ${tokens.semantic.typography.fontWeight.medium})`,
    fontStyle: `var(--timeline-cardTitle-font-style, normal)`,
    lineHeight: tokens.semantic.typography.lineHeight.tight,
  }],
});

// Subtitle styles  
export const subtitleStyles = styleVariants({
  card: [typography.base, {
    fontFamily: `var(--timeline-cardSubtitle-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-cardSubtitle-font-size, ${tokens.semantic.typography.fontSize.sm})`,
    fontWeight: `var(--timeline-cardSubtitle-font-weight, ${tokens.semantic.typography.fontWeight.normal})`,
    fontStyle: `var(--timeline-cardSubtitle-font-style, normal)`,
    color: tokens.semantic.color.text.secondary,
    lineHeight: tokens.semantic.typography.lineHeight.normal,
  }],
});

// Body text styles
export const textStyles = styleVariants({
  card: [typography.base, {
    fontFamily: `var(--timeline-cardText-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-cardText-font-size, ${tokens.semantic.typography.fontSize.sm})`,
    fontWeight: `var(--timeline-cardText-font-weight, ${tokens.semantic.typography.fontWeight.normal})`,
    fontStyle: `var(--timeline-cardText-font-style, normal)`,
    lineHeight: tokens.semantic.typography.lineHeight.relaxed,
  }],
});

// Control/UI text styles
export const controlStyles = styleVariants({
  default: [typography.base, {
    fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-controls-font-size, ${tokens.semantic.typography.fontSize.sm})`,
    fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.medium})`,
    fontStyle: `var(--timeline-controls-font-style, normal)`,
    lineHeight: tokens.semantic.typography.lineHeight.normal,
  }],
  
  button: [typography.base, {
    fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-controls-font-size, ${tokens.semantic.typography.fontSize.xs})`,
    fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.medium})`,
    fontStyle: `var(--timeline-controls-font-style, normal)`,
    lineHeight: tokens.semantic.typography.lineHeight.none,
  }],
});

// Responsive font size adjustments
export const responsiveFontSizes = {
  title: style({
    '@media': {
      '(max-width: 768px)': {
        fontSize: tokens.semantic.typography.fontSize.md,
      },
    },
  }),
  
  cardTitle: style({
    '@media': {
      '(max-width: 768px)': {
        fontSize: tokens.semantic.typography.fontSize.sm,
      },
    },
  }),
  
  cardText: style({
    '@media': {
      '(max-width: 768px)': {
        fontSize: tokens.semantic.typography.fontSize.xs,
      },
    },
  }),
};

// Font weight utilities
export const fontWeights = styleVariants({
  thin: { fontWeight: '100' },
  light: { fontWeight: '300' },
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  extrabold: { fontWeight: '800' },
  black: { fontWeight: '900' },
});

// Font style utilities
export const fontStyles = styleVariants({
  normal: { fontStyle: 'normal' },
  italic: { fontStyle: 'italic' },
});

// Export combinations for easy use
export const fontCombinations = {
  titleDefault: [titleStyles.default],
  titleCard: [titleStyles.card],
  subtitleCard: [subtitleStyles.card],
  textCard: [textStyles.card],
  controlDefault: [controlStyles.default],
  controlButton: [controlStyles.button],
  
  // Responsive combinations
  titleDefaultResponsive: [titleStyles.default, responsiveFontSizes.title],
  titleCardResponsive: [titleStyles.card, responsiveFontSizes.cardTitle],
  textCardResponsive: [textStyles.card, responsiveFontSizes.cardText],
};