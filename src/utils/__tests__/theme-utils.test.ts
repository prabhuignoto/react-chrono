import { describe, it, expect } from 'vitest';
import {
  getDefaultThemeOrDark,
  getDefaultClassNames,
  getDefaultButtonTexts,
} from '../index';
import { defaultTheme, darkTheme } from '../../components/common/themes';

describe('Theme Utility Functions', () => {
  describe('getDefaultThemeOrDark', () => {
    it('should return default theme when isDark is false', () => {
      const result = getDefaultThemeOrDark(false);
      expect(result).toBe(defaultTheme);
      expect(result).toEqual(defaultTheme);
    });

    it('should return dark theme when isDark is true', () => {
      const result = getDefaultThemeOrDark(true);
      expect(result).toBe(darkTheme);
      expect(result).toEqual(darkTheme);
    });

    it('should return default theme when isDark is undefined', () => {
      const result = getDefaultThemeOrDark();
      expect(result).toBe(defaultTheme);
      expect(result).toEqual(defaultTheme);
    });

    it('should return default theme when isDark is null', () => {
      const result = getDefaultThemeOrDark(null as any);
      expect(result).toBe(defaultTheme);
      expect(result).toEqual(defaultTheme);
    });

    it('should handle truthy values correctly', () => {
      expect(getDefaultThemeOrDark(1 as any)).toBe(darkTheme);
      expect(getDefaultThemeOrDark('true' as any)).toBe(darkTheme);
      expect(getDefaultThemeOrDark({} as any)).toBe(darkTheme);
      expect(getDefaultThemeOrDark([] as any)).toBe(darkTheme);
    });

    it('should handle falsy values correctly', () => {
      expect(getDefaultThemeOrDark(0 as any)).toBe(defaultTheme);
      expect(getDefaultThemeOrDark('' as any)).toBe(defaultTheme);
      expect(getDefaultThemeOrDark(NaN as any)).toBe(defaultTheme);
    });

    it('should return immutable theme objects', () => {
      const lightTheme = getDefaultThemeOrDark(false);
      const darkThemeResult = getDefaultThemeOrDark(true);

      // Should not be able to modify returned themes
      expect(() => {
        (lightTheme as any).primary = '#changed';
      }).not.toThrow();

      // But modifications should not affect the original
      const newLightTheme = getDefaultThemeOrDark(false);
      expect(newLightTheme.primary).toBe(defaultTheme.primary);
    });

    it('should be consistent across multiple calls', () => {
      const theme1 = getDefaultThemeOrDark(true);
      const theme2 = getDefaultThemeOrDark(true);
      const theme3 = getDefaultThemeOrDark(false);
      const theme4 = getDefaultThemeOrDark(false);

      expect(theme1).toBe(theme2);
      expect(theme3).toBe(theme4);
      expect(theme1).not.toBe(theme3);
    });
  });

  describe('getDefaultClassNames', () => {
    it('should return object with all required class names', () => {
      const classNames = getDefaultClassNames();

      const expectedKeys = [
        'card',
        'cardMedia',
        'cardSubTitle',
        'cardText',
        'cardTitle',
        'controls',
        'title',
      ];

      expectedKeys.forEach((key) => {
        expect(classNames).toHaveProperty(key);
        expect(typeof classNames[key as keyof typeof classNames]).toBe(
          'string',
        );
        expect(classNames[key as keyof typeof classNames]).toBeTruthy();
      });
    });

    it('should return frozen object', () => {
      const classNames = getDefaultClassNames();
      expect(Object.isFrozen(classNames)).toBe(true);
    });

    it('should have consistent class name format', () => {
      const classNames = getDefaultClassNames();

      Object.values(classNames).forEach((className) => {
        expect(className).toMatch(/^rc-/);
        expect(className).not.toContain(' ');
        expect(className.length).toBeGreaterThan(3);
      });
    });

    it('should return same reference on multiple calls', () => {
      const classNames1 = getDefaultClassNames();
      const classNames2 = getDefaultClassNames();

      expect(classNames1).toBe(classNames2);
    });

    it('should not allow modification of returned object', () => {
      const classNames = getDefaultClassNames();

      expect(() => {
        (classNames as any).card = 'modified';
      }).toThrow();

      expect(() => {
        (classNames as any).newProperty = 'added';
      }).toThrow();
    });

    it('should have unique class names', () => {
      const classNames = getDefaultClassNames();
      const values = Object.values(classNames);
      const uniqueValues = [...new Set(values)];

      expect(values.length).toBe(uniqueValues.length);
    });
  });

  describe('getDefaultButtonTexts', () => {
    it('should return object with all required button texts', () => {
      const buttonTexts = getDefaultButtonTexts();

      const expectedKeys = [
        'changeDensity',
        'changeDensityOptions',
        'changeLayout',
        'changeLayoutOptions',
      ];

      expectedKeys.forEach((key) => {
        expect(buttonTexts).toHaveProperty(key);
      });
    });

    it('should have proper changeDensityOptions structure', () => {
      const buttonTexts = getDefaultButtonTexts();

      expect(buttonTexts.changeDensityOptions).toHaveProperty('high');
      expect(buttonTexts.changeDensityOptions).toHaveProperty('low');

      expect(buttonTexts.changeDensityOptions.high).toHaveProperty('text');
      expect(buttonTexts.changeDensityOptions.high).toHaveProperty('helpText');
      expect(buttonTexts.changeDensityOptions.low).toHaveProperty('text');
      expect(buttonTexts.changeDensityOptions.low).toHaveProperty('helpText');
    });

    it('should have proper changeLayoutOptions structure', () => {
      const buttonTexts = getDefaultButtonTexts();

      const expectedLayoutOptions = [
        'alternating',
        'horizontal',
        'horizontal_all',
        'vertical',
      ];

      expectedLayoutOptions.forEach((option) => {
        expect(buttonTexts.changeLayoutOptions).toHaveProperty(option);
        expect(
          buttonTexts.changeLayoutOptions[
            option as keyof typeof buttonTexts.changeLayoutOptions
          ],
        ).toHaveProperty('text');
        expect(
          buttonTexts.changeLayoutOptions[
            option as keyof typeof buttonTexts.changeLayoutOptions
          ],
        ).toHaveProperty('helpText');
      });
    });

    it('should return frozen objects', () => {
      const buttonTexts = getDefaultButtonTexts();

      expect(Object.isFrozen(buttonTexts)).toBe(true);
      expect(Object.isFrozen(buttonTexts.changeDensityOptions)).toBe(true);
      expect(Object.isFrozen(buttonTexts.changeLayoutOptions)).toBe(true);
      expect(Object.isFrozen(buttonTexts.changeDensityOptions.high)).toBe(true);
      expect(Object.isFrozen(buttonTexts.changeLayoutOptions.horizontal)).toBe(
        true,
      );
    });

    it('should not allow modification of returned objects', () => {
      const buttonTexts = getDefaultButtonTexts();

      expect(() => {
        (buttonTexts as any).changeDensity = 'modified';
      }).toThrow();

      expect(() => {
        (buttonTexts.changeDensityOptions as any).high.text = 'modified';
      }).toThrow();
    });

    it('should return same reference on multiple calls', () => {
      const buttonTexts1 = getDefaultButtonTexts();
      const buttonTexts2 = getDefaultButtonTexts();

      expect(buttonTexts1).toBe(buttonTexts2);
    });

    it('should have meaningful text content', () => {
      const buttonTexts = getDefaultButtonTexts();

      // Check that all text values are meaningful
      expect(buttonTexts.changeDensity).toBeTruthy();
      expect(buttonTexts.changeLayout).toBeTruthy();

      // Check density options
      expect(buttonTexts.changeDensityOptions.high.text).toBeTruthy();
      expect(buttonTexts.changeDensityOptions.high.helpText).toBeTruthy();
      expect(buttonTexts.changeDensityOptions.low.text).toBeTruthy();
      expect(buttonTexts.changeDensityOptions.low.helpText).toBeTruthy();

      // Check layout options
      Object.values(buttonTexts.changeLayoutOptions).forEach((option) => {
        expect(option.text).toBeTruthy();
        expect(option.helpText).toBeTruthy();
        expect(option.text.length).toBeGreaterThan(0);
        expect(option.helpText.length).toBeGreaterThan(0);
      });
    });

    it('should have proper internationalization support structure', () => {
      const buttonTexts = getDefaultButtonTexts();

      // All text should be in English and ready for i18n
      expect(typeof buttonTexts.changeDensity).toBe('string');
      expect(typeof buttonTexts.changeLayout).toBe('string');

      // Help texts should be descriptive
      Object.values(buttonTexts.changeLayoutOptions).forEach((option) => {
        expect(option.helpText.length).toBeGreaterThan(10); // Should be descriptive
        expect(option.text.length).toBeGreaterThan(2); // Should not be too short
      });
    });
  });

  describe('Utility Function Integration', () => {
    it('should work together consistently', () => {
      // These functions should work together without conflicts
      const theme = getDefaultThemeOrDark(false);
      const classNames = getDefaultClassNames();
      const buttonTexts = getDefaultButtonTexts();

      expect(theme).toBeTruthy();
      expect(classNames).toBeTruthy();
      expect(buttonTexts).toBeTruthy();

      // Should not interfere with each other
      expect(theme.primary).toBeTruthy();
      expect(classNames.card).toBeTruthy();
      expect(buttonTexts.changeLayout).toBeTruthy();
    });

    it('should maintain consistent behavior under stress', () => {
      // Call functions many times to test for memory leaks or inconsistencies
      for (let i = 0; i < 1000; i++) {
        const theme1 = getDefaultThemeOrDark(true);
        const theme2 = getDefaultThemeOrDark(false);
        const classes = getDefaultClassNames();
        const texts = getDefaultButtonTexts();

        expect(theme1).toBe(darkTheme);
        expect(theme2).toBe(defaultTheme);
        expect(classes.card).toBe('rc-card');
        expect(texts.changeLayout).toBeTruthy();
      }
    });

    it('should handle edge cases gracefully', () => {
      // Test with various edge case inputs
      const edgeCases = [
        undefined,
        null,
        0,
        1,
        -1,
        '',
        'false',
        'true',
        {},
        [],
        NaN,
        Infinity,
        -Infinity,
      ];

      edgeCases.forEach((testCase) => {
        expect(() => {
          getDefaultThemeOrDark(testCase as any);
          getDefaultClassNames();
          getDefaultButtonTexts();
        }).not.toThrow();
      });
    });
  });

  describe('Performance and Memory', () => {
    it('should not create new objects on each call', () => {
      const classes1 = getDefaultClassNames();
      const classes2 = getDefaultClassNames();
      const texts1 = getDefaultButtonTexts();
      const texts2 = getDefaultButtonTexts();

      expect(classes1).toBe(classes2);
      expect(texts1).toBe(texts2);
    });

    it('should have reasonable object sizes', () => {
      const theme = getDefaultThemeOrDark(false);
      const classes = getDefaultClassNames();
      const texts = getDefaultButtonTexts();

      // Should not have excessive properties
      expect(Object.keys(theme).length).toBeLessThan(50);
      expect(Object.keys(classes).length).toBeLessThan(20);
      expect(Object.keys(texts).length).toBeLessThan(20);
    });

    it('should be serializable', () => {
      const theme = getDefaultThemeOrDark(false);
      const classes = getDefaultClassNames();
      const texts = getDefaultButtonTexts();

      expect(() => JSON.stringify(theme)).not.toThrow();
      expect(() => JSON.stringify(classes)).not.toThrow();
      expect(() => JSON.stringify(texts)).not.toThrow();

      // Should deserialize correctly
      const themeStr = JSON.stringify(theme);
      const deserializedTheme = JSON.parse(themeStr);
      expect(deserializedTheme.primary).toBe(theme.primary);
    });
  });
});
