import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NestedTimelineDemo from '../NestedTimelineDemo';

describe('NestedTimelineDemo Component', () => {
  it('renders without crashing', () => {
    render(<NestedTimelineDemo />);
    expect(screen.getByText(/Nested Timeline/i)).toBeInTheDocument();
  });

  it('renders nested timeline items', () => {
    render(<NestedTimelineDemo />);
    const timelineItems = screen.getAllByRole('article');
    expect(timelineItems.length).toBeGreaterThan(0);
  });

  it('renders nested timeline with correct mode', () => {
    render(<NestedTimelineDemo />);
    const timeline = screen.getByTestId('nested-timeline');
    expect(timeline).toBeInTheDocument();
  });
});
