import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { useEffect, useState } from 'react';
import { computeCssVarsFromTheme } from '../styles/theme-bridge';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.styles.css';
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
  ComprehensiveVertical,
  MediaShowcaseVertical,
  // Horizontal components  
  BasicHorizontal,
  AllHorizontal,
  CardlessHorizontal,
  InitialSelectedHorizontal,
  ThemeShowcase,
} from './components';
import {
  basicTimeline,
  mixedTimeline,
  nestedTimeline,
  worldHistoryTimeline,
  technologyEvolutionTimeline,
  mediaShowcaseTimeline,
} from './data';
import DynamicLoad from './dynamic-load';
import { Layout } from './layout';
import HomePage from './components/HomePage';

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [nestedItems, setNestedItems] = useState<TimelineItemModel[]>([]);
  const [historyItems, setHistoryItems] = useState<TimelineItemModel[]>([]);
  const [techItems, setTechItems] = useState<TimelineItemModel[]>([]);
  const [mediaItems, setMediaItems] = useState<TimelineItemModel[]>([]);
  const [state, setState] = useState(0);

  const [customTheme, setCustomTheme] = useState<Theme>({
    cardBgColor: '#f5f5f5',
    primary: '#0079e6', // electric-500
    secondary: '#FFA500',
  });

  useEffect(() => {
    if (state > 0) {
      setCustomTheme({
        cardBgColor: '#efefef',
        primary: '#0079e6', // electric-500
        secondary: '#FFA500',
      });
    } else {
      setCustomTheme({
        cardBgColor: '#f5f5f5',
        primary: '#0079e6', // electric-500
        secondary: '#FFA500',
        titleColorActive: '#0079e6', // electric-500
      });
    }
  }, [state]);

  useEffect(() => {
    // Use organized data
    setItems(basicTimeline);
    setHistoryItems(worldHistoryTimeline);
    setNestedItems(nestedTimeline);
    setTechItems(technologyEvolutionTimeline);
    setMediaItems(mediaShowcaseTimeline);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/vertical-basic',
          element: <BasicVertical type={'big-screen'} items={items} />,
        },
        {
          path: '/vertical-basic-nested',
          element: <NestedVertical type={'big-screen'} items={nestedItems} />,
        },
        {
          path: '/vertical-alternating-mixed',
          element: <MixedVertical type={'big-screen'} />,
        },
        {
          path: '/vertical-alternating-nested',
          element: (
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
          element: <BasicHorizontal items={items} type="big-screen" />,
        },
        {
          path: '/vertical-world-history',
          element: <NewMediaVertical items={historyItems} type="big-screen" />,
        },
        {
          path: '/horizontal-all',
          element: <AllHorizontal items={techItems} type="big-screen" />,
        },
        {
          path: '/horizontal-initial-select',
          element: <InitialSelectedHorizontal items={items} type="big-screen" />,
        },
        {
          path: '/vertical-custom',
          element: <CustomContentVertical type="big-screen" />,
        },
        {
          path: '/vertical-custom-icon',
          element: <CustomContentWithIconsVertical type="big-screen" items={items} />,
        },
        {
          path: '/dynamic-load',
          element: <DynamicLoad />,
        },
        {
          path: '/timeline-without-cards',
          element: <CardlessVertical type="big-screen" items={items} />,
        },
        {
          path: '/timeline-without-cards-horizontal',
          element: <CardlessHorizontal type="big-screen" items={items} />,
        },
        {
          path: '/theme-showcase',
          element: <ThemeShowcase />,
        },
        {
          path: '/vertical-comprehensive',
          element: <ComprehensiveVertical type="big-screen" items={techItems} />,
        },
        {
          path: '/vertical-media-showcase',
          element: <MediaShowcaseVertical type="big-screen" items={mediaItems} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default NewDemo;
