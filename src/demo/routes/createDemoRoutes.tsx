import React from 'react';
import { RouteObject } from 'react-router-dom';
import { DemoRouteProps } from './routes.config';
import { Layout } from '../layout';
import { VerticalBasic, VerticalTree, VerticalTreeMixed, VerticalNewMedia, VerticalAlternatingNested, VerticalBasicCardLess, VerticalBasicNested, VerticalCustomContent, VerticalCustomContent2 } from '../components/vertical';
import { HorizontalBasic, HorizontalAll, HorizontalBasicCardLess, HorizontalInitialSelectedItem } from '../components/horizontal';
import { DynamicLoad } from '../components/special';
import { basicData, mixedData, nestedData } from '../data/index';

export const createDemoRoutes = ({
  items,
  nestedItems,
  historyItems,
  customTheme,
  state,
  setState,
}: DemoRouteProps): RouteObject[] => {
  if (!items.length) return [];

  return [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <VerticalBasic type="big-screen" items={items} />,
        },
        {
          path: '/vertical-basic',
          element: <VerticalBasic type="big-screen" items={items} />,
        },
        {
          path: '/vertical-basic-nested',
          element: <VerticalBasicNested type="big-screen" items={nestedData} />,
        },
        {
          path: '/vertical-alternating-mixed',
          element: <VerticalTreeMixed type="big-screen" />,
        },
        {
          path: '/vertical-alternating-nested',
          element: (
            <VerticalAlternatingNested
              type="big-screen"
              items={nestedItems}
            />
          ),
        },
        {
          path: '/vertical-alternating',
          element: (
            <>
              <button
                onClick={() => setState(1 - state)}
                className="rounded-full bg-blue-500 text-white px-4 py-2 mb-4 hover:bg-blue-600 transition-colors"
                type="button"
              >
                Toggle Theme & Data
              </button>
              <VerticalTree
                type="big-screen"
                items={state > 0 ? items : mixedData}
                theme={customTheme}
              >
                {state}
              </VerticalTree>
            </>
          ),
        },
        {
          path: '/vertical-world-history',
          element: historyItems.length ? (
            <VerticalNewMedia items={historyItems} type="big-screen" />
          ) : null,
        },
        {
          path: '/horizontal',
          element: <HorizontalBasic items={items} type="big-screen" />,
        },
        {
          path: '/horizontal-all',
          element: <HorizontalAll items={historyItems} type="big-screen" />,
        },
        {
          path: '/horizontal-initial-select',
          element: (
            <HorizontalInitialSelectedItem items={items} type="big-screen" />
          ),
        },
        {
          path: '/vertical-custom',
          element: <VerticalCustomContent type="big-screen" />,
        },
        {
          path: '/vertical-custom-icon',
          element: <VerticalCustomContent2 type="big-screen" items={items} />,
        },
        {
          path: '/dynamic-load',
          element: <DynamicLoad />,
        },
        {
          path: '/timeline-without-cards',
          element: (
            <VerticalBasicCardLess type="big-screen" items={items} />
          ),
        },
        {
          path: '/timeline-without-cards-horizontal',
          element: (
            <HorizontalBasicCardLess type="big-screen" items={items} />
          ),
        },
      ],
    },
  ];
}; 