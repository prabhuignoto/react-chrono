import { FunctionComponent, ReactNode } from 'react';
import {
  ContentWrapper,
  IconWrapper,
  ToolbarListItem,
  ToolbarWrapper,
} from './toolbar.styles';
import { Theme } from '@models/Theme';

export type ToolbarItem = {
  icon?: ReactNode;
  id?: string;
  label?: string;
  name: string;
  onSelect: (id: string, name: string) => void;
};

export type ToolbarProps = {
  children?: ReactNode | ReactNode[];
  items?: ToolbarItem[];
  theme: Theme;
};

const Toolbar: FunctionComponent<ToolbarProps> = ({
  items,
  children = [],
  theme,
}) => {
  return (
    <ToolbarWrapper theme={theme}>
      {items?.map(({ label, id, icon }, index) => {
        return (
          <ToolbarListItem aria-label={label} key={id}>
            {icon ? <IconWrapper>{icon}</IconWrapper> : null}
            <ContentWrapper>{children[index]}</ContentWrapper>
          </ToolbarListItem>
        );
      })}
    </ToolbarWrapper>
  );
};

export { Toolbar };
