import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ListItem } from '../list-item';

describe('ListItem', () => {
  it('should render the title and description', () => {
    render(
      <ListItem
        id="test-id"
        title="Test Title"
        description="Test Description"
        theme="light"
      />,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should render the checkbox when selectable is true', () => {
    render(
      <ListItem
        id="test-id"
        title="Test Title"
        description="Test Description"
        theme="light"
        selectable
      />,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should not render the checkbox when selectable is false', () => {
    render(
      <ListItem
        id="test-id"
        title="Test Title"
        description="Test Description"
        theme="light"
      />,
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should call the onClick function when the list item is clicked', () => {
    const onClick = vi.fn();
    render(
      <ListItem
        id="test-id"
        title="Test Title"
        description="Test Description"
        theme="light"
        onClick={onClick}
      />,
    );

    userEvent.click(screen.getByText('Test Title'));
    expect(onClick).toHaveBeenCalledWith('test-id');
  });
});
