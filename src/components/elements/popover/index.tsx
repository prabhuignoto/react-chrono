import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  memo,
} from 'react';
import useCloseClickOutside from 'src/components/effects/useCloseClickOutside';
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

// Memoized Content component with improved padding
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
  position,
  placeholder,
  theme,
  width = 350,
  isDarkMode = false,
  icon,
  $isMobile = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
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

  const handleKeyPress = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        dispatch({ type: 'TOGGLE' });
      }
      if (ev.key === 'Escape' && state.open) {
        dispatch({ type: 'CLOSE' });
      }
    },
    [state.open],
  );

  useCloseClickOutside(ref, closePopover);

  // Use CSS transition instead of setTimeout
  useEffect(() => {
    if (state.open) {
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_VISIBLE', payload: true });
      }, 10);
      return () => clearTimeout(timer);
    } else {
      dispatch({ type: 'SET_VISIBLE', payload: false });
    }
  }, [state.open]);

  return (
    <>
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
          aria-haspopup="true"
        >
          <SelecterIcon $theme={theme} $open={state.open}>
            {icon || <ChevronDown />}
          </SelecterIcon>
          {placeholder && !$isMobile ? (
            <SelecterLabel>{placeholder}</SelecterLabel>
          ) : null}
        </Selecter>
      </PopoverWrapper>
      {state.open ? (
        <PopoverHolder
          $position={position}
          $width={width}
          $theme={theme}
          $isMobile={$isMobile}
          $visible={state.isVisible}
          role="dialog"
          aria-modal="true"
        >
          <Header>
            <CloseButton
              theme={theme}
              onClick={closePopover}
              aria-label="Close"
              title="Close"
            >
              <CloseIcon />
            </CloseButton>
          </Header>
          <MemoizedContent>{children}</MemoizedContent>
        </PopoverHolder>
      ) : null}
    </>
  );
};

export default memo(PopOver);
