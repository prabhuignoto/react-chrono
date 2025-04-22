import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { renderTextArray } from '../TextArrayRenderer';
import * as highlightUtils from '../highlight-utils';
import { TextParagraph } from '../TextParagraph';
import React from 'react';

// Mock dependencies
vi.mock('../highlight-utils', () => ({
  createHighlightedHTML: vi.fn((text, searchTerm, color) => {
    if (!searchTerm) return text;
    return `<mark>${searchTerm}</mark> in ${text}`;
  }),
}));

// Define type for TextParagraph props
interface TextParagraphProps {
  text: string;
  searchTerm?: string;
  theme?: { primary: string; [key: string]: any };
  fontSize?: string;
  className?: string;
}

// Mock TextParagraph
vi.mock('../TextParagraph', () => ({
  TextParagraph: vi.fn().mockImplementation((props: TextParagraphProps) => (
    <span data-testid="text-paragraph" className={props.className || ''}>
      {props.searchTerm
        ? `<mark>${props.searchTerm}</mark> in ${props.text}`
        : props.text}
    </span>
  )),
}));

// We don't need to mock TimelineSubContent - allow the real component to be used

describe('TextArrayRenderer', () => {
  const defaultProps = {
    detailedText: ['First paragraph', 'Second paragraph'],
    cardTextClassName: 'card-text',
    theme: { primary: '#0066CC' },
    fontSizes: { cardText: '16px' },
    parseDetailsAsHTML: false,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders TextParagraph for each item when parseDetailsAsHTML is false', () => {
    const result = renderTextArray(defaultProps);
    const { getAllByTestId } = render(<>{result}</>);

    const paragraphs = getAllByTestId('text-paragraph');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].textContent).toBe('First paragraph');
    expect(paragraphs[1].textContent).toBe('Second paragraph');

    // Just check the component was called the right number of times
    expect(TextParagraph).toHaveBeenCalledTimes(2);
  });

  it('renders content when parseDetailsAsHTML is true', () => {
    const props = {
      ...defaultProps,
      parseDetailsAsHTML: true,
    };

    const result = renderTextArray(props);

    // Just render and check we get content back
    const { container } = render(<>{result}</>);
    expect(container.childNodes.length).toBeGreaterThan(0);

    // Verify TextParagraph is not used for HTML content
    expect(TextParagraph).not.toHaveBeenCalled();
  });

  it('calls createHighlightedHTML when parseDetailsAsHTML is true and searchTerm is provided', () => {
    const props = {
      ...defaultProps,
      parseDetailsAsHTML: true,
      searchTerm: 'paragraph',
    };

    const result = renderTextArray(props);

    // Just render and check we get content
    const { container } = render(<>{result}</>);
    expect(container.childNodes.length).toBeGreaterThan(0);

    // Check that createHighlightedHTML was called
    expect(highlightUtils.createHighlightedHTML).toHaveBeenCalled();
  });

  it('passes searchTerm to TextParagraph when not parseDetailsAsHTML', () => {
    const props = {
      ...defaultProps,
      searchTerm: 'paragraph',
    };

    const result = renderTextArray(props);
    render(<>{result}</>);

    // Just check if TextParagraph was called
    expect(TextParagraph).toHaveBeenCalledTimes(2);

    // Check if it was called with the searchTerm
    const calls = (TextParagraph as any).mock.calls;
    expect(
      calls.some((call: any[]) => call[0].searchTerm === 'paragraph'),
    ).toBe(true);
  });
});
