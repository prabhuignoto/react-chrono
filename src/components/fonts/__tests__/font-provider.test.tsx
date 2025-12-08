import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FontProvider, useFontState } from '../font-provider';
import { GoogleFontsConfig } from '../google-fonts';

// Mock the google-fonts module
vi.mock('../google-fonts', () => ({
  loadGoogleFonts: vi.fn().mockResolvedValue(undefined),
  generateFontCssVars: vi.fn((config: any) => ({
    '--timeline-font-family': `"${config.fontFamily}", system-ui, sans-serif`,
    '--timeline-title-font-weight': '700',
    '--timeline-cardTitle-font-weight': '500',
  })),
}));

describe('FontProvider', () => {
  beforeEach(() => {
    // Clear document styles
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render children without Google Fonts config', () => {
    render(
      <FontProvider>
        <div data-testid="child">Test Content</div>
      </FontProvider>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should load Google Fonts when config is provided', async () => {
    const { loadGoogleFonts } = await import('../google-fonts');
    const googleFonts: GoogleFontsConfig = {
      fontFamily: 'Roboto',
      elements: {
        title: { weight: 'bold' },
      },
    };

    render(
      <FontProvider googleFonts={googleFonts}>
        <div data-testid="child">Test Content</div>
      </FontProvider>,
    );

    await waitFor(() => {
      expect(loadGoogleFonts).toHaveBeenCalledWith(googleFonts);
    });
  });

  it('should apply CSS custom properties to document root', async () => {
    const googleFonts: GoogleFontsConfig = {
      fontFamily: 'Poppins',
      elements: {
        title: { weight: 700 },
        cardTitle: { weight: 500 },
      },
    };

    const { generateFontCssVars } = await import('../google-fonts');

    render(
      <FontProvider googleFonts={googleFonts}>
        <div>Content</div>
      </FontProvider>,
    );

    await waitFor(() => {
      expect(generateFontCssVars).toHaveBeenCalledWith(googleFonts);
    });

    // Check that CSS variables are set on document root
    await waitFor(() => {
      const styles = document.documentElement.style;
      expect(styles.getPropertyValue('--timeline-font-family')).toBeTruthy();
    });
  });

  it('should handle font loading errors gracefully', async () => {
    const { loadGoogleFonts } = await import('../google-fonts');
    (loadGoogleFonts as any).mockRejectedValueOnce(new Error('Network error'));

    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    const googleFonts: GoogleFontsConfig = {
      fontFamily: 'InvalidFont',
    };

    render(
      <FontProvider googleFonts={googleFonts}>
        <div data-testid="child">Test Content</div>
      </FontProvider>,
    );

    await waitFor(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Failed to load Google Fonts:',
        expect.any(Error),
      );
    });

    // Should still render children even if font loading fails
    expect(screen.getByTestId('child')).toBeInTheDocument();

    consoleWarnSpy.mockRestore();
  });

  it('should cleanup CSS variables on unmount', async () => {
    const googleFonts: GoogleFontsConfig = {
      fontFamily: 'Inter',
    };

    const { unmount } = render(
      <FontProvider googleFonts={googleFonts}>
        <div>Content</div>
      </FontProvider>,
    );

    // Wait for CSS variables to be set
    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue(
          '--timeline-font-family',
        ),
      ).toBeTruthy();
    });

    // Unmount and check cleanup
    unmount();

    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue(
          '--timeline-font-family',
        ),
      ).toBe('');
    });
  });

  it('should update fonts when config changes', async () => {
    const { loadGoogleFonts, generateFontCssVars } =
      await import('../google-fonts');

    const firstConfig: GoogleFontsConfig = {
      fontFamily: 'Roboto',
    };

    const secondConfig: GoogleFontsConfig = {
      fontFamily: 'Open Sans',
    };

    const { rerender } = render(
      <FontProvider googleFonts={firstConfig}>
        <div>Content</div>
      </FontProvider>,
    );

    await waitFor(() => {
      expect(loadGoogleFonts).toHaveBeenCalledWith(firstConfig);
      expect(generateFontCssVars).toHaveBeenCalledWith(firstConfig);
    });

    rerender(
      <FontProvider googleFonts={secondConfig}>
        <div>Content</div>
      </FontProvider>,
    );

    await waitFor(() => {
      expect(loadGoogleFonts).toHaveBeenCalledWith(secondConfig);
      expect(generateFontCssVars).toHaveBeenCalledWith(secondConfig);
    });
  });

  it('should apply font family as inline style to container', () => {
    const googleFonts: GoogleFontsConfig = {
      fontFamily: 'Lato',
    };

    const { container } = render(
      <FontProvider googleFonts={googleFonts}>
        <div>Content</div>
      </FontProvider>,
    );

    const fontProvider = container.querySelector('.timeline-font-provider');
    expect(fontProvider).toBeTruthy();

    const styles = window.getComputedStyle(fontProvider as HTMLElement);
    expect(styles.fontFamily).toContain('Lato');
  });

  it('should set data attributes for loading state', async () => {
    const googleFonts: GoogleFontsConfig = {
      fontFamily: 'Montserrat',
    };

    const { container } = render(
      <FontProvider googleFonts={googleFonts}>
        <div>Content</div>
      </FontProvider>,
    );

    const fontProvider = container.querySelector('.timeline-font-provider');

    await waitFor(() => {
      expect(fontProvider?.getAttribute('data-font-loaded')).toBe('true');
      expect(fontProvider?.getAttribute('data-font-error')).toBe('false');
    });
  });

  it('should apply custom className if provided', () => {
    const { container } = render(
      <FontProvider className="custom-class">
        <div>Content</div>
      </FontProvider>,
    );

    const fontProvider = container.querySelector('.timeline-font-provider');
    expect(fontProvider?.classList.contains('custom-class')).toBe(true);
  });
});

describe('useFontState', () => {
  it('should return font loading state', () => {
    const TestComponent = () => {
      const { loaded, error } = useFontState();
      return (
        <div>
          <span data-testid="loaded">{loaded.toString()}</span>
          <span data-testid="error">{error || 'null'}</span>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('loaded')).toHaveTextContent('true');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
  });
});
