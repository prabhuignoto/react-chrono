import {
  getUniqueID,
  hexToRGBA,
  getDefaultThemeOrDark,
  getDefaultClassNames,
  getDefaultButtonTexts,
  getSlideShowType,
} from './index'; // Update the path accordingly
import { darkTheme, defaultTheme } from '../components/common/themes';
import { TimelineMode } from '@models/TimelineModel';
import { describe, it } from 'vitest';

describe('Utility Functions', () => {
  it('uniqueID should generate a unique ID of length 7', () => {
    const id = getUniqueID();
    expect(id).toHaveLength(7);
  });

  it('hexToRGBA should convert hex to rgba', () => {
    const rgba = hexToRGBA('#FF5733', 0.5);
    expect(rgba).toBe('rgba(255, 87, 51, 0.5)');
  });

  it('getDefaultThemeOrDark should return dark theme if isDark is true', () => {
    expect(getDefaultThemeOrDark(true)).toEqual(darkTheme);
  });

  it('getDefaultThemeOrDark should return default theme if isDark is false or undefined', () => {
    expect(getDefaultThemeOrDark(false)).toEqual(defaultTheme);
    expect(getDefaultThemeOrDark()).toEqual(defaultTheme);
  });

  it('getDefaultClassNames should return default class names', () => {
    expect(getDefaultClassNames()).toEqual({
      card: 'rc-card',
      cardMedia: 'rc-card-media',
      cardSubTitle: 'rc-card-subtitle',
      cardText: 'rc-card-text',
      cardTitle: 'rc-card-title',
      controls: 'rc-controls',
      title: 'rc-title',
    });
  });

  it('getDefaultButtonTexts should return default button texts', () => {
    expect(getDefaultButtonTexts()).toEqual({
      dark: 'Switch to Dark Mode',
      first: 'Go to First',
      last: 'Go to Last',
      light: 'Switch to Light Mode',
      next: 'Next',
      play: 'Play Slideshow',
      previous: 'Previous',
      stop: 'Stop Slideshow',
    });
  });

  it('getSlideShowType should return reveal for HORIZONTAL and VERTICAL modes', () => {
    expect(getSlideShowType('HORIZONTAL')).toBe('reveal');
    expect(getSlideShowType('VERTICAL')).toBe('reveal');
  });

  it('getSlideShowType should return slide_from_sides for VERTICAL_ALTERNATING mode', () => {
    expect(getSlideShowType('VERTICAL_ALTERNATING')).toBe('slide_from_sides');
  });

  it('getSlideShowType should return reveal for other modes', () => {
    expect(getSlideShowType('OTHER_MODE' as TimelineMode)).toBe('reveal');
  });
});
