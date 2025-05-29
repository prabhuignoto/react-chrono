import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SlideshowProgress from '../slideshow-progress';
import { DynamicContext } from '../../../contexts/DynamicContext';

const mockTheme = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  cardBgColor: '#ffffff',
};

const mockDynamicContext = {
  isDarkMode: false,
  isMobile: false,
  horizontalAll: false,
  textContentDensity: 'HIGH' as const,
  memoizedTheme: mockTheme,
  toggleDarkMode: vi.fn(),
  updateHorizontalAllCards: vi.fn(),
  updateTextContentDensity: vi.fn(),
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <DynamicContext.Provider value={mockDynamicContext}>
    {children}
  </DynamicContext.Provider>
);

describe('SlideshowProgress', () => {
  it('renders when slideshow is running', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SlideshowProgress
          activeItemIndex={1}
          totalItems={5}
          isRunning={true}
          slideItemDuration={2000}
          isPaused={false}
        />
      </TestWrapper>,
    );

    expect(getByTestId('slideshow-progress')).toBeInTheDocument();
  });

  it('does not render when slideshow is not running', () => {
    const { queryByTestId } = render(
      <TestWrapper>
        <SlideshowProgress
          activeItemIndex={1}
          totalItems={5}
          isRunning={false}
          slideItemDuration={2000}
          isPaused={false}
        />
      </TestWrapper>,
    );

    expect(queryByTestId('slideshow-progress')).not.toBeInTheDocument();
  });

  it('does not render when totalItems is 0', () => {
    const { queryByTestId } = render(
      <TestWrapper>
        <SlideshowProgress
          activeItemIndex={0}
          totalItems={0}
          isRunning={true}
          slideItemDuration={2000}
          isPaused={false}
        />
      </TestWrapper>,
    );

    expect(queryByTestId('slideshow-progress')).not.toBeInTheDocument();
  });
});
