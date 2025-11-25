import { useCallback, useRef, useEffect } from 'react';
import { useFocusTrap } from '../useFocusManager';
import { useKeyHandler } from '../useEscapeKey';
import useOutsideClick from '../useOutsideClick';

/**
 * Configuration options for accessible dialog
 */
export interface UseAccessibleDialogOptions {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Element to focus when dialog opens (default: first focusable element) */
  initialFocus?: 'first' | 'last' | React.RefObject<HTMLElement>;
  /** Whether to restore focus to trigger element when closing (default: true) */
  returnFocus?: boolean;
  /** Whether to close dialog on Escape key (default: true) */
  closeOnEscape?: boolean;
  /** Whether to close dialog on outside click (default: true) */
  closeOnOutsideClick?: boolean;
  /** Whether to close dialog on backdrop click (default: true) */
  closeOnBackdropClick?: boolean;
  /** ARIA label for the dialog */
  ariaLabel?: string;
  /** ID of element that describes the dialog */
  ariaDescribedBy?: string;
  /** ID of element that labels the dialog */
  ariaLabelledBy?: string;
}

/**
 * Return value from useAccessibleDialog
 */
export interface UseAccessibleDialogReturn {
  /** Props to spread on the dialog container element */
  dialogProps: {
    ref: React.Ref<HTMLDivElement>;
    role: 'dialog';
    'aria-modal': boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-labelledby'?: string;
    tabIndex: -1;
  };
  /** Props to spread on the backdrop element (if any) */
  backdropProps: {
    onClick: () => void;
    role: 'presentation';
    'aria-hidden': boolean;
  };
  /** Current open state */
  isOpen: boolean;
}

/**
 * useAccessibleDialog - Complete accessible dialog pattern
 *
 * Combines focus trap, keyboard handling, and outside click detection
 * into a single, easy-to-use hook for implementing WCAG-compliant dialogs.
 *
 * WCAG References:
 * - 2.1.2 No Keyboard Trap (Level A)
 * - 2.4.3 Focus Order (Level A)
 * - 4.1.2 Name, Role, Value (Level A)
 * - ARIA APG Dialog Pattern
 *
 * @example
 * ```typescript
 * const { dialogProps, backdropProps } = useAccessibleDialog({
 *   isOpen: isModalOpen,
 *   onClose: closeModal,
 *   closeOnEscape: true,
 *   closeOnOutsideClick: true,
 *   ariaLabel: 'Settings dialog',
 * });
 *
 * return isModalOpen ? (
 *   <Portal>
 *     <div {...backdropProps}>
 *       <div {...dialogProps}>
 *         <h2>Settings</h2>
 *         <button onClick={closeModal}>Close</button>
 *       </div>
 *     </div>
 *   </Portal>
 * ) : null;
 * ```
 */
export const useAccessibleDialog = (
  options: UseAccessibleDialogOptions,
): UseAccessibleDialogReturn => {
  const {
    isOpen,
    onClose,
    initialFocus = 'first',
    returnFocus = true,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    closeOnBackdropClick = true,
    ariaLabel,
    ariaDescribedBy,
    ariaLabelledBy,
  } = options;

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Use focus trap for keyboard navigation (WCAG 2.1.2)
  const focusTrapRef = useFocusTrap(isOpen);

  // Store previous focus when dialog opens
  useEffect(() => {
    if (isOpen && returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen, returnFocus]);

  // Restore focus when dialog closes
  useEffect(() => {
    if (!isOpen && returnFocus && previousFocusRef.current) {
      requestAnimationFrame(() => {
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      });
    }
  }, [isOpen, returnFocus]);

  // Handle initial focus when dialog opens
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    requestAnimationFrame(() => {
      if (!dialogRef.current) return;

      if (typeof initialFocus === 'object' && 'current' in initialFocus) {
        // Focus specific element
        initialFocus.current?.focus();
      } else if (initialFocus === 'first' || initialFocus === 'last') {
        // Focus first or last focusable element
        const focusableElements =
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

        if (focusableElements.length > 0) {
          const targetElement =
            initialFocus === 'first'
              ? focusableElements[0]
              : focusableElements[focusableElements.length - 1];
          targetElement?.focus();
        } else {
          // No focusable elements, focus the dialog itself
          dialogRef.current.focus();
        }
      }
    });
  }, [isOpen, initialFocus]);

  // Handle Escape key to close dialog (WCAG 2.1.2)
  useKeyHandler(
    () => {
      if (closeOnEscape) {
        onClose();
      }
    },
    {
      keys: 'Escape',
      enabled: isOpen,
      eventType: 'keydown',
      preventDefault: true,
    },
  );

  // Handle outside click to close dialog (mousedown)
  useOutsideClick(
    closeOnOutsideClick ? [dialogRef] : [],
    () => {
      if (isOpen) {
        onClose();
      }
    },
    {
      eventType: 'mousedown',
    },
  );

  // Handle outside touch to close dialog (touchstart)
  useOutsideClick(
    closeOnOutsideClick ? [dialogRef] : [],
    () => {
      if (isOpen) {
        onClose();
      }
    },
    {
      eventType: 'touchstart',
    },
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  // Combine refs for focus trap and dialog
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      dialogRef.current = node;
      if (focusTrapRef.current !== node) {
        focusTrapRef.current = node;
      }
    },
    [focusTrapRef],
  );

  return {
    dialogProps: {
      ref: combinedRef,
      role: 'dialog' as const,
      'aria-modal': true,
      ...(ariaLabel !== undefined && { 'aria-label': ariaLabel }),
      ...(ariaDescribedBy !== undefined && {
        'aria-describedby': ariaDescribedBy,
      }),
      ...(ariaLabelledBy !== undefined && {
        'aria-labelledby': ariaLabelledBy,
      }),
      tabIndex: -1,
    },
    backdropProps: {
      onClick: handleBackdropClick,
      role: 'presentation' as const,
      'aria-hidden': true,
    },
    isOpen,
  };
};
