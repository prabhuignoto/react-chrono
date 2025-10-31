import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  memo,
  useState,
  Children,
} from 'react';
import ReactDOM from 'react-dom';
import useCloseClickOutside from '@components/effects/useCloseClickOutside';
import { ChevronDown, CloseIcon } from '@components/icons';
import { useFocusTrap } from '@hooks/useFocusManager';
import { PopOverModel } from './popover.model';
import {
  closeButton,
  content,
  header,
  popoverHolder,
  popoverWrapper,
  selecter,
  selecterIcon,
  selecterIconOpen,
  selecterLabel,
} from './popover.css';
import { popoverHolderRecipe } from './popover.css';
import { computeCssVarsFromTheme } from '../../../styles/theme-bridge';

// Memoized content wrapper applying the class from CSS module
const MemoizedContent = memo(({ children }: { children: React.ReactNode }) => (
  <div className={content}>{children}</div>
));

/**
 * A customizable popover component that displays content in a floating panel
 * @param {PopOverModel} props - Component props
 * @returns {JSX.Element} PopOver component
 */
const PopOver: FunctionComponent<PopOverModel> = ({
  children,
  position,
  placeholder,
  theme,
  width = 350,
  isDarkMode = false,
  icon,
  $isMobile = false,
  onItemSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [popoverLayout, setPopoverLayout] = useState({
    position: { top: 0, left: 0, width: 0 },
    horizontalPosition: 'center' as 'left' | 'right' | 'center',
  });
  const [portalContainer, setPortalContainer] = useState<HTMLElement>(
    document.body,
  );

  // Use focus trap for keyboard accessibility (WCAG 2.1.2)
  const focusTrapRef = useFocusTrap(isOpen);

  // Memoize theme CSS variables to prevent recalculation on every render
  const themeCssVars = useMemo(
    () => computeCssVarsFromTheme(theme),
    [theme],
  );

  // Get the current fullscreen element (with vendor prefix support)
  const getFullscreenElement = useCallback((): HTMLElement | null => {
    if (typeof document === 'undefined') return null;

    const doc = document as Document & {
      fullscreenElement?: Element;
      webkitFullscreenElement?: Element;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
    };

    const fullscreenEl =
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      null;

    return fullscreenEl as HTMLElement | null;
  }, []);

  // Update portal container when fullscreen state changes
  useEffect(() => {
    const updatePortalContainer = () => {
      const fullscreenEl = getFullscreenElement();
      setPortalContainer(fullscreenEl || document.body);
    };

    // Update immediately
    updatePortalContainer();

    // Listen for fullscreen changes
    const events = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'msfullscreenchange',
    ];

    events.forEach((event) => {
      document.addEventListener(event, updatePortalContainer);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, updatePortalContainer);
      });
    };
  }, [getFullscreenElement]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    // Restore focus to trigger button (WCAG 2.4.3: Focus Order)
    // Called when: ESC key pressed, Enter/Space on menu item, or click outside
    // BUT: Don't steal focus if user is clicking on search input
    requestAnimationFrame(() => {
      const activeElement = document.activeElement;
      const isSearchInput =
        activeElement?.tagName === 'INPUT' &&
        (activeElement as HTMLInputElement).type === 'search';

      // Only restore focus if not moving to search input (let user continue searching)
      if (!isSearchInput && triggerButtonRef.current) {
        try {
          triggerButtonRef.current.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
    });
  }, []);

  /**
   * Handle menu item selection - close popover and restore focus
   * This is called when a menu item is selected via Enter/Space
   * @param {string} itemId - The selected item ID
   */
  const handleItemSelect = useCallback(
    (itemId: string) => {
      // Call parent's onItemSelect callback if provided
      onItemSelect?.(itemId);

      // Close popover (handles focus restoration via closePopover)
      closePopover();
    },
    [onItemSelect, closePopover],
  );

  const handleKeyPress = useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      toggleOpen();
    }
  }, [toggleOpen]);

  // Handle Escape key and click outside to close popover
  // useCloseClickOutside hook handles both scenarios (WCAG 2.1.2)
  useCloseClickOutside(ref, closePopover);

  // Calculate optimal positioning for portal rendering
  const calculatePopoverPosition = useCallback(() => {
    if (!ref.current) return;

    const triggerRect = ref.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = $isMobile ? Math.min(320, viewportWidth * 0.9) : width;

    // Calculate horizontal position - center the popover under the button
    let left = triggerRect.left;
    let horizontalPos: 'left' | 'right' | 'center' = 'left';

    if ($isMobile) {
      // Center on mobile
      left = (viewportWidth - popoverWidth) / 2;
      horizontalPos = 'center';
    } else {
      // First try to center the popover horizontally under the button
      const buttonCenterX = triggerRect.left + triggerRect.width / 2;
      let preferredLeft = buttonCenterX - popoverWidth / 2;

      // Check if the preferred position fits within viewport
      if (
        preferredLeft >= 16 &&
        preferredLeft + popoverWidth <= viewportWidth - 16
      ) {
        // Center alignment works
        left = preferredLeft;
        horizontalPos = 'center';
      } else if (triggerRect.left + popoverWidth <= viewportWidth - 16) {
        // Align with left edge of button
        left = triggerRect.left;
        horizontalPos = 'left';
      } else if (triggerRect.right - popoverWidth >= 16) {
        // Align with right edge of button
        left = triggerRect.right - popoverWidth;
        horizontalPos = 'right';
      } else {
        // Fallback: fit within viewport
        left = Math.max(
          16,
          Math.min(triggerRect.left, viewportWidth - popoverWidth - 16),
        );
        horizontalPos = 'left';
      }
    }

    // Calculate vertical position - directly below the button
    const gap = 8; // Smaller gap for tighter positioning
    let top = triggerRect.bottom + gap;

    // Check if there's enough space below
    const popoverHeight = 400; // Estimated height
    const spaceBelow = viewportHeight - triggerRect.bottom - gap;
    const spaceAbove = triggerRect.top - gap;

    if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
      // Position above if not enough space below
      top = triggerRect.top - popoverHeight - gap;
    } else {
      // Keep below, but ensure it doesn't go off-screen
      top = Math.min(top, viewportHeight - popoverHeight - 16);
    }

    // Ensure minimum distance from viewport edge
    top = Math.max(16, top);

    // Combine state updates to prevent double re-render
    setPopoverLayout({
      position: { top, left, width: popoverWidth },
      horizontalPosition: horizontalPos,
    });
  }, [width, $isMobile, position]);

  // Position calculation on layout changes and scroll/resize
  useLayoutEffect(() => {
    if (isOpen) {
      calculatePopoverPosition();
    }
  }, [isOpen, calculatePopoverPosition]);

  // Recalculate position on scroll or resize with RAF-based throttling
  useEffect(() => {
    if (!isOpen) return;

    // Use RAF to throttle position recalculation and prevent layout thrashing
    let rafId: number | null = null;
    const handlePositionUpdate = () => {
      if (rafId !== null) return; // Skip if RAF already scheduled

      rafId = requestAnimationFrame(() => {
        calculatePopoverPosition();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handlePositionUpdate, { passive: true });
    window.addEventListener('resize', handlePositionUpdate, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handlePositionUpdate);
      window.removeEventListener('resize', handlePositionUpdate);
    };
  }, [isOpen, calculatePopoverPosition]);

  // Handle fade in/out animations with CSS
  // Use RAF to ensure state change is applied to DOM before CSS animation plays
  useEffect(() => {
    if (isOpen) {
      // Fade in: trigger animation with RAF to ensure DOM is ready
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      // Fade out: CSS animation plays naturally while portal stays in DOM
      // Then isVisible becomes false, triggering opacity transition
      setIsVisible(false);
    }
  }, [isOpen]);

  // Set focus to first menu item when popover opens (WCAG 2.1.1: Keyboard)
  useEffect(() => {
    if (!isOpen || !popoverRef.current) return;

    // Use requestAnimationFrame to ensure DOM is updated
    const rafId = requestAnimationFrame(() => {
      if (!popoverRef.current) return;

      // Find the first menu item (for ARIA menu pattern)
      const firstMenuItem = popoverRef.current.querySelector('[role="menuitem"]');
      if (firstMenuItem instanceof HTMLElement) {
        firstMenuItem.focus();
        return;
      }

      // Fallback: find first focusable element (button or tabindex=0)
      const firstFocusable = popoverRef.current.querySelector(
        'button:not([tabindex="-1"]), [tabindex="0"]'
      );
      if (firstFocusable instanceof HTMLElement) {
        firstFocusable.focus();
      }
    });

    // Clean up RAF on unmount or when popover closes
    return () => cancelAnimationFrame(rafId);
  }, [isOpen]);

  /**
   * Wrap children to intercept onClick for non-multiSelectable lists
   * For multiSelectable lists, popover stays open to allow multiple selections
   * and closes via Escape key or click outside
   */
  const wrappedChildren = useMemo(
    () =>
      Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const typedChild = child as React.ReactElement<{
          onClick?: (id?: string) => void;
          multiSelectable?: boolean;
          [key: string]: unknown;
        }>;

        // Check if this is a List component with onClick (non-multiSelectable)
        const hasOnClick = !!typedChild.props?.onClick;
        const isMultiSelectable = !!typedChild.props?.multiSelectable;

        // Only wrap onClick for non-multiSelectable lists to avoid infinite loops
        // MultiSelectable lists keep popover open for multiple selections
        if (hasOnClick && !isMultiSelectable) {
          return React.cloneElement(typedChild, {
            onClick: (id?: string) => {
              // Call original onClick
              typedChild.props.onClick?.(id);
              // Close popover after selection
              if (id) {
                handleItemSelect(id);
              }
            },
          });
        }

        // Return unmodified for multiSelectable lists
        return typedChild;
      }),
    [children, handleItemSelect],
  );

  return (
    <>
      <div className={popoverWrapper} ref={ref}>
        <button
          id="popover-trigger"
          type="button"
          onClick={toggleOpen}
          onKeyDown={handleKeyPress}
          title={placeholder}
          className={selecter}
          style={themeCssVars}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label={placeholder || 'Open menu'}
          ref={triggerButtonRef}
        >
          {placeholder && <span className={selecterLabel}>{placeholder}</span>}
          <span
            className={[selecterIcon, isOpen ? selecterIconOpen : ''].join(
              ' ',
            )}
          >
            {icon || <ChevronDown />}
          </span>
        </button>
        {ReactDOM.createPortal(
          <div
            ref={(el) => {
              // Combine focus trap ref with popover ref
              popoverRef.current = el;
              if (focusTrapRef.current !== el) {
                focusTrapRef.current = el;
              }
            }}
            className={[
              popoverHolder,
              popoverHolderRecipe({
                visible: isVisible,
                position: position === 'bottom' ? 'bottom' : 'top',
                leftMobile: !!$isMobile,
              }),
            ].join(' ')}
            style={{
              ...themeCssVars,
              width: `${popoverLayout.position.width}px`,
              position: 'fixed',
              zIndex: 99999,
              left: `${popoverLayout.position.left}px`,
              top: `${popoverLayout.position.top}px`,
              transform: 'none',
              // Prevent interaction when popover is not visible (fade-out animation playing)
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
            data-position-x={popoverLayout.horizontalPosition}
            role="menu"
            aria-labelledby="popover-trigger"
          >
              <div className={header}>
                <button
                  className={closeButton}
                  onClick={closePopover}
                  type="button"
                  aria-label="Close menu"
                  title="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>
              <MemoizedContent>{wrappedChildren}</MemoizedContent>
            </div>,
            portalContainer,
          )}
      </div>
    </>
  );
};

export default memo(PopOver);
