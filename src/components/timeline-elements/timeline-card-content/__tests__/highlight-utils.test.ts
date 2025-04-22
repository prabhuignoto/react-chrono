import { createHighlightedHTML } from '../highlight-utils';
import { describe, it, expect } from 'vitest';

describe('highlight-utils', () => {
  describe('createHighlightedHTML', () => {
    it('returns original text when searchTerm is empty', () => {
      const text = 'This is a test string';
      const result = createHighlightedHTML(text, '', '#0066CC');
      expect(result).toBe(text);
    });

    it('returns original text when text is empty', () => {
      const result = createHighlightedHTML('', 'test', '#0066CC');
      expect(result).toBe('');
    });

    it('returns original text when searchTerm is not found', () => {
      const text = 'This is a test string';
      const result = createHighlightedHTML(text, 'xyz', '#0066CC');
      expect(result).toBe(text);
    });

    it('highlights single occurrence of searchTerm', () => {
      const text = 'This is a test string';
      const result = createHighlightedHTML(text, 'test', '#0066CC');
      expect(result).toContain('<mark');
      expect(result).toContain('>test<');
      expect(result).toContain('#0066CC');
    });

    it('highlights multiple occurrences of searchTerm', () => {
      const text = 'Test test and more test';
      const result = createHighlightedHTML(text, 'test', '#0066CC');
      // Count the number of <mark> tags
      const markCount = (result.match(/<mark/g) || []).length;
      expect(markCount).toBe(3);
    });

    it('highlights case-insensitive occurrences', () => {
      const text = 'Test test TEST';
      const result = createHighlightedHTML(text, 'test', '#0066CC');
      const markCount = (result.match(/<mark/g) || []).length;
      expect(markCount).toBe(3);
    });

    it('handles special regex characters in search term', () => {
      const text = 'Function(arg) is a special method';
      const result = createHighlightedHTML(text, 'Function(arg)', '#0066CC');
      expect(result).toContain('<mark');
      expect(result).toContain('>Function(arg)<');
    });

    it('applies the provided color to the highlight styling', () => {
      const text = 'This is a highlighted text';
      const color = '#FF0000';
      const result = createHighlightedHTML(text, 'highlighted', color);
      expect(result).toContain(color);
    });

    it('handles errors gracefully', () => {
      // Create a scenario that would cause an error
      const result = createHighlightedHTML('text', null as any, '#0066CC');
      expect(result).toBe('text');
    });
  });
});
