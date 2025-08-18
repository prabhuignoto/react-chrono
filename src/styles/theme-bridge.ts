import type { CSSProperties } from 'react';
import type { Theme } from '../models/Theme';
import { vars } from './tokens.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export function computeCssVarsFromTheme(
  theme: Theme | undefined,
  isDarkMode?: boolean,
): CSSProperties {
  const t = theme ?? {};
  
  // Determine if we're in dark mode based on explicit flag or theme properties
  const darkMode = isDarkMode ?? (
    t.timelineBgColor === '#000000' || 
    t.cardBgColor === '#1f2937' || 
    t.textColor === '#ffffff' ||
    t.textColor === '#f9fafb'
  );
  
  // Default colors based on theme mode
  const defaultBackground = darkMode ? '#1f2937' : '#ffffff';
  const defaultText = darkMode ? '#f9fafb' : '#111827';
  const defaultCardBg = darkMode ? '#374151' : '#ffffff';
  const defaultMuted = darkMode ? '#9ca3af' : '#6b7280';
  const defaultToolbarBg = darkMode ? '#1f2937' : '#f1f5f9';
  const defaultToolbarBtnBg = darkMode ? '#374151' : '#ffffff';
  const defaultToolbarText = darkMode ? '#f9fafb' : '#1e293b';
  const defaultButtonBorder = darkMode ? '#4b5563' : '#e2e8f0';
  const defaultButtonHoverBg = darkMode ? '#4b5563' : '#e2e8f0';
  const defaultShadow = darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
  
  return {
    ...assignInlineVars({
      [vars.color.background]: t.timelineBgColor ?? t.cardBgColor ?? defaultBackground,
      [vars.color.text]: t.textColor ?? defaultText,
      [vars.color.primary]: t.primary ?? '#3b82f6',
      [vars.color.muted]: defaultMuted,
      [vars.color.cardBg]: t.cardBgColor ?? defaultCardBg,
      [vars.color.cardTitle]: t.cardTitleColor ?? t.titleColor ?? defaultText,
      [vars.color.cardSubtitle]: t.cardSubtitleColor ?? (darkMode ? '#d1d5db' : '#374151'),
      [vars.color.cardDetails]: t.cardDetailsColor ?? (darkMode ? '#9ca3af' : '#4b5563'),

      // Toolbar and controls
      [vars.color.toolbarBg]: t.toolbarBgColor ?? defaultToolbarBg,
      [vars.color.toolbarBtnBg]: t.toolbarBtnBgColor ?? defaultToolbarBtnBg,
      [vars.color.toolbarText]: t.toolbarTextColor ?? defaultToolbarText,
      [vars.color.icon]: t.iconColor ?? t.primary ?? '#3b82f6',

      // Buttons and effects
      [vars.color.buttonBorder]: t.buttonBorderColor ?? defaultButtonBorder,
      [vars.color.buttonHoverBorder]: t.buttonHoverBorderColor ?? t.primary ?? '#3b82f6',
      [vars.color.buttonHoverBg]: t.buttonHoverBgColor ?? defaultButtonHoverBg,
      [vars.color.buttonActiveBg]: t.buttonActiveBgColor ?? t.primary ?? '#3b82f6',
      [vars.color.shadow]: t.shadowColor ?? defaultShadow,
    }),
    // Additional CSS custom properties for compatibility
    ...(({
      '--timeline-bg-color': t.timelineBgColor ?? t.cardBgColor ?? defaultBackground,
      '--timeline-text-color': t.textColor ?? defaultText,
      '--timeline-primary-color': t.primary ?? '#3b82f6',
      '--timeline-card-bg-color': t.cardBgColor ?? defaultCardBg,
      '--timeline-muted-color': defaultMuted,
      '--timeline-toolbar-bg-color': t.toolbarBgColor ?? defaultToolbarBg,
      '--timeline-shadow-color': t.shadowColor ?? defaultShadow,
    }) as any),
  };
}
