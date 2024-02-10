import { TimelineModel } from '@models/TimelineModel';
import { FunctionComponent, memo, useCallback } from 'react';
import { CheckIcon } from '../icons';
import {
  CheckboxStyle,
  CheckboxWrapper,
  ListItemStyle,
  StyleAndDescription,
  TitleDescriptionStyle,
  TitleStyle,
} from './list.styles';

type ListItemProps = {
  active?: boolean;
  description: string;
  id: string;
  onClick?: (id: string) => void;
  selectable?: boolean;
  selected?: boolean;
  title: string;
} & Pick<TimelineModel, 'theme'>;

const ListItem: FunctionComponent<ListItemProps> = memo(
  ({
    title,
    id,
    description,
    theme,
    onClick,
    active,
    selected = false,
    selectable = false,
  }: ListItemProps) => {
    const handleOnClick = useCallback((id: string) => onClick?.(id), []);

    return (
      <ListItemStyle
        key={id}
        theme={theme}
        onClick={() => handleOnClick?.(id)}
        active={active}
        tabIndex={0}
        selectable={selectable}
      >
        {selectable ? (
          <CheckboxWrapper>
            <CheckboxStyle role="checkbox" selected={selected} theme={theme}>
              {selected && <CheckIcon />}
            </CheckboxStyle>
          </CheckboxWrapper>
        ) : null}
        <StyleAndDescription selectable={selectable}>
          <TitleStyle theme={theme}>{title}</TitleStyle>
          <TitleDescriptionStyle theme={theme}>
            {description}{' '}
          </TitleDescriptionStyle>
        </StyleAndDescription>
      </ListItemStyle>
    );
  },
);

ListItem.displayName = 'ListItem';

export { ListItem };
