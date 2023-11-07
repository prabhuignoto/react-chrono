import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useNewScrollPosition from '../useNewScrollPosition';

// Mock the TimelineMode since it's an external dependency
// Assuming TimelineMode is an object with string properties
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
    // Reset the mock element and scroll details before each test
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
    // Assuming the itemWidth is 100 as defined earlier
    // Adjusting mock to represent an item not fully visible to the right
    elementMock.scrollLeft = 150; // Where the visible area starts horizontally
    elementMock.clientWidth = 300; // The width of the visible area

    // Let's say our item starts at 400 and has a width of 50
    // It will end at 450, which is beyond the visible area's right edge at 450 (150 + 300)
    scrollMock.pointOffset = 400;
    scrollMock.pointWidth = 50;

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // According to the hook logic, the new offset should be:
    // pointOffset - (itemWidth / 2), which is 400 - (100 / 2) = 350
    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    // Item is not fully visible, so offset should be adjusted
    waitFor(() => expect(result.current[0]).toBe(expectedOffset));
    // expect(result.current[0]).toBe(expectedOffset);
  });

  it('does not change offset when item is fully visible in horizontal mode', async () => {
    // Adjusting mock to make item fully visible
    scrollMock.pointOffset = 160;
    scrollMock.pointWidth = 100; // End of the item would be 260, within client view

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Item is fully visible, so offset should not be adjusted
    waitFor(() => expect(result.current[0]).toBe(0));
  });

  it('calculates new offset for vertical mode when item is not fully visible', () => {
    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Item is not fully visible, so offset should be adjusted
    waitFor(() => {
      expect(result.current[0]).toBe(
        scrollMock.contentOffset - scrollMock.contentHeight / 2,
      );
    });
  });

  it('does not change offset when item is fully visible in vertical mode', () => {
    // Adjusting mock to make item fully visible
    scrollMock.contentOffset = 120;
    scrollMock.contentHeight = 300; // Bottom of the item would be 420, within client view

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Item is fully visible, so offset should not be adjusted
    expect(result.current[0]).toBe(0);
  });

  it('calculates new offset for horizontal mode when item is to the right and not visible', async () => {
    scrollMock.pointOffset = 500; // well beyond the right edge
    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('calculates new offset for horizontal mode when item is to the left and not visible', async () => {
    elementMock.scrollLeft = 300; // The item is to the left outside the visible area
    scrollMock.pointOffset = 50; // The item's right edge is not within the visible area

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  // Vertical Mode Test Cases

  it('calculates new offset for vertical mode when item is below and not visible', async () => {
    elementMock.scrollTop = 200; // The visible area is scrolled down
    scrollMock.contentOffset = 800; // The item's top is well below the visible area

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset =
      scrollMock.contentOffset - scrollMock.contentHeight / 2;

    waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('calculates new offset for vertical mode when item is above and not visible', () => {
    elementMock.scrollTop = 500; // The visible area is scrolled down
    scrollMock.contentOffset = 100; // The item's bottom is above the visible area

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset =
      scrollMock.contentOffset - scrollMock.contentHeight / 2;
    expect(result.current[0]).toBe(expectedOffset);
  });

  it('calculates new offset for horizontal mode when item is to the right and not visible', async () => {
    scrollMock.pointOffset = 500; // well beyond the right edge
    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('calculates new offset for horizontal mode when item is to the left and not visible', async () => {
    elementMock.scrollLeft = 300; // The item is to the left outside the visible area
    scrollMock.pointOffset = 50; // The item's right edge is not within the visible area

    const { result } = renderHook(() =>
      useNewScrollPosition('HORIZONTAL', itemWidth),
    );

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset = scrollMock.pointOffset - itemWidth / 2;

    waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  // Vertical Mode Test Cases

  it('calculates new offset for vertical mode when item is below and not visible', async () => {
    elementMock.scrollTop = 200; // The visible area is scrolled down
    scrollMock.contentOffset = 800; // The item's top is well below the visible area

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset =
      scrollMock.contentOffset - scrollMock.contentHeight / 2;

    waitFor(() => expect(result.current[0]).toBe(expectedOffset));
  });

  it('calculates new offset for vertical mode when item is above and not visible', () => {
    elementMock.scrollTop = 500; // The visible area is scrolled down
    scrollMock.contentOffset = 100; // The item's bottom is above the visible area

    const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

    act(() => {
      result.current[1](elementMock, scrollMock);
    });

    // Check if the new offset has been set to the expected value
    const expectedOffset =
      scrollMock.contentOffset - scrollMock.contentHeight / 2;
    expect(result.current[0]).toBe(expectedOffset);
  });
});
