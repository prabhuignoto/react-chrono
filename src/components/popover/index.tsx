import { FunctionComponent, ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from '../icons';
import {
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
};

const PopOver: FunctionComponent<PopOverModel> = ({
  children,
  position,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <PopoverWrapper>
      <Selecter role="button" onClick={toggleOpen}>
        <SelecterIcon>{open ? <ChevronUp /> : <ChevronDown />}</SelecterIcon>
        <SelecterLabel>{placeholder}</SelecterLabel>
      </Selecter>
      {open ? (
        <PopoverHolder position={position}>{children}</PopoverHolder>
      ) : null}
    </PopoverWrapper>
  );
};

export { PopOver };
