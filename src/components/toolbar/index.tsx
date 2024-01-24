import { getUniqueID } from '@utils/index';
import { FunctionComponent, ReactNode, useState } from 'react';
import {
  ContentWrapper,
  IconWrapper,
  ToolbarListItem,
  ToolbarWrapper,
} from './toolbar.styles';

export type ToolbarItem = {
  content?: ReactNode | ReactNode[];
  icon: ReactNode;
  id?: string;
  label?: string;
  name: string;
  onSelect: (id: string, name: string) => void;
};

export type ToolbarProps = {
  items?: ToolbarItem[];
};

const Toolbar: FunctionComponent<ToolbarProps> = ({ items }) => {
  const [toolbarItems, setToolbarItems] = useState<ToolbarItem[]>(
    items?.map((item) => ({
      ...item,
      id: getUniqueID(),
    })) || [],
  );

  const handleSelection = (id: string, name: string) => {};

  return (
    <ToolbarWrapper>
      {items?.map(({ label, id, icon, content }, index) => {
        return (
          <ToolbarListItem
            onClick={() => handleSelection(id, label)}
            aria-label={label}
            key={id}
          >
            <IconWrapper>{icon}</IconWrapper>
            <ContentWrapper>{content}</ContentWrapper>
          </ToolbarListItem>
        );
      })}
    </ToolbarWrapper>
  );
};

export { Toolbar };
