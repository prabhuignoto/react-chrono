import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/react-chrono/i)).toBeInTheDocument();
  });

  it('renders timeline items', () => {
    render(<App />);
    const timelineItems = screen.getAllByRole('article');
    expect(timelineItems.length).toBeGreaterThan(0);
  });

  it('renders timeline with correct mode', () => {
    render(<App />);
    const timeline = screen.getByTestId('timeline');
    expect(timeline).toBeInTheDocument();
  });
});
