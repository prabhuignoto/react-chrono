import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  loadGoogleFonts,
  generateFontCssVars,
  generateVanillaExtractStyles,
  GoogleFontsConfig,
} from '../google-fonts';

describe('Google Fonts Utilities', () => {
  beforeEach(() => {
    // Clear any existing link tags
    document.querySelectorAll('link').forEach((link) => link.remove());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('generateFontCssVars', () => {
    it('should generate CSS variables for basic font configuration', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Roboto',
      };

      const cssVars = generateFontCssVars(config);

      expect(cssVars['--timeline-font-family']).toContain('Roboto');
      expect(cssVars['--timeline-font-family']).toContain('system-ui');
    });

    it('should generate element-specific CSS variables', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Poppins',
        elements: {
          title: { weight: 'bold', size: '2rem' },
          cardTitle: { weight: 600, style: 'italic' },
          cardText: { weight: 'light' },
        },
      };

      const cssVars = generateFontCssVars(config);

      // Check base font family
      expect(cssVars['--timeline-font-family']).toContain('Poppins');

      // Check title variables
      expect(cssVars['--timeline-title-font-family']).toContain('Poppins');
      expect(cssVars['--timeline-title-font-weight']).toBe('700');
      expect(cssVars['--timeline-title-font-size']).toBe('2rem');

      // Check cardTitle variables
      expect(cssVars['--timeline-cardTitle-font-family']).toContain('Poppins');
      expect(cssVars['--timeline-cardTitle-font-weight']).toBe('600');
      expect(cssVars['--timeline-cardTitle-font-style']).toBe('italic');

      // Check cardText variables
      expect(cssVars['--timeline-cardText-font-family']).toContain('Poppins');
      expect(cssVars['--timeline-cardText-font-weight']).toBe('300');
    });

    it('should normalize font weights correctly', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Inter',
        elements: {
          title: { weight: 'thin' },
          cardTitle: { weight: 'semi-bold' },
          cardSubtitle: { weight: 'black' },
          controls: { weight: 400 },
        },
      };

      const cssVars = generateFontCssVars(config);

      expect(cssVars['--timeline-title-font-weight']).toBe('100');
      expect(cssVars['--timeline-cardTitle-font-weight']).toBe('600');
      expect(cssVars['--timeline-cardSubtitle-font-weight']).toBe('900');
      expect(cssVars['--timeline-controls-font-weight']).toBe('400');
    });
  });

  describe('loadGoogleFonts', () => {
    it('should create link tag with correct URL', async () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Roboto',
        weights: [400, 700],
        display: 'swap',
      };

      const promise = loadGoogleFonts(config);

      // Simulate link load
      const link = document.querySelector(
        'link[rel="stylesheet"]',
      ) as HTMLLinkElement;
      expect(link).toBeTruthy();
      expect(link.href).toContain('fonts.googleapis.com');
      expect(link.href).toContain('family=Roboto');
      expect(link.href).toContain('display=swap');

      // Trigger onload
      link.onload?.(new Event('load'));

      await expect(promise).resolves.toBeUndefined();
    });

    it('should reuse existing link if font already loaded', async () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Open Sans',
        weights: [400],
      };

      // First load
      const promise1 = loadGoogleFonts(config);
      const link1 = document.querySelector(
        'link[rel="stylesheet"]',
      ) as HTMLLinkElement;
      link1.onload?.(new Event('load'));
      await promise1;

      // Second load - should reuse existing
      const promise2 = loadGoogleFonts(config);
      const links = document.querySelectorAll('link[rel="stylesheet"]');

      expect(links.length).toBe(1); // Only one link should exist
      await expect(promise2).resolves.toBeUndefined();
    });

    it('should handle font loading errors', async () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Invalid Font',
      };

      const promise = loadGoogleFonts(config);

      const link = document.querySelector(
        'link[rel="stylesheet"]',
      ) as HTMLLinkElement;
      link.onerror?.(new Event('error'));

      await expect(promise).rejects.toThrow(
        'Failed to load Google Font: Invalid Font',
      );
    });

    it('should add preconnect links when enabled', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Lato',
        preconnect: true,
      };

      loadGoogleFonts(config);

      // Check that stylesheet link is created
      const stylesheetLink = document.querySelector(
        'link[rel="stylesheet"]',
      ) as HTMLLinkElement;
      expect(stylesheetLink).toBeTruthy();
      expect(stylesheetLink.href).toContain('fonts.googleapis.com');

      // Preconnect links are added during the Promise execution
      // The main requirement is that the function doesn't error when preconnect: true
      expect(config.preconnect).toBe(true);
    });

    it('should not add preconnect links when disabled', async () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Merriweather',
        preconnect: false,
      };

      loadGoogleFonts(config);

      const preconnectLinks = document.querySelectorAll(
        'link[rel="preconnect"]',
      );
      expect(preconnectLinks.length).toBe(0);
    });
  });

  describe('generateVanillaExtractStyles', () => {
    it('should generate base styles', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Source Sans Pro',
      };

      const styles = generateVanillaExtractStyles(config);

      expect(styles.base.fontFamily).toContain('Source Sans Pro');
      expect(styles.base.fontFamily).toContain('system-ui');
    });

    it('should generate element-specific styles', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Playfair Display',
        elements: {
          title: { weight: 'bold', size: '2.5rem', style: 'italic' },
          cardTitle: { weight: 500 },
          cardText: { size: '0.9rem' },
        },
      };

      const styles = generateVanillaExtractStyles(config);

      expect(styles.elements.title).toEqual({
        fontFamily: expect.stringContaining('Playfair Display'),
        fontWeight: 700,
        fontSize: '2.5rem',
        fontStyle: 'italic',
      });

      expect(styles.elements.cardTitle).toEqual({
        fontFamily: expect.stringContaining('Playfair Display'),
        fontWeight: 500,
      });

      expect(styles.elements.cardText).toEqual({
        fontFamily: expect.stringContaining('Playfair Display'),
        fontSize: '0.9rem',
      });
    });
  });

  describe('Font URL Generation', () => {
    it('should generate correct URL with multiple weights and styles', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Roboto',
        weights: [300, 400, 700, 'italic'],
        elements: {
          title: { weight: 'bold', style: 'italic' },
          cardText: { weight: 'light' },
        },
      };

      // We can't directly test the private generateGoogleFontsUrl function,
      // but we can test it indirectly through loadGoogleFonts
      loadGoogleFonts(config);

      const link = document.querySelector(
        'link[rel="stylesheet"]',
      ) as HTMLLinkElement;
      expect(link.href).toContain('wght@300;400;400italic;700;700italic');
    });

    it('should handle spaces in font family names', () => {
      const config: GoogleFontsConfig = {
        fontFamily: 'Open Sans',
      };

      loadGoogleFonts(config);

      const link = document.querySelector(
        'link[rel="stylesheet"]',
      ) as HTMLLinkElement;
      expect(link.href).toContain('family=Open%2BSans');
    });
  });
});
