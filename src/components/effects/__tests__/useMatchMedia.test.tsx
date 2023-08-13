import { render } from '@testing-library/react';
import { useMatchMedia } from '../useMatchMedia'; // Adjust the path to your hook

import { describe, expect, it, vi } from 'vitest';

// Test component to utilize the useMatchMedia hook
function TestComponent({
  query,
  enabled,
}: {
  enabled: boolean;
  query: string;
}) {
  const matches = useMatchMedia(query, undefined, enabled);
  return <div>{matches ? 'Matches' : 'Does not match'}</div>;
}

describe('useMatchMedia', () => {
  // Mocking window.matchMedia
  beforeAll(() => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      addEventListener: vi.fn(),
      matches: query === '(min-width: 800px)',
      removeEventListener: vi.fn(),
    }));
  });

  it('returns true if the query matches', () => {
    const { getByText } = render(
      <TestComponent query="(min-width: 800px)" enabled={true} />,
    );
    expect(getByText('Matches')).toBeInTheDocument();
  });

  it('returns false if the query does not match', () => {
    const { getByText } = render(
      <TestComponent query="(min-width: 1000px)" enabled={true} />,
    );
    expect(getByText('Does not match')).toBeInTheDocument();
  });

  it('returns false if the hook is disabled', () => {
    const { getByText } = render(
      <TestComponent query="(min-width: 800px)" enabled={false} />,
    );
    expect(getByText('Does not match')).toBeInTheDocument();
  });
});
