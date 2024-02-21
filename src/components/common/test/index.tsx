import { TimelineProps } from '@models/TimelineModel';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { GlobalContext } from '../../GlobalContext';

export const providerProps: TimelineProps = {
  buttonTexts: {
    changeDensity: 'Change density',
    changeLayout: 'Change layout',
    dark: 'dark',
    first: 'first',
    jumpTo: 'Jump to',
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
  textDensity: 'HIGH',
  textOverlay: false,
  theme: {
    cardBgColor: '#fff',
    cardDetailsBackGround: '#ffffff',
    cardDetailsColor: '#000',
    cardMediaBgColor: '#ffffff',
    cardSubtitleColor: '#000',
    cardTitleColor: '#000',
    detailsColor: '#000',
    iconBackgroundColor: '#ffffff',
    nestedCardBgColor: '#ffffff',
    primary: '#0f52ba',
    secondary: '#ffdf00',
    textColor: '#000',
    titleColor: '#0f52ba',
    titleColorActive: '#0f52ba',
    toolbarBgColor: '#ffffff',
    toolbarBtnBgColor: '#0f52ba',
    toolbarTextColor: '#000',
  },
  timelinePointDimension: 16,
  timelinePointShape: 'circle',
  titleDateFormat: 'MMM DD, YYYY',
  toolbarPosition: 'top',
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
