import { describe, expect, it, vi } from 'vitest';

import { fireEvent } from '@testing-library/react';
import { getDefaultThemeOrDark } from '@utils/index';
import { customRender, providerProps } from 'src/components/common/test';
import { List } from '../list';

const items = [
  { description: 'Description 1', id: '1', title: 'Item 1' },
  { description: 'Description 2', id: '2', title: 'Item 2' },
  { description: 'Description 3', id: '3', title: 'Item 3' },
];

describe('List', () => {
  const theme = getDefaultThemeOrDark(false);

  it('should render the correct number of list items', () => {
    const { getAllByRole } = customRender(
      <List items={items} theme={theme} data-testid="list-test-1" />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(items.length);
  });

  it('should call onClick when a list item is clicked', () => {
    const onClick = vi.fn();
    const { container } = customRender(
      <List
        items={items}
        onClick={onClick}
        theme={theme}
        data-testid="list-test-2"
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    // Find the list item by its title text
    const firstItemTitle = container.querySelector('h1');
    if (!firstItemTitle) throw new Error('Could not find list item title');

    // Get the parent list item element
    const listItem = firstItemTitle.closest('[data-testid^="list-item"]');
    if (!listItem) throw new Error('Could not find list item element');

    // Click the list item
    fireEvent.click(listItem);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSelect when a list item is clicked and multiSelectable is true', () => {
    const onSelectItem = vi.fn();
    const itemsWithOnSelect = items.map((item, index) => ({
      ...item,
      onSelect: index === 0 ? onSelectItem : undefined,
    }));
    const { container } = customRender(
      <List
        items={itemsWithOnSelect}
        multiSelectable
        theme={theme}
        data-testid="list-test-3"
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    // Find the list item by its title text
    const firstItemTitle = container.querySelector('h1');
    if (!firstItemTitle) throw new Error('Could not find list item title');

    // Get the parent list item element
    const listItem = firstItemTitle.closest('[data-testid^="list-item"]');
    if (!listItem) throw new Error('Could not find list item element');

    // Click the list item
    fireEvent.click(listItem);
    expect(onSelectItem).toHaveBeenCalledTimes(1);
  });
});
