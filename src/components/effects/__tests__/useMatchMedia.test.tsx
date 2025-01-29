import { render, act } from '@testing-library/react';
import { useMatchMedia } from '../useMatchMedia';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

// Test component with updated API
function TestComponent({
  query,
  options = {},
}: {
  query: string;
  options?: {
    enabled?: boolean;
    onMatch?: () => void;
    debounceDelay?: number;
  };
}) {
  const matches = useMatchMedia(query, options);
  return (
    <div data-testid="result">{matches ? 'Matches' : 'Does not match'}</div>
  );
}

describe('useMatchMedia', () => {
  let matchMediaMock: any;
  let addEventListenerSpy: any;
  let removeEventListenerSpy: any;

  beforeEach(() => {
    addEventListenerSpy = vi.fn();
    removeEventListenerSpy = vi.fn();

    matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 800px)',
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
    }));

    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    matchMediaMock.mockClear();
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
  });

  it('returns true if the query matches', () => {
    const { getByTestId } = render(
      <TestComponent query="(min-width: 800px)" />,
    );
    expect(getByTestId('result')).toHaveTextContent('Matches');
  });

  it('returns false if the query does not match', () => {
    const { getByTestId } = render(
      <TestComponent query="(min-width: 1000px)" />,
    );
    expect(getByTestId('result')).toHaveTextContent('Does not match');
  });

  it('returns false if the hook is disabled', () => {
    const { getByTestId } = render(
      <TestComponent query="(min-width: 800px)" options={{ enabled: false }} />,
    );
    expect(getByTestId('result')).toHaveTextContent('Does not match');
  });

  it('calls onMatch callback when query matches', () => {
    const onMatch = vi.fn();
    render(<TestComponent query="(min-width: 800px)" options={{ onMatch }} />);
    expect(onMatch).toHaveBeenCalledTimes(1);
  });

  it('handles media query changes', () => {
    let changeCallback: (event: { matches: boolean }) => void;

    addEventListenerSpy.mockImplementation((event, cb) => {
      changeCallback = cb;
    });

    const { getByTestId } = render(
      <TestComponent query="(min-width: 800px)" />,
    );

    act(() => {
      changeCallback({ matches: false });
    });

    expect(getByTestId('result')).toHaveTextContent('Does not match');
  });

  it('handles resize events with debounce', async () => {
    vi.useFakeTimers();

    const { getByTestId } = render(
      <TestComponent
        query="(min-width: 800px)"
        options={{ debounceDelay: 100 }}
      />,
    );

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(getByTestId('result')).toHaveTextContent('Matches');

    vi.useRealTimers();
  });

  it('handles errors in matchMedia gracefully', () => {
    const originalMatchMedia = window.matchMedia;
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    window.matchMedia = vi.fn().mockImplementation(() => {
      throw new Error('matchMedia error');
    });

    const { getByTestId, unmount } = render(
      <TestComponent query="(min-width: 800px)" />,
    );

    expect(getByTestId('result')).toHaveTextContent('Does not match');
    expect(consoleErrorSpy).toHaveBeenCalled();

    unmount();
    consoleErrorSpy.mockRestore();
    window.matchMedia = originalMatchMedia;
  });

  it('respects maxWait option for resize debounce', async () => {
    vi.useFakeTimers();

    const { getByTestId } = render(
      <TestComponent
        query="(min-width: 800px)"
        options={{ debounceDelay: 2000 }} // Long delay to test maxWait
      />,
    );

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // maxWait is 1000ms, so this should trigger an update
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(getByTestId('result')).toHaveTextContent('Matches');

    vi.useRealTimers();
  });

  it('handles cleanup on query change', () => {
    const { rerender } = render(<TestComponent query="(min-width: 800px)" />);

    rerender(<TestComponent query="(min-width: 1000px)" />);

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
