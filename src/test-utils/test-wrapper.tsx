import React from 'react';
import { CombinedContextProvider } from '../components/contexts/split';
import { Theme } from '@models/Theme';

interface TestWrapperProps {
  children: React.ReactNode;
  theme?: Theme;
  mode?: 'HORIZONTAL' | 'VERTICAL' | 'VERTICAL_ALTERNATING';
  mediaHeight?: number;
  layoutOverrides?: Partial<any>; // Allow overriding layout context values
  navigationOverrides?: Partial<any>; // Allow overriding navigation context values
  mediaOverrides?: Partial<any>; // Allow overriding media context values
}

/**
 * Test wrapper that provides all required contexts for testing
 */
export const TestWrapper: React.FC<TestWrapperProps> = ({
  children,
  theme,
  mode = 'VERTICAL_ALTERNATING',
  mediaHeight = 200,
  layoutOverrides = {},
  navigationOverrides = {},
  mediaOverrides = {},
}) => {
  const defaultTheme: Theme = {
    primary: '#3b82f6',
    secondary: '#94a3b8',
    titleColor: '#1e293b',
    titleColorActive: '#fff',
    cardBgColor: '#ffffff',
    cardDetailsBackGround: '#f1f5f9',
    cardDetailsColor: '#475569',
    cardSubtitleColor: '#64748b',
    cardTitleColor: '#1e293b',
    detailsColor: '#334155',
    iconBackgroundColor: '#e2e8f0',
    nestedCardBgColor: '#f8fafc',
    nestedCardDetailsBackGround: '#f1f5f9',
    nestedCardDetailsColor: '#475569',
    nestedCardSubtitleColor: '#64748b',
    nestedCardTitleColor: '#1e293b',
    toolbarBgColor: '#ffffff',
    toolbarBtnBgColor: '#f1f5f9',
    toolbarTextColor: '#475569',
  };

  const navigationValue = {
    activeItemIndex: 0,
    scrollable: true,
    disableNavOnKey: false,
    disableInteraction: false,
    disableClickOnCircle: false,
    disableTimelinePoint: false,
    enableQuickJump: true,
    onScrollEnd: undefined,
    ...navigationOverrides, // Allow overriding any navigation values
  };

  const themeProps = {
    initialTheme: theme || defaultTheme,
    darkMode: false,
    onThemeChange: undefined,
  };

  const mediaValue = {
    mediaHeight,
    mediaSettings: undefined,
    mediaAlign: 'center' as const,
    textOverlay: false,
    ...mediaOverrides, // Allow overriding any media values
  };

  const layoutValue = {
    mode,
    cardHeight: 200,
    cardWidth: undefined,
    cardLess: false,
    flipLayout: false,
    itemWidth: 200,
    lineWidth: 3,
    cardPositionHorizontal: 'TOP' as const,
    toolbarPosition: 'top' as const,
    disableToolbar: false,
    borderLessCards: false,
    showAllCardsHorizontal: false,
    textDensity: 'HIGH' as const,
    enableLayoutSwitch: true,
    highlightCardsOnHover: false,
    useReadMore: true,
    ...layoutOverrides, // Allow overriding any layout values
  };

  return (
    <CombinedContextProvider
      navigation={navigationValue}
      theme={themeProps}
      media={mediaValue}
      layout={layoutValue}
    >
      {children}
    </CombinedContextProvider>
  );
};

/**
 * Render with test wrapper for testing
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<TestWrapperProps, 'children'>
) => {
  return {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <TestWrapper {...options}>{children}</TestWrapper>
    ),
  };
};