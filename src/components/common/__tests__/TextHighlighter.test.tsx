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

  // Updated regex to match the exact structure with multi-line style attribute
  const getMarkedContent = (html: string): string[] => {
    const matches: string[] = [];
    const regex = /<mark style="[^"]*">(.*?)<\/mark>/gs;
    let match;

    while ((match = regex.exec(html)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  };

  it('renders text without highlighting when no search term is provided', () => {
    const text = 'This is a sample text';

    const { container } = render(
      <TextHighlighter text={text} searchTerm="" theme={mockTheme} />,
    );

    expect(screen.getByText(text)).toBeInTheDocument();
    // Check the innerHTML of the container, it should not contain <mark>
    expect(container.innerHTML).not.toContain('<mark');
  });

  it('renders text without highlighting when search term does not match', () => {
    const text = 'This is a sample text';

    const { container } = render(
      <TextHighlighter text={text} searchTerm="xyz" theme={mockTheme} />,
    );

    expect(screen.getByText(text)).toBeInTheDocument();
    // Check the innerHTML of the container, it should not contain <mark>
    expect(container.innerHTML).not.toContain('<mark');
  });

  it('highlights matching text correctly', () => {
    const text = 'This is a sample text';
    const searchTerm = 'sample';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    // The component renders a span wrapper
    const wrapperSpan = container.firstChild as HTMLElement;
    expect(wrapperSpan.tagName).toBe('SPAN');
    expect(wrapperSpan.textContent).toBe(text);

    // Check innerHTML for the mark tag
    expect(wrapperSpan.innerHTML).toContain('<mark');
    expect(wrapperSpan.innerHTML).toContain(searchTerm);

    // Check the marked content using our helper function
    const markedContent = getMarkedContent(wrapperSpan.innerHTML);
    expect(markedContent.length).toBe(1);
    expect(markedContent[0]).toBe(searchTerm);

    // Check for key styles applied via inline style attribute
    expect(wrapperSpan.innerHTML).toContain('style=');
    expect(wrapperSpan.innerHTML).toContain('font-weight: bold');
    expect(wrapperSpan.innerHTML).toContain('background-color');
  });

  it('highlights multiple occurrences of the search term', () => {
    const text = 'This test is a test example';
    const searchTerm = 'test';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    const wrapperSpan = container.firstChild as HTMLElement;
    expect(wrapperSpan.tagName).toBe('SPAN');

    // Count the number of <mark> tags in the innerHTML
    const markCount = (wrapperSpan.innerHTML.match(/<mark/g) || []).length;
    expect(markCount).toBe(2);

    // Check the marked content using our helper function
    const markedContent = getMarkedContent(wrapperSpan.innerHTML);
    expect(markedContent.length).toBe(2);
    expect(markedContent).toEqual(['test', 'test']);
  });

  it('handles case insensitive search', () => {
    const text = 'This TEST is a test example';
    const searchTerm = 'test';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    const wrapperSpan = container.firstChild as HTMLElement;
    expect(wrapperSpan.tagName).toBe('SPAN');

    // Count the number of <mark> tags
    const markCount = (wrapperSpan.innerHTML.match(/<mark/g) || []).length;
    expect(markCount).toBe(2);

    // Check the marked content using our helper function
    const markedContent = getMarkedContent(wrapperSpan.innerHTML);
    expect(markedContent.length).toBe(2);
    expect(markedContent).toContain('TEST');
    expect(markedContent).toContain('test');
  });

  it('properly escapes special regex characters in search term', () => {
    const text = 'This is a (special) text with [brackets]';
    const searchTerm = '(special)';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    const wrapperSpan = container.firstChild as HTMLElement;
    expect(wrapperSpan.tagName).toBe('SPAN');

    // Check innerHTML for the highlighted special term
    expect(wrapperSpan.innerHTML).toContain('<mark');
    expect(wrapperSpan.innerHTML).toContain(searchTerm);

    // Check the marked content using our helper function
    const markedContent = getMarkedContent(wrapperSpan.innerHTML);
    expect(markedContent.length).toBe(1);
    expect(markedContent[0]).toBe(searchTerm);
  });

  it('returns text as is when text is empty', () => {
    const { container } = render(
      <TextHighlighter text="" searchTerm="test" theme={mockTheme} />,
    );
    // It should render an empty fragment or similar, so container might be empty or have a placeholder
    expect(container.textContent).toBe('');
  });

  it('applies aggressive styling to the highlighted text', () => {
    const text = 'This is a sample text';
    const searchTerm = 'sample';

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    const wrapperSpan = container.firstChild as HTMLElement;
    expect(wrapperSpan.tagName).toBe('SPAN');

    // Check that important CSS properties are present in the inline style
    expect(wrapperSpan.innerHTML).toContain('<mark');
    expect(wrapperSpan.innerHTML).toContain('style=');
    expect(wrapperSpan.innerHTML).toContain('display: inline !important');
    expect(wrapperSpan.innerHTML).toContain('font-weight: bold !important');
    expect(wrapperSpan.innerHTML).toContain('background-color:');
    expect(wrapperSpan.innerHTML).toContain('color:');
    expect(wrapperSpan.innerHTML).toContain('border-radius:');
    expect(wrapperSpan.innerHTML).toContain('padding:');
    expect(wrapperSpan.innerHTML).toContain('border:');
    expect(wrapperSpan.innerHTML).toContain('box-shadow:');
  });

  it('handles search term with trimmed whitespace', () => {
    const text = 'This is a sample text';
    const searchTerm = '  sample  '; // with extra spaces

    const { container } = render(
      <TextHighlighter text={text} searchTerm={searchTerm} theme={mockTheme} />,
    );

    const wrapperSpan = container.firstChild as HTMLElement;
    expect(wrapperSpan.tagName).toBe('SPAN');

    // The highlighting should work even with whitespace in search term
    expect(wrapperSpan.innerHTML).toContain('<mark');
    expect(wrapperSpan.innerHTML).toContain('sample');

    // Check the marked content using our helper function
    const markedContent = getMarkedContent(wrapperSpan.innerHTML);
    expect(markedContent.length).toBe(1);
    expect(markedContent[0]).toBe('sample');
  });
});
