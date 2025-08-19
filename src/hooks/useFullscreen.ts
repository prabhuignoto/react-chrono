import { useCallback, useEffect, useState, RefObject } from 'react';

/**
 * Browser detection utility for fullscreen API differences
 * Enhanced to detect specific browser versions and capabilities
 */
const getBrowserInfo = () => {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const vendor = typeof navigator !== 'undefined' ? navigator.vendor : '';

  return {
    isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    isSafari:
      /Safari/.test(userAgent) &&
      !/Chrome/.test(userAgent) &&
      /Apple/.test(vendor),
    isEdge: /Edge/.test(userAgent) || /Edg\//.test(userAgent),
    isIE: /Trident/.test(userAgent),
    isMobile: /Mobi|Android/i.test(userAgent),
    // Safari version detection for method selection
    safariVersion:
      /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
        ? parseFloat(
            (userAgent.match(/Version\/(\d+\.\d+)/) || ['', '0'])[1] || '0',
          )
        : 0,
    // Chrome version for modern API support
    chromeVersion: /Chrome/.test(userAgent)
      ? parseInt((userAgent.match(/Chrome\/(\d+)/) || ['', '0'])[1] || '0', 10)
      : 0,
  };
};

/**
 * Fullscreen API interface for better TypeScript support
 * Covers all browser implementations including Safari's unique behavior
 */
interface FullscreenDocument extends Document {
  fullscreenElement: Element | null;
  mozFullScreenElement?: Element | null;
  webkitFullscreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  // Support properties
  fullscreenEnabled: boolean;
  mozFullScreenEnabled?: boolean;
  webkitFullscreenEnabled?: boolean;
  msFullscreenEnabled?: boolean;
  // Exit methods
  exitFullscreen: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  webkitCancelFullScreen?: () => Promise<void>; // Safari alternative
  msExitFullscreen?: () => Promise<void>;
}

interface FullscreenElement extends Element {
  requestFullscreen: (options?: FullscreenOptions) => Promise<void>;
  mozRequestFullScreen?: (options?: any) => Promise<void>;
  webkitRequestFullscreen?: (options?: any) => Promise<void>;
  webkitRequestFullScreen?: (options?: any) => Promise<void>; // Safari alternative
  msRequestFullscreen?: (options?: any) => Promise<void>;
}

// Fullscreen options for modern browsers
interface FullscreenOptions {
  navigationUI?: 'auto' | 'show' | 'hide';
}

/**
 * Hook return type
 */
interface UseFullscreenReturn {
  isFullscreen: boolean;
  isSupported: boolean;
  toggleFullscreen: () => Promise<void>;
  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
  error: string | null;
}

/**
 * Hook options
 */
interface UseFullscreenOptions {
  onEnter?: () => void;
  onExit?: () => void;
  onError?: (error: string) => void;
}

/**
 * Custom hook for managing fullscreen functionality
 * Provides cross-browser compatible fullscreen API with proper error handling
 *
 * @param elementRef - Ref to the element to make fullscreen
 * @param options - Optional callbacks for fullscreen events
 * @returns Object with fullscreen state and control functions
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const { isFullscreen, toggleFullscreen, isSupported } = useFullscreen(containerRef, {
 *   onEnter: () => console.log('Entered fullscreen'),
 *   onExit: () => console.log('Exited fullscreen'),
 * });
 * ```
 */
export const useFullscreen = (
  elementRef: RefObject<HTMLElement>,
  options: UseFullscreenOptions = {},
): UseFullscreenReturn => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if fullscreen API is supported - comprehensive cross-browser check
  const isSupported = useCallback((): boolean => {
    if (typeof document === 'undefined' || typeof navigator === 'undefined')
      return false;

    const doc = document as FullscreenDocument;
    const element = document.createElement('div') as FullscreenElement;
    const browserInfo = getBrowserInfo();

    // Check for support properties
    const hasEnabledProperty = !!(
      doc.fullscreenEnabled ||
      doc.mozFullScreenEnabled ||
      doc.webkitFullscreenEnabled ||
      doc.msFullscreenEnabled
    );

    // Check for request methods on elements
    const hasRequestMethod = !!(
      element.requestFullscreen ||
      element.mozRequestFullScreen ||
      element.webkitRequestFullscreen ||
      element.webkitRequestFullScreen ||
      element.msRequestFullscreen
    );

    // Check for exit methods on document
    const hasExitMethod = !!(
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.webkitCancelFullScreen ||
      doc.msExitFullscreen
    );

    // Additional browser-specific checks
    if (browserInfo.isSafari && browserInfo.isMobile) {
      // Mobile Safari has limited fullscreen support
      return false;
    }

    // Check if we're in a secure context (required for some browsers)
    const isSecureContext =
      typeof window !== 'undefined' &&
      (window.isSecureContext ||
        location.protocol === 'https:' ||
        location.hostname === 'localhost');

    return (
      hasEnabledProperty && hasRequestMethod && hasExitMethod && isSecureContext
    );
  }, []);

  // Get the current fullscreen element - comprehensive cross-browser check
  const getFullscreenElement = useCallback((): Element | null => {
    if (typeof document === 'undefined') return null;

    const doc = document as FullscreenDocument;

    // Try standard first, then vendor prefixes
    const element =
      doc.fullscreenElement ||
      doc.mozFullScreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement ||
      null;

    return element;
  }, []);

  // Enter fullscreen mode - comprehensive cross-browser implementation
  const enterFullscreen = useCallback(async (): Promise<void> => {
    if (!isSupported() || !elementRef.current) {
      const errorMsg = !isSupported()
        ? 'Fullscreen API is not supported in this browser'
        : 'Element reference is not available';
      setError(errorMsg);
      options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      setError(null);
      const element = elementRef.current as FullscreenElement;
      const browserInfo = getBrowserInfo();

      // Browser-specific method selection with fallback chain
      let requestMethod: (() => Promise<void>) | null = null;

      if (element.requestFullscreen) {
        // Standard API - supported by modern browsers
        requestMethod = () =>
          element.requestFullscreen({ navigationUI: 'hide' });
      } else if (browserInfo.isSafari) {
        // Safari-specific handling - try both variants
        if (element.webkitRequestFullscreen) {
          requestMethod = () =>
            element.webkitRequestFullscreen?.() || Promise.resolve();
        } else if (element.webkitRequestFullScreen) {
          // Older Safari versions
          requestMethod = () =>
            element.webkitRequestFullScreen?.() || Promise.resolve();
        }
      } else if (browserInfo.isChrome && element.webkitRequestFullscreen) {
        // Chrome and Chromium-based browsers
        requestMethod = () =>
          element.webkitRequestFullscreen?.() || Promise.resolve();
      } else if (browserInfo.isFirefox && element.mozRequestFullScreen) {
        // Firefox
        requestMethod = () =>
          element.mozRequestFullScreen?.() || Promise.resolve();
      } else if (browserInfo.isEdge && element.msRequestFullscreen) {
        // Legacy Edge
        requestMethod = () =>
          element.msRequestFullscreen?.() || Promise.resolve();
      } else {
        // Fallback chain for undetected browsers
        if (element.webkitRequestFullscreen) {
          requestMethod = () =>
            element.webkitRequestFullscreen?.() || Promise.resolve();
        } else if (element.webkitRequestFullScreen) {
          requestMethod = () =>
            element.webkitRequestFullScreen?.() || Promise.resolve();
        } else if (element.mozRequestFullScreen) {
          requestMethod = () =>
            element.mozRequestFullScreen?.() || Promise.resolve();
        } else if (element.msRequestFullscreen) {
          requestMethod = () =>
            element.msRequestFullscreen?.() || Promise.resolve();
        }
      }

      if (!requestMethod) {
        throw new Error(
          'No compatible fullscreen method found for this browser',
        );
      }

      await requestMethod();
    } catch (err) {
      // Enhanced error handling for specific browser issues
      let errorMsg = 'Failed to enter fullscreen';

      if (err instanceof Error) {
        const { message } = err;
        const browserInfo = getBrowserInfo();

        if (message.includes('denied') || message.includes('not allowed')) {
          errorMsg =
            'Fullscreen request denied. User interaction may be required.';
        } else if (
          message.includes('security') ||
          message.includes('permission')
        ) {
          errorMsg =
            'Fullscreen blocked for security reasons. Ensure HTTPS or localhost.';
        } else if (browserInfo.isSafari && message.includes('not supported')) {
          errorMsg =
            'Fullscreen not supported in this Safari version. Try updating your browser.';
        } else if (browserInfo.isFirefox && message.includes('unavailable')) {
          errorMsg = 'Firefox fullscreen unavailable. Check browser settings.';
        } else {
          errorMsg = message;
        }
      }

      setError(errorMsg);
      options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }, [elementRef, isSupported, options]);

  // Exit fullscreen mode - comprehensive cross-browser implementation
  const exitFullscreen = useCallback(async (): Promise<void> => {
    if (!isSupported()) {
      const errorMsg = 'Fullscreen API is not supported in this browser';
      setError(errorMsg);
      options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      setError(null);
      const doc = document as FullscreenDocument;
      const browserInfo = getBrowserInfo();

      // Browser-specific method selection with fallback chain
      let exitMethod: (() => Promise<void>) | null = null;

      if (doc.exitFullscreen) {
        // Standard API - supported by modern browsers
        exitMethod = () => doc.exitFullscreen();
      } else if (browserInfo.isSafari) {
        // Safari-specific handling - try both variants
        if (doc.webkitExitFullscreen) {
          exitMethod = () => doc.webkitExitFullscreen?.() || Promise.resolve();
        } else if (doc.webkitCancelFullScreen) {
          // Older Safari versions
          exitMethod = () =>
            doc.webkitCancelFullScreen?.() || Promise.resolve();
        }
      } else if (browserInfo.isChrome && doc.webkitExitFullscreen) {
        // Chrome and Chromium-based browsers
        exitMethod = () => doc.webkitExitFullscreen?.() || Promise.resolve();
      } else if (browserInfo.isFirefox && doc.mozCancelFullScreen) {
        // Firefox
        exitMethod = () => doc.mozCancelFullScreen?.() || Promise.resolve();
      } else if (browserInfo.isEdge && doc.msExitFullscreen) {
        // Legacy Edge
        exitMethod = () => doc.msExitFullscreen?.() || Promise.resolve();
      } else {
        // Fallback chain for undetected browsers
        if (doc.webkitExitFullscreen) {
          exitMethod = () => doc.webkitExitFullscreen?.() || Promise.resolve();
        } else if (doc.webkitCancelFullScreen) {
          exitMethod = () =>
            doc.webkitCancelFullScreen?.() || Promise.resolve();
        } else if (doc.mozCancelFullScreen) {
          exitMethod = () => doc.mozCancelFullScreen?.() || Promise.resolve();
        } else if (doc.msExitFullscreen) {
          exitMethod = () => doc.msExitFullscreen?.() || Promise.resolve();
        }
      }

      if (!exitMethod) {
        throw new Error(
          'No compatible exit fullscreen method found for this browser',
        );
      }

      await exitMethod();
    } catch (err) {
      // Enhanced error handling for exit fullscreen issues
      let errorMsg = 'Failed to exit fullscreen';

      if (err instanceof Error) {
        const { message } = err;
        const browserInfo = getBrowserInfo();

        if (message.includes('denied') || message.includes('not allowed')) {
          errorMsg = 'Exit fullscreen request denied. Try pressing Escape key.';
        } else if (browserInfo.isSafari && message.includes('not supported')) {
          errorMsg = 'Exit fullscreen not supported in this Safari version.';
        } else if (browserInfo.isFirefox && message.includes('unavailable')) {
          errorMsg = 'Firefox exit fullscreen unavailable. Try Escape key.';
        } else {
          errorMsg = message;
        }
      }

      setError(errorMsg);
      options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }, [isSupported, options]);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(async (): Promise<void> => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Update fullscreen state
  const updateFullscreenState = useCallback(() => {
    const fullscreenElement = getFullscreenElement();
    const newIsFullscreen =
      !!fullscreenElement && fullscreenElement === elementRef.current;

    if (newIsFullscreen !== isFullscreen) {
      setIsFullscreen(newIsFullscreen);

      if (newIsFullscreen) {
        options.onEnter?.();
      } else {
        options.onExit?.();
      }
    }
  }, [getFullscreenElement, elementRef, isFullscreen, options]);

  // Set up event listeners for fullscreen changes
  useEffect(() => {
    if (!isSupported()) return;

    // Comprehensive list of fullscreen change events for all browsers
    const events = [
      'fullscreenchange', // Standard
      'mozfullscreenchange', // Firefox
      'webkitfullscreenchange', // Chrome, Opera, newer Safari
      'msfullscreenchange', // Internet Explorer/Edge
    ];

    // Additional error events for better error handling
    const errorEvents = [
      'fullscreenerror',
      'mozfullscreenerror',
      'webkitfullscreenerror',
      'msfullscreenerror',
    ];

    // Error handler for fullscreen errors
    const handleFullscreenError = () => {
      setError('Fullscreen request was denied or failed');
      options.onError?.('Fullscreen request was denied or failed');
    };

    // Add change event listeners
    events.forEach((event) => {
      document.addEventListener(event, updateFullscreenState);
    });

    // Add error event listeners
    errorEvents.forEach((event) => {
      document.addEventListener(event, handleFullscreenError);
    });

    // Initial state check
    updateFullscreenState();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, updateFullscreenState);
      });
      errorEvents.forEach((event) => {
        document.removeEventListener(event, handleFullscreenError);
      });
    };
  }, [isSupported, updateFullscreenState]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, exitFullscreen]);

  return {
    isFullscreen,
    isSupported: isSupported(),
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    error,
  };
};
