import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useMemo,
  memo,
  useState,
  Children,
} from 'react';
import ReactDOM from 'react-dom';
import useCloseClickOutside from 'src/components/effects/useCloseClickOutside';
import { ChevronDown, CloseIcon } from 'src/components/icons';
import { useFocusTrap } from 'src/hooks/useFocusManager';
import { useKeyHandler } from 'src/hooks/useEscapeKey';
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

// Reducer for state management
type State = { open: boolean; isVisible: boolean };
type Action =
  | { type: 'TOGGLE' }
  | { type: 'CLOSE' }
  | { type: 'SET_VISIBLE'; payload: boolean };

const popoverReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, open: !state.open };
    case 'CLOSE':
      return { ...state, open: false };
    case 'SET_VISIBLE':
      return { ...state, isVisible: action.payload };
    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(popoverReducer, {
    open: false,
    isVisible: false,
  });
  const [horizontalPosition, setHorizontalPosition] = useState<
    'left' | 'right' | 'center'
  >('center');
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [portalContainer, setPortalContainer] = useState<HTMLElement>(
    document.body,
  );

  // Use focus trap for keyboard accessibility (WCAG 2.1.2)
  const focusTrapRef = useFocusTrap(state.open);

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
    dispatch({ type: 'TOGGLE' });
  }, []);

  const closePopover = useCallback(() => {
    dispatch({ type: 'CLOSE' });
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

      // Close popover
      closePopover();

      // Restore focus to trigger button
      requestAnimationFrame(() => {
        triggerButtonRef.current?.focus();
      });
    },
    [onItemSelect, closePopover],
  );

  const handleKeyPress = useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      dispatch({ type: 'TOGGLE' });
    }
  }, []);

  // Handle Escape key to close popover and restore focus (WCAG 2.1.2)
  // Using useKeyHandler hook for cleaner, reusable implementation
  useKeyHandler(
    () => {
      dispatch({ type: 'CLOSE' });
      // Restore focus to trigger button
      requestAnimationFrame(() => {
        triggerButtonRef.current?.focus();
      });
    },
    {
      keys: 'Escape',
      enabled: state.open,
      eventType: 'keydown',
      preventDefault: true,
    },
  );

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

    setPopoverPosition({ top, left, width: popoverWidth });
    setHorizontalPosition(horizontalPos);
  }, [width, $isMobile, position]);

  // Position calculation on layout changes and scroll/resize
  useLayoutEffect(() => {
    if (state.open) {
      calculatePopoverPosition();
    }
  }, [state.open, calculatePopoverPosition]);

  // Recalculate position on scroll or resize
  useEffect(() => {
    if (!state.open) return;

    const handlePositionUpdate = () => {
      if (state.open) {
        calculatePopoverPosition();
      }
    };

    window.addEventListener('scroll', handlePositionUpdate, { passive: true });
    window.addEventListener('resize', handlePositionUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', handlePositionUpdate);
      window.removeEventListener('resize', handlePositionUpdate);
    };
  }, [state.open, calculatePopoverPosition]);

  // Use CSS transition instead of setTimeout
  useEffect(() => {
    if (state.open) {
      requestAnimationFrame(() => {
        dispatch({ type: 'SET_VISIBLE', payload: true });
      });
    } else {
      dispatch({ type: 'SET_VISIBLE', payload: false });
    }
  }, [state.open]);

  // Set focus to first menu item when popover opens (WCAG 2.1.1: Keyboard)
  useEffect(() => {
    if (!state.open || !popoverRef.current) return;

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
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
  }, [state.open]);

  /**
   * Wrap children to intercept onClick and close popover on item selection
   */
  const wrappedChildren = useMemo(
    () =>
      Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const typedChild = child as React.ReactElement<any>;

        // Only wrap if it's a List component (has onClick prop)
        if (typedChild.props?.onClick) {
          return React.cloneElement(typedChild, {
            onClick: (id?: string) => {
              // Call original onClick
              typedChild.props.onClick?.(id);
              // Trigger item selection (closes popover + restores focus)
              if (id) {
                handleItemSelect(id);
              }
            },
          });
        }

        return typedChild;
      }),
    [children, handleItemSelect],
  );

  return (
    <>
      <div className={popoverWrapper} ref={ref}>
        <button
          type="button"
          onClick={toggleOpen}
          onKeyDown={handleKeyPress}
          title={placeholder}
          className={selecter}
          style={computeCssVarsFromTheme(theme)}
          aria-expanded={state.open}
          aria-haspopup="dialog"
          aria-label={placeholder || 'Open menu'}
          ref={triggerButtonRef}
        >
          {placeholder && <span className={selecterLabel}>{placeholder}</span>}
          <span
            className={[selecterIcon, state.open ? selecterIconOpen : ''].join(
              ' ',
            )}
          >
            {icon || <ChevronDown />}
          </span>
        </button>
        {state.open &&
          ReactDOM.createPortal(
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
                  visible: state.isVisible,
                  position: position === 'bottom' ? 'bottom' : 'top',
                  leftMobile: !!$isMobile,
                }),
              ].join(' ')}
              style={{
                ...computeCssVarsFromTheme(theme),
                width: `${popoverPosition.width}px`,
                position: 'fixed',
                zIndex: 99999,
                left: `${popoverPosition.left}px`,
                top: `${popoverPosition.top}px`,
                transform: 'none',
              }}
              data-position-x={horizontalPosition}
              role="dialog"
              aria-modal="true"
              aria-labelledby={placeholder ? undefined : 'popover-content'}
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
