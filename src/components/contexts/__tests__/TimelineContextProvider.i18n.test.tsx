import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { TimelineContextProvider, useTimelineContext } from '../TimelineContextProvider';
import { TimelineI18nConfig } from '@models/TimelineI18n';

// Test component to access context
const TestComponent: React.FC = () => {
  const { textResolver, buttonTexts } = useTimelineContext();

  return (
    <div>
      <span data-testid="first-item">{textResolver.firstItem()}</span>
      <span data-testid="search-placeholder">{textResolver.searchPlaceholder()}</span>
      <span data-testid="legacy-first">{buttonTexts?.first}</span>
    </div>
  );
};

describe('TimelineContextProvider i18n Integration', () => {
  const defaultProps = {
    items: [],
    mode: 'VERTICAL_ALTERNATING' as const,
    activeTimelineItem: 0,
    contentDetailsChildren: null,
    iconChildren: null,
    onOutlineSelection: () => {},
    slideShowRunning: false,
    onScrollEnd: () => {},
    onItemSelected: () => {},
    onFirst: () => {},
    onLast: () => {},
    onNext: () => {},
    onPrevious: () => {},
    onRestartSlideshow: () => {},
    onPaused: () => {},
    slideItemDuration: 2000,
  };

  it('should provide default i18n texts when no config is provided', () => {
    const { getByTestId } = render(
      <TimelineContextProvider {...defaultProps}>
        <TestComponent />
      </TimelineContextProvider>
    );

    expect(getByTestId('first-item')).toHaveTextContent('Go to first item');
    expect(getByTestId('search-placeholder')).toHaveTextContent('Search Timeline');
  });

  it('should use custom i18n texts when provided', () => {
    const customI18n: TimelineI18nConfig = {
      navigation: {
        first: 'Premier élément',
      },
      search: {
        placeholder: 'Rechercher dans la chronologie',
      },
    };

    const { getByTestId } = render(
      <TimelineContextProvider {...defaultProps} i18nConfig={customI18n}>
        <TestComponent />
      </TimelineContextProvider>
    );

    expect(getByTestId('first-item')).toHaveTextContent('Premier élément');
    expect(getByTestId('search-placeholder')).toHaveTextContent('Rechercher dans la chronologie');
  });

  it('should maintain legacy compatibility with buttonTexts', () => {
    const legacyButtonTexts = {
      first: 'Legacy First',
      last: 'Legacy Last',
      next: 'Legacy Next',
    };

    const { getByTestId } = render(
      <TimelineContextProvider {...defaultProps} buttonTexts={legacyButtonTexts}>
        <TestComponent />
      </TimelineContextProvider>
    );

    // With default i18n, textResolver uses i18n defaults, but legacy buttonTexts are still available
    expect(getByTestId('first-item')).toHaveTextContent('Go to first item'); // i18n default
    expect(getByTestId('legacy-first')).toHaveTextContent('Legacy First'); // legacy buttonTexts
  });

  it('should prioritize i18n over legacy buttonTexts', () => {
    const customI18n: TimelineI18nConfig = {
      navigation: {
        first: 'i18n First',
      },
    };

    const legacyButtonTexts = {
      first: 'Legacy First',
    };

    const { getByTestId } = render(
      <TimelineContextProvider
        {...defaultProps}
        i18nConfig={customI18n}
        buttonTexts={legacyButtonTexts}
      >
        <TestComponent />
      </TimelineContextProvider>
    );

    // textResolver should use i18n
    expect(getByTestId('first-item')).toHaveTextContent('i18n First');
    // Legacy buttonTexts should still contain the legacy value (not overridden by i18n in this context)
    expect(getByTestId('legacy-first')).toHaveTextContent('Legacy First');
  });

  it('should handle partial i18n configs with fallbacks', () => {
    const partialI18n: TimelineI18nConfig = {
      navigation: {
        first: 'Custom First',
        // next is missing
      },
      // search is completely missing
    };

    const { getByTestId } = render(
      <TimelineContextProvider {...defaultProps} i18nConfig={partialI18n}>
        <TestComponent />
      </TimelineContextProvider>
    );

    expect(getByTestId('first-item')).toHaveTextContent('Custom First');
    expect(getByTestId('search-placeholder')).toHaveTextContent('Search Timeline'); // default
  });

  it('should provide textResolver in context', () => {
    const TestTextResolver: React.FC = () => {
      const { textResolver } = useTimelineContext();

      return (
        <div>
          <span data-testid="next-item">{textResolver.nextItem()}</span>
          <span data-testid="dark-mode">{textResolver.darkMode()}</span>
          <span data-testid="read-more">{textResolver.readMore()}</span>
          <span data-testid="search-results">{textResolver.searchResults(3, 10)}</span>
        </div>
      );
    };

    const { getByTestId } = render(
      <TimelineContextProvider {...defaultProps}>
        <TestTextResolver />
      </TimelineContextProvider>
    );

    expect(getByTestId('next-item')).toHaveTextContent('Next item');
    expect(getByTestId('dark-mode')).toHaveTextContent('Switch to dark mode');
    expect(getByTestId('read-more')).toHaveTextContent('Read More');
    expect(getByTestId('search-results')).toHaveTextContent('3 of 10');
  });

  it('should handle textResolver with custom i18n interpolation', () => {
    const customI18n: TimelineI18nConfig = {
      search: {
        resultsCount: 'Résultat {current} sur {total}',
      },
      accessibility: {
        itemPosition: 'Élément {current} de {total}',
      },
    };

    const TestInterpolation: React.FC = () => {
      const { textResolver } = useTimelineContext();

      return (
        <div>
          <span data-testid="search-results">{textResolver.searchResults(2, 8)}</span>
          <span data-testid="item-position">{textResolver.itemPosition(5, 12)}</span>
        </div>
      );
    };

    const { getByTestId } = render(
      <TimelineContextProvider {...defaultProps} i18nConfig={customI18n}>
        <TestInterpolation />
      </TimelineContextProvider>
    );

    expect(getByTestId('search-results')).toHaveTextContent('Résultat 2 sur 8');
    expect(getByTestId('item-position')).toHaveTextContent('Élément 5 de 12');
  });
});