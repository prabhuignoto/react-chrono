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

  // Calculate optimal horizontal positioning
  const calculateHorizontalPosition = useCallback(() => {
    if (!ref.current || !popoverRef.current || $isMobile) return;

    const triggerRect = ref.current.getBoundingClientRect();
    const popoverWidth = width;
    const viewportWidth = window.innerWidth;
    const timelineContainer =
      ref.current.closest('[data-testid="timeline"]') || document.body;
    const containerRect = timelineContainer.getBoundingClientRect();

    // Calculate space available on each side
    const spaceLeft = triggerRect.left - containerRect.left;
    const spaceRight = containerRect.right - triggerRect.right;
    const spaceCenter = Math.min(spaceLeft, spaceRight);

    // Choose position based on available space
    if (popoverWidth <= spaceCenter * 2) {
      setHorizontalPosition('center');
    } else if (spaceLeft >= popoverWidth && spaceLeft > spaceRight) {
      setHorizontalPosition('left');
    } else if (spaceRight >= popoverWidth) {
      setHorizontalPosition('right');
    } else {
      setHorizontalPosition('center'); // Fallback to center with potential overflow
    }
  }, [width, $isMobile]);

  // Position calculation on layout changes
  useLayoutEffect(() => {
    if (state.open) {
      calculateHorizontalPosition();
    }
  }, [state.open, calculateHorizontalPosition]);

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
          <span
            className={[selecterIcon, state.open ? selecterIconOpen : ''].join(
              ' ',
            )}
          >
            {icon || <ChevronDown />}
          </span>
        </button>
        {state.open ? (
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
              width: $isMobile ? '90%' : `${width}px`,
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
          </div>
        ) : null}
      </div>
    </>
  );
};

export default memo(PopOver);
