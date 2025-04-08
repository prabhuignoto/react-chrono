import { useState, useCallback } from 'react';

export interface UIStateHook<T> {
  state: T;
  toggle: () => void;
  setState: (value: T) => void;
}

export const useUIState = <T extends boolean>(initialState: T): UIStateHook<T> => {
  const [state, setState] = useState<T>(initialState);
  
  const toggle = useCallback(() => {
    setState((prev) => !prev as T);
  }, []);

  return { state, toggle, setState };
};
