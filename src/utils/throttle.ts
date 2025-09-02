/**
 * Creates a throttled version of a function that limits invocations
 * @param fn - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns Throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
          inThrottle = true;
          setTimeout(() => {
            inThrottle = false;
          }, limit);
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

/**
 * Creates a debounced version of a function that delays invocation
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns Debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Creates an RAF-throttled version of a function for smooth animations
 * @param fn - The function to throttle
 * @returns RAF-throttled version of the function
 */
export function rafThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    lastArgs = args;
    
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          fn.apply(this, lastArgs);
        }
        rafId = null;
      });
    }
  };
}