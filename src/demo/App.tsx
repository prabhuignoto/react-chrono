import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import {
  // Vertical components
  BasicVertical,
  AlternatingVertical,
  MixedVertical,
  NewMediaVertical,
  NestedVertical,
  AlternatingNestedVertical,
  CardlessVertical,
  CustomContentVertical,
  CustomContentWithIconsVertical,
  // Horizontal components  
  BasicHorizontal,
  AllHorizontal,
  CardlessHorizontal,
  InitialSelectedHorizontal,
} from './components';
import {
  basicTimeline,
  mixedTimeline,
  nestedTimeline,
  worldHistoryTimeline,
} from './data';
import DynamicLoad from './dynamic-load';
import { Layout } from './layout';

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [nestedItems, setNestedItems] = useState<TimelineItemModel[]>([]);
  const [historyItems, setHistoryItems] = useState<TimelineItemModel[]>([]);
  const [state, setState] = useState(0);

  const [customTheme, setCustomTheme] = useState<Theme>({
    cardBgColor: '#f5f5f5',
    primary: '#000',
    secondary: '#FFA500',
  });

  useEffect(() => {
    if (state > 0) {
      setCustomTheme({
        cardBgColor: '#efefef',
        primary: '#000',
        secondary: '#FFA500',
      });
    } else {
      setCustomTheme({
        cardBgColor: '#f5f5f5',
        primary: '#000',
        secondary: '#FFA500',
        titleColorActive: '#000',
      });
    }
  }, [state]);

  useEffect(() => {
    // Use organized data
    setItems(basicTimeline);
    setHistoryItems(worldHistoryTimeline);
    setNestedItems(nestedTimeline);
  }, []);

  const router = items.length
    ? createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
          children: [
            {
              path: '/',
              element: <BasicVertical type={'big-screen'} items={items} />,
            },
            {
              path: '/vertical-basic',
              element: items.length ? (
                <BasicVertical type={'big-screen'} items={items} />
              ) : null,
            },
            {
              path: '/vertical-basic-nested',
              element: items.length ? (
                <NestedVertical type={'big-screen'} items={nestedItems} />
              ) : null,
            },
            {
              path: '/vertical-alternating-mixed',
              element: items.length > 0 && (
                <MixedVertical type={'big-screen'} />
              ),
            },
            {
              path: '/vertical-alternating-nested',
              element: items.length > 0 && (
                <AlternatingNestedVertical
                  type={'big-screen'}
                  items={nestedItems}
                />
              ),
            },
            {
              path: '/vertical-alternating',
              element: (
                <>
                  <button
                    onClick={() => {
                      setState(1 - state);
                    }}
                    className="rounded-full"
                  >
                    change
                  </button>
                  {
                    <AlternatingVertical
                      type={'big-screen'}
                      items={state > 0 ? items : mixedTimeline}
                      theme={customTheme}
                    />
                  }
                </>
              ),
            },
            {
              path: '/horizontal',
              element: items.length > 0 && (
                <BasicHorizontal items={items} type="big-screen" />
              ),
            },
            {
              path: '/vertical-world-history',
              element: historyItems.length ? (
                <NewMediaVertical items={historyItems} type="big-screen" />
              ) : null,
            },
            {
              path: '/horizontal-all',
              element: items.length > 0 && (
                <AllHorizontal items={historyItems} type="big-screen" />
              ),
            },
            {
              path: '/horizontal-initial-select',
              element: items.length > 0 && (
                <InitialSelectedHorizontal items={items} type="big-screen" />
              ),
            },
            {
              path: '/vertical-custom',
              element: items.length > 0 && (
                <CustomContentVertical type="big-screen" />
              ),
            },
            {
              path: '/vertical-custom-icon',
              element: items.length > 0 && (
                <CustomContentWithIconsVertical type="big-screen" items={items} />
              ),
            },
            {
              path: '/dynamic-load',
              element: items.length > 0 && <DynamicLoad />,
            },
            {
              path: '/timeline-without-cards',
              element: items.length > 0 && (
                <CardlessVertical type="big-screen" items={items} />
              ),
            },
            {
              path: '/timeline-without-cards-horizontal',
              element: items.length > 0 && (
                <CardlessHorizontal type="big-screen" items={items} />
              ),
            },
          ],
        },
      ])
    : null;

  return router ? <RouterProvider router={router}></RouterProvider> : null;
};

export default NewDemo;
