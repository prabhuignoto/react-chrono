import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBackground } from '../useBackground';
import { hexToRGBA } from '../../utils';

// Mock the hexToRGBA function
vi.mock('../../utils', () => {
  return {
    hexToRGBA: vi.fn(() => 'rgba(0,0,0,0.8)'),
  };
});

describe('useBackground', () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    warnSpy.mockClear();
    vi.mocked(hexToRGBA).mockClear();
  });

  afterEach(() => {
    warnSpy.mockReset();
    vi.mocked(hexToRGBA).mockReset();
  });

  it('returns empty string if no color is provided', () => {
    const { result } = renderHook(() => useBackground());
    expect(result.current).toBe('');
    expect(hexToRGBA).not.toHaveBeenCalled();
  });

  it('returns empty string and warns if color is invalid hex', () => {
    const { result } = renderHook(() => useBackground('not-a-hex'));
    expect(result.current).toBe('');
    expect(warnSpy).toHaveBeenCalledWith('Invalid hex color: not-a-hex');
    expect(hexToRGBA).not.toHaveBeenCalled();
  });

  it('calls hexToRGBA and returns its value for valid hex', () => {
    vi.mocked(hexToRGBA).mockReturnValue('rgba(255,255,255,0.8)');
    const { result } = renderHook(() => useBackground('#fff'));
    expect(hexToRGBA).toHaveBeenCalledWith('#fff', 0.8);
    expect(result.current).toBe('rgba(255,255,255,0.8)');
  });

  it('reacts to color and opacity changes', () => {
    vi.mocked(hexToRGBA)
      .mockReturnValueOnce('rgba(255,0,0,0.5)')
      .mockReturnValueOnce('rgba(255,0,0,1)');

    const { result, rerender } = renderHook(
      ({ color, opacity }) => useBackground(color, opacity),
      {
        initialProps: { color: '#ff0000', opacity: 0.5 },
      },
    );
    expect(result.current).toBe('rgba(255,0,0,0.5)');
    rerender({ color: '#ff0000', opacity: 1 });
    expect(result.current).toBe('rgba(255,0,0,1)');
  });
});
