import { useState, useEffect } from 'react';

/**
 * usePrefersReducedMotion - Detects user's motion preference
 *
 * This hook checks the user's `prefers-reduced-motion` media query preference
 * and returns a boolean indicating whether reduced motion is preferred.
 *
 * WCAG References:
 * - 2.3.3 Animation from Interactions (Level AAA)
 * - WCAG22 Understanding: Respect user preferences for reduced motion
 *
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 *
 * @example
 * ```typescript
 * const prefersReducedMotion = usePrefersReducedMotion();
 *
 * return (
 *   <motion.div
 *     animate={{ opacity: 1 }}
 *     transition={{
 *       duration: prefersReducedMotion ? 0 : 0.3,
 *       type: prefersReducedMotion ? 'tween' : 'spring',
 *     }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 *
 * @example
 * ```typescript
 * // Conditional animations
 * const prefersReducedMotion = usePrefersReducedMotion();
 *
 * return (
 *   <div
 *     style={{
 *       transition: prefersReducedMotion
 *         ? 'none'
 *         : 'transform 0.3s ease-out',
 *     }}
 *   >
 *     Content
 *   </div>
 * );
 * ```
 */
export const usePrefersReducedMotion = (): boolean => {
  // Initialize with current preference
  const getInitialState = (): boolean => {
    if (typeof window === 'undefined') return false;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  };

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    getInitialState,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Update state when preference changes
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }
  }, []);

  return prefersReducedMotion;
};
