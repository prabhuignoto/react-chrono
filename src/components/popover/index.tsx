import { FunctionComponent, useEffect, useRef, useState } from 'react';
import useCloseClickOutside from '../effects/useCloseClickOutside';
import { ChevronDown, CloseIcon } from '../icons';
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
  width = '300px',
  isDarkMode = false,
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const closePopover = () => setOpen(false);

  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

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
        theme={theme}
        open={open}
        isDarkMode={isDarkMode}
      >
        <SelecterIcon theme={theme} open={open}>
          <ChevronDown />
        </SelecterIcon>
        <SelecterLabel>{placeholder}</SelecterLabel>
      </Selecter>
      {open ? (
        <PopoverHolder
          position={position}
          style={{ width: `${width}` }}
          theme={theme}
          visible={isVisible}
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
