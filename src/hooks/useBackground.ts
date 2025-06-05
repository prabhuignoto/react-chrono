import { useMemo } from 'react';
import { hexToRGBA } from '../utils';

// Pre-compiled regex for better performance
const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const isValidHexColor = (color: string): boolean => HEX_COLOR_REGEX.test(color);

export const useBackground = (color?: string, opacity = 0.8): string => {
  return useMemo(() => {
    if (!color) return '';
    if (!isValidHexColor(color)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid hex color: ${color}`);
      }
      return '';
    }
    return hexToRGBA(color, opacity);
  }, [color, opacity]);
};
