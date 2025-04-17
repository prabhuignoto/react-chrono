import { useEffect, useState } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const [debouncedCallback, setDebouncedCallback] = useState<{
    callback: T;
    timer: NodeJS.Timeout | null;
  }>({ callback, timer: null });

  useEffect(() => {
    setDebouncedCallback((prev) => ({
      ...prev,
      callback,
    }));
  }, [callback]);

  useEffect(() => {
    return () => {
      if (debouncedCallback.timer) {
        clearTimeout(debouncedCallback.timer);
      }
    };
  }, [debouncedCallback.timer]);

  return (...args: Parameters<T>) => {
    if (debouncedCallback.timer) {
      clearTimeout(debouncedCallback.timer);
    }

    const timer = setTimeout(() => {
      debouncedCallback.callback(...args);
    }, delay);

    setDebouncedCallback((prev) => ({
      ...prev,
      timer,
    }));
  };
}
