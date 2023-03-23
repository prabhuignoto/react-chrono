import { describe } from 'vitest';
import { customRender } from '../../../common/test';
import { providerProps } from '../../../common/test/index';
import { ContentHeader } from '../content-header';

describe('Content Header', () => {
  // should render the title and subtitle of the card
  it('should render the title and subtitle of the card', () => {
    const { getByText } = customRender(
      <ContentHeader title="title" content="content" />,
      {
        providerProps: {
          ...providerProps,
          media: null,
        },
      },
    );

    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('content')).toBeInTheDocument();
  });

  // should match the snapshot
  it('should match the snapshot', () => {
    const { container } = customRender(
      <ContentHeader title="title" content="content" />,
      {
        providerProps,
      },
    );

    expect(container).toMatchSnapshot();
  });

  // should render the link if url is provided
  it('should render the link if url is provided', () => {
    const { getByText, getByRole } = customRender(
      <ContentHeader
        title="title"
        content="content"
        url="http://www.google.com"
      />,
      {
        providerProps,
      },
    );

    expect(getByText('title')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'http://www.google.com');
  });
});
