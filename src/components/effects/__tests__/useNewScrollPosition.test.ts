import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useNewScrollPosition from '../useNewScrollPosition';

// Mock the TimelineMode since it's an external dependency
vi.mock('@models/TimelineModel', () => ({
  TimelineMode: {
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL',
    VERTICAL_ALTERNATING: 'VERTICAL_ALTERNATING',
  },
}));

describe('useNewScrollPosition', () => {
  let elementMock;
  let scrollMock;
  const itemWidth = 100;

  beforeEach(() => {
    elementMock = {
      clientHeight: 500,
      clientWidth: 300,
      scrollLeft: 150,
      scrollTop: 100,
    };
    scrollMock = {
      contentHeight: 100,
      contentOffset: 150,
      pointOffset: 200,
      pointWidth: 50,
    };
  });

  it('calculates new offset for horizontal mode when item is not fully visible', async () => {
    elementMock.scrollLeft = 150;
    elementMock.clientWidth = 300;
    scrollMock.pointOffset = 400;
    scrollMock.pointWidth = 50;

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    await waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('does not change offset when item is fully visible in horizontal mode', async () => {
    scrollMock.pointOffset = 160;
    scrollMock.pointWidth = 100;

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    await waitFor(() => expect(result.current[0]).toBe(0));
  });

  it('calculates new offset for vertical mode when item is not fully visible', async () => {
    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    const expectedOffset = scrollMock.contentOffset - scrollMock.contentHeight / 2;

    await waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('does not change offset when item is fully visible in vertical mode', async () => {
    scrollMock.contentOffset = 120;
    scrollMock.contentHeight = 300;

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    await waitFor(() => expect(result.current[0]).toBe(0));
  });

  it('calculates new offset for horizontal mode when item is to the right and not visible', async () => {
    scrollMock.pointOffset = 500;

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    await waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('calculates new offset for horizontal mode when item is to the left and not visible', async () => {
    elementMock.scrollLeft = 300;
    scrollMock.pointOffset = 50;

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    await waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('calculates new offset for vertical mode when item is below and not visible', async () => {
    elementMock.scrollTop = 200;
    scrollMock.contentOffset = 800;

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    const expectedOffset = scrollMock.contentOffset - scrollMock.contentHeight / 2;

    await waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('calculates new offset for vertical mode when item is above and not visible', async () => {
    elementMock.scrollTop = 500;
    scrollMock.contentOffset = 100;

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    const expectedOffset = scrollMock.contentOffset - scrollMock.contentHeight / 2;

    await waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });
});
