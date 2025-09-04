/**
 * FontProvider component for Google Fonts integration
 * 
 * Handles loading Google Fonts and providing font styles via CSS custom properties
 */

import React, { useEffect, useState, useMemo } from 'react';
import { 
  GoogleFontsConfig, 
  loadGoogleFonts, 
  generateFontCssVars 
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

  const containerStyle = useMemo(() => {
    return {
      ...cssVars,
      // Provide fallback fonts while loading
      fontFamily: googleFonts?.fontFamily 
        ? `"${googleFonts.fontFamily}", system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
        : undefined,
    };
  }, [cssVars, googleFonts]);

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