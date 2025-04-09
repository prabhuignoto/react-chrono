import { TimelineItemModel } from '@models/TimelineItemModel';
import {
  HorizontalAll,
  HorizontalBasic,
  HorizontalBasicCardLess,
  HorizontalInitialSelectedItem,
} from '../../horizontal-samples';
import { RouteObject } from 'react-router-dom';

interface HorizontalTimelineRoutesProps {
  items: TimelineItemModel[];
  historyItems: TimelineItemModel[];
}

export function HorizontalTimelineRoutes({
  items,
  historyItems,
}: HorizontalTimelineRoutesProps): RouteObject[] {
  return [
    {
      path: '/horizontal',
      element: items.length > 0 ? <HorizontalBasic items={items} type="big-screen" /> : null
    },
    {
      path: '/horizontal-all',
      element: items.length > 0 ? <HorizontalAll items={historyItems} type="big-screen" /> : null
    },
    {
      path: '/horizontal-initial-select',
      element: items.length > 0 ? <HorizontalInitialSelectedItem items={items} type="big-screen" /> : null
    },
    {
      path: '/timeline-without-cards-horizontal',
      element: items.length > 0 ? <HorizontalBasicCardLess type="big-screen" items={items} /> : null
    }
  ];
} 