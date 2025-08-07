import React from 'react';
import { TimelineContextProvider } from '../components/contexts/TimelineContextProvider';
import { Theme } from '@models/Theme';
import { TimelineProps } from '@models/TimelineModel';

interface TestWrapperProps extends Omit<Partial<TimelineProps>, 'children'> {
  children: React.ReactNode;
}

/**
 * Test wrapper that provides all required contexts for testing
 */
export const TestWrapper: React.FC<TestWrapperProps> = ({
  children,
  theme,
  mode = 'VERTICAL_ALTERNATING',
  mediaHeight = 200,
  ...props
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

  // Default props for testing
  const defaultProps: Partial<TimelineProps> = {
    mode,
    mediaHeight,
    theme: theme || defaultTheme,
    activeItemIndex: 0,
    scrollable: true,
    disableNavOnKey: false,
    disableInteraction: false,
    disableClickOnCircle: false,
    disableTimelinePoint: false,
    enableQuickJump: true,
    cardHeight: 200,
    cardLess: false,
    flipLayout: false,
    itemWidth: 200,
    lineWidth: 3,
    cardPositionHorizontal: 'TOP',
    toolbarPosition: 'top',
    disableToolbar: false,
    borderLessCards: false,
    showAllCardsHorizontal: false,
    textDensity: 'HIGH',
    enableLayoutSwitch: true,
    highlightCardsOnHover: false,
    useReadMore: true,
    darkMode: false,
    enableDarkToggle: true,
    // Provide test buttonTexts to match test expectations
    buttonTexts: {
      changeDensity: 'Change density',
      changeDensityOptions: {
        high: {
          helpText: 'Show cards more tightly packed',
          text: 'High',
        },
        low: {
          helpText: 'Show cards more spaced out',
          text: 'Low',
        },
      },
      changeLayout: 'Change layout',
      changeLayoutOptions: {
        alternating: {
          helpText: 'Show cards in a vertical layout with alternating fashion',
          text: 'Alternating',
        },
        horizontal: {
          helpText: 'Show cards in a horizontal layout',
          text: 'Horizontal',
        },
        horizontal_all: {
          helpText: 'Show all cards in a horizontal layout',
          text: 'Show all cards',
        },
        vertical: {
          helpText: 'Show cards in a vertical layout',
          text: 'Vertical',
        },
      },
      dark: 'dark',
      first: 'first',
      jumpTo: 'Jump to',
      last: 'last',
      light: 'light',
      next: 'next',
      play: 'start slideshow',
      previous: 'previous',
      stop: 'stop slideshow',
    },
    ...props, // Allow overriding any values
  };

  return (
    <TimelineContextProvider {...defaultProps}>
      {children}
    </TimelineContextProvider>
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