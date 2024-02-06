import { getUniqueID } from '@utils/index';
import { FunctionComponent, useState } from 'react';
import { ListItem } from './list-item';
import { ListModel } from './list.model';
import { ListStyle } from './list.styles';

const List: FunctionComponent<ListModel> = ({
  items,
  theme,
  onClick,
  activeItemIndex,
  multiSelectable = false,
}) => {
  const [listItems, setListItems] = useState(() =>
    items.map((item) => ({
      id: getUniqueID(),
      ...item,
      selected: false,
    })),
  );

  const onChecked = (id: string) => {
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
    onChecked(id);

    if (multiSelectable) {
      const item = listItems.find((item) => item.id === id);

      if (item.onSelect) {
        item.onSelect();
      }
    } else {
      onClick?.(id);
    }
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
            selectable={multiSelectable}
            selected={selected}
            active={activeItemIndex === index}
          />
        );
      })}
    </ListStyle>
  );
};

export { List };
