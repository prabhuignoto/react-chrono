import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Chrono from '../../src/components';
import { basicTimeline } from '../../src/demo/data/basic-timeline';
import { StoryContainer } from '../components/StoryContainer';

const meta: Meta<typeof Chrono> = {
  title: 'Layout Modes/Vertical',
  component: Chrono,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: basicTimeline,
    mode: 'vertical',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    mode: 'vertical',
    layout: {
      cardWidth: 650,
      cardHeight: 300,
      pointSize: 20,
      responsive: {
        enabled: true,
        breakpoint: 768,
      },
    },
    display: {
      toolbar: { enabled: true, position: 'top' },
      borderless: true,
      scrollable: { scrollbar: false },
    },
    animation: {
      slideshow: {
        enabled: true,
        duration: 2500,
      },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const Alternating: Story = {
  name: 'Alternating (Default)',
  args: {
    mode: 'vertical-alternating',
    layout: {
      cardWidth: 550,
      cardHeight: 280,
      pointSize: 18,
    },
    display: {
      toolbar: { enabled: true, position: 'bottom' },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const WithGoogleFonts: Story = {
  name: 'With Google Fonts',
  args: {
    mode: 'vertical',
    layout: {
      cardWidth: 650,
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
            size: '1.2rem',
          },
          cardSubtitle: {
            weight: 'normal',
            style: 'italic',
            size: '1rem',
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

export const WithDarkMode: Story = {
  name: 'With Dark Mode Toggle',
  args: {
    mode: 'vertical',
    layout: {
      cardWidth: 650,
      cardHeight: 300,
    },
    darkMode: {
      showToggle: true,
    },
    display: {
      toolbar: { enabled: true, position: 'top' },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const Compact: Story = {
  name: 'Compact Vertical',
  args: {
    mode: 'vertical',
    layout: {
      cardWidth: 450,
      cardHeight: 200,
      pointSize: 12,
    },
    content: {
      compactText: true,
    },
    display: {
      toolbar: { enabled: false },
      borderless: false,
    },
  },
  render: (args) => (
    <div style={{ height: '500px', width: '100%' }}>
      <Chrono {...args} />
    </div>
  ),
};
