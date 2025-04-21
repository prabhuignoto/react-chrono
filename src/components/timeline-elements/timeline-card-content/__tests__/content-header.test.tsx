import { describe, expect, it } from 'vitest';
import { customRender } from '../../../common/test';
import { providerProps } from '../../../common/test/index';
import { ContentHeader } from '../content-header';

describe('Content Header', () => {
  // should render the title and subtitle of the card
  it('should render the title and subtitle of the card', () => {
    const { getByText, container } = customRender(
      <ContentHeader
        title="title"
        content="content"
        data-testid="header-test-1"
      />,
      {
        providerProps: {
          ...providerProps,
          media: null,
        },
      },
    );

    const titleElement = container.querySelector('.card-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('title');
    expect(getByText('content')).toBeInTheDocument();
  });

  // should match the snapshot
  it('should match the snapshot', () => {
    const { container } = customRender(
      <ContentHeader
        title="title"
        content="content"
        data-testid="header-test-2"
      />,
      {
        providerProps,
      },
    );

    expect(container).toMatchSnapshot();
  });

  // should render the link if url is provided
  it('should render the link if url is provided', () => {
    const { getByRole, container } = customRender(
      <ContentHeader
        title="title"
        content="content"
        url="http://www.google.com"
        data-testid="header-test-3"
      />,
      {
        providerProps,
      },
    );

    const titleElement = container.querySelector('.card-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('title');
    expect(getByRole('link')).toHaveAttribute('href', 'http://www.google.com');
  });
});
