// Import necessary dependencies and utilities
import { getUniqueID } from '@utils/index';
import {
  FunctionComponent,
  startTransition,
  useCallback,
  useState,
} from 'react';
import { ListItem } from './list-item';
import { ListModel } from './list.model';
import { ListStyle } from './list.styles';

// Define the List component
const List: FunctionComponent<ListModel> = ({
  items,
  theme,
  onClick,
  activeItemIndex,
  multiSelectable = false,
}) => {
  // Initialize state for list items
  const [listItems, setListItems] = useState(() =>
    items.map((item) => ({
      id: getUniqueID(),
      ...item,
    })),
  );

  // Callback function for handling checkbox selection
  const onChecked = useCallback((id: string) => {
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
  }, []);

  // Callback function for handling item click
  const handleClick = useCallback((id: string) => {
    onChecked(id);

    if (multiSelectable) {
      const item = listItems.find((item) => item.id === id);

      if (item.onSelect) {
        startTransition(() => {
          item.onSelect();
        });
      }
    } else {
      onClick?.(id);
    }
  }, []);

  // Render the List component
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

// Export the List component
export { List };
