import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Chrono from '../../src/components';
import { basicTimeline } from '../../src/demo/data/basic-timeline';
import { StoryContainer } from '../components/StoryContainer';

const meta: Meta<typeof Chrono> = {
  title: 'Interactive Features/Interactions',
  component: Chrono,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Slideshow: Story = {
  name: 'Slideshow Mode',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    animation: {
      slideshow: {
        enabled: true,
        duration: 2500,
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

export const WithSearch: Story = {
  name: 'With Search Functionality',
  args: {
    items: basicTimeline,
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    display: {
      toolbar: {
        enabled: true,
        position: 'top',
        search: {
          width: '450px',
          maxWidth: '600px',
          inputWidth: '100%',
        },
      },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const HorizontalSlideshow: Story = {
  name: 'Horizontal Slideshow',
  args: {
    items: basicTimeline.slice(0, 5),
    mode: 'horizontal',
    layout: {
      cardWidth: 400,
      cardHeight: 300,
    },
    animation: {
      slideshow: {
        enabled: true,
        duration: 3000,
      },
    },
    display: {
      toolbar: { enabled: true, position: 'bottom' },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="500px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const KeyboardNavigation: Story = {
  name: 'Keyboard Navigation Ready',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    interaction: {
      focusOnLoad: true,
      cardHover: true,
    },
    display: {
      toolbar: { enabled: true },
      scrollable: { scrollbar: false },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
        💡 Use arrow keys to navigate, Home/End to jump to start/end
      </p>
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const ResponsiveLayout: Story = {
  name: 'Responsive Layout',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 650,
      cardHeight: 300,
      responsive: {
        enabled: true,
        breakpoint: 768,
      },
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
        📱 Try resizing the window to see responsive behavior below 768px
      </p>
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const InitialActiveItem: Story = {
  name: 'Initial Active Item',
  args: {
    items: basicTimeline.slice(0, 5),
    mode: 'vertical',
    activeItemIndex: 2,
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
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
        Third item (index 2) is active on load
      </p>
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const DynamicContent: Story = {
  name: 'Dynamic Content Update',
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
  render: (args) => {
    const [items, setItems] = useState(basicTimeline.slice(0, 4));

    const addItem = () => {
      if (items.length < basicTimeline.length) {
        setItems(basicTimeline.slice(0, items.length + 1));
      }
    };

    return (
      <StoryContainer minHeight="650px" maxHeight="90vh">
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={addItem}
            style={{
              padding: '8px 16px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Add More Items ({items.length}/{basicTimeline.length})
          </button>
        </div>
        <Chrono {...args} items={items} />
      </StoryContainer>
    );
  },
};

export const FocusOnLoad: Story = {
  name: 'Focus on Load',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    interaction: {
      focusOnLoad: true,
      cardHover: true,
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh">
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
        Timeline is focused on load for immediate keyboard interaction
      </p>
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const WithToolbarSearch: Story = {
  name: 'Advanced Toolbar with Search',
  args: {
    items: basicTimeline,
    mode: 'vertical',
    layout: {
      cardWidth: 650,
      cardHeight: 350,
    },
    display: {
      toolbar: {
        enabled: true,
        position: 'top',
        search: {
          width: '500px',
          maxWidth: '100%',
          inputWidth: '100%',
        },
      },
      borderless: true,
    },
  },
  render: (args) => (
    <StoryContainer minHeight="700px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};
