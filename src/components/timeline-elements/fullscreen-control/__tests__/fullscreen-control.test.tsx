import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { FullscreenControl } from '../index';
import { Theme } from '@models/Theme';
import React from 'react';

// Mock theme for testing
const mockTheme: Theme = {
  primary: '#007bff',
  secondary: '#6c757d',
  cardBgColor: '#ffffff',
  toolbarBtnBgColor: '#f8f9fa',
  buttonBorderColor: '#dee2e6',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  iconColor: '#6c757d',
  titleColor: '#212529',
  titleColorActive: '#007bff',
  cardTitleColor: '#212529',
  textColor: '#6c757d',
  buttonHoverBgColor: '#e9ecef',
  buttonActiveBgColor: '#007bff',
  buttonActiveIconColor: '#ffffff',
  glowColor: 'rgba(0, 123, 255, 0.25)',
};

describe('FullscreenControl Basic Tests', () => {
  it('should render component without crashing', () => {
    const targetRef = { current: document.createElement('div') };
    const mockOnEnter = vi.fn();
    const mockOnExit = vi.fn();

    // Mock fullscreen API to be supported
    Object.defineProperty(document, 'fullscreenEnabled', {
      writable: true,
      configurable: true,
      value: true,
    });

    Object.defineProperty(targetRef.current, 'requestFullscreen', {
      writable: true,
      configurable: true,
      value: vi.fn(),
    });

    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <FullscreenControl
          targetRef={targetRef}
          theme={mockTheme}
          onEnterFullscreen={mockOnEnter}
          onExitFullscreen={mockOnExit}
        />
      </ThemeProvider>,
    );

    // Component may or may not render depending on fullscreen support detection
    // This test ensures no errors occur during rendering
    expect(container).toBeTruthy();
  });

  it('should not render when fullscreen is not supported', () => {
    const targetRef = { current: document.createElement('div') };
    const mockOnEnter = vi.fn();
    const mockOnExit = vi.fn();

    // Mock fullscreen API to not be supported
    Object.defineProperty(document, 'fullscreenEnabled', {
      writable: true,
      configurable: true,
      value: false,
    });

    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <FullscreenControl
          targetRef={targetRef}
          theme={mockTheme}
          onEnterFullscreen={mockOnEnter}
          onExitFullscreen={mockOnExit}
        />
      </ThemeProvider>,
    );

    // Should render nothing when not supported
    expect(container.firstChild).toBeNull();
  });
});
