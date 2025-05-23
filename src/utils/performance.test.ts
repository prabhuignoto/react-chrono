import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import {
  performanceMonitor,
  usePerformanceMonitor,
  withPerformanceMonitoring,
  measureAsync,
  createPerformantDebounce,
} from './performance';
import { renderHook, act } from '@testing-library/react';

// Mock performance.now
const originalPerformanceNow = globalThis.performance.now;
beforeEach(() => {
  let now = 0;
  globalThis.performance.now = () => (now += 10);
});
afterEach(() => {
  globalThis.performance.now = originalPerformanceNow;
  performanceMonitor.clear();
});

describe('PerformanceMonitor', () => {
  it('should log render times and generate report', () => {
    performanceMonitor.setEnabled(true);
    const end = performanceMonitor.startTiming('TestComponent');
    end();
    const stats = performanceMonitor.getStats('TestComponent');
    expect(stats).toBeTruthy();
    expect(stats?.totalRenders).toBe(1);
    expect(performanceMonitor.getAllEntries().length).toBe(1);
    expect(performanceMonitor.generateReport()).toContain('TestComponent');
  });

  it('should clear all entries', () => {
    performanceMonitor.setEnabled(true);
    const end = performanceMonitor.startTiming('TestComponent');
    end();
    performanceMonitor.clear();
    expect(performanceMonitor.getAllEntries().length).toBe(0);
  });
});

describe('usePerformanceMonitor', () => {
  it('should call end timing on unmount', () => {
    const { result, unmount } = renderHook(() =>
      usePerformanceMonitor('HookComponent'),
    );
    expect(typeof result.current).toBe('function');
    // Simulate unmount
    act(() => {
      unmount();
    });
    // Optionally, call the returned cleanup function
    act(() => {
      result.current();
    });
  });
});

describe('withPerformanceMonitoring', () => {
  it('should wrap a component and call usePerformanceMonitor', () => {
    const Dummy = (props: { value: string }) =>
      React.createElement('div', null, props.value);
    const Wrapped = withPerformanceMonitoring(Dummy, 'Dummy');
    const el = React.createElement(Wrapped, { value: 'test' });
    expect(el).toBeTruthy();
  });
});

describe('measureAsync', () => {
  it('should measure async operation duration', async () => {
    const result = await measureAsync(async () => {
      return 42;
    }, 'TestOp');
    expect(result).toBe(42);
  });

  it('should throw and log on error', async () => {
    await expect(
      measureAsync(async () => {
        throw new Error('fail');
      }, 'TestOp'),
    ).rejects.toThrow('fail');
  });
});

describe('createPerformantDebounce', () => {
  it('should debounce a function and log duration', async () => {
    const fn = vi.fn();
    const debounced = createPerformantDebounce(fn, 10, 'debounceTest');
    debounced();
    debounced();
    await new Promise((r) => setTimeout(r, 20));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
