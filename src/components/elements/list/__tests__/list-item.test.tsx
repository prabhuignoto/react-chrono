import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ListItem } from '../list-item';

describe('ListItem', () => {
  const defaultProps = {
    description: 'Test Description',
    id: 'test-id',
    title: 'Test Title',
  };

  it('renders the component with correct title and description', () => {
    render(<ListItem {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onClick when the item is clicked', () => {
    const mockOnClick = vi.fn();
    render(<ListItem {...defaultProps} onClick={mockOnClick} selectable />);
    fireEvent.click(screen.getByRole('listitem'));
    expect(mockOnClick).toHaveBeenCalledWith('test-id');
  });

  it('renders the checkbox when selectable is true', () => {
    render(<ListItem {...defaultProps} selectable />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('does not render the checkbox when selectable is false', () => {
    render(<ListItem {...defaultProps} selectable={false} />);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('has the correct tab index when selectable is true', () => {
    render(<ListItem {...defaultProps} selectable />);
    expect(screen.getByRole('listitem')).toHaveAttribute('tabIndex', '0');
  });
});
