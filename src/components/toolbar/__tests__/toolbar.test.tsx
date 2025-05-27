// Toolbar.test.tsx

import { render } from '@testing-library/react';
import { getDefaultThemeOrDark } from '@utils/index';
import { ThemeProvider } from 'styled-components';
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
      <ThemeProvider theme={theme}>
        <Toolbar items={items} theme={theme}>
          {items.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </Toolbar>
      </ThemeProvider>,
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
      <ThemeProvider theme={theme}>
        <Toolbar items={[itemWithIcon]} theme={theme}>
          <div>Content</div>
        </Toolbar>
      </ThemeProvider>,
    );

    expect(getByText(/Icon/i)).toBeInTheDocument();
  });
});
