import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { getDefaultThemeOrDark } from '@utils/index';
import { customRender, providerProps } from 'src/components/common/test';
import { describe, expect, it, vi } from 'vitest';
import { ListItem } from '../list-item';

describe('ListItem', () => {
  const defaultProps = {
    description: 'Test Description',
    id: 'test-id',
    title: 'Test Title',
  };

  const theme = getDefaultThemeOrDark();

  it('renders the component with correct title and description', () => {
    const { getByText } = customRender(
      <ListItem
        {...defaultProps}
        theme={theme}
        data-testid="list-item-test-1"
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onClick when the item is clicked', () => {
    const mockOnClick = vi.fn();
    const { getByTestId } = customRender(
      <ListItem
        {...defaultProps}
        onClick={mockOnClick}
        selectable
        theme={theme}
        data-testid="list-item-test-2"
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    fireEvent.click(getByTestId('list-item-test-2'));
    expect(mockOnClick).toHaveBeenCalledWith('test-id');
  });

  it('renders the checkbox when selectable is true', () => {
    const { getByRole, getByTestId } = customRender(
      <ListItem
        {...defaultProps}
        selectable
        theme={theme}
        data-testid="list-item-test-3"
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    const listItem = getByTestId('list-item-test-3');
    const checkbox = listItem.querySelector('[role="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('does not render the checkbox when selectable is false', () => {
    const { queryByRole, getByTestId } = customRender(
      <ListItem
        {...defaultProps}
        selectable={false}
        theme={theme}
        data-testid="list-item-test-4"
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    const listItem = getByTestId('list-item-test-4');
    const checkbox = listItem.querySelector('[role="checkbox"]');
    expect(checkbox).not.toBeInTheDocument();
  });

  it('has the correct tab index when selectable is true', () => {
    const { getByTestId } = customRender(
      <ListItem
        {...defaultProps}
        selectable
        theme={theme}
        data-testid="list-item-test-5"
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    expect(getByTestId('list-item-test-5')).toHaveAttribute('tabIndex', '0');
  });
});
