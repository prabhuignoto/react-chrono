import { FunctionComponent, useCallback, useRef, useReducer } from 'react';
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

  // Use React's new useReducer for complex state
  const [state, setState] = useReducer(
    (
      state: { open: boolean; isVisible: boolean },
      newState: Partial<typeof state>,
    ) => ({
      ...state,
      ...newState,
    }),
    { open: false, isVisible: false },
  );

  const { open, isVisible } = state;

  const toggleOpen = useCallback(() => {
    setState({ open: !open });
    if (!open) {
      // Use automatic batching in React 19
      setTimeout(() => setState({ isVisible: true }), 10);
    } else {
      setState({ isVisible: false });
    }
  }, [open]);

  const closePopover = useCallback(() => {
    setState({ open: false, isVisible: false });
  }, []);

  const handleKeyPress = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        toggleOpen();
        ev.preventDefault();
      }
    },
    [toggleOpen],
  );

  useCloseClickOutside(ref, closePopover);

  return (
    <PopoverWrapper ref={ref}>
      <Selecter
        role="button"
        onClick={toggleOpen}
        $theme={theme}
        $open={open}
        $isDarkMode={isDarkMode}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        $isMobile={$isMobile}
        title={placeholder}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <SelecterIcon theme={theme} open={open}>
          {icon || <ChevronDown />}
        </SelecterIcon>
        {placeholder && !$isMobile && (
          <SelecterLabel>{placeholder}</SelecterLabel>
        )}
      </Selecter>
      {open && (
        <PopoverHolder
          $position={position}
          $width={width}
          $theme={theme}
          $isMobile={$isMobile}
          $visible={isVisible}
          role="dialog"
        >
          <Header>
            <CloseButton
              theme={theme}
              onClick={closePopover}
              aria-label="Close popover"
            >
              <CloseIcon />
            </CloseButton>
          </Header>
          <Content>{children}</Content>
        </PopoverHolder>
      )}
    </PopoverWrapper>
  );
};

export { PopOver };
