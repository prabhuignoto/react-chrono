import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  memo,
} from 'react';
import useCloseClickOutside from 'src/components/effects/useCloseClickOutside';
import { useFocusTrap } from 'src/hooks/useFocusTrap';
import { ChevronDown, CloseIcon } from 'src/components/icons';
import { PopOverModel } from './popover.model';
import {
  CloseButton,
  Content,
  Header,
  PopoverHolder,
  PopoverWrapper,
  Selecter,
  SelecterIcon,
  SelecterLabel,
} from './popover.styles';

// Memoized Content component
const MemoizedContent = memo(({ children }: { children: React.ReactNode }) => (
  <Content>{children}</Content>
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
  position = 'bottom', // Default to bottom positioning
  placeholder,
  theme,
  width = 350,
  isDarkMode = false,
  icon,
  $isMobile = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const [state, dispatch] = useReducer(popoverReducer, {
    open: false,
    isVisible: false,
  });

  const toggleOpen = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, []);

  const closePopover = useCallback(() => {
    dispatch({ type: 'CLOSE' });
  }, []);
  
  const focusTrapRef = useFocusTrap(state.open, closePopover);

  const handleKeyPress = useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      dispatch({ type: 'TOGGLE' });
    } else if (ev.key === 'Escape' && state.open) {
      ev.preventDefault();
      dispatch({ type: 'CLOSE' });
    } else if (ev.key === 'ArrowDown' && !state.open) {
      ev.preventDefault();
      dispatch({ type: 'TOGGLE' });
    }
  }, [state.open]);

  useCloseClickOutside(ref, closePopover);

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

  // Return focus to trigger when popover closes
  useEffect(() => {
    if (!state.open && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [state.open]);

  return (
    <PopoverWrapper ref={ref}>
      <Selecter
        role="button"
        onClick={toggleOpen}
        $theme={theme}
        $open={state.open}
        $isDarkMode={isDarkMode}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        $isMobile={$isMobile}
        title={placeholder}
        aria-expanded={state.open}
        aria-haspopup="menu"
        aria-controls={state.open ? 'popover-content' : undefined}
        id="popover-trigger"
        ref={triggerRef}
      >
        <SelecterIcon $theme={theme} $open={state.open}>
          {icon || <ChevronDown />}
        </SelecterIcon>
        {placeholder && !$isMobile ? (
          <SelecterLabel>{placeholder}</SelecterLabel>
        ) : null}
      </Selecter>
      {state.open ? (
        <PopoverHolder
          $position={position}
          $width={width}
          $theme={theme}
          $isMobile={$isMobile}
          $visible={state.isVisible}
          id="popover-content"
          role="menu"
          aria-labelledby="popover-trigger"
          ref={focusTrapRef}
        >
          <Header>
            <CloseButton 
              theme={theme} 
              onClick={closePopover}
              aria-label="Close popover"
              title="Close popover"
            >
              <CloseIcon />
            </CloseButton>
          </Header>
          <MemoizedContent>{children}</MemoizedContent>
        </PopoverHolder>
      ) : null}
    </PopoverWrapper>
  );
};

export default memo(PopOver);
