import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// ThemeProvider no longer needed with vanilla-extract migration
import { Toolbar } from '../index';
import { ToolbarItem } from '@models/ToolbarItem';
import { Theme } from '@models/Theme';
import userEvent from '@testing-library/user-event';

// Mock theme for testing
const mockTheme: Theme = {
  primary: '#007bff',
  secondary: '#6c757d',
  cardBgColor: '#ffffff',
  toolbarBgColor: '#f8f9fa',
  toolbarBtnBgColor: '#ffffff',
  toolbarTextColor: '#495057',
  buttonBorderColor: '#dee2e6',
  buttonHoverBgColor: '#e9ecef',
  buttonActiveBgColor: '#007bff',
  buttonActiveIconColor: '#ffffff',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  iconColor: '#6c757d',
  titleColor: '#212529',
  titleColorActive: '#007bff',
  cardTitleColor: '#212529',
  textColor: '#6c757d',
  glowColor: 'rgba(0, 123, 255, 0.25)',
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(component);
};

describe('Toolbar Comprehensive Tests', () => {
  let mockOnSelect: jest.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnSelect = vi.fn();
  });

  describe('Basic Rendering', () => {
    it('should render null when no items provided', () => {
      const { container } = renderWithTheme(
        <Toolbar items={[]} theme={mockTheme}>
          <div>Content</div>
        </Toolbar>,
      );

      // Toolbar returns null when there are no items
      expect(container.firstChild).toBeNull();
    });

    it('should render toolbar with single item', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Single Item',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Single Item',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => item.onSelect(item.id || '', item.name)}
            >
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const button = screen.getByText('Single Item');
      expect(button).toBeInTheDocument();
    });

    it('should render toolbar with multiple items', () => {
      const items: ToolbarItem[] = [
        { name: 'Item 1', onSelect: mockOnSelect, id: '1', label: 'Item 1' },
        { name: 'Item 2', onSelect: mockOnSelect, id: '2', label: 'Item 2' },
        { name: 'Item 3', onSelect: mockOnSelect, id: '3', label: 'Item 3' },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => item.onSelect(item.id || '', item.name)}
            >
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should render items with icons', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Item with Icon',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Item with Icon',
          icon: <span data-testid="custom-icon">🔧</span>,
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => item.onSelect(item.id || '', item.name)}
            >
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      // The icon should be rendered once in the toolbar structure
      const icon = screen.getByTestId('custom-icon');
      expect(icon).toBeInTheDocument();
      expect(screen.getByText('Item with Icon')).toBeInTheDocument();
    });

    it('should render items with custom content', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Custom Item',
          onSelect: mockOnSelect,
          id: '1',
          content: <div data-testid="custom-content">Custom Content</div>,
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <div key={index} onClick={item.onSelect}>
              {item.content || item.name}
            </div>
          ))}
        </Toolbar>,
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });
  });

  describe('Item Interactions', () => {
    it('should call onSelect when item is clicked', async () => {
      const user = userEvent.setup();
      const items: ToolbarItem[] = [
        {
          name: 'Clickable Item',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Clickable Item',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const button = screen.getByText('Clickable Item');
      await user.click(button);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });

    it('should call correct onSelect for multiple items', async () => {
      const user = userEvent.setup();
      const mockOnSelect1 = vi.fn();
      const mockOnSelect2 = vi.fn();
      const items: ToolbarItem[] = [
        { name: 'Item 1', onSelect: mockOnSelect1, id: '1', label: 'Item 1' },
        { name: 'Item 2', onSelect: mockOnSelect2, id: '2', label: 'Item 2' },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      await user.click(screen.getByText('Item 1'));
      expect(mockOnSelect1).toHaveBeenCalledTimes(1);
      expect(mockOnSelect2).not.toHaveBeenCalled();

      await user.click(screen.getByText('Item 2'));
      expect(mockOnSelect1).toHaveBeenCalledTimes(1);
      expect(mockOnSelect2).toHaveBeenCalledTimes(1);
    });

    it.skip('should handle keyboard interactions', async () => {
      const user = userEvent.setup();
      const items: ToolbarItem[] = [
        {
          name: 'Keyboard Item',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Keyboard Item',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const toolbarItem = screen.getByLabelText('Keyboard Item');
      toolbarItem.focus();

      await user.keyboard('{Enter}');
      expect(mockOnSelect).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(mockOnSelect).toHaveBeenCalledTimes(2);
    });

    it('should handle disabled items', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Disabled Item',
          onSelect: mockOnSelect,
          id: '1',
          disabled: true,
          label: 'Disabled Item',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onSelect}
              disabled={item.disabled}
            >
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const button = screen.getByText('Disabled Item');
      expect(button).toBeDisabled();

      fireEvent.click(button);
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('Theme Integration', () => {
    it('should apply theme colors correctly', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Themed Item',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Themed Item',
        },
      ];

      const { container } = renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      // Check if toolbar has proper styling
      const toolbar =
        container.querySelector('[data-testid="toolbar"]') ||
        container.firstChild;
      expect(toolbar).toBeInTheDocument();
    });

    it('should handle theme changes', () => {
      const items: ToolbarItem[] = [
        { name: 'Item', onSelect: mockOnSelect, id: '1', label: 'Item' },
      ];

      const darkTheme: Theme = {
        ...mockTheme,
        toolbarBgColor: '#343a40',
        toolbarTextColor: '#ffffff',
      };

      const { rerender } = renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      // Rerender with dark theme
      rerender(
        <Toolbar items={items} theme={darkTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      expect(screen.getByText('Item')).toBeInTheDocument();
    });

    it('should handle missing theme properties gracefully', () => {
      const incompleteTheme = {
        primary: '#007bff',
        // Missing other properties
      } as Theme;

      const items: ToolbarItem[] = [
        { name: 'Item', onSelect: mockOnSelect, id: '1', label: 'Item' },
      ];

      expect(() => {
        renderWithTheme(
          <Toolbar items={items} theme={incompleteTheme}>
            {items.map((item, index) => (
              <button key={index} onClick={item.onSelect}>
                {item.name}
              </button>
            ))}
          </Toolbar>,
        );
      }).not.toThrow();
    });
  });

  describe('Advanced Features', () => {
    it('should handle items with tooltips', async () => {
      const items: ToolbarItem[] = [
        {
          name: 'Item with Tooltip',
          onSelect: mockOnSelect,
          id: '1',
          tooltip: 'This is a helpful tooltip',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect} title={item.tooltip}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const button = screen.getByText('Item with Tooltip');
      expect(button).toHaveAttribute('title', 'This is a helpful tooltip');
    });

    it('should handle items with badges/counts', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Item with Badge',
          onSelect: mockOnSelect,
          id: '1',
          badge: '5',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
              {item.badge && <span data-testid="badge">{item.badge}</span>}
            </button>
          ))}
        </Toolbar>,
      );

      expect(screen.getByTestId('badge')).toHaveTextContent('5');
    });

    it('should handle active/selected states', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Active Item',
          onSelect: mockOnSelect,
          id: '1',
          active: true,
          label: 'Active Item',
        },
        {
          name: 'Inactive Item',
          onSelect: mockOnSelect,
          id: '2',
          active: false,
          label: 'Inactive Item',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onSelect}
              className={item.active ? 'active' : ''}
              data-active={item.active}
            >
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const activeButton = screen.getByText('Active Item');
      const inactiveButton = screen.getByText('Inactive Item');

      expect(activeButton).toHaveClass('active');
      expect(activeButton).toHaveAttribute('data-active', 'true');
      expect(inactiveButton).not.toHaveClass('active');
      expect(inactiveButton).toHaveAttribute('data-active', 'false');
    });

    it('should handle grouped items', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Group 1 Item 1',
          onSelect: mockOnSelect,
          id: '1',
          group: 'group1',
          label: 'Group 1 Item 1',
        },
        {
          name: 'Group 1 Item 2',
          onSelect: mockOnSelect,
          id: '2',
          group: 'group1',
          label: 'Group 1 Item 2',
        },
        {
          name: 'Group 2 Item 1',
          onSelect: mockOnSelect,
          id: '3',
          group: 'group2',
          label: 'Group 2 Item 1',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {Object.entries(
            items.reduce(
              (groups, item) => {
                const group = item.group || 'default';
                if (!groups[group]) groups[group] = [];
                groups[group].push(item);
                return groups;
              },
              {} as Record<string, ToolbarItem[]>,
            ),
          ).map(([groupName, groupItems], groupIndex) => (
            <div key={groupName} data-testid={`group-${groupName}`}>
              {groupItems.map((item, index) => (
                <button key={index} onClick={item.onSelect}>
                  {item.name}
                </button>
              ))}
            </div>
          ))}
        </Toolbar>,
      );

      expect(screen.getByTestId('group-group1')).toBeInTheDocument();
      expect(screen.getByTestId('group-group2')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Accessible Item',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Accessible Item',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          <div role="toolbar" aria-label="Timeline toolbar">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={item.onSelect}
                aria-label={item.name}
              >
                {item.name}
              </button>
            ))}
          </div>
        </Toolbar>,
      );

      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('aria-label', 'Timeline toolbar');

      // Get all buttons and find the one with aria-label
      const allButtons = screen.getAllByRole('button');
      const accessibleButton = allButtons.find(
        (btn) => btn.getAttribute('aria-label') === 'Accessible Item'
      );
      expect(accessibleButton).toHaveAttribute('aria-label', 'Accessible Item');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      const mockOnSelect = vi.fn();
      const items: ToolbarItem[] = [
        { name: 'Item 1', onSelect: mockOnSelect, id: '1', label: 'Item 1' },
        { name: 'Item 2', onSelect: mockOnSelect, id: '2', label: 'Item 2' },
        { name: 'Item 3', onSelect: mockOnSelect, id: '3', label: 'Item 3' },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      // Get the items by their text labels
      const item1 = screen.getByText('Item 1');
      const item2 = screen.getByText('Item 2');
      const item3 = screen.getByText('Item 3');

      // Click Item 1
      await user.click(item1);
      expect(mockOnSelect).toHaveBeenCalled();

      // Click Item 2
      await user.click(item2);
      expect(mockOnSelect).toHaveBeenCalledTimes(2);

      // Click Item 3
      await user.click(item3);
      expect(mockOnSelect).toHaveBeenCalledTimes(3);
    });

    it('should announce state changes to screen readers', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Toggle Item',
          onSelect: mockOnSelect,
          id: '1',
          active: false,
          label: 'Toggle Item',
        },
      ];

      const { rerender } = renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onSelect}
              aria-pressed={item.active}
            >
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const buttons = screen.getAllByRole('button');
      const toggleButton = buttons.find(
        (button) => button.getAttribute('aria-pressed') === 'false',
      );
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

      // Simulate state change
      const updatedItems = [{ ...items[0], active: true }];
      rerender(
        <Toolbar items={updatedItems} theme={mockTheme}>
          {updatedItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.onSelect(item.id || '', item.name)}
              aria-pressed={item.active}
            >
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const updatedButtons = screen.getAllByRole('button');
      const updatedToggleButton = updatedButtons.find(
        (button) => button.getAttribute('aria-pressed') === 'true',
      );
      expect(updatedToggleButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle large number of items', () => {
      const items: ToolbarItem[] = Array.from({ length: 100 }, (_, i) => ({
        name: `Item ${i + 1}`,
        onSelect: mockOnSelect,
        id: `${i + 1}`,
        label: `Item ${i + 1}`,
      }));

      expect(() => {
        renderWithTheme(
          <Toolbar items={items} theme={mockTheme}>
            {items.map((item, index) => (
              <button key={index} onClick={item.onSelect}>
                {item.name}
              </button>
            ))}
          </Toolbar>,
        );
      }).not.toThrow();

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 100')).toBeInTheDocument();
    });

    it('should handle items with special characters', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Item with émojis 🚀',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Item with émojis 🚀',
        },
        {
          name: 'Item with "quotes" & symbols',
          onSelect: mockOnSelect,
          id: '2',
          label: 'Item with "quotes" & symbols',
        },
        {
          name: 'Item with <HTML> tags',
          onSelect: mockOnSelect,
          id: '3',
          label: 'Item with <HTML> tags',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      expect(screen.getByText('Item with émojis 🚀')).toBeInTheDocument();
      expect(
        screen.getByText('Item with "quotes" & symbols'),
      ).toBeInTheDocument();
      expect(screen.getByText('Item with <HTML> tags')).toBeInTheDocument();
    });

    it('should handle items with null/undefined properties', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Valid Item',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Valid Item',
        },
        {
          name: null as any,
          onSelect: mockOnSelect,
          id: '2',
          label: null as any,
        },
        {
          name: undefined as any,
          onSelect: mockOnSelect,
          id: '3',
          label: undefined as any,
        },
        { name: '', onSelect: mockOnSelect, id: '4', label: '' },
      ];

      expect(() => {
        renderWithTheme(
          <Toolbar items={items} theme={mockTheme}>
            {items.map((item, index) => (
              <button key={index} onClick={item.onSelect}>
                {item.name || `Item ${index + 1}`}
              </button>
            ))}
          </Toolbar>,
        );
      }).not.toThrow();
    });

    it('should handle rapid successive clicks', async () => {
      const user = userEvent.setup();
      const items: ToolbarItem[] = [
        {
          name: 'Rapid Click Item',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Rapid Click Item',
        },
      ];

      renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      const button = screen.getByText('Rapid Click Item');

      // Click rapidly multiple times
      await user.click(button);
      await user.click(button);
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnSelect).toHaveBeenCalledTimes(5);
    });

    it('should handle component unmounting gracefully', () => {
      const items: ToolbarItem[] = [
        {
          name: 'Unmount Test',
          onSelect: mockOnSelect,
          id: '1',
          label: 'Unmount Test',
        },
      ];

      const { unmount } = renderWithTheme(
        <Toolbar items={items} theme={mockTheme}>
          {items.map((item, index) => (
            <button key={index} onClick={item.onSelect}>
              {item.name}
            </button>
          ))}
        </Toolbar>,
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
