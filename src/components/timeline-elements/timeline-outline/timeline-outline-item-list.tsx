import { Theme } from '@models/Theme';
import {
  listRoot,
  listItem,
  listItemBullet,
  listItemBulletSelected,
  listItemName,
  listItemNameSelected,
} from './timeline-outline.css';
import { memo, FunctionComponent, useCallback, useMemo } from 'react';
import { TimelineOutlineItem } from './timeline-outline.model';
import { useWindowSize } from '../../../hooks/useWindowSize';

// Extract item into its own component for better performance
const OutlineItem = memo(
  ({
    item,
    index,
    handleSelection,
    theme,
  }: {
    item: TimelineOutlineItem;
    index: number;
    handleSelection: (index: number, id?: string) => void;
    theme: Theme;
  }) => {
    const onClick = useCallback(
      () => handleSelection(index, item.id),
      [handleSelection, index, item.id],
    );

    return (
      <li
        key={item.id ?? index}
        onPointerDown={onClick}
        aria-disabled={item.disabled}
        aria-selected={item.selected}
        aria-label={item.ariaLabel ?? item.name}
        className={listItem}
      >
        <span
          className={
            item.selected
              ? `${listItemBullet} ${listItemBulletSelected}`
              : listItemBullet
          }
        ></span>
        <span
          className={
            item.selected
              ? `${listItemName} ${listItemNameSelected}`
              : listItemName
          }
        >
          {item.name}
        </span>
      </li>
    );
  },
);

OutlineItem.displayName = 'OutlineItem';

interface OutlineItemListModel {
  handleSelection: (index: number, id?: string) => void;
  items: TimelineOutlineItem[];
  theme: Theme;
}

/**
 * OutlineItemList component
 * This component is responsible for rendering the outline list of items.
 * It uses virtualization for better performance with long lists.
 */
const OutlineItemList: FunctionComponent<OutlineItemListModel> = memo(
  ({ items, handleSelection, theme }) => {
    const { height } = useWindowSize();

    // Only render the visible items based on window size
    // In a real implementation, you'd use a proper virtualization library
    const visibleItems = useMemo(() => {
      // If list is small, render all items
      if (items.length < 50) return items;

      const itemHeight = 30; // Approximate height of an item
      const visibleCount = Math.ceil(height / itemHeight);

      // In a real virtualization implementation, you'd calculate visible range
      // based on scroll position. This is a simplified version.
      return items.slice(0, visibleCount * 2);
    }, [items, height]);

    return (
      <ul className={listRoot}>
        {visibleItems.map((item, index) => (
          <OutlineItem
            key={item.id ?? index}
            item={item}
            index={index}
            handleSelection={handleSelection}
            theme={theme}
          />
        ))}
        {items.length > visibleItems.length && (
          <li className={listItem}>
            <span className={listItemName}>
              {`+ ${items.length - visibleItems.length} more items`}
            </span>
          </li>
        )}
      </ul>
    );
  },
);

OutlineItemList.displayName = 'OutlineItemList';

export { OutlineItemList };
