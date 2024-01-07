import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { commonProps, customRender, providerProps } from '../../../common/test';
import TimelineControl from '../timeline-control';

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
      { providerProps: { ...providerProps, enableDarkToggle: true } },
    );
    expect(getByLabelText('first')).toBeInTheDocument();
    expect(getByLabelText('previous')).toBeInTheDocument();
    expect(getByLabelText('next')).toBeInTheDocument();
    expect(getByLabelText('last')).toBeInTheDocument();
    expect(getByLabelText('dark')).toBeInTheDocument();
  });

  // should render the play button when slideShowEnabled is true
  it('should render the play button when slideShowEnabled is true', () => {
    const { getByLabelText } = customRender(
      <TimelineControl
        {...commonProps}
        slideShowEnabled
        slideShowRunning={false}
      />,
      { providerProps },
    );
    expect(getByLabelText('start slideshow')).toBeInTheDocument();
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
      { providerProps: { ...providerProps, enableDarkToggle: true } },
    );
    await user.click(getByLabelText('first'));
    expect(onFirst).toHaveBeenCalled();
    await user.click(getByLabelText('previous'));
    expect(onPrevious).toHaveBeenCalled();
    await user.click(getByLabelText('next'));
    expect(onNext).toHaveBeenCalled();
    await user.click(getByLabelText('last'));
    expect(onLast).toHaveBeenCalled();
    await user.click(getByLabelText('dark'));
    expect(onToggleDarkMode).toHaveBeenCalled();
  });

  // check if the navigation controls to be hidden / not shown when disableInteraction is set to true
  it('should hide the navigation controls when disableInteraction is set to true', () => {
    const { queryByLabelText } = customRender(
      <TimelineControl {...commonProps} />,
      { providerProps: { ...providerProps, disableInteraction: true } },
    );
    expect(queryByLabelText('first')).not.toBeInTheDocument();
    expect(queryByLabelText('previous')).not.toBeInTheDocument();
    expect(queryByLabelText('next')).not.toBeInTheDocument();
    expect(queryByLabelText('last')).not.toBeInTheDocument();
  });
});
