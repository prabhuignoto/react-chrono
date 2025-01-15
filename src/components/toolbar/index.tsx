import { FunctionComponent } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
import {
  ContentWrapper,
  IconWrapper,
  ToolbarListItem,
  ToolbarWrapper,
} from './toolbar.styles';
import { ToolbarProps } from '@models/ToolbarProps';

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
