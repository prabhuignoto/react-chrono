import type { CSSProperties } from 'react';
import type { Theme } from '../models/Theme';
import { vars } from './tokens.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export function computeCssVarsFromTheme(theme: Theme | undefined): CSSProperties {
  const t = theme ?? {};
  return assignInlineVars({
    [vars.color.background]: t.timelineBgColor ?? t.cardBgColor ?? '#fff',
    [vars.color.text]: t.textColor ?? '#111827',
    [vars.color.primary]: t.primary ?? '#2563eb',
    [vars.color.muted]: '#6b7280',
    [vars.color.cardBg]: t.cardBgColor ?? '#fff',
    [vars.color.cardTitle]: t.cardTitleColor ?? t.titleColor ?? '#111827',
    [vars.color.cardSubtitle]: t.cardSubtitleColor ?? '#374151',
    [vars.color.cardDetails]: t.cardDetailsColor ?? '#4b5563',

    // Toolbar and controls
    [vars.color.toolbarBg]: t.toolbarBgColor ?? '#f1f5f9',
    [vars.color.toolbarBtnBg]: t.toolbarBtnBgColor ?? '#ffffff',
    [vars.color.toolbarText]: t.toolbarTextColor ?? '#1e293b',
    [vars.color.icon]: t.iconColor ?? t.primary ?? '#2563eb',

    // Buttons and effects
    [vars.color.buttonBorder]: t.buttonBorderColor ?? '#e2e8f0',
    [vars.color.buttonHoverBorder]: t.buttonHoverBorderColor ?? t.primary ?? '#2563eb',
    [vars.color.buttonHoverBg]: t.buttonHoverBgColor ?? '#e2e8f0',
    [vars.color.buttonActiveBg]: t.buttonActiveBgColor ?? t.primary ?? '#2563eb',
    [vars.color.shadow]: t.shadowColor ?? 'rgba(0,0,0,0.1)',
  });
}


