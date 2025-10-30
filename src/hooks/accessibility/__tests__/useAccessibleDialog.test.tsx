import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAccessibleDialog } from '../useAccessibleDialog';
import { useRef } from 'react';

// Mock dependencies
vi.mock('../../useFocusManager', () => ({
  useFocusTrap: vi.fn(() => ({ current: null })),
}));

vi.mock('../../useEscapeKey', () => ({
  useKeyHandler: vi.fn(),
}));

vi.mock('../../useOutsideClick', () => ({
  default: vi.fn(),
}));

describe('useAccessibleDialog', () => {
  let mockOnClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnClose = vi.fn();
    // Reset all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('should return correct props structure', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(result.current).toHaveProperty('dialogProps');
      expect(result.current).toHaveProperty('backdropProps');
      expect(result.current).toHaveProperty('isOpen');
    });

    it('should return dialogProps with correct ARIA attributes', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          ariaLabel: 'Test Dialog',
        }),
      );

      expect(result.current.dialogProps).toMatchObject({
        role: 'dialog',
        'aria-modal': true,
        'aria-label': 'Test Dialog',
        tabIndex: -1,
      });
    });

    it('should return backdropProps with correct attributes', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(result.current.backdropProps).toMatchObject({
        role: 'presentation',
        'aria-hidden': true,
      });
      expect(typeof result.current.backdropProps.onClick).toBe('function');
    });

    it('should return isOpen state correctly', () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } },
      );

      expect(result.current.isOpen).toBe(false);

      rerender({ isOpen: true });
      expect(result.current.isOpen).toBe(true);
    });

    it('should use default option values when not provided', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      // Default values should result in proper behavior
      // closeOnEscape=true, closeOnBackdropClick=true, returnFocus=true
      expect(result.current.dialogProps).toBeDefined();
      expect(result.current.backdropProps.onClick).toBeDefined();
    });
  });

  describe('Focus management', () => {
    it('should store previous focus when dialog opens', async () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();

      const { rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            returnFocus: true,
          }),
        { initialProps: { isOpen: false } },
      );

      expect(document.activeElement).toBe(button);

      act(() => {
        rerender({ isOpen: true });
      });

      // Previous focus should be stored
      // (we can't directly test the ref, but the behavior is tested in restoration)

      document.body.removeChild(button);
    });

    it('should restore focus when dialog closes', async () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();

      const { rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            returnFocus: true,
          }),
        { initialProps: { isOpen: false } },
      );

      // Open dialog
      act(() => {
        rerender({ isOpen: true });
      });

      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();

      // Close dialog
      act(() => {
        rerender({ isOpen: false });
      });

      // Wait for requestAnimationFrame
      await waitFor(() => {
        expect(document.activeElement).toBe(button);
      });

      document.body.removeChild(button);
      document.body.removeChild(input);
    });

    it('should not restore focus when returnFocus=false', async () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();

      const { rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            returnFocus: false,
          }),
        { initialProps: { isOpen: false } },
      );

      // Open dialog
      act(() => {
        rerender({ isOpen: true });
      });

      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();

      // Close dialog
      act(() => {
        rerender({ isOpen: false });
      });

      // Wait a bit to ensure no focus restoration happens
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(document.activeElement).toBe(input);

      document.body.removeChild(button);
      document.body.removeChild(input);
    });

    it('should focus first element when initialFocus="first"', async () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            initialFocus: 'first',
          }),
        { initialProps: { isOpen: false } },
      );

      // Create a dialog with focusable elements
      const dialog = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      dialog.appendChild(button1);
      dialog.appendChild(button2);
      document.body.appendChild(dialog);

      // Simulate ref assignment
      if (result.current.dialogProps.ref && 'current' in result.current.dialogProps.ref) {
        // @ts-expect-error - ref assignment
        result.current.dialogProps.ref.current = dialog;
      }

      act(() => {
        rerender({ isOpen: true });
      });

      await waitFor(() => {
        expect(document.activeElement).toBe(button1);
      });

      document.body.removeChild(dialog);
    });

    it('should focus last element when initialFocus="last"', async () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            initialFocus: 'last',
          }),
        { initialProps: { isOpen: false } },
      );

      const dialog = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      dialog.appendChild(button1);
      dialog.appendChild(button2);
      document.body.appendChild(dialog);

      if (result.current.dialogProps.ref && 'current' in result.current.dialogProps.ref) {
        // @ts-expect-error - ref assignment
        result.current.dialogProps.ref.current = dialog;
      }

      act(() => {
        rerender({ isOpen: true });
      });

      await waitFor(() => {
        expect(document.activeElement).toBe(button2);
      });

      document.body.removeChild(dialog);
    });

    it('should focus custom ref when provided', async () => {
      const customButton = document.createElement('button');
      document.body.appendChild(customButton);

      // Create a ref for the custom button
      const customRef = { current: customButton };

      const { rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            initialFocus: customRef,
          }),
        { initialProps: { isOpen: false } },
      );

      act(() => {
        rerender({ isOpen: true });
      });

      await waitFor(() => {
        expect(document.activeElement).toBe(customButton);
      });

      document.body.removeChild(customButton);
    });

    it('should focus dialog itself when no focusable elements', async () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            initialFocus: 'first',
          }),
        { initialProps: { isOpen: false } },
      );

      const dialog = document.createElement('div');
      dialog.tabIndex = -1;
      document.body.appendChild(dialog);

      if (result.current.dialogProps.ref && 'current' in result.current.dialogProps.ref) {
        // @ts-expect-error - ref assignment
        result.current.dialogProps.ref.current = dialog;
      }

      act(() => {
        rerender({ isOpen: true });
      });

      await waitFor(() => {
        expect(document.activeElement).toBe(dialog);
      });

      document.body.removeChild(dialog);
    });
  });

  describe('Keyboard handling', () => {
    it('should call onClose when Escape is pressed and closeOnEscape=true', () => {
      const { useKeyHandler } = require('../../useEscapeKey');

      renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          closeOnEscape: true,
        }),
      );

      // Get the callback passed to useKeyHandler
      expect(useKeyHandler).toHaveBeenCalled();
      const escapeCallback = useKeyHandler.mock.calls[0][0];
      const options = useKeyHandler.mock.calls[0][1];

      expect(options.keys).toBe('Escape');
      expect(options.enabled).toBe(true);
      expect(options.eventType).toBe('keydown');
      expect(options.preventDefault).toBe(true);

      // Trigger the Escape callback
      act(() => {
        escapeCallback();
      });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when Escape is pressed and closeOnEscape=false', () => {
      const { useKeyHandler } = require('../../useEscapeKey');

      renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          closeOnEscape: false,
        }),
      );

      const escapeCallback = useKeyHandler.mock.calls[0][0];

      act(() => {
        escapeCallback();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should only enable Escape handler when dialog is open', () => {
      const { useKeyHandler } = require('../../useEscapeKey');

      const { rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
            closeOnEscape: true,
          }),
        { initialProps: { isOpen: false } },
      );

      let options = useKeyHandler.mock.calls[useKeyHandler.mock.calls.length - 1][1];
      expect(options.enabled).toBe(false);

      act(() => {
        rerender({ isOpen: true });
      });

      options = useKeyHandler.mock.calls[useKeyHandler.mock.calls.length - 1][1];
      expect(options.enabled).toBe(true);
    });

    it('should use preventDefault for Escape key', () => {
      const { useKeyHandler } = require('../../useEscapeKey');

      renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      const options = useKeyHandler.mock.calls[0][1];
      expect(options.preventDefault).toBe(true);
    });

    it('should use keydown event type', () => {
      const { useKeyHandler } = require('../../useEscapeKey');

      renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      const options = useKeyHandler.mock.calls[0][1];
      expect(options.eventType).toBe('keydown');
    });
  });

  describe('Click handling', () => {
    it('should call onClose on outside click when closeOnOutsideClick=true', () => {
      const useOutsideClick = require('../../useOutsideClick').default;

      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          closeOnOutsideClick: true,
        }),
      );

      expect(useOutsideClick).toHaveBeenCalled();
      const callback = useOutsideClick.mock.calls[0][1];

      act(() => {
        callback();
      });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not setup outside click when closeOnOutsideClick=false', () => {
      const useOutsideClick = require('../../useOutsideClick').default;

      renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          closeOnOutsideClick: false,
        }),
      );

      // Should be called with empty array (no refs to monitor)
      const refs = useOutsideClick.mock.calls[0][0];
      expect(refs).toEqual([]);
    });

    it('should call onClose on backdrop click when closeOnBackdropClick=true', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          closeOnBackdropClick: true,
        }),
      );

      act(() => {
        result.current.backdropProps.onClick();
      });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose on backdrop click when closeOnBackdropClick=false', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          closeOnBackdropClick: false,
        }),
      );

      act(() => {
        result.current.backdropProps.onClick();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should handle both outside click and backdrop click independently', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          closeOnOutsideClick: true,
          closeOnBackdropClick: false,
        }),
      );

      // Backdrop click should not close
      act(() => {
        result.current.backdropProps.onClick();
      });
      expect(mockOnClose).not.toHaveBeenCalled();

      // Outside click should close
      const useOutsideClick = require('../../useOutsideClick').default;
      const callback = useOutsideClick.mock.calls[0][1];
      act(() => {
        callback();
      });
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('ARIA attributes', () => {
    it('should apply aria-label when provided', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          ariaLabel: 'Custom Dialog Label',
        }),
      );

      expect(result.current.dialogProps['aria-label']).toBe('Custom Dialog Label');
    });

    it('should apply aria-describedby when provided', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          ariaDescribedBy: 'dialog-description',
        }),
      );

      expect(result.current.dialogProps['aria-describedby']).toBe(
        'dialog-description',
      );
    });

    it('should apply aria-labelledby when provided', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
          ariaLabelledBy: 'dialog-title',
        }),
      );

      expect(result.current.dialogProps['aria-labelledby']).toBe('dialog-title');
    });

    it('should always set aria-modal to true', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(result.current.dialogProps['aria-modal']).toBe(true);
    });

    it('should set dialog role', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(result.current.dialogProps.role).toBe('dialog');
    });

    it('should set tabIndex to -1 for programmatic focus', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(result.current.dialogProps.tabIndex).toBe(-1);
    });

    it('should set backdrop role to presentation', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(result.current.backdropProps.role).toBe('presentation');
    });

    it('should hide backdrop from screen readers', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(result.current.backdropProps['aria-hidden']).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle rapid open/close without errors', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useAccessibleDialog({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } },
      );

      // Rapidly toggle
      act(() => {
        rerender({ isOpen: true });
      });
      act(() => {
        rerender({ isOpen: false });
      });
      act(() => {
        rerender({ isOpen: true });
      });
      act(() => {
        rerender({ isOpen: false });
      });

      // Should not throw errors
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should cleanup properly on unmount', () => {
      const { unmount } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      expect(() => unmount()).not.toThrow();
    });

    it('should work when dialog ref is not yet assigned', () => {
      const { result } = renderHook(() =>
        useAccessibleDialog({
          isOpen: true,
          onClose: mockOnClose,
        }),
      );

      // Should not throw even without ref assignment
      expect(result.current.dialogProps).toBeDefined();
    });
  });
});
