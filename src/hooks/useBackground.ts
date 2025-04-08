import { useMemo } from 'react';
import { hexToRGBA } from '../utils';

export const useBackground = (color?: string, opacity = 0.8): string => {
  return useMemo(() => {
    if (!color) return '';
    return hexToRGBA(color, opacity);
  }, [color, opacity]);
};
