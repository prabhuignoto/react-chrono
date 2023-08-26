import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TimelineOutline, TimelineOutlineItem } from '../timeline-outline'; // Update import based on your actual file path
import { Theme } from '@models/Theme';
import { vi, Mock } from 'vitest';

// Mock GlobalContext and icons
vi.mock('../../GlobalContext', () => ({
  GlobalContext: {
    Consumer: ({ children }) =>
      children({
        theme: {},
      }),
  },
}));

vi.mock('../../icons/close', () => () => 'CloseIcon');
vi.mock('../../icons/menu', () => () => 'MenuIcon');

describe('<TimelineOutline />', () => {
  let mockItems: TimelineOutlineItem[];
  let mockTheme: Theme;
  let mockOnSelect: Mock;

  beforeEach(() => {
    mockItems = [
      { id: '1', name: 'Item 1', selected: false },
      { id: '2', name: 'Item 2', selected: true },
      { id: '3', name: 'Item 3', selected: false },
    ];
    mockTheme = {}; // Add any specific theme details if needed
    mockOnSelect = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Component rendering
  it('should render correctly with initial state', () => {
    const { getByRole, queryByText } = render(
      <TimelineOutline
        items={mockItems}
        onSelect={mockOnSelect}
        mode={'VERTICAL'}
        theme={mockTheme}
      />,
    );
    expect(getByRole('button')).toBeInTheDocument();
    expect(queryByText('Item 1')).not.toBeInTheDocument(); // List should be hidden initially
  });

  // Test 2: Test component interactions (Toggle Pane)
  it('should toggle pane on button click', async () => {
    const { getByText, getByRole } = render(
      <TimelineOutline
        items={mockItems}
        onSelect={mockOnSelect}
        mode={'VERTICAL'}
        theme={mockTheme}
      />,
    );

    fireEvent.pointerDown(getByRole('button'));

    await waitFor(() => {
      expect(getByText('Item 1')).toBeInTheDocument(); // List should be visible now
    });
  });

  // // Test 3: Test component state and props (Items and Selection)
  it('should correctly handle item selection', async () => {
    const { getByRole, getByText } = render(
      <TimelineOutline
        items={mockItems}
        onSelect={mockOnSelect}
        mode={'VERTICAL'}
        theme={mockTheme}
      />,
    );

    fireEvent.pointerDown(getByRole('button'));

    await waitFor(() => {
      expect(getByText('Item 1')).toBeInTheDocument(); // List should be visible now
      fireEvent.pointerDown(getByText('Item 1'));
    });

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith(0); // The index of the clicked item should be 0
    });
  });

  // // Test 4: Test component state and props (Edge Cases)
  it('should handle empty items array gracefully', async () => {
    const { getByRole, queryByText } = render(
      <TimelineOutline
        items={[]}
        onSelect={mockOnSelect}
        mode={'VERTICAL'}
        theme={mockTheme}
      />,
    );

    fireEvent.pointerDown(getByRole('button'));

    await waitFor(() => {
      expect(queryByText('Item 1')).not.toBeInTheDocument(); // No items should be displayed
    });
  });
});
