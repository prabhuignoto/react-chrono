import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { TimelineProps } from '../../../../models/TimelineModel';
import { GlobalContext } from '../../../GlobalContext';
import TimelineControl from '../timeline-control';

const commonProps = {
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

const providerProps: TimelineProps = {
  buttonTexts: {
    darkToggle: 'dark-toggle',
    first: 'first',
    last: 'last',
    next: 'next',
    play: 'play',
    previous: 'previous',
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
  // complete the rest of the props with some default values
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
  timelinePointDimension: 16,
  timelinePointShape: 'circle',
  titleDateFormat: 'MMM DD, YYYY',
  useReadMore: true,
};

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(
    <GlobalContext.Provider value={providerProps}>{ui}</GlobalContext.Provider>,
    renderOptions,
  );
};

describe('TimelineControl', () => {
  it('should render', () => {
    const { container } = customRender(<TimelineControl {...commonProps} />, {
      providerProps,
    });
    expect(container).toMatchSnapshot();
  });

  // check if all the buttons are rendered
  it('should render all the buttons', () => {
    const { getByLabelText } = customRender(
      <TimelineControl {...commonProps} />,
      { providerProps },
    );
    expect(getByLabelText('first')).toBeInTheDocument();
    expect(getByLabelText('previous')).toBeInTheDocument();
    expect(getByLabelText('next')).toBeInTheDocument();
    expect(getByLabelText('last')).toBeInTheDocument();
    expect(getByLabelText('dark-toggle')).toBeInTheDocument();
  });

  // should render the play button when slideShowEnabled is true
  it('should render the play button when slideShowEnabled is true', () => {
    const { getByLabelText } = customRender(
      <TimelineControl {...commonProps} slideShowEnabled />,
      { providerProps },
    );
    expect(getByLabelText('play')).toBeInTheDocument();
  });

  // check if all the callbacks are executed as expected
  it('should execute the callbacks as expected', async () => {
    const onFirst = vi.fn();
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    const onLast = vi.fn();
    const onToggleDarkMode = vi.fn();
    const user = userEvent.setup();

    const { getByLabelText } = customRender(
      <TimelineControl
        {...commonProps}
        onFirst={onFirst}
        onPrevious={onPrevious}
        onNext={onNext}
        onLast={onLast}
        onToggleDarkMode={onToggleDarkMode}
      />,
      { providerProps },
    );
    await user.click(getByLabelText('first'));
    expect(onFirst).toHaveBeenCalled();
    await user.click(getByLabelText('previous'));
    expect(onPrevious).toHaveBeenCalled();
    await user.click(getByLabelText('next'));
    expect(onNext).toHaveBeenCalled();
    await user.click(getByLabelText('last'));
    expect(onLast).toHaveBeenCalled();
    await user.click(getByLabelText('dark-toggle'));
    expect(onToggleDarkMode).toHaveBeenCalled();
  });
});
