/**
 * Google Fonts integration utilities for React Chrono Timeline
 *
 * Provides a robust, modular system for loading and applying Google Fonts
 * with support for individual font styles (bold, italic) per text element
 */

export interface FontWeight {
  100: 'thin';
  200: 'extra-light';
  300: 'light';
  400: 'regular';
  500: 'medium';
  600: 'semi-bold';
  700: 'bold';
  800: 'extra-bold';
  900: 'black';
}

export interface FontStyle {
  normal: 'normal';
  italic: 'italic';
}

export type FontWeightValue =
  | keyof FontWeight
  | 'thin'
  | 'extra-light'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semi-bold'
  | 'bold'
  | 'extra-bold'
  | 'black';
export type FontStyleValue = keyof FontStyle | 'normal' | 'italic';

/**
 * Configuration for individual text elements
 */
export interface TextElementFont {
  /** Font weight (100-900 or named weights) */
  weight?: FontWeightValue;
  /** Font style (normal or italic) */
  style?: FontStyleValue;
  /** Custom font size override */
  size?: string;
}

/**
 * Complete Google Fonts configuration for all timeline text elements
 */
export interface GoogleFontsConfig {
  /** Primary font family name from Google Fonts */
  fontFamily: string;

  /** Font configurations for different text elements */
  elements?: {
    /** Timeline item titles */
    title?: TextElementFont;
    /** Timeline card titles */
    cardTitle?: TextElementFont;
    /** Timeline card subtitles */
    cardSubtitle?: TextElementFont;
    /** Timeline card main text content */
    cardText?: TextElementFont;
    /** Timeline controls and UI text */
    controls?: TextElementFont;
  };

  /** Additional font weights to load (e.g., [400, 700, 'italic']) */
  weights?: Array<FontWeightValue | FontStyleValue | string>;

  /** Font display strategy for loading */
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

  /** Preconnect to Google Fonts for faster loading */
  preconnect?: boolean;
}

/**
 * Internal font weight mapping for URL generation
 */
const FONT_WEIGHT_MAP: Record<string, number> = {
  thin: 100,
  'extra-light': 200,
  light: 300,
  regular: 400,
  medium: 500,
  'semi-bold': 600,
  bold: 700,
  'extra-bold': 800,
  black: 900,
};

/**
 * Normalize font weight to numeric value
 */
function normalizeFontWeight(weight: FontWeightValue): number {
  if (typeof weight === 'number') {
    // Ensure weight is within valid range (100-900)
    return Math.min(900, Math.max(100, Math.round(weight / 100) * 100));
  }
  return FONT_WEIGHT_MAP[weight] || 400;
}

/**
 * Generate Google Fonts URL with specified weights and styles
 */
function generateGoogleFontsUrl(config: GoogleFontsConfig): string {
  const { fontFamily, weights = [], display = 'swap' } = config;

  // Validate font family
  if (!fontFamily || fontFamily.trim().length === 0) {
    throw new Error('Font family name is required');
  }

  // Collect all required weights and styles
  const weightSet = new Set<string>();

  // Add base weights
  weights.forEach((weight) => {
    if (weight === 'italic') {
      weightSet.add('400italic');
    } else if (typeof weight === 'string' && weight.includes('italic')) {
      weightSet.add(weight);
    } else {
      try {
        const numericWeight = normalizeFontWeight(weight as FontWeightValue);
        weightSet.add(numericWeight.toString());
      } catch {
        // Invalid weight, skip it
        console.warn(`Invalid font weight: ${weight}`);
      }
    }
  });

  // Add weights from element configurations
  if (config.elements) {
    Object.values(config.elements).forEach((element) => {
      if (element?.weight) {
        try {
          const numericWeight = normalizeFontWeight(element.weight);
          const suffix = element.style === 'italic' ? 'italic' : '';
          weightSet.add(`${numericWeight}${suffix}`);
        } catch {
          console.warn(`Invalid element font weight: ${element.weight}`);
        }
      }
      if (element?.style === 'italic' && !element?.weight) {
        weightSet.add('400italic');
      }
    });
  }

  // Default weights if none specified
  if (weightSet.size === 0) {
    weightSet.add('400');
    weightSet.add('700');
  }

  const weightsParam = Array.from(weightSet).sort().join(';');
  const familyParam = encodeURIComponent(fontFamily.replace(/\s+/g, '+'));

  return `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weightsParam}&display=${display}`;
}

/**
 * Load Google Fonts by injecting link tag into document head
 */
export function loadGoogleFonts(config: GoogleFontsConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if font is already loaded
    const fontUrl = generateGoogleFontsUrl(config);
    const existingLink = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]'),
    ).find((link) => (link as HTMLLinkElement).href === fontUrl);

    if (existingLink) {
      resolve();
      return;
    }

    // Add preconnect for faster loading
    if (config.preconnect !== false) {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://fonts.googleapis.com';
      if (
        !document.querySelector('link[href="https://fonts.googleapis.com"]')
      ) {
        document.head.appendChild(preconnect);
      }

      const preconnectStatic = document.createElement('link');
      preconnectStatic.rel = 'preconnect';
      preconnectStatic.href = 'https://fonts.gstatic.com';
      preconnectStatic.crossOrigin = 'anonymous';
      if (!document.querySelector('link[href="https://fonts.gstatic.com"]')) {
        document.head.appendChild(preconnectStatic);
      }
    }

    // Create and load font link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;

    link.onload = () => resolve();
    link.onerror = () =>
      reject(new Error(`Failed to load Google Font: ${config.fontFamily}`));

    document.head.appendChild(link);
  });
}

/**
 * Generate CSS custom properties for font configuration
 */
export function generateFontCssVars(
  config: GoogleFontsConfig,
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Set base font family
  cssVars['--timeline-font-family'] =
    `"${config.fontFamily}", system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

  // Set element-specific font properties
  if (config.elements) {
    Object.entries(config.elements).forEach(([elementType, elementConfig]) => {
      const prefix = `--timeline-${elementType}`;

      // Set element-specific font family (inherits from base font family)
      cssVars[`${prefix}-font-family`] =
        cssVars['--timeline-font-family'] || '';

      if (elementConfig.weight) {
        const numericWeight = normalizeFontWeight(elementConfig.weight);
        cssVars[`${prefix}-font-weight`] = numericWeight.toString();
      }

      if (elementConfig.style) {
        cssVars[`${prefix}-font-style`] = elementConfig.style;
      }

      if (elementConfig.size) {
        cssVars[`${prefix}-font-size`] = elementConfig.size;
      }
    });
  }

  return cssVars;
}

/**
 * Generate vanilla-extract compatible font styles
 */
export function generateVanillaExtractStyles(config: GoogleFontsConfig) {
  const baseStyle = {
    fontFamily: `"${config.fontFamily}", system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  };

  const elementStyles: Record<string, any> = {};

  if (config.elements) {
    Object.entries(config.elements).forEach(([elementType, elementConfig]) => {
      elementStyles[elementType] = {
        ...baseStyle,
        ...(elementConfig.weight && {
          fontWeight: normalizeFontWeight(elementConfig.weight),
        }),
        ...(elementConfig.style && {
          fontStyle: elementConfig.style,
        }),
        ...(elementConfig.size && {
          fontSize: elementConfig.size,
        }),
      };
    });
  }

  return {
    base: baseStyle,
    elements: elementStyles,
  };
}

/**
 * Hook for using Google Fonts in React components
 */
export function useGoogleFonts(config: GoogleFontsConfig) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadGoogleFonts(config)
      .then(() => {
        setLoaded(true);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoaded(false);
      });
  }, [config]);

  const cssVars = React.useMemo(() => generateFontCssVars(config), [config]);

  const styles = React.useMemo(
    () => generateVanillaExtractStyles(config),
    [config],
  );

  return { loaded, error, cssVars, styles };
}

// Re-export React for the hook
import React from 'react';
