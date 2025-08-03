import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { FullscreenButton } from '../index';
import { Theme } from '@models/Theme';

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
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe('FullscreenButton', () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the button with correct attributes', () => {
    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'Enter fullscreen');
    expect(button).toHaveAttribute('title', 'Enter Fullscreen');
  });

  it('should show correct labels when not in fullscreen', () => {
    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
      />,
    );

    const button = screen.getByLabelText('Enter fullscreen');
    expect(button).toBeInTheDocument();
  });

  it('should show correct labels when in fullscreen', () => {
    renderWithTheme(
      <FullscreenButton
        isFullscreen={true}
        onToggle={mockOnToggle}
        theme={mockTheme}
      />,
    );

    const button = screen.getByLabelText('Exit fullscreen');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Exit Fullscreen (Esc)');
  });

  it('should call onToggle when clicked', () => {
    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('should handle keyboard interaction', () => {
    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
      />,
    );

    const button = screen.getByRole('button');

    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(mockOnToggle).toHaveBeenCalledTimes(1);

    // Test Space key
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(mockOnToggle).toHaveBeenCalledTimes(2);

    // Test other keys (should not trigger)
    fireEvent.keyDown(button, { key: 'Tab', code: 'Tab' });
    expect(mockOnToggle).toHaveBeenCalledTimes(2);
  });

  it('should be disabled when disabled prop is true', () => {
    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
        disabled={true}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOnToggle).not.toHaveBeenCalled();
  });

  it('should support custom aria-label and title', () => {
    const customAriaLabel = 'Custom fullscreen button';
    const customTitle = 'Custom title';

    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
        ariaLabel={customAriaLabel}
        title={customTitle}
      />,
    );

    const button = screen.getByLabelText(customAriaLabel);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', customTitle);
  });

  it('should apply custom className', () => {
    const customClassName = 'custom-fullscreen-button';

    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
        className={customClassName}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClassName);
  });

  it('should render with different sizes', () => {
    const { rerender } = renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
        size="small"
      />,
    );

    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={mockTheme}>
        <FullscreenButton
          isFullscreen={false}
          onToggle={mockOnToggle}
          theme={mockTheme}
          size="large"
        />
      </ThemeProvider>,
    );

    button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should support custom testId', () => {
    const customTestId = 'custom-fullscreen-btn';

    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
        testId={customTestId}
      />,
    );

    const button = screen.getByTestId(customTestId);
    expect(button).toBeInTheDocument();
  });

  it('should render the correct icon based on fullscreen state', () => {
    const { rerender } = renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
      />,
    );

    // Check for expand icon when not in fullscreen
    expect(screen.getByTestId('fullscreen-button')).toBeInTheDocument();

    // Rerender with fullscreen active
    rerender(
      <ThemeProvider theme={mockTheme}>
        <FullscreenButton
          isFullscreen={true}
          onToggle={mockOnToggle}
          theme={mockTheme}
        />
      </ThemeProvider>,
    );

    // Icon should still be present but representing exit fullscreen
    expect(screen.getByTestId('fullscreen-button')).toBeInTheDocument();
  });

  it('should forward additional props to the button element', () => {
    renderWithTheme(
      <FullscreenButton
        isFullscreen={false}
        onToggle={mockOnToggle}
        theme={mockTheme}
        data-custom="test-value"
        role="button"
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-custom', 'test-value');
  });
});
