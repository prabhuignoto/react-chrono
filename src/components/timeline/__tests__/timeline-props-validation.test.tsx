import { TimelineModel } from '@models/TimelineModel';
import { describe, expect, it, vi } from 'vitest';
import { customRender, providerProps } from '../../common/test';
import Timeline from '../timeline';

window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

window.IntersectionObserver = vi.fn(function (callback) {
  this.disconnect = vi.fn();
  this.observe = vi.fn();
  this.root = null;
  this.rootMargin = '';
  this.takeRecords = vi.fn();
  this.thresholds = [];
  this.unobserve = vi.fn();
} as any);

describe('Timeline Props Validation', () => {
  const baseItems = [
    {
      cardDetailedText: 'Detailed text 1',
      cardSubtitle: 'Subtitle 1',
      cardTitle: 'Card 1',
      id: '1',
      title: 'Item 1',
    },
    {
      cardDetailedText: 'Detailed text 2',
      cardSubtitle: 'Subtitle 2',
      cardTitle: 'Card 2',
      id: '2',
      title: 'Item 2',
    },
  ];

  const baseProps: TimelineModel = {
    items: baseItems,
    activeTimelineItem: 0,
    contentDetailsChildren: null,
    iconChildren: null,
    isChild: false,
    nestedCardHeight: 200,
    noUniqueId: false,
    onFirst: vi.fn(),
    onItemSelected: vi.fn(),
    onLast: vi.fn(),
    onNext: vi.fn(),
    onOutlineSelection: vi.fn(),
    onPaused: vi.fn(),
    onPrevious: vi.fn(),
    onRestartSlideshow: vi.fn(),
    onTimelineUpdated: vi.fn(),
    slideShowEnabled: true,
    slideShowRunning: false,
    uniqueId: 'timeline-1',
  };

  describe('Mode Prop Validation', () => {
    it('should render with VERTICAL mode when prop is provided', () => {
      const { container } = customRender(
        <Timeline {...baseProps} mode="VERTICAL" />,
        { providerProps },
      );

      const mainWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(mainWrapper).toHaveClass('vertical');
    });

    it('should render with HORIZONTAL mode when prop is provided', () => {
      const { container } = customRender(
        <Timeline {...baseProps} mode="HORIZONTAL" />,
        { providerProps },
      );

      const mainWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(mainWrapper).toHaveClass('horizontal');
    });

    it('should render with VERTICAL_ALTERNATING mode when prop is provided', () => {
      const { container } = customRender(
        <Timeline {...baseProps} mode="VERTICAL_ALTERNATING" />,
        { providerProps },
      );

      const mainWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(mainWrapper).toHaveClass('vertical_alternating');
    });

    it('should render with HORIZONTAL_ALL mode when prop is provided', () => {
      const { container } = customRender(
        <Timeline {...baseProps} mode="HORIZONTAL_ALL" />,
        { providerProps },
      );

      const mainWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(mainWrapper).toHaveClass('horizontal_all');
    });

    it('should prioritize component mode prop over context mode', () => {
      // Context has VERTICAL_ALTERNATING but component prop is HORIZONTAL
      const { container } = customRender(
        <Timeline {...baseProps} mode="HORIZONTAL" />,
        { providerProps: { ...providerProps, mode: 'VERTICAL_ALTERNATING' } },
      );

      const mainWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(mainWrapper).toHaveClass('horizontal');
    });
  });

  describe('ActiveTimelineItem Prop Validation', () => {
    it('should handle undefined activeTimelineItem gracefully', () => {
      const propsWithUndefinedActive = {
        ...baseProps,
        activeTimelineItem: undefined,
      };

      expect(() => {
        customRender(<Timeline {...propsWithUndefinedActive} />, {
          providerProps,
        });
      }).not.toThrow();
    });

    it('should default to 0 when activeTimelineItem is undefined', () => {
      const onItemSelected = vi.fn();
      const propsWithUndefinedActive = {
        ...baseProps,
        activeTimelineItem: undefined,
        onItemSelected,
      };

      customRender(<Timeline {...propsWithUndefinedActive} />, {
        providerProps,
      });

      // The component should internally handle undefined and default to 0
      // We can verify this by checking that no errors are thrown
      expect(onItemSelected).toHaveBeenCalledWith({
        cardDetailedText: 'Detailed text 1',
        cardSubtitle: 'Subtitle 1',
        cardTitle: 'Card 1',
        index: 0,
        title: 'Item 1',
      });
    });

    it('should handle negative activeTimelineItem values', () => {
      const propsWithNegativeActive = { ...baseProps, activeTimelineItem: -1 };

      expect(() => {
        customRender(<Timeline {...propsWithNegativeActive} />, {
          providerProps,
        });
      }).not.toThrow();
    });

    it('should handle activeTimelineItem beyond items array length', () => {
      const propsWithOutOfBoundsActive = {
        ...baseProps,
        activeTimelineItem: 99,
      };

      expect(() => {
        customRender(<Timeline {...propsWithOutOfBoundsActive} />, {
          providerProps,
        });
      }).not.toThrow();
    });
  });

  describe('Items Prop Validation', () => {
    it('should handle empty items array', () => {
      const propsWithEmptyItems = { ...baseProps, items: [] };

      expect(() => {
        customRender(<Timeline {...propsWithEmptyItems} />, { providerProps });
      }).not.toThrow();
    });

    it('should handle items with missing optional properties', () => {
      const itemsWithMissingProps = [
        {
          id: '1',
          title: 'Item 1',
        },
        {
          id: '2',
          title: 'Item 2',
          cardTitle: 'Card 2',
        },
      ];

      const propsWithIncompleteItems = {
        ...baseProps,
        items: itemsWithMissingProps,
      };

      expect(() => {
        customRender(<Timeline {...propsWithIncompleteItems} />, {
          providerProps,
        });
      }).not.toThrow();
    });
  });

  describe('Callback Props Validation', () => {
    it('should handle missing callback props gracefully', () => {
      const propsWithoutCallbacks = {
        ...baseProps,
        onFirst: undefined,
        onLast: undefined,
        onNext: undefined,
        onPrevious: undefined,
        onItemSelected: undefined,
        onOutlineSelection: undefined,
        onPaused: undefined,
        onRestartSlideshow: undefined,
        onTimelineUpdated: undefined,
      };

      expect(() => {
        customRender(<Timeline {...propsWithoutCallbacks} />, {
          providerProps,
        });
      }).not.toThrow();
    });
  });

  describe('Boolean Props Validation', () => {
    it('should handle slideShowEnabled as undefined', () => {
      const propsWithUndefinedSlideShow = {
        ...baseProps,
        slideShowEnabled: undefined,
      };

      expect(() => {
        customRender(<Timeline {...propsWithUndefinedSlideShow} />, {
          providerProps,
        });
      }).not.toThrow();
    });

    it('should handle slideShowRunning as undefined', () => {
      const propsWithUndefinedSlideShowRunning = {
        ...baseProps,
        slideShowRunning: undefined,
      };

      expect(() => {
        customRender(<Timeline {...propsWithUndefinedSlideShowRunning} />, {
          providerProps,
        });
      }).not.toThrow();
    });
  });

  describe('String Props Validation', () => {
    it('should handle uniqueId as undefined', () => {
      const propsWithUndefinedId = { ...baseProps, uniqueId: undefined };

      expect(() => {
        customRender(<Timeline {...propsWithUndefinedId} />, { providerProps });
      }).not.toThrow();
    });

    it('should handle empty string uniqueId', () => {
      const propsWithEmptyId = { ...baseProps, uniqueId: '' };

      expect(() => {
        customRender(<Timeline {...propsWithEmptyId} />, { providerProps });
      }).not.toThrow();
    });
  });

  describe('Number Props Validation', () => {
    it('should handle slideItemDuration as undefined', () => {
      const propsWithUndefinedDuration = {
        ...baseProps,
        slideItemDuration: undefined,
      };

      expect(() => {
        customRender(<Timeline {...propsWithUndefinedDuration} />, {
          providerProps,
        });
      }).not.toThrow();
    });

    it('should handle nestedCardHeight as undefined', () => {
      const propsWithUndefinedHeight = {
        ...baseProps,
        nestedCardHeight: undefined,
      };

      expect(() => {
        customRender(<Timeline {...propsWithUndefinedHeight} />, {
          providerProps,
        });
      }).not.toThrow();
    });
  });
});
