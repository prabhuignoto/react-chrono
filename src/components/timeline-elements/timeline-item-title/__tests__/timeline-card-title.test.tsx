import { waitFor } from '@testing-library/react';
import { describe } from 'vitest';
import { customRender } from '../../../common/test';
import { providerProps } from '../../../common/test/index';
import TimelineItemTitle from '../timeline-card-title';

describe('Timeline item title', () => {
  //should render the title
  it('should render the title', () => {
    const { getByText } = customRender(<TimelineItemTitle title="title" />, {
      providerProps,
    });
    expect(getByText('title')).toBeInTheDocument();
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
    const { getByText } = customRender(
      <TimelineItemTitle title="title" active />,
      { providerProps },
    );
    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('title')).toHaveClass('active');
  });

  // should render the title with custom class
  it('should render the title with custom class', () => {
    const { getByText } = customRender(
      <TimelineItemTitle title="title" classString="custom-class" />,
      { providerProps },
    );
    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('title')).toHaveClass('custom-class');
  });

  // should have a custom alignment
  it('should have a custom alignment', async () => {
    const { getByText } = customRender(
      <TimelineItemTitle title="title" align="left" />,
      { providerProps },
    );
    expect(getByText('title')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('title')).toHaveProperty('align');
      expect(getByText('title')).toHaveProperty('align', 'left');
      // expect(getByText('title')).toHaveStyle('text-align: left');
    });
  });
});
