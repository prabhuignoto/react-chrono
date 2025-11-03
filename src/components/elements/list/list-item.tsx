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
    rovingProps,
  }: ListItemModel) => {
    /**
     * Memoized click handler
     * @param {string} id - Item identifier
     */
    const handleOnClick = useCallback((id: string) => onClick?.(id), [onClick]);

    /**
     * Merged keyboard event handler for menu item (WCAG 2.1.1: Keyboard)
     * Combines roving tabindex (arrows) + menu selection (Enter/Space)
     * @param {KeyboardEvent} ev - Keyboard event
     */
    const handleKeyDown = useCallback(
      (ev: KeyboardEvent) => {
        // First, let roving tabindex handle arrow key navigation
        if (rovingProps?.onKeyDown) {
          rovingProps.onKeyDown(ev as any);
        }

        // Then handle Enter/Space for selection (if not already handled)
        if (!ev.defaultPrevented && (ev.key === 'Enter' || ev.key === ' ')) {
          ev.preventDefault();
          handleOnClick(id);
        }
      },
      [rovingProps, handleOnClick, id],
    );

    const itemClass = `${listItem} ${active ? listItemActive : ''} ${listItemRecipe({ active: !!active })}`;
    return (
      <li
        data-testid="list-item"
        role="menuitem"
        onClick={() => handleOnClick(id)}
        onKeyDown={handleKeyDown}
        className={itemClass}
        tabIndex={rovingProps?.tabIndex ?? -1}
        ref={rovingProps?.ref}
        onFocus={rovingProps?.onFocus}
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
