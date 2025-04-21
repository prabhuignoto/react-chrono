import { waitFor } from '@testing-library/react';
import { describe } from 'vitest';
import { customRender } from '../../../common/test';
import { providerProps } from '../../../common/test/index';
import TimelineItemTitle from '../timeline-card-title';

describe('Timeline item title', () => {
  //should render the title
  it('should render the title', () => {
    const { getByTestId } = customRender(
      <TimelineItemTitle title="title" data-testid="timeline-title-1" />,
      { providerProps },
    );
    const titleElement = getByTestId('timeline-title-1');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('title');
  });

  // should match the snapshot
  it('should match the snapshot', () => {
    const { container } = customRender(<TimelineItemTitle title="title" />, {
      providerProps,
    });

    expect(container).toMatchSnapshot();
  });

  // should render the title with active class
  it('should render the title with active class', () => {
    const { getByTestId } = customRender(
      <TimelineItemTitle title="title" active data-testid="timeline-title-2" />,
      { providerProps },
    );
    const titleElement = getByTestId('timeline-title-2');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.querySelector('.timeline-item-title')).toHaveClass(
      'active',
    );
  });

  // should render the title with custom class
  it('should render the title with custom class', () => {
    const { getByTestId } = customRender(
      <TimelineItemTitle
        title="title"
        classString="custom-class"
        data-testid="timeline-title-3"
      />,
      { providerProps },
    );
    const titleElement = getByTestId('timeline-title-3');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.querySelector('.timeline-item-title')).toHaveClass(
      'custom-class',
    );
  });

  // should have a custom alignment
  it('should have a custom alignment', () => {
    const { getByTestId } = customRender(
      <TimelineItemTitle
        title="title"
        align="left"
        data-testid="timeline-title-4"
      />,
      { providerProps },
    );
    const titleElement = getByTestId('timeline-title-4');
    expect(titleElement).toBeInTheDocument();

    const titleWrapper = titleElement.querySelector('.timeline-item-title');
    expect(titleWrapper).toHaveAttribute('align', 'left');
  });
});
