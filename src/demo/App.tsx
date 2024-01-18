import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import data from './data';
import mixed from './data-mixed';
import dataNested from './data-nested';
import DynamicLoad from './dynamic-load';
import {
  HorizontalAll,
  HorizontalBasic,
  HorizontalBasicCardLess,
  HorizontalInitialSelectedItem,
} from './horizontal-samples';
import { items2 as worldHistory } from './human-history';
import { Layout } from './layout';
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
} from './vertical-samples';

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
    const newItems = data.map(
      ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        // media,
        timelineContent,
        date,
        items,
      }) => ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        // media,
        timelineContent,
        date,
        items,
      }),
    );
    setItems(newItems);
    setHistoryItems(
      worldHistory.map(
        ({ cardTitle, cardSubtitle, cardDetailedText, media, url, title }) => ({
          cardTitle,
          cardSubtitle,
          cardDetailedText,
          media,
          url,
          title,
        }),
      ),
    );
    setNestedItems(
      dataNested.map(
        ({
          cardTitle,
          cardSubtitle,
          cardDetailedText,
          media,
          url,
          title,
          items,
        }) => ({
          cardTitle,
          cardSubtitle,
          cardDetailedText,
          url,
          title,
          items,
        }),
      ),
    );
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: items.length ? (
            <VerticalBasic type={'big-screen'} items={items} />
          ) : null,
        },
        {
          path: '/vertical-basic',
          element: items.length ? (
            <VerticalBasic type={'big-screen'} items={items} />
          ) : null,
        },
        {
          path: '/vertical-basic-nested',
          element: items.length ? (
            <VerticalBasicNested type={'big-screen'} items={dataNested} />
          ) : null,
        },
        {
          path: '/vertical-alternating-mixed',
          element: items.length > 0 && (
            <VerticalTreeMixed type={'big-screen'} />
          ),
        },
        {
          path: '/vertical-alternating-nested',
          element: items.length > 0 && (
            <VerticalAlternatingNested
              type={'big-screen'}
              items={nestedItems}
            />
          ),
        },
        {
          path: '/vertical-alternating-nested',
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
                className="rounded-full"
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
          path: '/vertical-world-history',
          element: historyItems.length ? (
            <VerticalNewMedia items={historyItems} type="big-screen" />
          ) : null,
        },
        {
          path: '/horizontal-all',
          element: items.length > 0 && (
            <HorizontalAll items={historyItems} type="big-screen" />
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
            <VerticalCustomContent2 type="big-screen" items={items} />
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
