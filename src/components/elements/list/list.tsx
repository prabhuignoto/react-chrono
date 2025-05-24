import { getUniqueID } from '@utils/index';
import {
  FunctionComponent,
  startTransition,
  useCallback,
  useMemo,
} from 'react';
import { ListItem } from './list-item';
import { ListModel } from './list.model';
import { ListStyle } from './list.styles';

/**
 * Extends the base list item with a unique identifier
 * @typedef {Object} EnhancedListItem
 * @extends {ListModel['items'][0]}
 * @property {string} id - Unique identifier for the list item
 */
type EnhancedListItem = ListModel['items'][0] & { id: string };

/**
 * List component that renders selectable items with optional multi-select capability
 * @component
 * @param {Object} props - Component props
 * @param {Array<ListModel['items'][0]>} props.items - Array of items to render in the list
 * @param {string} props.theme - Theme configuration for styling
 * @param {(id: string) => void} [props.onClick] - Callback function when an item is clicked
 * @param {number} [props.activeItemIndex] - Index of the currently active item
 * @param {boolean} [props.multiSelectable=false] - Enable multi-select functionality
 * @returns {JSX.Element} Rendered list component
 */
const List: FunctionComponent<ListModel> = ({
  items,
  theme,
  onClick,
  activeItemIndex,
  multiSelectable = false,
}) => {
  /**
   * Memoized list items with generated unique IDs
   */
  const listItems = useMemo(
    () => items.map((item) => ({ id: getUniqueID(), ...item })),
    [items],
  );

  /**
   * Handles single item selection
   * @param {string} id - Item identifier
   */
  const handleSingleSelection = useCallback(
    (id: string) => {
      onClick?.(id);
    },
    [onClick],
  );

  /**
   * Handles multi-item selection
   * @param {EnhancedListItem} item - Selected list item
   */
  const handleMultiSelection = useCallback((item: EnhancedListItem) => {
    if (item.onSelect) {
      startTransition(() => {
        item.onSelect();
      });
    }
  }, []);

  /**
   * Creates a click handler for a specific item
   * @param {EnhancedListItem} item - Item to create handler for
   * @returns {() => void} Click handler function
   */
  const createItemClickHandler = useCallback(
    (item: EnhancedListItem) => () => {
      if (multiSelectable) {
        handleMultiSelection(item);
      } else {
        handleSingleSelection(item.id);
      }
    },
    [multiSelectable, handleMultiSelection, handleSingleSelection],
  );

  return (
    <ListStyle>
      {listItems.map((item, index) => (
        <ListItem
          key={item.id}
          {...item}
          theme={theme}
          onClick={createItemClickHandler(item)}
          selectable={multiSelectable}
          active={activeItemIndex === index}
        />
      ))}
    </ListStyle>
  );
};

export { List };
