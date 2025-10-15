import { FunctionComponent, KeyboardEvent, memo, useCallback } from 'react';
import { CheckIcon } from 'src/components/icons';
import { ListItemModel } from './list.model';
import {
  checkbox,
  checkboxSelected,
  checkboxWrapper,
  description as descriptionClass,
  listItem,
  listItemActive,
  styleAndDescription,
  title as titleClass,
} from './list.css';
import { listItemRecipe } from './list.css';

/**
 * ListItem component displays a selectable/clickable item with title and description
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The title text of the list item
 * @param {string} props.id - Unique identifier for the list item
 * @param {string} props.description - Optional description text below the title
 * @param {Theme} props.theme - Theme object for styling
 * @param {(id: string) => void} props.onClick - Click handler function
 * @param {boolean} props.active - Whether the item is in active state
 * @param {boolean} [props.selected=false] - Whether the item is selected (for checkbox mode)
 * @param {boolean} [props.selectable=false] - Whether the item shows a checkbox
 * @returns {JSX.Element} Rendered ListItem component
 */
const ListItem: FunctionComponent<ListItemModel> = memo(
  ({
    title,
    id,
    description,
    theme,
    onClick,
    active,
    selected = false,
    selectable = false,
  }: ListItemModel) => {
    /**
     * Memoized click handler
     * @param {string} id - Item identifier
     */
    const handleOnClick = useCallback((id: string) => onClick?.(id), [onClick]);

    /**
     * Keyboard event handler for accessibility
     * @param {KeyboardEvent} ev - Keyboard event
     * @param {string} id - Item identifier
     */
    const handleKeyPress = useCallback((ev: KeyboardEvent, id: string) => {
      if (ev.key === 'Enter') {
        handleOnClick(id);
      }
    }, []);

    const itemClass = `${listItem} ${active ? listItemActive : ''} ${listItemRecipe({ active: !!active })}`;
    return (
      <li
        data-testid="list-item"
        key={id}
        onClick={() => handleOnClick(id)}
        tabIndex={0}
        onKeyUp={(ev) => handleKeyPress(ev, id)}
        className={itemClass}
      >
        {selectable ? (
          <span className={checkboxWrapper}>
            <span
              role="checkbox"
              aria-checked={selected}
              className={`${checkbox} ${selected ? checkboxSelected : ''}`}
            >
              {selected && <CheckIcon />}
            </span>
          </span>
        ) : null}
        <div className={styleAndDescription}>
          <h1 className={titleClass}>{title}</h1>
          {description && <p className={descriptionClass}>{description}</p>}
        </div>
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';

export { ListItem };
