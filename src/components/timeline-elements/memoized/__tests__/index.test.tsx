import { forwardRef } from 'react';
import { vi } from 'vitest';
import { customRender } from '../../../common/test';
import { providerProps } from '../../../common/test/index';
import { TextOrContentModel } from '../../timeline-card-content/text-or-content';
import { DetailsTextMemo } from '../details-text-memo';
import { SubTitleMemo } from '../subtitle-memo';
import { TitleMemo } from '../title-memo';

describe('Title', () => {
  it('should render title', () => {
    const { getByText } = customRender(
      <TitleMemo title="title" color="black" dir="rtl" active={false} />,
      { providerProps },
    );
    expect(getByText('title')).toBeInTheDocument();
  });

  // should render title with url
  it('should render title with url', () => {
    const { getByText, getByRole } = customRender(
      <TitleMemo
        title="title"
        url="https://www.google.com"
        color="black"
        dir="rtl"
        active={false}
      />,
      { providerProps },
    );
    expect(getByText('title')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'https://www.google.com');
  });

  //should have the color and padding
  it('should have the color and padding', () => {
    const { getByText } = customRender(
      <TitleMemo title="title" color="#ccc" dir="rtl" active={false} padding />,
      { providerProps },
    );
    expect(getByText('title')).toHaveStyle('color: #ccc');
    // expect(getByText('title')).toHaveStyle('padding: 0.25rem 0 0.25rem 0.5rem');
  });

  //should accept custom class name
  it('should accept custom class name', () => {
    const { getByText } = customRender(
      <TitleMemo
        title="title"
        color="black"
        dir="rtl"
        active={false}
        padding
        classString="custom-class"
      />,
      { providerProps },
    );
    expect(getByText('title')).toHaveClass('custom-class');
  });
});

describe('subtitle', () => {
  it('should render CardSubTitle', () => {
    const { getByText } = customRender(
      <SubTitleMemo
        color="red"
        dir={'rtl'}
        classString="card-sub-title"
        content="card sub title"
      ></SubTitleMemo>,
      { providerProps },
    );
    expect(getByText('card sub title')).toBeInTheDocument();
  });

  // should render the color and padding correctly
  it('should render the color and padding correctly', () => {
    const { getByText } = customRender(
      <SubTitleMemo
        color="#000"
        dir={'rtl'}
        classString="card-sub-title"
        content="card sub title"
        padding
      ></SubTitleMemo>,
      { providerProps },
    );
    expect(getByText('card sub title')).toHaveStyle('color: #000');
    // expect(getByText('card sub title')).toHaveStyle(
    //   'padding: 0.5rem 0 0.5rem 0.5rem',
    // );
  });
});

describe('Details Text', () => {
  // should render the details text
  it('should render the details text', async () => {
    const onRender = vi.fn();
    const fn = forwardRef<HTMLSpanElement, TextOrContentModel>(() => (
      <span>details text</span>
    ));
    fn.displayName = 'test';

    const { getByText } = customRender(
      <DetailsTextMemo
        show
        expand
        text={fn}
        height={100}
        onRender={onRender}
        textOverlay
      ></DetailsTextMemo>,
      { providerProps },
    );
    const text = getByText('details text');
    expect(text).toBeInTheDocument();
    expect(onRender).toHaveBeenCalled();
  });
});

describe('ShowOrHideTextButtonMemo', () => {
  it('should not render if textOverlay is false', () => {
    const TextComponent = forwardRef<HTMLSpanElement, TextOrContentModel>(() => (
      <span>details text</span>
    ));
    const { queryByRole } = customRender(
      <DetailsTextMemo
        show
        expand
        text={TextComponent}
        height={100}
        onRender={vi.fn()}
        textOverlay={false}
      ></DetailsTextMemo>,
      { providerProps },
    );
    expect(queryByRole('button')).toBeNull();
  });
});

describe('ExpandButtonMemo', () => {
  it('should not render if textOverlay is false', () => {
    const { queryByRole } = customRender(
      <DetailsTextMemo
        show
        expand
        text={forwardRef(() => <span>details text</span>)}
        height={100}
        onRender={vi.fn()}
        textOverlay={false}
      ></DetailsTextMemo>,
      { providerProps },
    );
    expect(queryByRole('button')).toBeNull();
  });
});
