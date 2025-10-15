import { describe, it, expect } from 'vitest';
import {
  mergeI18nConfig,
  interpolateString,
  TimelineI18nConfig,
  defaultI18nTexts,
} from '../TimelineI18n';

describe('TimelineI18n', () => {
  describe('mergeI18nConfig', () => {
    it('should return default config when no user config provided', () => {
      const result = mergeI18nConfig();

      expect(result).toEqual(defaultI18nTexts);
      expect(result.navigation.first).toBe('Go to first item');
      expect(result.search.placeholder).toBe('Search Timeline');
    });

    it('should return default config when undefined is provided', () => {
      const result = mergeI18nConfig(undefined);

      expect(result).toEqual(defaultI18nTexts);
    });

    it('should merge partial user config with defaults', () => {
      const userConfig: TimelineI18nConfig = {
        navigation: {
          first: 'Custom First',
          next: 'Custom Next',
          // other navigation props missing
        },
        search: {
          placeholder: 'Custom Search',
          // other search props missing
        },
      };

      const result = mergeI18nConfig(userConfig);

      // Check user overrides
      expect(result.navigation.first).toBe('Custom First');
      expect(result.navigation.next).toBe('Custom Next');
      expect(result.search.placeholder).toBe('Custom Search');

      // Check defaults are preserved
      expect(result.navigation.last).toBe('Go to last item');
      expect(result.search.ariaLabel).toBe('Search timeline content');
      expect(result.theme.darkMode).toBe('Switch to dark mode');
    });

    it('should handle empty config objects', () => {
      const userConfig: TimelineI18nConfig = {
        navigation: {},
        search: {},
        theme: {},
      };

      const result = mergeI18nConfig(userConfig);

      // Should use all defaults when empty objects provided
      expect(result.navigation.first).toBe('Go to first item');
      expect(result.search.placeholder).toBe('Search Timeline');
      expect(result.theme.darkMode).toBe('Switch to dark mode');
    });

    it('should handle complete config override', () => {
      const userConfig: TimelineI18nConfig = {
        navigation: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior',
          play: 'Reproducir',
          stop: 'Detener',
          pause: 'Pausar',
          resume: 'Reanudar',
        },
        search: {
          placeholder: 'Buscar en la cronología',
          ariaLabel: 'Buscar contenido',
          clearLabel: 'Limpiar búsqueda',
          nextMatch: 'Siguiente coincidencia',
          previousMatch: 'Coincidencia anterior',
          resultsCount: '{current} de {total}',
          noResults: 'No se encontraron resultados',
          navigationLabel: 'Navegación de búsqueda',
        },
      };

      const result = mergeI18nConfig(userConfig);

      // Check all user values are preserved
      expect(result.navigation.first).toBe('Primero');
      expect(result.navigation.last).toBe('Último');
      expect(result.search.placeholder).toBe('Buscar en la cronología');
      expect(result.search.ariaLabel).toBe('Buscar contenido');

      // Check other categories still have defaults
      expect(result.theme.darkMode).toBe('Switch to dark mode');
      expect(result.fullscreen.enterFullscreen).toBe('Enter fullscreen');
    });
  });

  describe('interpolateString', () => {
    it('should replace single variable', () => {
      const template = 'Hello {name}';
      const variables = { name: 'World' };

      expect(interpolateString(template, variables)).toBe('Hello World');
    });

    it('should replace multiple variables', () => {
      const template = '{current} of {total} items';
      const variables = { current: 3, total: 10 };

      expect(interpolateString(template, variables)).toBe('3 of 10 items');
    });

    it('should handle missing variables gracefully', () => {
      const template = '{current} of {total} ({missing})';
      const variables = { current: 3, total: 10 };

      expect(interpolateString(template, variables)).toBe(
        '3 of 10 ({missing})',
      );
    });

    it('should handle empty variables object', () => {
      const template = 'Hello {name}';
      const variables = {};

      expect(interpolateString(template, variables)).toBe('Hello {name}');
    });

    it('should handle no placeholders', () => {
      const template = 'Hello World';
      const variables = { name: 'Test' };

      expect(interpolateString(template, variables)).toBe('Hello World');
    });

    it('should handle mixed variable types', () => {
      const template = 'User {name} has {count} points and {active} status';
      const variables = {
        name: 'John',
        count: 42,
        active: true,
      };

      expect(interpolateString(template, variables)).toBe(
        'User John has 42 points and true status',
      );
    });

    it('should handle duplicate placeholders', () => {
      const template = '{value} + {value} = {result}';
      const variables = { value: 5, result: 10 };

      expect(interpolateString(template, variables)).toBe('5 + 5 = 10');
    });

    it('should handle special characters in variables', () => {
      const template = 'Path: {path}';
      const variables = { path: '/users/{id}/profile' };

      expect(interpolateString(template, variables)).toBe(
        'Path: /users/{id}/profile',
      );
    });

    it('should handle zero and null values', () => {
      const template = 'Count: {count}, Value: {value}';
      const variables = { count: 0, value: null };

      // null values should not be interpolated, leaving the placeholder
      expect(interpolateString(template, variables)).toBe(
        'Count: 0, Value: {value}',
      );
    });

    it('should handle undefined values', () => {
      const template = 'Name: {name}, Age: {age}';
      const variables = { name: 'John', age: undefined };

      expect(interpolateString(template, variables)).toBe(
        'Name: John, Age: {age}',
      );
    });
  });

  describe('defaultI18nTexts validation', () => {
    it('should have all required text categories', () => {
      expect(defaultI18nTexts.navigation).toBeDefined();
      expect(defaultI18nTexts.search).toBeDefined();
      expect(defaultI18nTexts.theme).toBeDefined();
      expect(defaultI18nTexts.layout).toBeDefined();
      expect(defaultI18nTexts.fullscreen).toBeDefined();
      expect(defaultI18nTexts.quickJump).toBeDefined();
      expect(defaultI18nTexts.content).toBeDefined();
      expect(defaultI18nTexts.status).toBeDefined();
      expect(defaultI18nTexts.accessibility).toBeDefined();
      expect(defaultI18nTexts.view).toBeDefined();
      expect(defaultI18nTexts.keyboard).toBeDefined();
    });

    it('should have all navigation texts', () => {
      const nav = defaultI18nTexts.navigation;
      expect(nav.first).toBe('Go to first item');
      expect(nav.last).toBe('Go to last item');
      expect(nav.next).toBe('Next item');
      expect(nav.previous).toBe('Previous item');
      expect(nav.play).toBe('Start slideshow');
      expect(nav.stop).toBe('Stop slideshow');
      expect(nav.pause).toBe('Pause slideshow');
      expect(nav.resume).toBe('Resume slideshow');
    });

    it('should have all search texts', () => {
      const search = defaultI18nTexts.search;
      expect(search.placeholder).toBe('Search Timeline');
      expect(search.ariaLabel).toBe('Search timeline content');
      expect(search.clearLabel).toBe('Clear Search');
      expect(search.nextMatch).toBe('Next Match (Enter)');
      expect(search.previousMatch).toBe('Previous Match (Shift+Enter)');
      expect(search.resultsCount).toBe('{current} of {total}');
      expect(search.noResults).toBe('No results found');
      expect(search.navigationLabel).toBe('Search navigation');
    });

    it('should have template strings with proper placeholder format', () => {
      // Check that template strings use {variable} format
      expect(defaultI18nTexts.search.resultsCount).toMatch(
        /\{current\}.*\{total\}/,
      );
      expect(defaultI18nTexts.accessibility.itemPosition).toMatch(
        /\{current\}.*\{total\}/,
      );
      expect(defaultI18nTexts.quickJump.itemTemplate).toMatch(
        /\{index\}.*\{title\}/,
      );
    });
  });
});
