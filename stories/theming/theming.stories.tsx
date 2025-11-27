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
    items: basicTimeline.slice(0, 6),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    theme: {
      primary: '#22d3ee',
      secondary: '#6366f1',
      cardBgColor: '#1a2542',
      cardDetailsBackGround: '#0f172a',
      cardDetailsColor: '#ffffff',
      cardSubtitleColor: '#ffffff',
      cardTitleColor: '#ffffff',
      cardForeColor: '#ffffff',
      cardMediaBgColor: '#23264a',
      textColor: '#ffffff',
      detailsColor: '#ffffff',
      toolbarBgColor: '#1c2b4a',
      toolbarBtnBgColor: '#1f2d4b',
      toolbarTextColor: '#ffffff',
      titleColor: '#ffffff',
      titleColorActive: '#8bcbff',
      timelineBgColor: '#10152c',
      buttonBorderColor: '#293052',
      buttonHoverBgColor: '#1f2b43',
      buttonHoverBorderColor: '#38bdf8',
      buttonActiveBgColor: '#2c3656',
      buttonActiveBorderColor: '#38bdf8',
      shadowColor: 'rgba(2, 6, 23, 0.7)',
      glowColor: 'rgba(59, 130, 246, 0.35)',
      searchHighlightColor: '#38bdf8',
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
      primary: '#f97316',
      secondary: '#d946ef',
      cardBgColor: '#fff1f3',
      cardDetailsBackGround: '#ffe4e3',
      cardDetailsColor: '#fb7185',
      cardSubtitleColor: '#c026d3',
      cardTitleColor: '#c026d3',
      cardForeColor: '#1f1234',
      cardMediaBgColor: '#ffe4e3',
      textColor: '#1f1234',
      detailsColor: '#5b21b6',
      toolbarBgColor: '#fff1f3',
      toolbarBtnBgColor: '#fff1f3',
      toolbarTextColor: '#1f1234',
      titleColor: '#c026d3',
      titleColorActive: '#f43f5e',
      timelineBgColor: '#fff9fb',
      buttonBorderColor: '#f97316',
      buttonHoverBgColor: '#fb923c',
      buttonHoverBorderColor: '#fb7185',
      buttonActiveBgColor: '#d946ef',
      buttonActiveBorderColor: '#d946ef',
      shadowColor: 'rgba(249, 115, 22, 0.25)',
      glowColor: 'rgba(249, 115, 22, 0.35)',
      searchHighlightColor: '#f43f5e',
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
      primary: '#111827',
      secondary: '#475569',
      cardBgColor: '#f8fafc',
      cardDetailsBackGround: '#e2e8f0',
      cardDetailsColor: '#475569',
      cardSubtitleColor: '#475569',
      cardTitleColor: '#111827',
      cardForeColor: '#0f172a',
      cardMediaBgColor: '#e0e7ff',
      textColor: '#0f172a',
      detailsColor: '#475569',
      toolbarBgColor: '#f8fafc',
      toolbarBtnBgColor: '#f8fafc',
      toolbarTextColor: '#0f172a',
      titleColor: '#1e293b',
      titleColorActive: '#2563eb',
      timelineBgColor: '#edf2ff',
      buttonBorderColor: '#e2e8f0',
      buttonHoverBgColor: '#e2e8f0',
      buttonHoverBorderColor: '#cbd5f5',
      buttonActiveBgColor: '#2563eb',
      buttonActiveBorderColor: '#2563eb',
      shadowColor: 'rgba(148, 163, 184, 0.6)',
      glowColor: 'rgba(37, 99, 235, 0.2)',
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

export const MatrixTheme: Story = {
  name: 'Matrix Theme',
  args: {
    items: basicTimeline.slice(0, 6),
    mode: 'vertical',
    layout: {
      cardWidth: 600,
      cardHeight: 300,
    },
    theme: {
      primary: '#00ff88',
      secondary: '#3effb2',
      cardBgColor: '#091b20',
      cardDetailsBackGround: '#031213',
      cardDetailsColor: '#a8ffd1',
      cardSubtitleColor: '#bff4cf',
      cardTitleColor: '#e1ffe5',
      cardForeColor: '#f1fff8',
      cardMediaBgColor: '#04111c',
      textColor: '#f7fffb',
      detailsColor: '#c1ffd8',
      toolbarBgColor: '#04121a',
      toolbarBtnBgColor: '#071f24',
      toolbarTextColor: '#f7fffb',
      titleColor: '#e5ffe7',
      titleColorActive: '#48f99b',
      timelineBgColor: '#01080d',
      buttonBorderColor: '#0a1a1f',
      buttonHoverBgColor: '#0c1c25',
      buttonHoverBorderColor: '#00ff88',
      buttonActiveBgColor: '#0f2030',
      buttonActiveBorderColor: '#00ff88',
      shadowColor: 'rgba(0, 0, 0, 0.85)',
      glowColor: 'rgba(0, 255, 136, 0.3)',
      searchHighlightColor: '#6effc6',
    },
    display: {
      toolbar: { enabled: true },
    },
  },
  render: (args) => (
    <StoryContainer minHeight="600px" maxHeight="90vh" background="#02060d">
      <Chrono {...args} />
    </StoryContainer>
  ),
};
