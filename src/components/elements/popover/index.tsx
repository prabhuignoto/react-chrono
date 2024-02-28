import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
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
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => setOpen(!open), []);

  const closePopover = useCallback(() => setOpen(false), []);

  const handleKeyPress = useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      toggleOpen();
    }
  }, []);

  useCloseClickOutside(ref, closePopover);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  return (
    <PopoverWrapper ref={ref}>
      <Selecter
        role="button"
        onClick={toggleOpen}
        $theme={theme}
        $open={open}
        $isDarkMode={isDarkMode}
        tabIndex={0}
        onKeyUp={handleKeyPress}
        $isMobile={$isMobile}
        title={placeholder}
      >
        <SelecterIcon theme={theme} open={open}>
          {icon || <ChevronDown />}
        </SelecterIcon>
        {placeholder && !$isMobile ? (
          <SelecterLabel>{placeholder}</SelecterLabel>
        ) : null}
      </Selecter>
      {open ? (
        <PopoverHolder
          $position={position}
          $width={width}
          $theme={theme}
          $isMobile={$isMobile}
          $visible={isVisible}
        >
          <Header>
            <CloseButton theme={theme} onClick={closePopover}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Content>{children}</Content>
        </PopoverHolder>
      ) : null}
    </PopoverWrapper>
  );
};

export { PopOver };
