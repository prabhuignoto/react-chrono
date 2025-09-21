import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useI18n, mapI18nToButtonTexts } from '../useI18n';
import { TimelineI18nConfig } from '@models/TimelineI18n';

describe('useI18n', () => {
  it('should return default texts when no config is provided', () => {
    const { result } = renderHook(() => useI18n());

    expect(result.current.navigation.first()).toBe('Go to first item');
    expect(result.current.navigation.next()).toBe('Next item');
    expect(result.current.search.placeholder()).toBe('Search Timeline');
    expect(result.current.theme.darkMode()).toBe('Switch to dark mode');
  });

  it('should use custom i18n config when provided', () => {
    const customConfig: TimelineI18nConfig = {
      navigation: {
        first: 'Premier élément',
        next: 'Suivant',
      },
      search: {
        placeholder: 'Rechercher dans la chronologie',
        ariaLabel: 'Rechercher du contenu',
      },
    };

    const { result } = renderHook(() => useI18n(customConfig));

    expect(result.current.navigation.first()).toBe('Premier élément');
    expect(result.current.navigation.next()).toBe('Suivant');
    expect(result.current.search.placeholder()).toBe('Rechercher dans la chronologie');
    expect(result.current.search.ariaLabel()).toBe('Rechercher du contenu');
    
    // Should fallback to defaults for non-provided values
    expect(result.current.navigation.last()).toBe('Go to last item');
  });

  it('should handle interpolated strings correctly', () => {
    const customConfig: TimelineI18nConfig = {
      search: {
        resultsCount: 'Résultat {current} sur {total}',
      },
      accessibility: {
        itemPosition: 'Élément {current} de {total}',
      },
    };

    const { result } = renderHook(() => useI18n(customConfig));

    expect(result.current.search.resultsCount(3, 10)).toBe('Résultat 3 sur 10');
    expect(result.current.accessibility.itemPosition(2, 5)).toBe('Élément 2 de 5');
  });

  it('should provide all text categories', () => {
    const { result } = renderHook(() => useI18n());

    // Check that all categories are present
    expect(result.current.navigation).toBeDefined();
    expect(result.current.search).toBeDefined();
    expect(result.current.theme).toBeDefined();
    expect(result.current.layout).toBeDefined();
    expect(result.current.fullscreen).toBeDefined();
    expect(result.current.quickJump).toBeDefined();
    expect(result.current.content).toBeDefined();
    expect(result.current.status).toBeDefined();
    expect(result.current.accessibility).toBeDefined();
    expect(result.current.view).toBeDefined();
    expect(result.current.keyboard).toBeDefined();
  });

  it('should handle partial configs correctly', () => {
    const partialConfig: TimelineI18nConfig = {
      navigation: {
        first: 'Custom First',
        // next is not provided
      },
    };

    const { result } = renderHook(() => useI18n(partialConfig));

    expect(result.current.navigation.first()).toBe('Custom First');
    expect(result.current.navigation.next()).toBe('Next item'); // default
  });

  it('should update when config changes', () => {
    const config1: TimelineI18nConfig = {
      navigation: { first: 'First Config 1' },
    };
    const config2: TimelineI18nConfig = {
      navigation: { first: 'First Config 2' },
    };

    const { result, rerender } = renderHook(
      ({ config }) => useI18n(config),
      { initialProps: { config: config1 } }
    );

    expect(result.current.navigation.first()).toBe('First Config 1');

    rerender({ config: config2 });
    expect(result.current.navigation.first()).toBe('First Config 2');
  });

  it('should handle empty strings gracefully', () => {
    const customConfig: TimelineI18nConfig = {
      navigation: {
        first: '',
        next: '',
      },
      search: {
        placeholder: '',
      },
    };

    const { result } = renderHook(() => useI18n(customConfig));

    expect(result.current.navigation.first()).toBe('');
    expect(result.current.navigation.next()).toBe('');
    expect(result.current.search.placeholder()).toBe('');
  });

  it('should handle undefined config gracefully', () => {
    const { result } = renderHook(() => useI18n(undefined));

    expect(result.current.navigation.first()).toBe('Go to first item');
    expect(result.current.search.placeholder()).toBe('Search Timeline');
  });

  it('should handle nested interpolation edge cases', () => {
    const customConfig: TimelineI18nConfig = {
      search: {
        resultsCount: 'Result {current} out of {total} items ({missing})',
      },
    };

    const { result } = renderHook(() => useI18n(customConfig));

    // Should handle missing variables gracefully
    expect(result.current.search.resultsCount(3, 10)).toBe('Result 3 out of 10 items ({missing})');
  });

  it('should handle all category functions', () => {
    const { result } = renderHook(() => useI18n());

    // Test all category methods exist and return strings
    expect(typeof result.current.layout.vertical()).toBe('string');
    expect(typeof result.current.layout.horizontal()).toBe('string');
    expect(typeof result.current.layout.alternating()).toBe('string');
    expect(typeof result.current.fullscreen.enterFullscreen()).toBe('string');
    expect(typeof result.current.fullscreen.exitFullscreen()).toBe('string');
    expect(typeof result.current.quickJump.jumpTo()).toBe('string');
    expect(typeof result.current.view.compact()).toBe('string');
    expect(typeof result.current.view.detailed()).toBe('string');
    expect(typeof result.current.keyboard.arrowKeys()).toBe('string');
  });

  describe('mapI18nToButtonTexts', () => {
    it('should map i18n config to legacy buttonTexts format', () => {
      const customConfig: TimelineI18nConfig = {
        navigation: {
          first: 'Premier',
          last: 'Dernier',
          next: 'Suivant',
          previous: 'Précédent',
          play: 'Jouer',
          stop: 'Arrêter',
        },
        search: {
          placeholder: 'Rechercher',
          ariaLabel: 'Label de recherche',
          clearLabel: 'Effacer',
          nextMatch: 'Résultat suivant',
          previousMatch: 'Résultat précédent',
        },
        theme: {
          darkMode: 'Mode sombre',
          lightMode: 'Mode clair',
        },
      };

      const { result } = renderHook(() => mapI18nToButtonTexts(customConfig));
      const buttonTexts = result.current;

      expect(buttonTexts.first).toBe('Premier');
      expect(buttonTexts.last).toBe('Dernier');
      expect(buttonTexts.next).toBe('Suivant');
      expect(buttonTexts.previous).toBe('Précédent');
      expect(buttonTexts.play).toBe('Jouer');
      expect(buttonTexts.stop).toBe('Arrêter');
      expect(buttonTexts.searchPlaceholder).toBe('Rechercher');
      expect(buttonTexts.searchAriaLabel).toBe('Label de recherche');
      expect(buttonTexts.clearSearch).toBe('Effacer');
      expect(buttonTexts.nextMatch).toBe('Résultat suivant');
      expect(buttonTexts.previousMatch).toBe('Résultat précédent');
      expect(buttonTexts.dark).toBe('Mode sombre');
      expect(buttonTexts.light).toBe('Mode clair');
    });

    it('should use defaults when no config provided', () => {
      const { result } = renderHook(() => mapI18nToButtonTexts());
      const buttonTexts = result.current;

      expect(buttonTexts.first).toBe('Go to first item');
      expect(buttonTexts.searchPlaceholder).toBe('Search Timeline');
      expect(buttonTexts.dark).toBe('Switch to dark mode');
    });

    it('should handle partial config mapping correctly', () => {
      const partialConfig: TimelineI18nConfig = {
        navigation: {
          first: 'Custom First',
          // other navigation items missing
        },
        search: {
          placeholder: 'Custom Search',
          // other search items missing
        },
      };

      const { result } = renderHook(() => mapI18nToButtonTexts(partialConfig));
      const buttonTexts = result.current;

      expect(buttonTexts.first).toBe('Custom First');
      expect(buttonTexts.last).toBe('Go to last item'); // default
      expect(buttonTexts.searchPlaceholder).toBe('Custom Search');
      expect(buttonTexts.clearSearch).toBe('Clear Search'); // default
    });
  });
});