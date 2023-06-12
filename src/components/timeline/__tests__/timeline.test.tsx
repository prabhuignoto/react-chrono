import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Timeline from '../timeline';

describe('Timeline', () => {
  it('renders without crashing', () => {
    render(<Timeline />);
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
  });

  it('navigates to the next item when the next button is clicked', () => {
    render(<Timeline />);
    const nextButton = screen.getByLabelText('Next');
    userEvent.click(nextButton);
    expect(screen.getByLabelText('Timeline item 2')).toHaveClass('active');
  });

  it('navigates to the previous item when the previous button is clicked', () => {
    render(<Timeline />);
    const previousButton = screen.getByLabelText('Previous');
    userEvent.click(previousButton);
    expect(screen.getByLabelText('Timeline item 1')).toHaveClass('active');
  });
});
