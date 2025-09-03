import { createTheme } from '@vanilla-extract/css';
import { vars } from './tokens.css';

export const lightThemeClass = createTheme(vars, {
  color: {
    text: '#111827',
    background: '#ffffff',
    primary: '#2563eb',
    secondary: '#64748b',
    muted: '#6b7280',
    cardBg: '#ffffff',
    cardTitle: '#111827',
    cardSubtitle: '#374151',
    cardDetails: '#4b5563',
    cardDetailsBackground: '#f8fafc',
    cardMediaBg: '#f1f5f9',
    // Nested card properties
    nestedCardBg: '#f8fafc',
    nestedCardTitle: '#1e40af',
    nestedCardSubtitle: '#475569',
    nestedCardDetails: '#64748b',
    nestedCardDetailsBackground: '#ffffff',
    // Icon properties  
    icon: '#2563eb',
    iconBackground: '#e2e8f0',
    // Active state properties
    titleActive: '#1d4ed8',
    // Additional detail properties
    details: '#475569',
    // Toolbar and controls
    toolbarBg: '#f1f5f9',
    toolbarBtnBg: '#ffffff',
    toolbarText: '#1e293b',
    // Button/controls borders and states
    buttonBorder: '#e2e8f0',
    buttonHoverBorder: '#2563eb',
    buttonHoverBg: '#e2e8f0',
    buttonActiveBg: '#2563eb',
    buttonActiveIcon: '#ffffff',
    buttonActiveBorder: '#1d4ed8',
    // Dark mode specific enhancements  
    searchHighlight: '#fef3c7',
    darkToggleActiveBg: '#2563eb',
    darkToggleActiveIcon: '#ffffff',
    darkToggleActiveBorder: '#1d4ed8',
    darkToggleGlow: 'rgba(37, 99, 235, 0.3)',
    // Effects
    shadow: 'rgba(0,0,0,0.1)',
    glow: 'rgba(37, 99, 235, 0.2)',
  },
  space: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  radius: { sm: '4px', md: '8px', lg: '12px' },
  font: {
    body: 'Inter, system-ui, ui-sans-serif, Segoe UI, Roboto, Helvetica, Arial',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas',
  },
  zIndex: {
    base: '1',
    timelineCard: '10',
    controls: '1000',
    popover: '1100', // Higher than controls to ensure popover appears above everything
    outlinePane: '50',
    verticalItem: '9',
  },
  shadow: {
    elevationSm: '0 1px 2px rgba(0,0,0,0.05)',
    elevationMd: '0 2px 4px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.1)',
    elevationLg: '0 8px 16px rgba(0,0,0,0.12)',
    insetSm: 'inset 0 1px 1px rgba(0,0,0,0.08)',
    focusRing: '0 0 0 3px rgba(37,99,235,0.2)',
  },
  transition: {
    duration: { fast: '150ms', normal: '200ms', slow: '300ms' },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
});

export const darkThemeClass = createTheme(vars, {
  color: {
    text: '#e5e7eb',
    background: '#0b0f19',
    primary: '#60a5fa',
    secondary: '#94a3b8',
    muted: '#9ca3af',
    cardBg: '#111827',
    cardTitle: '#f3f4f6',
    cardSubtitle: '#e5e7eb',
    cardDetails: '#d1d5db',
    cardDetailsBackground: '#1f2937',
    cardMediaBg: '#374151',
    // Nested card properties
    nestedCardBg: '#1f2937',
    nestedCardTitle: '#93c5fd',
    nestedCardSubtitle: '#cbd5e1',
    nestedCardDetails: '#9ca3af',
    nestedCardDetailsBackground: '#111827',
    // Icon properties
    icon: '#93c5fd',
    iconBackground: '#374151',
    // Active state properties
    titleActive: '#60a5fa',
    // Additional detail properties
    details: '#cbd5e1',
    // Toolbar and controls
    toolbarBg: '#111827',
    toolbarBtnBg: '#374151',
    toolbarText: '#f3f4f6',
    // Button/controls borders and states
    buttonBorder: 'rgba(255,255,255,0.1)',
    buttonHoverBorder: '#3b82f6',
    buttonHoverBg: '#4b5563',
    buttonActiveBg: '#fbbf24',
    buttonActiveIcon: '#0f172a',
    buttonActiveBorder: '#f59e0b',
    // Dark mode specific enhancements
    searchHighlight: '#451a03',
    darkToggleActiveBg: '#60a5fa',
    darkToggleActiveIcon: '#0f172a',
    darkToggleActiveBorder: '#3b82f6',
    darkToggleGlow: 'rgba(96, 165, 250, 0.4)',
    // Effects
    shadow: 'rgba(0,0,0,0.4)',
    glow: 'rgba(96, 165, 250, 0.25)',
  },
  space: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  radius: { sm: '4px', md: '8px', lg: '12px' },
  font: {
    body: 'Inter, system-ui, ui-sans-serif, Segoe UI, Roboto, Helvetica, Arial',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas',
  },
  zIndex: {
    base: '1',
    timelineCard: '10',
    controls: '1000',
    popover: '1100', // Higher than controls to ensure popover appears above everything
    outlinePane: '50',
    verticalItem: '9',
  },
  shadow: {
    elevationSm: '0 1px 2px rgba(0,0,0,0.4)',
    elevationMd: '0 2px 4px rgba(0,0,0,0.45), 0 4px 8px rgba(0,0,0,0.5)',
    elevationLg: '0 8px 16px rgba(0,0,0,0.6)',
    insetSm: 'inset 0 1px 1px rgba(0,0,0,0.5)',
    focusRing: '0 0 0 3px rgba(96,165,250,0.25)',
  },
  transition: {
    duration: { fast: '150ms', normal: '200ms', slow: '300ms' },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
});
