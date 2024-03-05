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
      <List items={items} theme={theme} />,
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
    const { getByText } = customRender(
      <List items={items} onClick={onClick} theme={theme} />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    const listItem = getByText('Item 1');
    fireEvent.click(listItem);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSelect when a list item is clicked and multiSelectable is true', () => {
    const onSelectItem = vi.fn();
    const itemsWithOnSelect = items.map((item, index) => ({
      ...item,
      onSelect: index === 0 ? onSelectItem : undefined,
    }));
    const { getByText } = customRender(
      <List items={itemsWithOnSelect} multiSelectable theme={theme} />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    const listItem = getByText('Item 1');
    fireEvent.click(listItem);
    expect(onSelectItem).toHaveBeenCalledTimes(1);
  });
});
