import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  memo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import useCloseClickOutside from 'src/components/effects/useCloseClickOutside';
import { ChevronDown, CloseIcon } from 'src/components/icons';
import { PopOverModel } from './popover.model';
import {
  closeButton,
  content,
  header,
  holderBottom,
  holderLeftMobile,
  holderTop,
  holderVisible,
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
}) => {
  const ref = useRef<HTMLDivElement>(null);
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
    width: 0 
  });

  const toggleOpen = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, []);

  const closePopover = useCallback(() => {
    dispatch({ type: 'CLOSE' });
  }, []);

  const handleKeyPress = useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      dispatch({ type: 'TOGGLE' });
    }
  }, []);

  useCloseClickOutside(ref, closePopover);

  // Calculate optimal positioning for portal rendering
  const calculatePopoverPosition = useCallback(() => {
    if (!ref.current) return;

    const triggerRect = ref.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = $isMobile ? Math.min(320, viewportWidth * 0.9) : width;
    
    // Calculate horizontal position
    let left = triggerRect.left;
    let horizontalPos: 'left' | 'right' | 'center' = 'left';
    
    if ($isMobile) {
      // Center on mobile
      left = (viewportWidth - popoverWidth) / 2;
      horizontalPos = 'center';
    } else {
      // Calculate space available on each side
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;
      
      if (popoverWidth <= spaceRight) {
        // Align with left edge of trigger
        left = triggerRect.left;
        horizontalPos = 'left';
      } else if (popoverWidth <= spaceLeft) {
        // Align with right edge of trigger
        left = triggerRect.right - popoverWidth;
        horizontalPos = 'right';
      } else {
        // Center horizontally
        left = Math.max(16, (viewportWidth - popoverWidth) / 2);
        horizontalPos = 'center';
      }
      
      // Ensure popover doesn't go off-screen
      left = Math.max(16, Math.min(left, viewportWidth - popoverWidth - 16));
    }
    
    // Calculate vertical position
    let top = triggerRect.bottom + 8; // 8px gap below trigger
    
    // If position === 'bottom' but there's not enough space below, try above
    if (position === 'bottom' && top + 400 > viewportHeight) {
      const topPosition = triggerRect.top - 408; // 400px height + 8px gap
      if (topPosition > 16) {
        top = topPosition;
      }
    } else if (position === 'top') {
      top = Math.max(16, triggerRect.top - 408);
    }
    
    // Ensure popover doesn't go above viewport
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
              ref={popoverRef}
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
              aria-modal="false"
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
              <MemoizedContent>{children}</MemoizedContent>
            </div>,
            document.body,
          )}
      </div>
    </>
  );
};

export default memo(PopOver);
