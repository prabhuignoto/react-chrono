import { Theme } from '@models/Theme';
import { FunctionComponent, ReactNode, useRef, useState } from 'react';
import useCloseClickOutside from '../effects/useCloseClickOutside';
import { ChevronDown, ChevronUp, CloseIcon } from '../icons';
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

export type PopoverPosition = 'up' | 'down' | 'left' | 'right';

export type PopOverModel = {
  children: ReactNode | ReactNode[];
  placeholder?: string;
  position: PopoverPosition;
  theme?: Theme;
  width?: string | number;
};

const PopOver: FunctionComponent<PopOverModel> = ({
  children,
  position,
  placeholder,
  theme,
  width = '300px',
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const closePopover = () => setOpen(false);

  const ref = useRef<HTMLDivElement>(null);

  useCloseClickOutside(ref, closePopover);

  return (
    <PopoverWrapper ref={ref}>
      <Selecter role="button" onClick={toggleOpen}>
        <SelecterIcon theme={theme}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </SelecterIcon>
        <SelecterLabel>{placeholder}</SelecterLabel>
      </Selecter>
      {open ? (
        <PopoverHolder position={position} style={{ width: `${width}` }}>
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
