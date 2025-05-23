import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createMediaQuery,
  addMediaListeners,
  removeMediaListeners,
} from './mediaQueryUtils';

describe('mediaQueryUtils', () => {
  let originalMatchMedia: any;
  let originalAddEventListener: any;
  let originalRemoveEventListener: any;
  let windowListeners: Record<string, Function[]> = {};

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;
    windowListeners = {};
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      media: query,
      matches: false,
      addEventListener: vi.fn((event, cb) => {
        windowListeners[event] = windowListeners[event] || [];
        windowListeners[event].push(cb);
      }),
      removeEventListener: vi.fn((event, cb) => {
        if (windowListeners[event]) {
          windowListeners[event] = windowListeners[event].filter(
            (f) => f !== cb,
          );
        }
      }),
    }));
    window.addEventListener = vi.fn((event, cb) => {
      windowListeners[event] = windowListeners[event] || [];
      windowListeners[event].push(cb);
    });
    window.removeEventListener = vi.fn((event, cb) => {
      if (windowListeners[event]) {
        windowListeners[event] = windowListeners[event].filter((f) => f !== cb);
      }
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  it('should create a media query', () => {
    const mq = createMediaQuery('(max-width: 600px)');
    expect(mq).toBeTruthy();
    expect(mq?.media).toBe('(max-width: 600px)');
  });

  it('should add and remove media listeners', () => {
    const mq = createMediaQuery('(max-width: 600px)');
    const handleMediaChange = vi.fn();
    const handleResize = vi.fn();
    addMediaListeners(mq, handleMediaChange, handleResize);
    expect(windowListeners['resize']).toContain(handleResize);
    removeMediaListeners(mq, handleMediaChange, handleResize);
    expect(windowListeners['resize']).not.toContain(handleResize);
  });

  it('should handle null media query gracefully', () => {
    expect(() => addMediaListeners(null, vi.fn(), vi.fn())).not.toThrow();
    expect(() => removeMediaListeners(null, vi.fn(), vi.fn())).not.toThrow();
  });
});
