import React, { useEffect, useRef } from 'react';

/**
 * Performance monitoring utilities for React Chrono
 * Helps track component render times and identify bottlenecks
 */

interface PerformanceEntry {
  componentName: string;
  renderTime: number;
  timestamp: number;
  props?: Record<string, any>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private entries: PerformanceEntry[] = [];
  private readonly renderTimes = new Map<string, number[]>();
  private isEnabled = process.env.NODE_ENV === 'development';

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start timing a component render
   */
  startTiming(componentName: string): () => void {
    if (!this.isEnabled) return () => {};

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      this.logRenderTime(componentName, renderTime);
    };
  }

  /**
   * Log render time for a component
   */
  private logRenderTime(
    componentName: string,
    renderTime: number,
    props?: Record<string, any>,
  ): void {
    const entry: PerformanceEntry = {
      componentName,
      renderTime,
      timestamp: Date.now(),
      props,
    };

    this.entries.push(entry);

    // Keep only last 100 entries to prevent memory leaks
    if (this.entries.length > 100) {
      this.entries = this.entries.slice(-100);
    }

    // Track render times per component
    if (!this.renderTimes.has(componentName)) {
      this.renderTimes.set(componentName, []);
    }

    const times = this.renderTimes.get(componentName) ?? [];
    times.push(renderTime);

    // Keep only last 20 render times per component
    if (times.length > 20) {
      times.splice(0, times.length - 20);
    }

    // Log slow renders (>16ms for 60fps)
    if (renderTime > 16) {
      console.warn(
        `🐌 Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`,
        { renderTime, props },
      );
    }
  }

  /**
   * Get performance statistics for a component
   */
  getStats(componentName: string): {
    averageRenderTime: number;
    maxRenderTime: number;
    minRenderTime: number;
    totalRenders: number;
  } | null {
    const times = this.renderTimes.get(componentName);
    if (!times || times.length === 0) return null;

    return {
      averageRenderTime: times.reduce((a, b) => a + b, 0) / times.length,
      maxRenderTime: Math.max(...times),
      minRenderTime: Math.min(...times),
      totalRenders: times.length,
    };
  }

  /**
   * Get all performance entries
   */
  getAllEntries(): PerformanceEntry[] {
    return [...this.entries];
  }

  /**
   * Clear all performance data
   */
  clear(): void {
    this.entries = [];
    this.renderTimes.clear();
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    const report = ['=== React Chrono Performance Report ===\n'];

    for (const [componentName] of this.renderTimes.entries()) {
      const stats = this.getStats(componentName);
      if (stats) {
        report.push(
          `📊 ${componentName}:`,
          `  • Average: ${stats.averageRenderTime.toFixed(2)}ms`,
          `  • Max: ${stats.maxRenderTime.toFixed(2)}ms`,
          `  • Min: ${stats.minRenderTime.toFixed(2)}ms`,
          `  • Total Renders: ${stats.totalRenders}`,
          '',
        );
      }
    }

    return report.join('\n');
  }

  /**
   * Enable/disable performance monitoring
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

/**
 * React hook for performance monitoring
 * Use this hook to time component renders
 */
export const usePerformanceMonitor = (
  componentName: string,
) => {
  const endTimingRef = useRef<(() => void) | null>(null);

  // Start timing on mount and re-renders
  useEffect(() => {
    endTimingRef.current = performanceMonitor.startTiming(componentName);

    // Return cleanup function
    return () => {
      if (endTimingRef.current) {
        endTimingRef.current();
      }
    };
  });

  // Return cleanup function for manual usage if needed
  return () => {
    if (endTimingRef.current) {
      endTimingRef.current();
    }
  };
};

/**
 * Higher-order component for performance monitoring
 */
export function withPerformanceMonitoring<P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string,
): React.FC<P> {
  const displayName =
    componentName ??
    WrappedComponent.displayName ??
    WrappedComponent.name ??
    'Component';

  const MemoizedComponent: React.FC<P> = React.memo((props: P) => {
    // Use the performance monitoring hook
    usePerformanceMonitor(displayName);

    return React.createElement(WrappedComponent, props);
  });

  MemoizedComponent.displayName = `withPerformanceMonitoring(${displayName})`;

  return MemoizedComponent;
}

/**
 * Utility to measure async operations
 */
export const measureAsync = async <T>(
  operation: () => Promise<T>,
  operationName: string,
): Promise<T> => {
  const startTime = performance.now();

  try {
    const result = await operation();
    const endTime = performance.now();
    const duration = endTime - startTime;

    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${operationName} completed in ${duration.toFixed(2)}ms`);
    }

    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;

    if (process.env.NODE_ENV === 'development') {
      console.error(
        `❌ ${operationName} failed after ${duration.toFixed(2)}ms`,
        error,
      );
    }

    throw error;
  }
};

/**
 * Debounce utility with performance monitoring
 */
export const createPerformantDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  operationName: string,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      func(...args);
      const endTime = performance.now();

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `🔄 Debounced ${operationName} executed in ${(endTime - startTime).toFixed(2)}ms`,
        );
      }
    }, delay);
  };
};
