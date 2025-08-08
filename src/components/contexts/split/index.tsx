/**
 * Split Context Providers for optimized performance
 * Each context handles a specific domain to minimize re-renders
 */

export { NavigationProvider, useNavigationContext } from './NavigationContext';
export { ThemeProvider, useThemeContext } from './ThemeContext';
export { MediaProvider, useMediaContext } from './MediaContext';
export { LayoutProvider, useLayoutContext } from './LayoutContext';

import React from 'react';
import { NavigationProvider } from './NavigationContext';
import { ThemeProvider } from './ThemeContext';
import { MediaProvider } from './MediaContext';
import { LayoutProvider } from './LayoutContext';

interface CombinedProviderProps {
  children: React.ReactNode;
  navigation?: React.ComponentProps<typeof NavigationProvider>['value'];
  theme: Omit<React.ComponentProps<typeof ThemeProvider>, 'children'>;
  media: React.ComponentProps<typeof MediaProvider>['value'];
  layout: React.ComponentProps<typeof LayoutProvider>['initialValues'];
}

/**
 * Combined provider that wraps all split contexts
 * Use this to maintain backwards compatibility while gaining performance benefits
 */
export const CombinedContextProvider: React.FC<CombinedProviderProps> = ({
  children,
  navigation,
  theme,
  media,
  layout,
}) => {
  return (
    <ThemeProvider {...theme}>
      <NavigationProvider value={navigation}>
        <MediaProvider value={media}>
          <LayoutProvider initialValues={layout}>
            {children}
          </LayoutProvider>
        </MediaProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
};