import { TimelineModel } from '@models/TimelineModel';
import cls from 'classnames';
import { FunctionComponent, useState } from 'react';
import { CheckIcon } from '../icons';
import { ListModel } from './list.model';
import {
  CheckboxStyle,
  ListItemStyle,
  ListStyle,
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
  title: string;
} & Pick<TimelineModel, 'theme'>;

const ListItem: FunctionComponent<ListItemProps> = ({
  title,
  id,
  description,
  theme,
  onClick,
  active,
  selectable = false,
}) => {
  const [on, setOn] = useState(false);

  const handleOnClick = (id: string) => {
    if (selectable) {
      setOn(!on);
    }

    onClick?.(id);
  };

  const checkBoxClass = cls({
    checkbox: true,
    'checkbox--checked': on,
  });

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
        <CheckboxStyle role="checkbox" className={checkBoxClass}>
          {on && <CheckIcon />}
        </CheckboxStyle>
      ) : null}
      <StyleAndDescription>
        <TitleStyle theme={theme}>{title}</TitleStyle>
        <TitleDescriptionStyle>{description} </TitleDescriptionStyle>
      </StyleAndDescription>
    </ListItemStyle>
  );
};

const List: FunctionComponent<ListModel> = ({
  items,
  theme,
  onClick,
  activeItemIndex,
  selectable = false,
}) => {
  return (
    <ListStyle>
      {items?.map(({ title, id, description }, index) => {
        return (
          <ListItem
            title={title}
            id={id}
            key={id}
            description={description}
            theme={theme}
            onClick={onClick}
            selectable={selectable}
            active={activeItemIndex === index}
          />
        );
      })}
    </ListStyle>
  );
};

export { List };
