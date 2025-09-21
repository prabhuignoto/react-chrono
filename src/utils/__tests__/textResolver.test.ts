import { describe, it, expect } from 'vitest';
import { createTextResolver } from '../textResolver';
import type { ButtonTexts } from '@models/TimelineModel';

describe('textResolver', () => {
  describe('createTextResolver', () => {
    it('should use i18n values when available', () => {
      const mockI18nHelper = {
        search: {
          placeholder: () => 'Search Timeline (i18n)',
          ariaLabel: () => 'Search content (i18n)',
          clearLabel: () => 'Clear (i18n)',
        },
        navigation: {
          first: () => 'First (i18n)',
          next: () => 'Next (i18n)',
        },
      } as any;

      const textResolver = createTextResolver(mockI18nHelper);

      expect(textResolver.searchPlaceholder()).toBe('Search Timeline (i18n)');
      expect(textResolver.searchAriaLabel()).toBe('Search content (i18n)');
      expect(textResolver.clearSearch()).toBe('Clear (i18n)');
      expect(textResolver.firstItem()).toBe('First (i18n)');
      expect(textResolver.nextItem()).toBe('Next (i18n)');
    });

    it('should fallback to buttonTexts when i18n is not available', () => {
      const buttonTexts: Partial<ButtonTexts> = {
        first: 'First (legacy)',
        next: 'Next (legacy)',
      };

      const textResolver = createTextResolver(undefined, buttonTexts as ButtonTexts);

      expect(textResolver.firstItem()).toBe('First (legacy)');
      expect(textResolver.nextItem()).toBe('Next (legacy)');
    });

    it('should use default values when neither i18n nor buttonTexts are available', () => {
      const textResolver = createTextResolver();

      expect(textResolver.searchPlaceholder()).toBe('Search Timeline');
      expect(textResolver.searchAriaLabel()).toBe('Search timeline content');
      expect(textResolver.clearSearch()).toBe('Clear Search');
      expect(textResolver.firstItem()).toBe('Go to first item');
      expect(textResolver.nextItem()).toBe('Next item');
      expect(textResolver.noSearchResults()).toBe('No results found');
    });

    it('should prioritize i18n over buttonTexts', () => {
      const mockI18nHelper = {
        navigation: {
          first: () => 'First (i18n)',
        },
      } as any;

      const buttonTexts: Partial<ButtonTexts> = {
        first: 'First (legacy)',
      };

      const textResolver = createTextResolver(mockI18nHelper, buttonTexts as ButtonTexts);

      expect(textResolver.firstItem()).toBe('First (i18n)');
    });

    it('should handle dynamic text functions with parameters', () => {
      const mockI18nHelper = {
        search: {
          resultsCount: (current: number, total: number) => `Result ${current} of ${total} (i18n)`,
        },
        accessibility: {
          itemPosition: (current: number, total: number) => `Item ${current} of ${total} (i18n)`,
        },
      } as any;

      const textResolver = createTextResolver(mockI18nHelper);

      expect(textResolver.searchResults(3, 10)).toBe('Result 3 of 10 (i18n)');
      expect(textResolver.itemPosition(2, 5)).toBe('Item 2 of 5 (i18n)');
    });

    it('should provide default parameter-based text when i18n is not available', () => {
      const textResolver = createTextResolver();

      expect(textResolver.searchResults(3, 10)).toBe('3 of 10');
      expect(textResolver.itemPosition(2, 5)).toBe('Item 2 of 5');
    });

    it('should handle all text categories', () => {
      const textResolver = createTextResolver();

      // Navigation texts
      expect(textResolver.firstItem()).toBeTypeOf('string');
      expect(textResolver.lastItem()).toBeTypeOf('string');
      expect(textResolver.nextItem()).toBeTypeOf('string');
      expect(textResolver.previousItem()).toBeTypeOf('string');

      // Search texts
      expect(textResolver.searchPlaceholder()).toBeTypeOf('string');
      expect(textResolver.clearSearch()).toBeTypeOf('string');
      expect(textResolver.nextMatch()).toBeTypeOf('string');
      expect(textResolver.previousMatch()).toBeTypeOf('string');

      // Theme texts
      expect(textResolver.darkMode()).toBeTypeOf('string');
      expect(textResolver.lightMode()).toBeTypeOf('string');

      // Layout texts
      expect(textResolver.verticalLayout()).toBeTypeOf('string');
      expect(textResolver.horizontalLayout()).toBeTypeOf('string');

      // Content texts
      expect(textResolver.readMore()).toBeTypeOf('string');
      expect(textResolver.showLess()).toBeTypeOf('string');

      // Status texts
      expect(textResolver.loading()).toBeTypeOf('string');
      expect(textResolver.error()).toBeTypeOf('string');
      expect(textResolver.noItems()).toBeTypeOf('string');
    });

    it('should handle legacy buttonTexts for search', () => {
      const buttonTexts = {
        searchPlaceholder: 'Search Legacy',
        searchAriaLabel: 'Search Aria Legacy',
        clearSearch: 'Clear Legacy',
        nextMatch: 'Next Legacy',
        previousMatch: 'Previous Legacy',
      } as any;

      const textResolver = createTextResolver(undefined, buttonTexts);

      expect(textResolver.searchPlaceholder()).toBe('Search Legacy');
      expect(textResolver.searchAriaLabel()).toBe('Search Aria Legacy');
      expect(textResolver.clearSearch()).toBe('Clear Legacy');
      expect(textResolver.nextMatch()).toBe('Next Legacy');
      expect(textResolver.previousMatch()).toBe('Previous Legacy');
    });
  });
});