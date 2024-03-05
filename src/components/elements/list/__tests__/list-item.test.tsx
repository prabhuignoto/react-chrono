import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { getDefaultThemeOrDark } from '@utils/index';
import { customRender, providerProps } from 'src/components/common/test';
import { vi } from 'vitest';
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
      <ListItem {...defaultProps} theme={theme} />,
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
    const { getByRole } = customRender(
      <ListItem
        {...defaultProps}
        onClick={mockOnClick}
        selectable
        theme={theme}
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    fireEvent.click(getByRole('listitem'));
    expect(mockOnClick).toHaveBeenCalledWith('test-id');
  });

  it('renders the checkbox when selectable is true', () => {
    const { getByRole } = customRender(
      <ListItem {...defaultProps} selectable theme={theme} />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  it('does not render the checkbox when selectable is false', () => {
    const { queryByRole } = customRender(
      <ListItem {...defaultProps} selectable={false} theme={theme} />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    expect(queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('has the correct tab index when selectable is true', () => {
    const { getByRole } = customRender(
      <ListItem {...defaultProps} selectable theme={theme} />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );
    expect(getByRole('listitem')).toHaveAttribute('tabIndex', '0');
  });
});
