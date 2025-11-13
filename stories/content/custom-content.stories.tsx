import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Chrono from '../../src/components';
import { basicTimeline } from '../../src/demo/data/basic-timeline';
import { StoryContainer } from '../components/StoryContainer';

const meta: Meta<typeof Chrono> = {
  title: 'Content & Customization/Custom Content',
  component: Chrono,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const customHTMLItems = [
  {
    title: 'Q1 2024',
    cardTitle: 'Project Kickoff',
    cardSubtitle: 'January 15, 2024',
    cardDetailedText: '<strong>Objectives:</strong><ul><li>Define project scope</li><li>Assemble team</li><li>Setup infrastructure</li></ul>',
  },
  {
    title: 'Q2 2024',
    cardTitle: 'Development Phase',
    cardSubtitle: 'April 1, 2024',
    cardDetailedText: '<strong>Deliverables:</strong><ul><li>Core features completed</li><li>Initial testing phase</li><li>Documentation drafted</li></ul>',
  },
  {
    title: 'Q3 2024',
    cardTitle: 'Testing & Refinement',
    cardSubtitle: 'July 1, 2024',
    cardDetailedText: '<strong>Focus:</strong><ul><li>QA testing</li><li>Performance optimization</li><li>User feedback integration</li></ul>',
  },
];

export const HTMLContent: Story = {
  name: 'Custom HTML Content',
  args: {
    items: customHTMLItems,
    mode: 'vertical',
    content: {
      allowHTML: true,
      compactText: false,
    },
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

export const CompactContent: Story = {
  name: 'Compact Text Layout',
  args: {
    items: basicTimeline.slice(0, 4),
    mode: 'vertical',
    content: {
      compactText: true,
    },
    layout: {
      cardWidth: 500,
      cardHeight: 200,
      pointSize: 14,
    },
    display: {
      borderless: true,
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="500px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const CustomCardless: Story = {
  name: 'Cardless Layout',
  args: {
    items: basicTimeline.slice(0, 5),
    mode: 'vertical',
    display: {
      cardless: true,
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="500px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};

export const CustomClassNames: Story = {
  name: 'Custom Class Names',
  args: {
    items: basicTimeline.slice(0, 3),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 280,
    },
    style: {
      classNames: {
        card: 'custom-card-class',
        cardText: 'custom-text-class',
      },
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <div style={{ height: '500px', width: '100%' }}>
      <style>{`
        .custom-card-class {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .custom-text-class {
          font-weight: 500;
          letter-spacing: 0.3px;
        }
      `}</style>
      <Chrono {...args} />
    </div>
  ),
};

export const MixedContent: Story = {
  name: 'Mixed Content Types',
  args: {
    items: [
      {
        title: 'Plain Text',
        cardTitle: 'Text Only',
        cardDetailedText: 'This is a simple text card',
      },
      {
        title: 'HTML Content',
        cardTitle: 'Rich HTML',
        cardDetailedText: '<strong>Bold</strong> and <em>italic</em> text',
      },
      {
        title: 'Multiple Paragraphs',
        cardTitle: 'Complex Content',
        cardDetailedText: '<p>First paragraph</p><p>Second paragraph with <a href="#">link</a></p>',
      },
    ],
    mode: 'vertical',
    content: {
      allowHTML: true,
    },
    layout: {
      cardWidth: 550,
      cardHeight: 280,
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="500px" maxHeight="90vh">
      <Chrono {...args} />
    </StoryContainer>
  ),
};
