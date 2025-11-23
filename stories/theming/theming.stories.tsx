import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Chrono from '../../src/components';
import { basicTimeline } from '../../src/demo/data/basic-timeline';
import { StoryContainer } from '../components/StoryContainer';

const meta: Meta<typeof Chrono> = {
  title: 'Theming & Styling/Themes',
  component: Chrono,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Theme',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const DarkBlueTheme: Story = {
  name: 'Dark Blue Theme',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    theme: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      cardBgColor: '#1e293b',
      cardForeColor: '#f1f5f9',
      titleColor: '#38bdf8',
      titleColorActive: '#0284c7',
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh" background="#0f172a">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const VibrantTheme: Story = {
  name: 'Vibrant Theme',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    theme: {
      primary: '#ff006e',
      secondary: '#ff9500',
      cardBgColor: '#fff3e0',
      cardForeColor: '#1a237e',
      titleColor: '#ff006e',
      titleColorActive: '#ff1744',
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const MinimalTheme: Story = {
  name: 'Minimal Theme',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    theme: {
      primary: '#000000',
      secondary: '#666666',
      cardBgColor: '#f5f5f5',
      cardForeColor: '#000000',
    },
    display: {
      borderless: true,
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const WithGoogleFontsPoppins: Story = {
  name: 'With Poppins Font',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    style: {
      googleFonts: {
        fontFamily: 'Poppins',
        elements: {
          title: {
            weight: 'bold',
            style: 'normal',
            size: '2rem',
          },
          cardTitle: {
            weight: '600',
            style: 'normal',
            size: '1.3rem',
          },
          cardSubtitle: {
            weight: 'normal',
            style: 'italic',
            size: '0.95rem',
          },
          cardText: {
            weight: 'normal',
            style: 'normal',
            size: '0.9rem',
          },
        },
        weights: [300, 400, 500, 600, 700],
        display: 'swap',
        preconnect: true,
      },
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const WithGoogleFontsPlayfairDisplay: Story = {
  name: 'With Playfair Display Font',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    style: {
      googleFonts: {
        fontFamily: 'Playfair Display',
        elements: {
          title: {
            weight: 'bold',
            style: 'normal',
            size: '2.2rem',
          },
          cardTitle: {
            weight: '700',
            style: 'normal',
            size: '1.4rem',
          },
        },
        weights: [400, 500, 700, 900],
        display: 'swap',
        preconnect: true,
      },
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const CustomFontSizes: Story = {
  name: 'Custom Font Sizes',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    style: {
      fontSizes: {
        title: '2.5rem',
        cardTitle: '1.5rem',
        cardSubtitle: '0.95rem',
        cardText: '0.85rem',
        controls: '0.8rem',
      },
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const DarkModeSupport: Story = {
  name: 'Dark Mode Toggle',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    darkMode: {
      showToggle: true,
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};
