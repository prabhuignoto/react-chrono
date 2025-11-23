import type { Preview } from '@storybook/react-vite';
import React from 'react';
// Import Vanilla Extract global styles (same as main entry point)
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      source: {
        state: 'shown',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          minHeight: '100vh',
          height: '100vh',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Story />
      </div>
    ),
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for all components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
