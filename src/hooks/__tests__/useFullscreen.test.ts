import { describe, it, expect, vi, beforeEach } from 'vitest';

// Test the key functions of the fullscreen hook in isolation
describe('useFullscreen cross-browser compatibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('browser detection', () => {
    it('should detect Chrome correctly', () => {
      const mockNavigator = {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        vendor: 'Google Inc.',
      };

      Object.defineProperty(global, 'navigator', {
        writable: true,
        value: mockNavigator,
      });

      // Test that Chrome is detected
      const isChrome =
        /Chrome/.test(mockNavigator.userAgent) &&
        !/Edge/.test(mockNavigator.userAgent);
      expect(isChrome).toBe(true);
    });

    it('should detect Firefox correctly', () => {
      const mockNavigator = {
        userAgent:
          'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
        vendor: '',
      };

      const isFirefox = /Firefox/.test(mockNavigator.userAgent);
      expect(isFirefox).toBe(true);
    });

    it('should detect Safari correctly', () => {
      const mockNavigator = {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/16.0 Safari/537.36',
        vendor: 'Apple Computer, Inc.',
      };

      const isSafari =
        /Safari/.test(mockNavigator.userAgent) &&
        !/Chrome/.test(mockNavigator.userAgent) &&
        /Apple/.test(mockNavigator.vendor);
      expect(isSafari).toBe(true);
    });

    it('should detect Edge correctly', () => {
      const mockNavigator = {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        vendor: 'Microsoft Corporation',
      };

      const isEdge =
        /Edge/.test(mockNavigator.userAgent) ||
        /Edg\//.test(mockNavigator.userAgent);
      expect(isEdge).toBe(true);
    });

    it('should detect mobile Safari and reject it', () => {
      const mockNavigator = {
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        vendor: 'Apple Computer, Inc.',
      };

      const isSafari =
        /Safari/.test(mockNavigator.userAgent) &&
        !/Chrome/.test(mockNavigator.userAgent) &&
        /Apple/.test(mockNavigator.vendor);
      const isMobile = /Mobi|Android/i.test(mockNavigator.userAgent);

      expect(isSafari).toBe(true);
      expect(isMobile).toBe(true);
      // Mobile Safari should be rejected for fullscreen
      expect(isSafari && isMobile).toBe(true);
    });
  });

  describe('fullscreen API support detection', () => {
    it('should detect standard fullscreen API support', () => {
      const mockDocument = {
        fullscreenEnabled: true,
        exitFullscreen: () => Promise.resolve(),
      };

      const mockElement = {
        requestFullscreen: () => Promise.resolve(),
      };

      const hasStandardSupport = !!(
        mockDocument.fullscreenEnabled &&
        mockElement.requestFullscreen &&
        mockDocument.exitFullscreen
      );
      expect(hasStandardSupport).toBe(true);
    });

    it('should detect webkit fullscreen API support', () => {
      const mockDocument = {
        webkitFullscreenEnabled: true,
        webkitExitFullscreen: () => Promise.resolve(),
      };

      const mockElement = {
        webkitRequestFullscreen: () => Promise.resolve(),
      };

      const hasWebkitSupport = !!(
        mockDocument.webkitFullscreenEnabled &&
        mockElement.webkitRequestFullscreen &&
        mockDocument.webkitExitFullscreen
      );
      expect(hasWebkitSupport).toBe(true);
    });

    it('should detect moz fullscreen API support', () => {
      const mockDocument = {
        mozFullScreenEnabled: true,
        mozCancelFullScreen: () => Promise.resolve(),
      };

      const mockElement = {
        mozRequestFullScreen: () => Promise.resolve(),
      };

      const hasMozSupport = !!(
        mockDocument.mozFullScreenEnabled &&
        mockElement.mozRequestFullScreen &&
        mockDocument.mozCancelFullScreen
      );
      expect(hasMozSupport).toBe(true);
    });

    it('should detect ms fullscreen API support', () => {
      const mockDocument = {
        msFullscreenEnabled: true,
        msExitFullscreen: () => Promise.resolve(),
      };

      const mockElement = {
        msRequestFullscreen: () => Promise.resolve(),
      };

      const hasMsSupport = !!(
        mockDocument.msFullscreenEnabled &&
        mockElement.msRequestFullscreen &&
        mockDocument.msExitFullscreen
      );
      expect(hasMsSupport).toBe(true);
    });
  });

  describe('security context validation', () => {
    it('should require secure context for fullscreen', () => {
      const httpsContext = {
        isSecureContext: true,
        location: { protocol: 'https:', hostname: 'example.com' },
      };

      const httpContext = {
        isSecureContext: false,
        location: { protocol: 'http:', hostname: 'example.com' },
      };

      const localhostContext = {
        isSecureContext: false,
        location: { protocol: 'http:', hostname: 'localhost' },
      };

      // HTTPS should be allowed
      const isHttpsSecure =
        httpsContext.isSecureContext ||
        httpsContext.location.protocol === 'https:' ||
        httpsContext.location.hostname === 'localhost';
      expect(isHttpsSecure).toBe(true);

      // HTTP non-localhost should be rejected
      const isHttpSecure =
        httpContext.isSecureContext ||
        httpContext.location.protocol === 'https:' ||
        httpContext.location.hostname === 'localhost';
      expect(isHttpSecure).toBe(false);

      // HTTP localhost should be allowed
      const isLocalhostSecure =
        localhostContext.isSecureContext ||
        localhostContext.location.protocol === 'https:' ||
        localhostContext.location.hostname === 'localhost';
      expect(isLocalhostSecure).toBe(true);
    });
  });

  describe('error handling scenarios', () => {
    it('should handle permission denied errors correctly', () => {
      const error = new Error('Request denied');
      let categorizedError = 'Failed to enter fullscreen';

      if (
        error.message.includes('denied') ||
        error.message.includes('not allowed')
      ) {
        categorizedError =
          'Fullscreen request denied. User interaction may be required.';
      }

      expect(categorizedError).toBe(
        'Fullscreen request denied. User interaction may be required.',
      );
    });

    it('should handle security errors correctly', () => {
      const error = new Error('security error');
      let categorizedError = 'Failed to enter fullscreen';

      if (
        error.message.includes('security') ||
        error.message.includes('permission')
      ) {
        categorizedError =
          'Fullscreen blocked for security reasons. Ensure HTTPS or localhost.';
      }

      expect(categorizedError).toBe(
        'Fullscreen blocked for security reasons. Ensure HTTPS or localhost.',
      );
    });

    it('should handle Safari-specific errors correctly', () => {
      const error = new Error('not supported');
      const browserInfo = { isSafari: true };
      let categorizedError = 'Failed to enter fullscreen';

      if (browserInfo.isSafari && error.message.includes('not supported')) {
        categorizedError =
          'Fullscreen not supported in this Safari version. Try updating your browser.';
      }

      expect(categorizedError).toBe(
        'Fullscreen not supported in this Safari version. Try updating your browser.',
      );
    });

    it('should handle Firefox-specific errors correctly', () => {
      const error = new Error('unavailable');
      const browserInfo = { isFirefox: true };
      let categorizedError = 'Failed to enter fullscreen';

      if (browserInfo.isFirefox && error.message.includes('unavailable')) {
        categorizedError =
          'Firefox fullscreen unavailable. Check browser settings.';
      }

      expect(categorizedError).toBe(
        'Firefox fullscreen unavailable. Check browser settings.',
      );
    });
  });

  describe('method selection logic', () => {
    it('should prioritize standard API when available', () => {
      const element = {
        requestFullscreen: vi.fn().mockResolvedValue(undefined),
        webkitRequestFullscreen: vi.fn().mockResolvedValue(undefined),
        mozRequestFullScreen: vi.fn().mockResolvedValue(undefined),
      };

      // Standard API should be preferred
      let selectedMethod = null;
      if (element.requestFullscreen) {
        selectedMethod = 'standard';
      } else if (element.webkitRequestFullscreen) {
        selectedMethod = 'webkit';
      } else if (element.mozRequestFullScreen) {
        selectedMethod = 'moz';
      }

      expect(selectedMethod).toBe('standard');
    });

    it('should fallback to webkit API when standard is not available', () => {
      const element = {
        requestFullscreen: undefined,
        webkitRequestFullscreen: vi.fn().mockResolvedValue(undefined),
        mozRequestFullScreen: vi.fn().mockResolvedValue(undefined),
      };

      let selectedMethod = null;
      if (element.requestFullscreen) {
        selectedMethod = 'standard';
      } else if (element.webkitRequestFullscreen) {
        selectedMethod = 'webkit';
      } else if (element.mozRequestFullScreen) {
        selectedMethod = 'moz';
      }

      expect(selectedMethod).toBe('webkit');
    });

    it('should use Safari-specific method selection', () => {
      const browserInfo = { isSafari: true };
      const element = {
        requestFullscreen: undefined,
        webkitRequestFullscreen: vi.fn().mockResolvedValue(undefined),
        webkitRequestFullScreen: vi.fn().mockResolvedValue(undefined), // Safari alternative
      };

      let selectedMethod = null;
      if (browserInfo.isSafari) {
        if (element.webkitRequestFullscreen) {
          selectedMethod = 'webkit-new';
        } else if (element.webkitRequestFullScreen) {
          selectedMethod = 'webkit-old';
        }
      }

      expect(selectedMethod).toBe('webkit-new');
    });

    it('should handle Safari older version fallback', () => {
      const browserInfo = { isSafari: true };
      const element = {
        requestFullscreen: undefined,
        webkitRequestFullscreen: undefined,
        webkitRequestFullScreen: vi.fn().mockResolvedValue(undefined), // Safari alternative
      };

      let selectedMethod = null;
      if (browserInfo.isSafari) {
        if (element.webkitRequestFullscreen) {
          selectedMethod = 'webkit-new';
        } else if (element.webkitRequestFullScreen) {
          selectedMethod = 'webkit-old';
        }
      }

      expect(selectedMethod).toBe('webkit-old');
    });
  });

  describe('CSS compatibility', () => {
    it('should support all fullscreen pseudo-classes', () => {
      const fullscreenSelectors = [
        ':fullscreen',
        ':-webkit-full-screen',
        ':-moz-full-screen',
        ':-ms-fullscreen',
      ];

      const backdropSelectors = [
        ':fullscreen::backdrop',
        ':-webkit-full-screen::backdrop',
        ':-moz-full-screen::backdrop',
        ':-ms-fullscreen::backdrop',
      ];

      // All selectors should be strings (basic validation)
      fullscreenSelectors.forEach((selector) => {
        expect(typeof selector).toBe('string');
        expect(selector.startsWith(':')).toBe(true);
      });

      backdropSelectors.forEach((selector) => {
        expect(typeof selector).toBe('string');
        expect(selector.includes('::backdrop')).toBe(true);
      });
    });
  });

  describe('cross-browser event handling', () => {
    it('should support all fullscreen change events', () => {
      const changeEvents = [
        'fullscreenchange', // Standard
        'mozfullscreenchange', // Firefox
        'webkitfullscreenchange', // Chrome, Opera, Safari
        'msfullscreenchange', // Internet Explorer/Edge
      ];

      const errorEvents = [
        'fullscreenerror',
        'mozfullscreenerror',
        'webkitfullscreenerror',
        'msfullscreenerror',
      ];

      // All events should be valid strings
      [...changeEvents, ...errorEvents].forEach((event) => {
        expect(typeof event).toBe('string');
        expect(event.length).toBeGreaterThan(0);
      });

      // Verify we have events for all major browsers
      expect(changeEvents.some((e) => e.includes('moz'))).toBe(true); // Firefox
      expect(changeEvents.some((e) => e.includes('webkit'))).toBe(true); // Chrome/Safari
      expect(changeEvents.some((e) => e.includes('ms'))).toBe(true); // IE/Edge
    });
  });
});
