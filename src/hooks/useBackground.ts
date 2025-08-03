import { useMemo } from 'react';
import { hexToRGBA } from '../utils';
import {
  detectColorFormat,
  adjustRGBOpacity,
  adjustHSLOpacity,
  HEX_COLOR_REGEX,
  ColorFormat,
} from './utils';

const isValidHexColor = (color: string): boolean => HEX_COLOR_REGEX.test(color);

interface UseBackgroundOptions {
  format?: ColorFormat | 'auto';
}

/**
 * Hook that converts a color to RGBA format with opacity
 * @param color - The color string (hex, rgb, rgba, hsl, hsla)
 * @param opacity - The opacity value (0-1)
 * @param options - Additional options
 * @returns The color in RGBA format with the specified opacity
 */
export const useBackground = (
  color?: string,
  opacity = 0.8,
  options: UseBackgroundOptions = {},
): string => {
  const { format = 'auto' } = options;

  return useMemo(() => {
    if (!color) return '';

    // Auto-detect format if needed
    const colorFormat = format === 'auto' ? detectColorFormat(color) : format;

    switch (colorFormat) {
      case 'hex':
        if (!isValidHexColor(color)) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Invalid hex color: ${color}`);
          }
          return '';
        }
        return hexToRGBA(color, opacity);

      case 'rgb':
      case 'rgba':
        return adjustRGBOpacity(color, opacity);

      case 'hsl':
      case 'hsla':
        return adjustHSLOpacity(color, opacity);

      default:
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Unsupported color format: ${color}`);
        }
        return '';
    }
  }, [color, opacity, format]);
};
