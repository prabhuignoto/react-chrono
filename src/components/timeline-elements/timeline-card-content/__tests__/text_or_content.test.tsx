// Imports
import { getDefaultClassNames } from '@utils/index';
import { customRender, providerProps } from 'src/components/common/test';
import { getTextOrContent } from '../text-or-content';

describe('getTextOrContent', () => {
  const classNames = getDefaultClassNames();

  it('renders TimelineContentDetails when detailedText is string', () => {
    const TextContent = getTextOrContent({
      detailedText: 'Hello World',
    });

    const { getByText } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders TimelineContentDetails with xss when parseDetailsAsHTML is true', () => {
    const TextContent = getTextOrContent({
      detailedText: '<b>Hello</b>',
    });

    const { container } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
        parseDetailsAsHTML: true,
      },
    });

    expect(container.firstChild).toHaveTextContent('Hello'); // xss sanitized
  });

  it('renders TimelineSubContent when detailedText is array', () => {
    const TextContent = getTextOrContent({
      detailedText: ['Line 1', 'Line 2'],
    });

    const { getAllByText } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });
    expect(getAllByText('Line 1')[0]).toBeInTheDocument();
    expect(getAllByText('Line 2')[0]).toBeInTheDocument();
  });

  it('passes showMore prop to TimelineContentDetails', () => {
    const TextContent = getTextOrContent({
      detailedText: 'Text',
      showMore: true,
    });

    const { getByText } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });
    expect(getByText('Text')).toHaveClass('active');
  });
});
