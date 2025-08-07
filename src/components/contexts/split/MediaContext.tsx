import React, { createContext, useContext, useMemo } from 'react';
import { MediaSettings } from '@models/TimelineMediaModel';

interface MediaContextValue {
  mediaHeight: number;
  mediaSettings?: MediaSettings;
  mediaAlign?: 'left' | 'right' | 'center';
  textOverlay?: boolean;
}

const MediaContext = createContext<MediaContextValue | undefined>(undefined);

export const MediaProvider: React.FC<{
  children: React.ReactNode;
  value: MediaContextValue;
}> = ({ children, value }) => {
  const memoizedValue = useMemo(() => value, [
    value.mediaHeight,
    value.mediaSettings,
    value.mediaAlign,
    value.textOverlay,
  ]);

  return (
    <MediaContext.Provider value={memoizedValue}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within MediaProvider');
  }
  return context;
};