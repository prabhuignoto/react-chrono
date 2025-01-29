import { FunctionComponent, KeyboardEvent, memo, useCallback } from 'react';
import { CheckIcon } from 'src/components/icons';
import { ListItemModel } from './list.model';
import {
  CheckboxStyle,
  CheckboxWrapper,
  ListItemStyle,
  StyleAndDescription,
  TitleDescriptionStyle,
  TitleStyle,
} from './list.styles';

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

    return (
      <ListItemStyle
        data-testid="list-item"
        key={id}
        $theme={theme}
        onClick={() => handleOnClick(id)}
        $active={active}
        tabIndex={0}
        $selectable={selectable}
        onKeyUp={(ev) => handleKeyPress(ev, id)}
      >
        {selectable ? (
          <CheckboxWrapper>
            <CheckboxStyle 
              role="checkbox" 
              aria-checked={selected}
              selected={selected} 
              theme={theme}
            >
              {selected && <CheckIcon />}
            </CheckboxStyle>
          </CheckboxWrapper>
        ) : null}
        <StyleAndDescription $selectable={selectable}>
          <TitleStyle theme={theme}>{title}</TitleStyle>
          <TitleDescriptionStyle theme={theme}>
            {description}
          </TitleDescriptionStyle>
        </StyleAndDescription>
      </ListItemStyle>
    );
  },
);

ListItem.displayName = 'ListItem';

export { ListItem };
