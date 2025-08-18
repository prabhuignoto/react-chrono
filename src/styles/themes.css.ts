import { createTheme } from '@vanilla-extract/css';
import { vars } from './tokens.css';

export const lightThemeClass = createTheme(vars, {
  color: {
    text: '#111827',
    background: '#ffffff',
    primary: '#2563eb',
    muted: '#6b7280',
    cardBg: '#ffffff',
    cardTitle: '#111827',
    cardSubtitle: '#374151',
    cardDetails: '#4b5563',
    toolbarBg: '#f1f5f9',
    toolbarBtnBg: '#ffffff',
    toolbarText: '#1e293b',
    icon: '#2563eb',
    buttonBorder: '#e2e8f0',
    buttonHoverBorder: '#2563eb',
    buttonHoverBg: '#e2e8f0',
    buttonActiveBg: '#2563eb',
    shadow: 'rgba(0,0,0,0.1)',
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
    popover: '100',
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
    muted: '#9ca3af',
    cardBg: '#111827',
    cardTitle: '#f3f4f6',
    cardSubtitle: '#e5e7eb',
    cardDetails: '#d1d5db',
    toolbarBg: '#111827',
    toolbarBtnBg: '#374151',
    toolbarText: '#f3f4f6',
    icon: '#93c5fd',
    buttonBorder: 'rgba(255,255,255,0.1)',
    buttonHoverBorder: '#3b82f6',
    buttonHoverBg: '#4b5563',
    buttonActiveBg: '#fbbf24',
    shadow: 'rgba(0,0,0,0.4)',
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
    popover: '100',
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
