import { TimelinePointModel } from '@models/TimelineVerticalModel';
import { describe, vi } from 'vitest';
import { customRender } from '../../common/test';
import { providerProps } from '../../common/test/index';
import { TimelinePoint } from '../timeline-point';

const commonProps: TimelinePointModel = {
  active: false,
  alternateCards: false,
  cardLess: true,
  className: 'test_class_name',
  disableClickOnCircle: false,
  iconChild: null,
  id: '1',
  lineWidth: 3,
  onActive: vi.fn(),
  onClick: vi.fn(),
  slideShowRunning: false,
  timelinePointDimension: 20,
};

describe('Timeline point', () => {
  // should match the snapshot

  it('Should match snapshot', () => {
    const { asFragment } = customRender(<TimelinePoint {...commonProps} />, {
      providerProps,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
