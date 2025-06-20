import { useCallback } from 'react';

/**
 * Hook to measure the height of a DOM element
 * @param onRender - Callback function that receives the element height
 * @returns Callback ref to attach to the element to measure
 */
export const useMeasureHeight = (onRender?: (height: number) => void) => {
  return useCallback(
    (node: HTMLDivElement | null) => {
      if (node && onRender) {
        requestAnimationFrame(() => onRender(node.clientHeight));
      }
    },
    [onRender],
  );
};
