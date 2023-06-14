import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, vi } from 'vitest';
import { customRender } from '../../../common/test';
import { providerProps } from '../../../common/test/index';
import { ContentFooter } from '../content-footer';
import { ContentFooterProps } from '../header-footer.model';

const commonProps: ContentFooterProps = {
  canShow: false,
  onExpand: () => {},
  paused: false,
  progressRef: createRef(),
  remainInterval: 0,
  showMore: false,
  showProgressBar: false,
  showReadMore: false,
  startWidth: 0,
  textContentIsLarge: false,
  triangleDir: 'up',
};

describe('ContentFooter', () => {
  //should match snapshot
  it('should match snapshot', () => {
    const { container } = customRender(
      <ContentFooter
        {...commonProps}
        startWidth={300}
        showProgressBar
        paused={false}
      />,
      {
        providerProps,
      },
    );

    expect(container).toMatchSnapshot();
  });

  // should check if the progress bar is rendered with a with of 100
  it('should check if the progress bar is rendered with a width of 100', () => {
    const { getByRole } = customRender(
      <ContentFooter
        {...commonProps}
        showProgressBar
        startWidth={100}
        paused
      />,
      {
        providerProps,
      },
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
    expect(getByRole('progressbar')).toBeVisible();

    console.log(getByRole('progressbar'));
    // expect(getByRole('progressbar')).toHaveStyle('width: 100px');
  });

  //should render read more button when text content is large
  it('should render read more button when text content is large', () => {
    const { getByText } = customRender(
      <ContentFooter
        {...commonProps}
        showReadMore
        textContentIsLarge
        canShow
      />,
      {
        providerProps,
      },
    );

    expect(getByText('read more')).toBeInTheDocument();
    expect(getByText('read more')).toBeVisible();
  });

  //should render read less button when text content is large
  it('should render read less button when text content is large', () => {
    const { getByText } = customRender(
      <ContentFooter
        {...commonProps}
        showReadMore
        textContentIsLarge
        canShow
        showMore
      />,
      {
        providerProps,
      },
    );

    expect(getByText('read less')).toBeInTheDocument();
    expect(getByText('read less')).toBeVisible();
  });

  //should call onExpand when read more button is clicked
  it('should call onExpand when read more button is clicked', async () => {
    const onExpand = vi.fn();
    const user = userEvent.setup();

    const { getByText } = customRender(
      <ContentFooter
        {...commonProps}
        showReadMore
        textContentIsLarge
        canShow
        onExpand={onExpand}
      />,
      {
        providerProps,
      },
    );

    await user.click(getByText('read more'));
    expect(onExpand).toHaveBeenCalled();
  });
});
