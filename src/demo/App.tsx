import React from 'react';
import { RouterProvider, createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import './App.css';
import data from './data/data';
import mixed from './data/data-mixed';
import dataNested from './data/data-nested';
import DynamicLoad from './dynamic-load';
import { items2 as worldHistory } from './data/human-history';
import { Layout } from './layout';
import { useTimelineState } from './components/common/useTimelineState';
import { HorizontalTimelineRoutes } from './components/horizontal-timelines/HorizontalTimelineRoutes';
import { VerticalTimelineRoutes } from './components/vertical-timelines/VerticalTimelineRoutes';

const ErrorBoundary = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600">Please try refreshing the page or navigating back</p>
      </div>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600">The page you're looking for doesn't exist</p>
      </div>
    </div>
  );
};

const NewDemo: React.FunctionComponent = () => {
  const {
    items,
    nestedItems,
    historyItems,
    state,
    setState,
    customTheme,
  } = useTimelineState(data, dataNested, worldHistory);

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Navigate to="/vertical-basic" replace />,
        },
        ...VerticalTimelineRoutes({
          items,
          nestedItems,
          historyItems,
          state,
          setState,
          customTheme,
          mixed,
        }),
        ...HorizontalTimelineRoutes({
          items,
          historyItems,
        }),
        {
          path: '/dynamic-load',
          element: items.length > 0 ? <DynamicLoad /> : <LoadingState />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default NewDemo;
