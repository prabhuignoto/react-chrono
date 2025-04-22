import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderTimelineContent } from '../ContentRenderer';
import * as highlightUtils from '../highlight-utils';
import * as textArrayRenderer from '../TextArrayRenderer';
import { createRef } from 'react';
import React from 'react';

// Mock dependencies
vi.mock('../highlight-utils', () => ({
  createHighlightedHTML: vi.fn((text, searchTerm, color) => {
    if (!searchTerm) return text;
    return `<mark>${searchTerm}</mark> in ${text}`;
  }),
}));

vi.mock('../TextArrayRenderer', () => ({
  renderTextArray: vi.fn(() => [
    <div key="1" data-testid="rendered-array-item-1">
      Item 1
    </div>,
    <div key="2" data-testid="rendered-array-item-2">
      Item 2
    </div>,
  ]),
}));

// We don't need to mock the styled component - let it render real styled components
// Instead, test what would VISUALLY appear to the user

describe('ContentRenderer', () => {
  const ref = createRef<HTMLParagraphElement>();
  const defaultProps = {
    ref,
    theme: { primary: '#0066CC' },
    shouldHideContent: false,
    fontSizes: { cardText: '16px' },
    classNames: { cardText: 'card-text' },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders custom timelineContent when provided', () => {
    const customContent = (
      <div data-testid="custom-content">Custom Content</div>
    );
    const result = renderTimelineContent({
      ...defaultProps,
      timelineContent: customContent,
    });

    const { getByTestId } = render(<>{result}</>);
    expect(getByTestId('custom-content')).toBeInTheDocument();
  });

  it('returns null when no detailedText or timelineContent is provided', () => {
    const result = renderTimelineContent(defaultProps);
    expect(result).toBeNull();
  });

  it('returns empty or minimal content when shouldHideContent is true', () => {
    const result = renderTimelineContent({
      ...defaultProps,
      detailedText: 'Some text',
      shouldHideContent: true,
    });

    // Just render and verify there's a component but no text content
    const { container } = render(<>{result}</>);
    expect(container.firstChild).toBeInTheDocument();
    // Either the inner text is empty or the element is not meant to show content
    expect(container.textContent?.trim()).toBe('');
  });

  it('calls renderTextArray when detailedText is an array', () => {
    const arrayText = ['Item 1', 'Item 2'];
    const result = renderTimelineContent({
      ...defaultProps,
      detailedText: arrayText,
    });

    const { getAllByTestId } = render(<>{result}</>);

    // Check the rendered items
    expect(getAllByTestId(/rendered-array-item/)).toHaveLength(2);

    // Check that renderTextArray was called
    expect(textArrayRenderer.renderTextArray).toHaveBeenCalled();
  });

  it('handles text content with searchTerm', () => {
    const result = renderTimelineContent({
      ...defaultProps,
      detailedText: 'Some text',
      searchTerm: 'text',
    });

    // Just verify that the content rendered and highlight function was called
    const { container } = render(<>{result}</>);
    expect(container.firstChild).toBeInTheDocument();
    expect(highlightUtils.createHighlightedHTML).toHaveBeenCalled();
  });

  it('handles HTML content with parseDetailsAsHTML and searchTerm', () => {
    const result = renderTimelineContent({
      ...defaultProps,
      detailedText: '<p>Some HTML</p>',
      parseDetailsAsHTML: true,
      searchTerm: 'HTML',
    });

    // Just verify that the content rendered and highlight function was called
    const { container } = render(<>{result}</>);
    expect(container.firstChild).toBeInTheDocument();
    expect(highlightUtils.createHighlightedHTML).toHaveBeenCalled();
  });

  it('handles HTML content with parseDetailsAsHTML without searchTerm', () => {
    const result = renderTimelineContent({
      ...defaultProps,
      detailedText: '<p>Some HTML</p>',
      parseDetailsAsHTML: true,
    });

    // Just verify content rendered without calling highlight
    const { container } = render(<>{result}</>);
    expect(container.firstChild).toBeInTheDocument();
    expect(highlightUtils.createHighlightedHTML).not.toHaveBeenCalled();
  });

  it('highlights regular text when searchTerm matches', () => {
    const result = renderTimelineContent({
      ...defaultProps,
      detailedText: 'This is searchable text',
      searchTerm: 'searchable',
    });

    // Just verify that the content rendered and highlight function was called
    const { container } = render(<>{result}</>);
    expect(container.firstChild).toBeInTheDocument();
    expect(highlightUtils.createHighlightedHTML).toHaveBeenCalled();
  });

  it('renders plain text without highlighting when no searchTerm', () => {
    const text = 'Plain text content';
    const result = renderTimelineContent({
      ...defaultProps,
      detailedText: text,
    });

    // Just verify that the content rendered without highlighting
    const { container } = render(<>{result}</>);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.textContent).toContain(text);
    expect(highlightUtils.createHighlightedHTML).not.toHaveBeenCalled();
  });
});
