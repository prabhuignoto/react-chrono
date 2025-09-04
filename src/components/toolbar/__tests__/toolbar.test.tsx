// Toolbar.test.tsx

import { render } from '@testing-library/react';
import { getDefaultThemeOrDark } from '../../../utils/index';
import { Toolbar } from '../index';
import { ToolbarItem } from '@models/ToolbarItem';

const items: ToolbarItem[] = [
  { name: 'Item 1', onSelect: () => {}, id: '1' },
  { name: 'Item 2', onSelect: () => {}, id: '2' },
];

const theme = getDefaultThemeOrDark();

describe('Toolbar', () => {
  it('renders toolbar items', () => {
    const { getByText, baseElement } = render(
      <Toolbar items={items} theme={theme}>
        {items.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </Toolbar>,
    );

    console.log(baseElement.innerHTML);

    expect(getByText(/Item 1/i)).toBeInTheDocument();
    expect(getByText(/Item 2/i)).toBeInTheDocument();
  });

  it('renders icons', () => {
    const itemWithIcon = {
      icon: <span>Icon</span>,
      name: 'Icon Item',
      id: '3',
      onSelect: () => {},
    };

    const { getByText } = render(
      <Toolbar items={[itemWithIcon]} theme={theme}>
        <div>Content</div>
      </Toolbar>,
    );

    expect(getByText(/Icon/i)).toBeInTheDocument();
  });
});
