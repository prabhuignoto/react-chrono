import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TextHighlighter from '../TextHighlighter';

describe('TextHighlighter', () => {
  const mockTheme = {
    primary: '#0077cc',
    secondary: '#333333',
    // Add other theme properties as needed
  };

  it('renders text without highlighting when no search term is provided', () => {
    const text = 'This is a sample text';

    render(<TextHighlighter text={text} searchTerm="" theme={mockTheme} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(document.querySelector('span')).not.toBeInTheDocument();
  });

  it('renders text without highlighting when search term does not match', () => {
    const text = 'This is a sample text';

    render(<TextHighlighter text={text} searchTerm="xyz" theme={mockTheme} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(document.querySelector('span[class]')).not.toBeInTheDocument();
  });

  it('highlights matching text correctly', () => {
    const text = 'This is a sample text';
    const searchTerm = 'sample';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    // The text should be split into three parts
    expect(container.textContent).toBe(text);

    // There should be one highlighted span
    const highlightedSpan = container.querySelector('span');
    expect(highlightedSpan).toBeInTheDocument();
    expect(highlightedSpan?.textContent).toBe(searchTerm);
  });

  it('highlights multiple occurrences of the search term', () => {
    const text = 'This test is a test example';
    const searchTerm = 'test';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    // There should be two highlighted spans
    const highlightedSpans = container.querySelectorAll('span');
    expect(highlightedSpans.length).toBe(2);

    // Both spans should contain the search term
    highlightedSpans.forEach((span) => {
      expect(span.textContent).toBe(searchTerm);
    });
  });

  it('handles case insensitive search', () => {
    const text = 'This TEST is a test example';
    const searchTerm = 'test';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    // There should be two highlighted spans
    const highlightedSpans = container.querySelectorAll('span');
    expect(highlightedSpans.length).toBe(2);

    // Check the text content of each span
    expect(highlightedSpans[0].textContent).toBe('TEST');
    expect(highlightedSpans[1].textContent).toBe('test');
  });

  it('properly escapes special regex characters in search term', () => {
    const text = 'This is a (special) text with [brackets]';
    const searchTerm = '(special)';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    // There should be one highlighted span with the exact text including brackets
    const highlightedSpan = container.querySelector('span');
    expect(highlightedSpan).toBeInTheDocument();
    expect(highlightedSpan?.textContent).toBe(searchTerm);
  });

  it('returns text as is when text is empty', () => {
    render(<TextHighlighter text="" searchTerm="test" theme={mockTheme} />);

    expect(document.body.textContent).toBe('');
  });
});
