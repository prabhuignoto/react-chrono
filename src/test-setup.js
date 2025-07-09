// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/dom';
import '@testing-library/jest-dom/vitest';

// Mock ResizeObserver globally
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.observedElements = new Set();
  }
  
  observe(element) {
    this.observedElements.add(element);
    // Mock implementation - call callback with mock data
    if (this.callback) {
      this.callback([{
        target: element,
        contentRect: {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
          bottom: 100,
          right: 100,
        },
        borderBoxSize: [{
          inlineSize: 100,
          blockSize: 100,
        }],
        contentBoxSize: [{
          inlineSize: 100,
          blockSize: 100,
        }],
        devicePixelContentBoxSize: [{
          inlineSize: 100,
          blockSize: 100,
        }],
      }]);
    }
  }
  
  unobserve(element) {
    this.observedElements.delete(element);
  }
  
  disconnect() {
    this.observedElements.clear();
  }
};

// Mock IntersectionObserver globally
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options = {}) {
    this.callback = callback;
    this.options = options;
    this.observedElements = new Set();
  }
  
  observe(element) {
    this.observedElements.add(element);
    // Mock implementation - call callback with mock data
    if (this.callback) {
      this.callback([{
        target: element,
        isIntersecting: true,
        intersectionRatio: 1,
        boundingClientRect: {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
          bottom: 100,
          right: 100,
        },
        rootBounds: {
          width: 800,
          height: 600,
          top: 0,
          left: 0,
          bottom: 600,
          right: 800,
        },
        intersectionRect: {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
          bottom: 100,
          right: 100,
        },
      }]);
    }
  }
  
  unobserve(element) {
    this.observedElements.delete(element);
  }
  
  disconnect() {
    this.observedElements.clear();
  }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock console.warn to prevent test noise
const originalWarn = console.warn;
console.warn = (...args) => {
  // Suppress specific warnings that are expected in tests
  if (args[0]?.includes?.('Invalid hex color')) {
    return;
  }
  originalWarn(...args);
};

// Mock requestAnimationFrame for better test stability
global.requestAnimationFrame = vi.fn(callback => {
  return setTimeout(callback, 0);
});

global.cancelAnimationFrame = vi.fn(id => {
  clearTimeout(id);
});
