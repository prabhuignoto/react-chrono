/**
 * Dynamic Context - Contains frequently changing values like state and interactions
 * This context is optimized for dynamic values that change often
 */
import { createContext } from 'react';
import { TextDensity } from '@models/TimelineModel';
import { Theme } from '@models/Theme';

export interface DynamicContextProps {
  // Dynamic state values
  isDarkMode: boolean;
  isMobile: boolean;
  horizontalAll: boolean;
  textContentDensity: TextDensity;

  // Theme (can change with dark mode)
  memoizedTheme: Theme;

  // Interaction callbacks
  toggleDarkMode?: () => void;
  updateHorizontalAllCards?: (state: boolean) => void;
  updateTextContentDensity?: (value: TextDensity) => void;
}

export const DynamicContext = createContext<DynamicContextProps>({
  isDarkMode: false,
  isMobile: false,
  horizontalAll: false,
  textContentDensity: 'HIGH',
  memoizedTheme: {
    primary: '#007FFF',
    secondary: '#ffdf00',
    cardBgColor: '#ffffff',
    cardDetailsBackGround: '#ffffff',
    cardDetailsColor: '#000',
    cardMediaBgColor: '#f5f5f5',
    cardSubtitleColor: '#000',
    cardTitleColor: '#007FFF',
    detailsColor: '#000',
    iconBackgroundColor: '#007FFF',
    nestedCardBgColor: '#f5f5f5',
    nestedCardDetailsBackGround: '#f5f5f5',
    nestedCardDetailsColor: '#000',
    nestedCardSubtitleColor: '#000',
    nestedCardTitleColor: '#000',
    titleColor: '#007FFF',
    titleColorActive: '#007FFF',
    toolbarBgColor: '#f5f5f5',
    toolbarBtnBgColor: '#ffffff',
    toolbarTextColor: '#000',
    timelineBgColor: '#f5f5f5',
  },
});
