import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { TimelineMode, TextDensity } from '@models/TimelineModel';

interface LayoutContextValue {
  mode: TimelineMode;
  cardHeight: number;
  cardWidth?: number;
  cardLess: boolean;
  flipLayout?: boolean;
  itemWidth?: number;
  lineWidth?: number;
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  toolbarPosition?: 'top' | 'bottom';
  disableToolbar?: boolean;
  borderLessCards?: boolean;
  showAllCardsHorizontal: boolean;
  updateHorizontalAllCards: (state: boolean) => void;
  textDensity: TextDensity;
  updateTextContentDensity: (density: TextDensity) => void;
  enableLayoutSwitch?: boolean;
  highlightCardsOnHover?: boolean;
  useReadMore?: boolean;
}

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export const LayoutProvider: React.FC<{
  children: React.ReactNode;
  initialValues: Omit<LayoutContextValue, 'updateHorizontalAllCards' | 'updateTextContentDensity'>;
}> = ({ children, initialValues }) => {
  const [showAllCardsHorizontal, setShowAllCardsHorizontal] = useState(
    initialValues.showAllCardsHorizontal
  );
  const [textDensity, setTextDensity] = useState<TextDensity>(
    initialValues.textDensity
  );

  const updateHorizontalAllCards = useCallback((state: boolean) => {
    setShowAllCardsHorizontal(state);
  }, []);

  const updateTextContentDensity = useCallback((density: TextDensity) => {
    setTextDensity(density);
  }, []);

  const value = useMemo(
    () => ({
      ...initialValues,
      showAllCardsHorizontal,
      updateHorizontalAllCards,
      textDensity,
      updateTextContentDensity,
    }),
    [
      initialValues,
      showAllCardsHorizontal,
      updateHorizontalAllCards,
      textDensity,
      updateTextContentDensity,
    ]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within LayoutProvider');
  }
  return context;
};