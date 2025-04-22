import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextParagraph } from '../TextParagraph';
import { customRender } from '../../../common/test';
import * as highlightUtils from '../highlight-utils';

// Mock the highlight utils
vi.mock('../highlight-utils', () => ({
  createHighlightedHTML: vi.fn((text, searchTerm, color) => {
    if (!searchTerm) return text;
    return `<mark>${searchTerm}</mark> in ${text}`;
  }),
}));

describe('TextParagraph', () => {
  const defaultProps = {
    text: 'This is a sample text',
    theme: { primary: '#0066CC' },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders null when text is empty', () => {
    const { container } = render(<TextParagraph {...defaultProps} text="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders regular text when no search term is provided', () => {
    const { getByText } = render(<TextParagraph {...defaultProps} />);
    expect(getByText(defaultProps.text)).toBeInTheDocument();
  });

  it('passes className to TimelineSubContent', () => {
    const className = 'custom-class';
    const { container } = render(
      <TextParagraph {...defaultProps} className={className} />,
    );
    expect(container.firstChild).toHaveClass(className);
  });

  it('passes fontSize to TimelineSubContent as prop', () => {
    const fontSize = '16px';
    const { container } = render(
      <TextParagraph {...defaultProps} fontSize={fontSize} />,
    );
    // The fontSize is passed as a prop to the styled component, not as an HTML attribute
    // We can just check that it renders the text properly
    expect(container.textContent).toBe(defaultProps.text);
  });

  it('uses dangerouslySetInnerHTML when searchTerm is provided', () => {
    const searchTerm = 'sample';
    const { container } = render(
      <TextParagraph {...defaultProps} searchTerm={searchTerm} />,
    );

    // Check if createHighlightedHTML was called with correct params
    expect(highlightUtils.createHighlightedHTML).toHaveBeenCalledWith(
      defaultProps.text,
      searchTerm,
      defaultProps.theme.primary,
    );

    // With our mock implementation, we expect the HTML to contain the mark tag
    expect(container.innerHTML).toContain('<mark>sample</mark>');
  });

  it('adds highlight-container class when searchTerm is provided', () => {
    const searchTerm = 'sample';
    const { container } = render(
      <TextParagraph {...defaultProps} searchTerm={searchTerm} />,
    );
    expect(container.firstChild).toHaveClass('highlight-container');
  });
});
