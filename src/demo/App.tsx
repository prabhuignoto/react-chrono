import { Theme } from '@models/Theme';
import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { useDemoData } from './hooks/useDemoData';
import { createDemoRoutes } from './routes/createDemoRoutes';

const App: React.FC = () => {
  const { items, nestedItems, historyItems, isLoading } = useDemoData();
  const [state, setState] = useState(0);
  const [customTheme, setCustomTheme] = useState<Theme>({
    cardBgColor: '#f5f5f5',
    primary: '#000',
    secondary: '#FFA500',
  });

  useEffect(() => {
    setCustomTheme({
      cardBgColor: state > 0 ? '#efefef' : '#f5f5f5',
      primary: '#000',
      secondary: '#FFA500',
      titleColorActive: state > 0 ? undefined : '#000',
    });
  }, [state]);

  const router = !isLoading && items.length
    ? createBrowserRouter(
        createDemoRoutes({
          items,
          nestedItems,
          historyItems,
          customTheme,
          state,
          setState,
        })
      )
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading demo data...</div>
      </div>
    );
  }

  return router ? <RouterProvider router={router} /> : null;
};

export default App;
