import React, { useState } from 'react';
import { Chrono } from 'react-chrono';
import timelineData from './data';
import { Theme } from './types';
import NestedTimelineDemo from './NestedTimelineDemo';

const App: React.FC = () => {
  const [mode, setMode] = useState<
    'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING'
  >('HORIZONTAL');
  const [showNested, setShowNested] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>({
    primary: '#4a90e2',
    secondary: '#87a8d2',
    cardBgColor: '#fff',
    cardForeColor: '#333',
    titleColor: '#333',
    titleColorActive: '#4a90e2',
  });

  const themes = {
    default: {
      primary: '#4a90e2',
      secondary: '#87a8d2',
      cardBgColor: '#fff',
      cardForeColor: '#333',
      titleColor: '#333',
      titleColorActive: '#4a90e2',
    },
    dark: {
      primary: '#1d1d1d',
      secondary: '#444',
      cardBgColor: '#2d2d2d',
      cardForeColor: '#eee',
      titleColor: '#eee',
      titleColorActive: '#4a90e2',
    },
    green: {
      primary: '#27ae60',
      secondary: '#81e6a8',
      cardBgColor: '#fff',
      cardForeColor: '#333',
      titleColor: '#333',
      titleColorActive: '#27ae60',
    },
    purple: {
      primary: '#9b59b6',
      secondary: '#c39bd3',
      cardBgColor: '#fff',
      cardForeColor: '#333',
      titleColor: '#333',
      titleColorActive: '#9b59b6',
    },
  };

  return (
    <div className="app">
      <h1>React Chrono Demo</h1>

      <div className="controls">
        <button onClick={() => setMode('HORIZONTAL')}>Horizontal</button>
        <button onClick={() => setMode('VERTICAL')}>Vertical</button>
        <button onClick={() => setMode('VERTICAL_ALTERNATING')}>
          Vertical Alternating
        </button>
        <button onClick={() => setShowNested(!showNested)}>
          {showNested ? 'Show Main Demo' : 'Show Nested Demo'}
        </button>
      </div>

      {!showNested ? (
        <>
          <div className="theme-selector">
            {Object.entries(themes).map(([key, value]) => (
              <div
                key={key}
                className={`theme-button ${theme === value ? 'active' : ''}`}
                style={{ backgroundColor: value.primary }}
                onClick={() => setTheme(value)}
                title={`${key.charAt(0).toUpperCase() + key.slice(1)} theme`}
              />
            ))}
          </div>

          <div className="timeline-container">
            <Chrono
              items={timelineData}
              mode={mode}
              theme={theme}
              scrollable
              slideShow
              slideItemDuration={2000}
              allowDynamicUpdate
              enableOutline
              itemWidth={150}
              cardHeight={200}
              showAllCardsHorizontal
            />
          </div>
        </>
      ) : (
        <NestedTimelineDemo />
      )}
    </div>
  );
};

export default App;
