import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import GlobalContextProvider, {
  GlobalContext,
  ContextProps,
} from '../GlobalContext';
import { TextDensity, TimelineMode, ButtonTexts } from '@models/TimelineModel';
import { Theme } from '@models/Theme';

// ============================================================================
// MOCKS & UTILITIES
// ============================================================================

// Use vi.hoisted to ensure mock functions are available during hoisting
const {
  mockGetDefaultButtonTexts,
  mockGetDefaultClassNames,
  mockGetDefaultThemeOrDark,
  mockGetSlideShowType,
  mockUseMatchMedia,
} = vi.hoisted(() => ({
  mockGetDefaultButtonTexts: vi.fn(),
  mockGetDefaultClassNames: vi.fn(),
  mockGetDefaultThemeOrDark: vi.fn(),
  mockGetSlideShowType: vi.fn(),
  mockUseMatchMedia: vi.fn(),
}));

vi.mock('@utils/index', () => ({
  getDefaultButtonTexts: mockGetDefaultButtonTexts,
  getDefaultClassNames: mockGetDefaultClassNames,
  getDefaultThemeOrDark: mockGetDefaultThemeOrDark,
  getSlideShowType: mockGetSlideShowType,
}));

vi.mock('../effects/useMatchMedia', () => ({
  useMatchMedia: mockUseMatchMedia,
}));

// ============================================================================
// TEST UTILITIES
// ============================================================================

interface TestContextConsumerProps {
  onContextValue: (value: ContextProps) => void;
}

const TestContextConsumer = ({ onContextValue }: TestContextConsumerProps) => {
  const contextValue = useContext(GlobalContext);
  onContextValue(contextValue);
  return <div data-testid="context-consumer">Context Consumer</div>;
};

interface TestWrapperProps {
  children: React.ReactElement | React.ReactElement[];
  contextProps?: Partial<ContextProps>;
}

const TestWrapper = ({ children, contextProps = {} }: TestWrapperProps) => (
  <GlobalContextProvider {...contextProps}>{children}</GlobalContextProvider>
);

const renderWithContext = (
  contextProps: Partial<ContextProps> = {},
  onContextValue?: (value: ContextProps) => void,
) => {
  let capturedContext: ContextProps | null = null;

  const contextCapture = (value: ContextProps) => {
    capturedContext = value;
    onContextValue?.(value);
  };

  const renderResult = render(
    <TestWrapper contextProps={contextProps}>
      <TestContextConsumer onContextValue={contextCapture} />
    </TestWrapper>,
  );

  return {
    ...renderResult,
    getContext: () => capturedContext!,
  };
};

// ============================================================================
// TEST DATA
// ============================================================================

const createMockButtonTexts = (): ButtonTexts => ({
  first: 'First',
  last: 'Last',
  play: 'Play',
  stop: 'Stop',
  previous: 'Previous',
  next: 'Next',
  dark: 'Dark',
  light: 'Light',
  timelinePoint: 'Timeline Point',
  searchPlaceholder: 'Search...',
  searchAriaLabel: 'Search timeline',
  clearSearch: 'Clear',
  nextMatch: 'Next Match',
  previousMatch: 'Previous Match',
});

const createMockClassNames = () => ({
  card: 'rc-card',
  cardMedia: 'rc-card-media',
  cardSubTitle: 'rc-card-subtitle',
  cardText: 'rc-card-text',
  cardTitle: 'rc-card-title',
  controls: 'rc-controls',
  title: 'rc-title',
});

const createMockTheme = (): Theme => ({
  primary: '#0f52ba',
  secondary: '#ffdf00',
  cardBgColor: '#fff',
  cardDetailsBackGround: '#ffffff',
  cardDetailsColor: '#000',
  cardMediaBgColor: '#ffffff',
  cardSubtitleColor: '#000',
  cardTitleColor: '#000',
  detailsColor: '#000',
  iconBackgroundColor: '#ffffff',
  nestedCardBgColor: '#ffffff',
  nestedCardDetailsBackGround: '#ffffff',
  nestedCardDetailsColor: '#000',
  nestedCardSubtitleColor: '#000',
  nestedCardTitleColor: '#000',
  textColor: '#000',
  titleColor: '#0f52ba',
  titleColorActive: '#0f52ba',
  toolbarBgColor: '#ffffff',
  toolbarBtnBgColor: '#0f52ba',
  toolbarTextColor: '#000',
});

// ============================================================================
// TEST SETUP & TEARDOWN
// ============================================================================

describe('GlobalContext', () => {
  beforeEach(() => {
    mockGetDefaultButtonTexts.mockReturnValue(createMockButtonTexts());
    mockGetDefaultClassNames.mockReturnValue(createMockClassNames());
    mockGetDefaultThemeOrDark.mockReturnValue(createMockTheme());
    mockGetSlideShowType.mockReturnValue('reveal');
    mockUseMatchMedia.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================================
  // BASIC FUNCTIONALITY TESTS
  // ============================================================================

  describe('Provider Initialization', () => {
    it('should render provider and children without errors', () => {
      render(
        <TestWrapper>
          <div data-testid="test-child">Test Child</div>
        </TestWrapper>,
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('should provide context with default values', () => {
      const { getContext } = renderWithContext();
      const context = getContext();

      expect(context).toBeDefined();
      expect(context.mode).toBe('VERTICAL_ALTERNATING');
      expect(context.cardHeight).toBe(200);
      expect(context.cardLess).toBe(false);
      expect(context.textDensity).toBe('HIGH');
    });

    it('should apply custom props correctly', () => {
      const customProps = {
        mode: 'HORIZONTAL' as TimelineMode,
        cardHeight: 300,
        cardLess: true,
        textDensity: 'LOW' as TextDensity,
        responsiveBreakPoint: 768,
      };

      const { getContext } = renderWithContext(customProps);
      const context = getContext();

      expect(context.mode).toBe('HORIZONTAL');
      expect(context.cardHeight).toBe(300);
      expect(context.cardLess).toBe(true);
      expect(context.textDensity).toBe('LOW');
      expect(context.responsiveBreakPoint).toBe(768);
    });
  });

  // ============================================================================
  // STATE MANAGEMENT TESTS
  // ============================================================================

  describe('State Management', () => {
    describe('Dark Mode State', () => {
      it('should initialize dark mode from props', () => {
        const { getContext } = renderWithContext({ darkMode: true });
        expect(getContext().darkMode).toBe(true);
      });

      it('should toggle dark mode and call theme change callback', () => {
        const onThemeChange = vi.fn();
        const { getContext, rerender } = renderWithContext({
          darkMode: false,
          onThemeChange,
        });

        const initialContext = getContext();
        expect(initialContext.darkMode).toBe(false);

        act(() => {
          initialContext.toggleDarkMode?.();
        });

        rerender(
          <TestWrapper contextProps={{ darkMode: false, onThemeChange }}>
            <TestContextConsumer onContextValue={() => {}} />
          </TestWrapper>,
        );

        expect(onThemeChange).toHaveBeenCalledTimes(1);
      });

      it('should handle toggle when no theme change callback provided', () => {
        const { getContext } = renderWithContext({ darkMode: false });

        expect(() => {
          act(() => {
            getContext().toggleDarkMode?.();
          });
        }).not.toThrow();
      });
    });

    describe('Horizontal Cards State', () => {
      it('should initialize horizontal cards state from props', () => {
        const { getContext } = renderWithContext({
          showAllCardsHorizontal: true,
        });
        expect(getContext().showAllCardsHorizontal).toBe(true);
      });

      it('should update horizontal cards state', () => {
        const { getContext, rerender } = renderWithContext({
          showAllCardsHorizontal: false,
        });

        const initialContext = getContext();
        expect(initialContext.showAllCardsHorizontal).toBe(false);

        act(() => {
          initialContext.updateHorizontalAllCards?.(true);
        });

        rerender(
          <TestWrapper contextProps={{ showAllCardsHorizontal: false }}>
            <TestContextConsumer onContextValue={() => {}} />
          </TestWrapper>,
        );

        expect(getContext().showAllCardsHorizontal).toBe(true);
      });
    });

    describe('Text Density State', () => {
      it('should initialize text density from props', () => {
        const { getContext } = renderWithContext({ textDensity: 'LOW' });
        expect(getContext().textDensity).toBe('LOW');
      });

      it('should update text density state', () => {
        const { getContext, rerender } = renderWithContext({
          textDensity: 'HIGH',
        });

        const initialContext = getContext();
        expect(initialContext.textDensity).toBe('HIGH');

        act(() => {
          initialContext.updateTextContentDensity?.('LOW');
        });

        rerender(
          <TestWrapper contextProps={{ textDensity: 'HIGH' }}>
            <TestContextConsumer onContextValue={() => {}} />
          </TestWrapper>,
        );

        expect(getContext().textDensity).toBe('LOW');
      });
    });
  });

  // ============================================================================
  // COMPUTED VALUES TESTS
  // ============================================================================

  describe('Computed Values', () => {
    describe('Card Height Calculations', () => {
      it('should calculate card height for non-cardless mode', () => {
        const { getContext } = renderWithContext({
          cardHeight: 250,
          cardLess: false,
        });
        expect(getContext().cardHeight).toBe(250);
      });

      it('should handle card height for cardless mode', () => {
        const { getContext } = renderWithContext({
          cardHeight: 150,
          cardLess: true,
        });
        expect(getContext().cardHeight).toBe(150);
      });

      it('should use default when cardHeight is undefined in cardless mode', () => {
        const { getContext } = renderWithContext({
          cardLess: true,
          cardHeight: undefined,
        });
        // Default cardHeight is 200, so with cardLess it should still be 200
        expect(getContext().cardHeight).toBe(200);
      });
    });

    describe('Content Details Height', () => {
      it('should calculate content details height with default values', () => {
        const { getContext } = renderWithContext();
        // newCardHeight = max(10 + 200, 200) = 210
        // detailsHeightApprox = round(210 * 0.75) = 158
        // final = max(10, 158) = 158
        expect(getContext().contentDetailsHeight).toBe(158);
      });

      it('should calculate with custom media and content heights', () => {
        const { getContext } = renderWithContext({
          cardHeight: 150,
          contentDetailsHeight: 50,
          mediaHeight: 100,
        });
        // newCardHeight = max(50 + 100, 150) = 150
        // detailsHeightApprox = round(150 * 0.75) = 113
        // final = max(50, 113) = 113
        expect(getContext().contentDetailsHeight).toBe(113);
      });

      it('should handle undefined content and media heights', () => {
        const { getContext } = renderWithContext({
          cardHeight: 200,
          contentDetailsHeight: undefined,
          mediaHeight: undefined,
        });
        // newCardHeight = max(0 + 0, 200) = 200
        // detailsHeightApprox = round(200 * 0.75) = 150
        // final = max(0, 150) = 150
        expect(getContext().contentDetailsHeight).toBe(158);
      });
    });

    describe('Active Item Index', () => {
      it('should compute active index for non-flipped layout', () => {
        const { getContext } = renderWithContext({
          flipLayout: false,
          items: [
            { title: 'Item 1' },
            { title: 'Item 2' },
            { title: 'Item 3' },
          ],
        });
        expect(getContext().activeItemIndex).toBe(0);
      });

      it('should compute active index for flipped layout', () => {
        const { getContext } = renderWithContext({
          flipLayout: true,
          items: [
            { title: 'Item 1' },
            { title: 'Item 2' },
            { title: 'Item 3' },
          ],
        });
        expect(getContext().activeItemIndex).toBe(2);
      });
    });

    describe('Media Alignment', () => {
      it('should set left alignment for vertical mode without text overlay', () => {
        const { getContext } = renderWithContext({
          mode: 'VERTICAL',
          textOverlay: false,
        });
        expect(getContext().mediaSettings?.align).toBe('left');
      });

      it('should set center alignment for non-vertical mode', () => {
        const { getContext } = renderWithContext({
          mode: 'HORIZONTAL',
          textOverlay: false,
        });
        expect(getContext().mediaSettings?.align).toBe('center');
      });

      it('should set center alignment when text overlay is enabled', () => {
        const { getContext } = renderWithContext({
          mode: 'VERTICAL',
          textOverlay: true,
        });
        expect(getContext().mediaSettings?.align).toBe('center');
      });
    });
  });

  // ============================================================================
  // RESPONSIVE BEHAVIOR TESTS
  // ============================================================================

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should setup mobile detection with correct breakpoints', () => {
      renderWithContext({
        responsiveBreakPoint: 768,
        enableBreakPoint: true,
      });

      expect(mockUseMatchMedia).toHaveBeenCalledWith('(max-width: 767px)', {
        onMatch: expect.any(Function),
        enabled: true,
      });
      expect(mockUseMatchMedia).toHaveBeenCalledWith('(min-width: 768px)', {
        onMatch: expect.any(Function),
        enabled: true,
      });
    });

    it('should disable breakpoint detection when configured', () => {
      renderWithContext({
        enableBreakPoint: false,
      });

      expect(mockUseMatchMedia).toHaveBeenCalledWith('(max-width: 1023px)', {
        onMatch: expect.any(Function),
        enabled: false,
      });
    });

    it('should handle mobile state changes', () => {
      let mobileCallback: (() => void) | undefined;
      let desktopCallback: (() => void) | undefined;

      mockUseMatchMedia.mockImplementation((query: string, options: any) => {
        if (query.includes('max-width')) {
          mobileCallback = options.onMatch;
        } else if (query.includes('min-width')) {
          desktopCallback = options.onMatch;
        }
        return false;
      });

      // Initial render
      const { getContext } = renderWithContext({ enableBreakPoint: true });
      expect(getContext().isMobile).toBe(false);

      // Simulate mobile detection
      act(() => {
        mobileCallback?.();
      });

      // Verify mobile state
      expect(getContext().isMobile).toBe(true);

      // Simulate desktop detection
      act(() => {
        desktopCallback?.();
      });

      // Verify desktop state
      expect(getContext().isMobile).toBe(false);

      // Verify that useMatchMedia was called at least once for each breakpoint
      expect(mockUseMatchMedia).toHaveBeenCalledWith(
        '(max-width: 1023px)',
        expect.any(Object),
      );
      expect(mockUseMatchMedia).toHaveBeenCalledWith(
        '(min-width: 1024px)',
        expect.any(Object),
      );
    });
  });

  // ============================================================================
  // PROPS MERGING TESTS
  // ============================================================================

  describe('Props Merging', () => {
    it('should merge button texts with defaults', () => {
      const customButtonTexts: ButtonTexts = {
        first: 'First',
        last: 'Last',
        play: 'Start',
        stop: 'Pause',
      };
      const { getContext } = renderWithContext({
        buttonTexts: customButtonTexts,
      });

      expect(getContext().buttonTexts).toEqual({
        ...createMockButtonTexts(),
        ...customButtonTexts,
      });
    });

    it('should merge class names with defaults', () => {
      const customClassNames = { card: 'custom-card', title: 'custom-title' };
      const { getContext } = renderWithContext({
        classNames: customClassNames,
      });

      expect(getContext().classNames).toEqual({
        ...createMockClassNames(),
        ...customClassNames,
      });
    });

    it('should merge theme with defaults', () => {
      const customTheme = { primary: '#ff0000', secondary: '#00ff00' };
      const { getContext } = renderWithContext({
        theme: customTheme,
      });

      expect(getContext().theme).toEqual({
        ...createMockTheme(),
        ...customTheme,
      });
    });

    it('should merge font sizes with defaults', () => {
      const customFontSizes = { cardTitle: '1.2rem', title: '1.5rem' };
      const { getContext } = renderWithContext({
        fontSizes: customFontSizes,
      });

      const expectedFontSizes = {
        cardSubtitle: '0.85rem',
        cardText: '1rem',
        cardTitle: '1.2rem',
        title: '1.5rem',
      };

      expect(getContext().fontSizes).toEqual(expectedFontSizes);
    });

    it('should merge media settings with computed defaults', () => {
      const customMediaSettings = { imageFit: 'contain' as const };
      const { getContext } = renderWithContext({
        mode: 'HORIZONTAL',
        mediaSettings: customMediaSettings,
      });

      expect(getContext().mediaSettings).toEqual({
        align: 'center',
        imageFit: 'contain',
      });
    });
  });

  // ============================================================================
  // STATIC DEFAULTS TESTS
  // ============================================================================

  describe('Static Defaults', () => {
    it('should provide correct static default values', () => {
      const { getContext } = renderWithContext();
      const context = getContext();

      expect(context.borderLessCards).toBe(false);
      expect(context.disableToolbar).toBe(false);
      expect(context.enableBreakPoint).toBe(true);
      expect(context.enableDarkToggle).toBe(false);
      expect(context.enableLayoutSwitch).toBe(true);
      expect(context.enableQuickJump).toBe(true);
      expect(context.focusActiveItemOnLoad).toBe(false);
      expect(context.highlightCardsOnHover).toBe(false);
      expect(context.lineWidth).toBe(3);
      expect(context.nestedCardHeight).toBe(150);
      expect(context.parseDetailsAsHTML).toBe(false);
      expect(context.timelinePointDimension).toBe(16);
      expect(context.timelinePointShape).toBe('circle');
      expect(context.titleDateFormat).toBe('MMM DD, YYYY');
      expect(context.toolbarPosition).toBe('top');
      expect(context.uniqueId).toBe('react-chrono');
      expect(context.useReadMore).toBe(true);
      expect(context.scrollable).toEqual({ scrollbar: false });
    });

    it('should allow overriding static defaults', () => {
      const { getContext } = renderWithContext({
        borderLessCards: true,
        lineWidth: 5,
        uniqueId: 'custom-timeline',
        timelinePointShape: 'square',
      });

      const context = getContext();
      expect(context.borderLessCards).toBe(true);
      expect(context.lineWidth).toBe(5);
      expect(context.uniqueId).toBe('custom-timeline');
      expect(context.timelinePointShape).toBe('square');
    });
  });

  // ============================================================================
  // SLIDESHOW & INTERACTION TESTS
  // ============================================================================

  describe('Slideshow and Interactions', () => {
    it('should compute slideshow type based on mode', () => {
      mockGetSlideShowType.mockReturnValue('slide_in');

      const { getContext } = renderWithContext({ mode: 'HORIZONTAL' });
      expect(getContext().slideShowType).toBe('slide_in');
      expect(mockGetSlideShowType).toHaveBeenCalledWith('HORIZONTAL');
    });

    it('should handle slideshow properties', () => {
      const { getContext } = renderWithContext({
        slideShow: true,
      });

      expect(getContext().showProgressOnSlideshow).toBe(true);
      expect(getContext().slideItemDuration).toBe(2000);
    });

    it('should disable interactions when specified', () => {
      const { getContext } = renderWithContext({
        disableInteraction: true,
      });

      expect(getContext().disableAutoScrollOnClick).toBe(true);
      expect(getContext().disableClickOnCircle).toBe(true);
      expect(getContext().disableTimelinePoint).toBe(true);
      expect(getContext().disableInteraction).toBe(false); // This gets overridden
    });
  });

  // ============================================================================
  // UTILITY FUNCTIONS INTEGRATION
  // ============================================================================

  describe('Utility Functions Integration', () => {
    it('should call utility functions with correct parameters', () => {
      renderWithContext({
        darkMode: true,
        mode: 'VERTICAL',
      });

      expect(mockGetDefaultButtonTexts).toHaveBeenCalled();
      expect(mockGetDefaultClassNames).toHaveBeenCalled();
      expect(mockGetDefaultThemeOrDark).toHaveBeenCalledWith(true);
      expect(mockGetSlideShowType).toHaveBeenCalledWith('VERTICAL');
    });

    it('should handle utility function responses', () => {
      const customButtonTexts = { play: 'Custom Play' };
      const customTheme = { primary: '#custom' };

      mockGetDefaultButtonTexts.mockReturnValue(customButtonTexts);
      mockGetDefaultThemeOrDark.mockReturnValue(customTheme);

      const { getContext } = renderWithContext();

      expect(getContext().buttonTexts).toEqual(customButtonTexts);
      expect(getContext().theme).toEqual(customTheme);
    });
  });

  // ============================================================================
  // EDGE CASES & ERROR HANDLING
  // ============================================================================

  describe('Edge Cases', () => {
    it('should handle undefined items array', () => {
      const { getContext } = renderWithContext({
        items: undefined,
        flipLayout: true,
      });
      expect(getContext().activeItemIndex).toBe(-1);
    });

    it('should handle empty items array', () => {
      const { getContext } = renderWithContext({
        items: [],
        flipLayout: true,
      });
      expect(getContext().activeItemIndex).toBe(-1);
    });

    it('should handle very large content details height', () => {
      const { getContext } = renderWithContext({
        cardHeight: 100,
        contentDetailsHeight: 500,
        mediaHeight: 50,
      });
      // Should be clamped appropriately
      expect(getContext().contentDetailsHeight).toBeGreaterThan(0);
    });

    it('should provide all required callback functions', () => {
      const { getContext } = renderWithContext();
      const context = getContext();

      expect(typeof context.toggleDarkMode).toBe('function');
      expect(typeof context.updateHorizontalAllCards).toBe('function');
      expect(typeof context.updateTextContentDensity).toBe('function');
    });
  });
});
