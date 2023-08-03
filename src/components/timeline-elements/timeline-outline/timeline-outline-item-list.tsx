import { Theme } from '@models/Theme';
import {
  List,
  ListItem,
  ListItemBullet,
  ListItemName,
} from './timeline-outline.styles';
import { FunctionComponent } from 'react';
import { TimelineOutlineItem } from './timeline-outline';

interface OutlineItemListModel {
  handleSelection: (index: number, id?: string) => void;
  items: TimelineOutlineItem[];
  theme: Theme;
}

/**
 * OutlineItemList component
 * This component is responsible for rendering the outline list of items.
 * It takes a list of items, a theme, and a selection handler function as props,
 * and maps through the items to render each one within the list.
 *
 * @property {TimelineOutlineItem[]} items - The items to be displayed in the list.
 * @property {Theme} theme - The theme object, used for styling.
 * @property {function} handleSelection - The callback to be invoked when an item is selected.
 * @returns {JSX.Element} The rendered OutlineItemList component.
 */
const OutlineItemList: FunctionComponent<OutlineItemListModel> = ({
  items,
  handleSelection,
  theme,
}) => (
  <List>
    {items.map((item, index) => (
      <ListItem
        key={item.id}
        onPointerDown={() => handleSelection(index, item.id)}
      >
        <ListItemBullet theme={theme} selected={item.selected}></ListItemBullet>
        <ListItemName theme={theme} selected={item.selected}>
          {item.name}
        </ListItemName>
      </ListItem>
    ))}
  </List>
);

export { OutlineItemList };
