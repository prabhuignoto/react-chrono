import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Chrono from '../../src/components';
import { StoryContainer } from '../components/StoryContainer';

const meta: Meta<typeof Chrono> = {
  title: 'Media & Rich Content/Media Support',
  component: Chrono,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const itemsWithImages = [
  {
    title: 'January 2024',
    cardTitle: 'Product Launch',
    cardSubtitle: 'Initial release',
    cardDetailedText: 'Successfully launched the first version of our product.',
    media: {
      name: 'Launch Event',
      source: {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      },
      type: 'IMAGE',
    },
  },
  {
    title: 'March 2024',
    cardTitle: 'Beta Testing',
    cardSubtitle: 'User feedback collection',
    cardDetailedText: 'Gathered feedback from 500+ beta testers.',
    media: {
      name: 'Testing Phase',
      source: {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      },
      type: 'IMAGE',
    },
  },
  {
    title: 'May 2024',
    cardTitle: 'v1.1 Release',
    cardSubtitle: 'Feature updates',
    cardDetailedText: 'Released v1.1 with 20+ new features and improvements.',
    media: {
      name: 'v1.1 Release',
      source: {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      },
      type: 'IMAGE',
    },
  },
];

export const WithImages: Story = {
  name: 'Timeline with Images',
  args: {
    items: itemsWithImages,
    mode: 'vertical',
    layout: {
      cardWidth: 650,
      cardHeight: 400,
      pointSize: 20,
    },
    media: {
      align: 'center',
      fit: 'cover',
    },
    display: {
      toolbar: { enabled: true, position: 'top' },
      borderless: false,
    },
  },
  render: (args) => (
    <StoryContainer minHeight="700px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const ImageAlignmentTop: Story = {
  name: 'Images Aligned Top',
  args: {
    items: itemsWithImages,
    mode: 'vertical',
    layout: {
      cardWidth: 550,
      cardHeight: 350,
    },
    media: {
      align: 'top',
      fit: 'cover',
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

export const ImageAlignmentBottom: Story = {
  name: 'Images Aligned Bottom',
  args: {
    items: itemsWithImages,
    mode: 'vertical',
    layout: {
      cardWidth: 550,
      cardHeight: 350,
    },
    media: {
      align: 'bottom',
      fit: 'cover',
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

export const ImageFitContain: Story = {
  name: 'Images with Contain Fit',
  args: {
    items: itemsWithImages,
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 400,
    },
    media: {
      align: 'center',
      fit: 'contain',
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <div style={{ height: '650px', width: '100%' }}>
      <Chrono {...args} />
    </div>
  ),
};

export const ImageResponsive: Story = {
  name: 'Responsive Media Layout',
  args: {
    items: itemsWithImages,
    mode: 'vertical',
    layout: {
      cardWidth: 650,
      cardHeight: 400,
      responsive: {
        enabled: true,
        breakpoint: 768,
      },
    },
    media: {
      align: 'center',
      fit: 'cover',
    },
    display: {
      toolbar: { enabled: true },
      scrollable: { scrollbar: false },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="700px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const HorizontalWithMedia: Story = {
  name: 'Horizontal with Images',
  args: {
    items: itemsWithImages,
    mode: 'horizontal',
    layout: {
      cardWidth: 400,
      cardHeight: 350,
    },
    media: {
      align: 'center',
      fit: 'cover',
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <div style={{ height: '500px', width: '100%' }}>
      <Chrono {...args} />
    </div>
  ),
};
