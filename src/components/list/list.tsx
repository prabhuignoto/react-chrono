import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import cls from 'classnames';
import { FunctionComponent, useState } from 'react';
import { CheckIcon } from '../icons';
import { ListModel } from './list.model';
import {
  CheckboxStyle,
  CheckboxWrapper,
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
  selected?: boolean;
  title: string;
} & Pick<TimelineModel, 'theme'>;

const ListItem: FunctionComponent<ListItemProps> = ({
  title,
  id,
  description,
  theme,
  onClick,
  active,
  selected = false,
  selectable = false,
}) => {
  const handleOnClick = (id: string) => {
    onClick?.(id);
  };

  const checkBoxClass = cls({
    checkbox: true,
    'checkbox--checked': selected,
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
        <CheckboxWrapper>
          <CheckboxStyle
            role="checkbox"
            className={checkBoxClass}
            selected={selected}
            theme={theme}
          >
            {selected && <CheckIcon />}
          </CheckboxStyle>
        </CheckboxWrapper>
      ) : null}
      <StyleAndDescription selectable={selectable}>
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
  multiSelectable = false,
}) => {
  const [listItems, setListItems] = useState(() =>
    items.map((item) => ({
      id: getUniqueID(),
      ...item,
      selected: false,
    })),
  );

  const onSelect = (id: string) => {
    const updatedItems = listItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });

    setListItems(updatedItems);
  };

  const handleClick = (id: string) => {
    onSelect(id);
    onClick?.(id);
  };

  return (
    <ListStyle>
      {listItems?.map(({ title, id, description, selected }, index) => {
        return (
          <ListItem
            title={title}
            id={id}
            key={id}
            description={description}
            theme={theme}
            onClick={handleClick}
            selectable={selectable}
            selected={selected}
            active={activeItemIndex === index}
          />
        );
      })}
    </ListStyle>
  );
};

export { List };
