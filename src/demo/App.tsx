import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from '../models/Theme';
import { TimelineItemModel } from '../models/TimelineItemModel';
import './App.css';
import data from './data';
import mixed from './data-mixed';
import DynamicLoad from './dynamic-load';
import {
  HorizontalAll,
  HorizontalBasic,
  HorizontalBasicCardLess,
  HorizontalInitialSelectedItem,
} from './horizontal-samples';
import { Layout } from './layout';
import {
  VerticalBasic,
  VerticalBasicCardLess,
  VerticalCustomContent,
  VerticalCustomContent2,
  VerticalTree,
  VerticalTreeMixed,
} from './vertical-samples';

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [state, setState] = useState(0);

  const [customTheme, setCustomTheme] = useState<Theme>({
    cardBgColor: '#C0C0C0',
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
        cardBgColor: '#C0C0C0',
        primary: '#000',
        secondary: '#FFA500',
        titleColorActive: '#000',
      });
    }
  }, [state]);

  useEffect(() => {
    const newItems = data.map(
      ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        media,
        timelineContent,
      }) => ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        media,
        timelineContent,
      }),
    );
    setItems(newItems);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/vertical-basic',
          element: items.length ? (
            <VerticalBasic type={'big-screen'} items={items} />
          ) : null,
        },
        {
          path: '/vertical-alternating-mixed',
          element: items.length > 0 && (
            <VerticalTreeMixed type={'big-screen'} />
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
              >
                change
              </button>
              {
                <VerticalTree
                  type={'big-screen'}
                  items={state > 0 ? items : mixed}
                  theme={customTheme}
                >
                  {state}
                </VerticalTree>
              }
            </>
          ),
        },
        {
          path: '/horizontal',
          element: items.length > 0 && (
            <HorizontalBasic items={items} type="big-screen" />
          ),
        },
        {
          path: '/horizontal-all',
          element: items.length > 0 && (
            <HorizontalAll items={items} type="big-screen" />
          ),
        },
        {
          path: '/horizontal-initial-select',
          element: items.length > 0 && (
            <HorizontalInitialSelectedItem items={items} type="big-screen" />
          ),
        },
        {
          path: '/vertical-custom',
          element: items.length > 0 && (
            <VerticalCustomContent type="big-screen" />
          ),
        },
        {
          path: '/vertical-custom-icon',
          element: items.length > 0 && (
            <VerticalCustomContent2 type="big-screen" />
          ),
        },
        {
          path: '/dynamic-load',
          element: items.length > 0 && <DynamicLoad />,
        },
        {
          path: '/timeline-without-cards',
          element: items.length > 0 && (
            <VerticalBasicCardLess type="big-screen" items={items} />
          ),
        },
        {
          path: '/timeline-without-cards-horizontal',
          element: items.length > 0 && (
            <HorizontalBasicCardLess type="big-screen" items={items} />
          ),
        },
        {
          path: '/timeline-without-cards-horizontal',
          element: items.length > 0 && (
            <HorizontalBasicCardLess type="big-screen" items={items} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default NewDemo;
