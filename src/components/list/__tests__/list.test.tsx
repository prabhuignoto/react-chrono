import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { List } from '../list';

const items = [
  { description: 'Description 1', title: 'Item 1' },
  { description: 'Description 2', title: 'Item 2' },
  { description: 'Description 3', title: 'Item 3' },
];

describe('List', () => {
  it('should render the correct number of list items', () => {
    render(<List items={items} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(items.length);
  });

  it('should call onClick when a list item is clicked', () => {
    const onClick = vi.fn();
    render(<List items={items} onClick={onClick} />);
    const listItem = screen.getByText('Item 1');
    fireEvent.click(listItem);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

    it('should call onSelect when a list item is clicked and multiSelectable is true', () => {
      const onSelectItem = vi.fn();
      const itemsWithOnSelect = items.map((item, index) => ({
        ...item,
        onSelect: index === 0 ? onSelectItem : undefined,
      }));
      render(<List items={itemsWithOnSelect} multiSelectable />);
      const listItem = screen.getByText('Item 1');
      fireEvent.click(listItem);
      expect(onSelectItem).toHaveBeenCalledTimes(1);
    });
});
