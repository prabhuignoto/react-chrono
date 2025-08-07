import React, { createContext, useContext, useMemo } from 'react';

interface NavigationContextValue {
  activeItemIndex: number;
  scrollable: boolean;
  disableNavOnKey?: boolean;
  disableInteraction?: boolean;
  disableClickOnCircle?: boolean;
  disableTimelinePoint?: boolean;
  enableQuickJump?: boolean;
  onScrollEnd?: () => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export const NavigationProvider: React.FC<{
  children: React.ReactNode;
  value: NavigationContextValue;
}> = ({ children, value }) => {
  const memoizedValue = useMemo(() => value, [
    value.activeItemIndex,
    value.scrollable,
    value.disableNavOnKey,
    value.disableInteraction,
    value.disableClickOnCircle,
    value.disableTimelinePoint,
    value.enableQuickJump,
    value.onScrollEnd,
  ]);

  return (
    <NavigationContext.Provider value={memoizedValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
};