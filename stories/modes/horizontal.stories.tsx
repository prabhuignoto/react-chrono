import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Chrono from '../../src/components';
import { basicTimeline } from '../../src/demo/data/basic-timeline';
import { StoryContainer } from '../components/StoryContainer';

const meta: Meta<typeof Chrono> = {
  title: 'Layout Modes/Horizontal',
  component: Chrono,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: basicTimeline,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    mode: 'horizontal',
    layout: {
      cardWidth: 400,
      cardHeight: 280,
      pointSize: 20,
    },
    display: {
      toolbar: { enabled: true, position: 'bottom' },
      scrollable: { scrollbar: false },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="450px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const HorizontalAll: Story = {
  name: 'Horizontal All',
  args: {
    mode: 'horizontal-all',
    layout: {
      cardWidth: 400,
      cardHeight: 280,
      pointSize: 18,
    },
    display: {
      toolbar: { enabled: true, position: 'bottom' },
      scrollable: { scrollbar: false },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="450px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const Compact: Story = {
  name: 'Horizontal Compact',
  args: {
    mode: 'horizontal',
    layout: {
      cardWidth: 320,
      cardHeight: 220,
      pointSize: 12,
    },
    content: {
      compactText: true,
    },
    display: {
      toolbar: { enabled: false },
      scrollable: { scrollbar: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="350px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const Interactive: Story = {
  name: 'Interactive with Slideshow',
  args: {
    mode: 'horizontal',
    layout: {
      cardWidth: 450,
      cardHeight: 300,
      pointSize: 20,
    },
    interaction: {
      focusOnLoad: true,
      cardHover: true,
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

export const Borderless: Story = {
  name: 'Borderless Horizontal',
  args: {
    mode: 'horizontal',
    layout: {
      cardWidth: 400,
      cardHeight: 280,
    },
    display: {
      borderless: true,
      toolbar: { enabled: true },
      scrollable: { scrollbar: false },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="450px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};
