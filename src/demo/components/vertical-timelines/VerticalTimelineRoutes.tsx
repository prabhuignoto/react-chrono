import { TimelineItemModel } from '@models/TimelineItemModel';
import { Theme } from '@models/Theme';
import {
  VerticalAlternatingNested,
  VerticalBasic,
  VerticalBasicCardLess,
  VerticalBasicNested,
  VerticalCustomContent,
  VerticalCustomContent2,
  VerticalNewMedia,
  VerticalTree,
  VerticalTreeMixed,
} from '../../vertical-samples';
import { RouteObject } from 'react-router-dom';

interface VerticalTimelineRoutesProps {
  items: TimelineItemModel[];
  nestedItems: TimelineItemModel[];
  historyItems: TimelineItemModel[];
  state: number;
  customTheme: Theme;
  mixed: TimelineItemModel[];
  setState: (state: number) => void;
}

export function VerticalTimelineRoutes({
  items,
  nestedItems,
  historyItems,
  state,
  customTheme,
  mixed,
  setState,
}: VerticalTimelineRoutesProps): RouteObject[] {
  return [
    {
      path: '/',
      element: <VerticalBasic type={'big-screen'} items={items} />
    },
    {
      path: '/vertical-basic',
      element: items.length ? <VerticalBasic type={'big-screen'} items={items} /> : null
    },
    {
      path: '/vertical-basic-nested',
      element: items.length ? <VerticalBasicNested type={'big-screen'} items={nestedItems} /> : null
    },
    {
      path: '/vertical-alternating-mixed',
      element: items.length > 0 ? <VerticalTreeMixed type={'big-screen'} /> : null
    },
    {
      path: '/vertical-alternating-nested',
      element: items.length > 0 ? <VerticalAlternatingNested type={'big-screen'} items={nestedItems} /> : null
    },
    {
      path: '/vertical-alternating',
      element: (
        <>
          <button onClick={() => setState(1 - state)} className="rounded-full">change</button>
          <VerticalTree type={'big-screen'} items={state > 0 ? items : mixed} theme={customTheme}>
            <div>{state}</div>
          </VerticalTree>
        </>
      )
    },
    {
      path: '/vertical-world-history',
      element: historyItems.length ? <VerticalNewMedia items={historyItems} type="big-screen" /> : null
    },
    {
      path: '/vertical-custom',
      element: items.length > 0 ? <VerticalCustomContent type="big-screen" /> : null
    },
    {
      path: '/vertical-custom-icon',
      element: items.length > 0 ? <VerticalCustomContent2 type="big-screen" items={items} /> : null
    },
    {
      path: '/timeline-without-cards',
      element: items.length > 0 ? <VerticalBasicCardLess type="big-screen" items={items} /> : null
    }
  ];
} 