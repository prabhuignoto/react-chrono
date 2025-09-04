/**
 * FontProvider component for Google Fonts integration
 *
 * Handles loading Google Fonts and providing font styles via CSS custom properties
 */

import React, { useEffect, useState, useMemo } from 'react';
import {
  GoogleFontsConfig,
  loadGoogleFonts,
  generateFontCssVars,
} from './google-fonts';

interface FontProviderProps {
  children: React.ReactNode;
  googleFonts?: GoogleFontsConfig;
  className?: string;
}

/**
 * FontProvider component that loads Google Fonts and applies font styles
 */
export const FontProvider: React.FC<FontProviderProps> = ({
  children,
  googleFonts,
  className = '',
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState<string | null>(null);

  // Load Google Fonts when config changes
  useEffect(() => {
    if (!googleFonts) {
      setFontLoaded(true);
      return;
    }

    setFontLoaded(false);
    setFontError(null);

    loadGoogleFonts(googleFonts)
      .then(() => {
        setFontLoaded(true);
      })
      .catch((error) => {
        setFontError(error.message);
        setFontLoaded(true); // Still render children with fallback fonts
        console.warn('Failed to load Google Fonts:', error);
      });
  }, [googleFonts]);

  // Generate CSS custom properties
  const cssVars = useMemo(() => {
    if (!googleFonts || !fontLoaded) return {};
    return generateFontCssVars(googleFonts);
  }, [googleFonts, fontLoaded]);

  // Apply CSS variables to the document root instead of wrapper
  useEffect(() => {
    console.log('FontProvider: CSS vars effect triggered', {
      fontLoaded,
      cssVars,
      cssVarsKeys: Object.keys(cssVars || {}),
      googleFonts,
    });

    if (!fontLoaded || !cssVars || Object.keys(cssVars).length === 0) {
      console.log('FontProvider: Early return due to conditions not met');
      return;
    }

    console.log('FontProvider: Setting CSS custom properties:', cssVars);

    // Set CSS custom properties on document root
    Object.entries(cssVars).forEach(([property, value]) => {
      console.log(`FontProvider: Setting ${property} = ${value}`);
      document.documentElement.style.setProperty(property, value);
    });

    // Cleanup function to remove CSS variables
    return () => {
      console.log('FontProvider: Cleanup - removing CSS variables');
      Object.keys(cssVars).forEach((property) => {
        document.documentElement.style.removeProperty(property);
      });
    };
  }, [cssVars, fontLoaded]);

  const containerStyle = useMemo(() => {
    return {
      // Provide fallback fonts while loading
      fontFamily: googleFonts?.fontFamily
        ? `"${googleFonts.fontFamily}", system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
        : undefined,
    };
  }, [googleFonts]);

  return (
    <div
      className={`timeline-font-provider ${className}`}
      style={containerStyle}
      data-font-loaded={fontLoaded}
      data-font-error={!!fontError}
    >
      {children}
    </div>
  );
};

/**
 * Hook to access font loading state
 */
export const useFontState = () => {
  // This could be enhanced to use context if needed
  return {
    loaded: true, // Simplified for now
    error: null,
  };
};
