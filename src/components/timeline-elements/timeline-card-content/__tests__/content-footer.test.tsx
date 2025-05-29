import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
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
        paused={false}
      />,
      {
        providerProps,
      },
    );

    expect(container).toMatchSnapshot();
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
