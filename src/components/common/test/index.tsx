import { TimelineProps } from '@models/TimelineModel';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { GlobalContext } from '../../GlobalContext';

export const providerProps: TimelineProps = {
  buttonTexts: {
    dark: 'dark',
    first: 'first',
    last: 'last',
    light: 'light',
    next: 'next',
    play: 'start slideshow',
    previous: 'previous',
    stop: 'stop slideshow',
  },
  classNames: {
    card: 'card',
    cardMedia: 'card-media',
    cardSubTitle: 'card-subtitle',
    cardText: 'card-text',
    cardTitle: 'card-title',
    controls: 'controls',
    title: 'title',
  },
  darkMode: false,
  enableDarkToggle: true,
  fontSizes: {
    cardSubtitle: '0.85rem',
    cardText: '1rem',
    cardTitle: '1.25rem',
    title: '1.5rem',
  },
  mediaHeight: 200,
  mode: 'VERTICAL_ALTERNATING',
  scrollable: {
    scrollbar: false,
  },
  showAllCardsHorizontal: false,
  showProgressOnSlideshow: false,
  slideItemDuration: 2000,
  slideShowType: 'reveal',
  textOverlay: false,
  theme: {
    cardBgColor: '#fff',
    cardDetailsBackGround: '#ffffff',
    cardDetailsColor: '#000',
    cardSubtitleColor: '#000',
    cardTitleColor: '#000',
    detailsColor: '#000',
    primary: '#0f52ba',
    secondary: '#ffdf00',
    titleColor: '#0f52ba',
    titleColorActive: '#0f52ba',
  },
  timelinePointDimension: 16,
  timelinePointShape: 'circle',
  titleDateFormat: 'MMM DD, YYYY',
  useReadMore: true,
};

export const commonProps = {
  disableLeft: false,
  disableRight: false,
  onFirst: () => {},
  onLast: () => {},
  onNext: () => {},
  onPrevious: () => {},
  onReplay: () => {},
  onToggleDarkMode: () => {},
  slideShowEnabled: false,
  slideShowRunning: false,
};

export const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: any,
): RenderResult => {
  return render(
    <GlobalContext.Provider value={providerProps}>{ui}</GlobalContext.Provider>,
    renderOptions,
  );
};
