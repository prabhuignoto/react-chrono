import { useCallback } from 'react';

type MeasurableProperty = 
  | 'clientHeight'
  | 'clientWidth'
  | 'scrollHeight'
  | 'scrollWidth'
  | 'offsetHeight'
  | 'offsetWidth';

type MeasurementResult = {
  value: number;
  element: HTMLElement;
};

interface UseMeasureOptions {
  property?: MeasurableProperty;
  delay?: number;
  onError?: (error: Error) => void;
}

/**
 * Hook to measure dimensions of a DOM element
 * @param onMeasure - Callback function that receives the measurement
 * @param options - Measurement options
 * @returns Callback ref to attach to the element to measure
 */
export const useMeasure = <T extends HTMLElement = HTMLDivElement>(
  onMeasure?: (result: MeasurementResult) => void,
  options: UseMeasureOptions = {}
) => {
  const { 
    property = 'clientHeight', 
    delay = 0,
    onError 
  } = options;

  return useCallback(
    (node: T | null) => {
      if (!node || !onMeasure) return;

      const measure = () => {
        try {
          const value = node[property];
          onMeasure({ value, element: node });
        } catch (error) {
          if (onError) {
            onError(error instanceof Error ? error : new Error(String(error)));
          } else if (process.env.NODE_ENV === 'development') {
            console.error(`Failed to measure ${property}:`, error);
          }
        }
      };

      if (delay > 0) {
        setTimeout(() => {
          requestAnimationFrame(measure);
        }, delay);
      } else {
        requestAnimationFrame(measure);
      }
    },
    [onMeasure, property, delay, onError],
  );
};

/**
 * Legacy hook for backward compatibility
 * @deprecated Use useMeasure instead
 */
export const useMeasureHeight = (onRender?: (height: number) => void) => {
  return useMeasure<HTMLDivElement>(
    onRender ? (result) => onRender(result.value) : undefined,
    { property: 'clientHeight' }
  );
};
