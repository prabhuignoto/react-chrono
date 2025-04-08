import { useMemo } from 'react';
import { hexToRGBA } from '../utils';

const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const useBackground = (color?: string, opacity = 0.8): string => {
  return useMemo(() => {
    if (!color) return '';
    if (!isValidHexColor(color)) {
      console.warn(`Invalid hex color: ${color}`);
      return '';
    }
    return hexToRGBA(color, opacity);
  }, [color, opacity]);
};
