import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBackground } from '../useBackground';
import { hexToRGBA } from '../../utils';

// Mock the hexToRGBA function and utils
vi.mock('../../utils', () => {
  return {
    hexToRGBA: vi.fn(() => 'rgba(0,0,0,0.8)'),
  };
});

vi.mock('../utils', () => {
  return {
    detectColorFormat: vi.fn(),
    adjustRGBOpacity: vi.fn(),
    adjustHSLOpacity: vi.fn(),
    HEX_COLOR_REGEX: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
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

  it('returns empty string and warns if color is invalid', () => {
    // Mock NODE_ENV to be development for console warning
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const { result } = renderHook(() => useBackground('not-a-hex'));
    expect(result.current).toBe('');
    expect(warnSpy).toHaveBeenCalledWith('Unsupported color format: not-a-hex');
    expect(hexToRGBA).not.toHaveBeenCalled();

    // Restore original NODE_ENV
    process.env.NODE_ENV = originalEnv;
  });

  it('calls hexToRGBA and returns its value for valid hex', () => {
    vi.mocked(hexToRGBA).mockReturnValue('rgba(255,255,255,0.8)');
    const { result } = renderHook(() =>
      useBackground('#ffffff', 0.8, { format: 'hex' }),
    );
    expect(hexToRGBA).toHaveBeenCalledWith('#ffffff', 0.8);
    expect(result.current).toBe('rgba(255,255,255,0.8)');
  });

  it('reacts to color and opacity changes', () => {
    vi.mocked(hexToRGBA)
      .mockReturnValueOnce('rgba(255,0,0,0.5)')
      .mockReturnValueOnce('rgba(255,0,0,1)');

    const { result, rerender } = renderHook(
      ({ color, opacity }) => useBackground(color, opacity, { format: 'hex' }),
      {
        initialProps: { color: '#ff0000', opacity: 0.5 },
      },
    );
    expect(result.current).toBe('rgba(255,0,0,0.5)');
    rerender({ color: '#ff0000', opacity: 1 });
    expect(result.current).toBe('rgba(255,0,0,1)');
  });
});
