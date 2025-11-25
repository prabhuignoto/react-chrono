import type { CSSProperties } from 'react';
import type { Theme } from '../models/Theme';
import { vars } from './tokens/index.css';
import { tokens } from './tokens/index.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

/**
 * Checks if a custom theme object has any user-defined properties
 */
export function hasCustomTheme(theme?: Theme): boolean {
  return theme !== undefined && Object.keys(theme).length > 0;
}

/**
 * Computes CSS variables from a theme object.
 * Returns empty object for default themes to avoid CSS var duplication.
 * Only returns vars when custom theme properties are provided.
 */
export function computeCssVarsFromTheme(
  theme: Theme | undefined,
  isDarkMode?: boolean,
): CSSProperties {
  // If no custom theme provided, return empty - let vanilla-extract theme classes handle it
  if (!hasCustomTheme(theme)) {
    return {};
  }

  const t = theme ?? {};

  // Determine if we're in dark mode based on explicit flag or theme properties
  const darkMode =
    isDarkMode ??
    (t.timelineBgColor === '#000000' ||
      t.cardBgColor === '#1f2937' ||
      t.textColor === '#ffffff' ||
      t.textColor === '#f9fafb');

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
    // New comprehensive token system mapping
    ...assignInlineVars({
      // Semantic color tokens
      [tokens.semantic.color.text.primary]: t.textColor ?? defaultText,
      [tokens.semantic.color.text.secondary]:
        t.cardSubtitleColor ?? (darkMode ? '#d1d5db' : '#374151'),
      [tokens.semantic.color.text.muted]:
        t.detailsColor ?? (darkMode ? '#9ca3af' : '#6b7280'),
      [tokens.semantic.color.text.inverse]: darkMode
        ? defaultBackground
        : defaultText,

      // Background colors
      [tokens.semantic.color.background.primary]:
        t.timelineBgColor ?? t.cardBgColor ?? defaultBackground,
      [tokens.semantic.color.background.secondary]:
        t.cardDetailsBackGround ?? (darkMode ? '#1f2937' : '#f8fafc'),
      [tokens.semantic.color.background.elevated]:
        t.cardBgColor ?? defaultCardBg,
      [tokens.semantic.color.background.overlay]: darkMode
        ? '#00000080'
        : '#ffffff80',

      // Interactive colors
      [tokens.semantic.color.interactive.primary]: t.primary ?? '#3b82f6',
      [tokens.semantic.color.interactive.primaryHover]:
        t.buttonHoverBorderColor ?? t.primary ?? '#2563eb',
      [tokens.semantic.color.interactive.primaryActive]:
        t.titleColorActive ?? (darkMode ? '#60a5fa' : '#1d4ed8'),
      [tokens.semantic.color.interactive.secondary]:
        t.secondary ?? (darkMode ? '#94a3b8' : '#64748b'),
      [tokens.semantic.color.interactive.secondaryHover]:
        t.buttonHoverBgColor ?? defaultButtonHoverBg,
      [tokens.semantic.color.interactive.muted]: defaultMuted,
      [tokens.semantic.color.interactive.mutedHover]: defaultButtonHoverBg,

      // Border colors
      [tokens.semantic.color.border.default]:
        t.buttonBorderColor ?? defaultButtonBorder,
      [tokens.semantic.color.border.muted]: darkMode ? '#4b5563' : '#e5e7eb',
      [tokens.semantic.color.border.emphasis]:
        t.buttonActiveBorderColor ?? t.primary ?? '#3b82f6',
      [tokens.semantic.color.border.interactive]:
        t.buttonHoverBorderColor ?? t.primary ?? '#3b82f6',

      // Status colors
      [tokens.semantic.color.status.success]: '#22c55e',
      [tokens.semantic.color.status.warning]: '#eab308',
      [tokens.semantic.color.status.error]: '#ef4444',
      [tokens.semantic.color.status.info]: t.primary ?? '#3b82f6',

      // Icon colors
      [tokens.semantic.color.icon.default]:
        t.iconColor ?? t.primary ?? '#3b82f6',
      [tokens.semantic.color.icon.muted]: darkMode ? '#9ca3af' : '#6b7280',
      [tokens.semantic.color.icon.emphasis]: t.primary ?? '#3b82f6',

      // Component-specific tokens
      [tokens.component.timeline.line.color]: t.primary ?? '#3b82f6',
      [tokens.component.timeline.line.width]: '2px',
      [tokens.component.timeline.point.color.active]: t.primary ?? '#3b82f6',
      [tokens.component.timeline.point.color.inactive]: defaultMuted,
      [tokens.component.timeline.point.color.hover]:
        t.buttonHoverBorderColor ?? t.primary ?? '#2563eb',
      [tokens.component.timeline.point.size.sm]: '8px',
      [tokens.component.timeline.point.size.md]: '12px',
      [tokens.component.timeline.point.size.lg]: '16px',
      [tokens.component.timeline.card.width.vertical]: '85%',
      [tokens.component.timeline.card.width.horizontal]: '280px',
      [tokens.component.timeline.card.width.min]: '280px',
      [tokens.component.timeline.card.width.max]: '400px',
      [tokens.component.timeline.card.spacing.vertical]: '1rem',
      [tokens.component.timeline.card.spacing.horizontal]: '2rem',

      // Spacing tokens
      [tokens.semantic.spacing.xs]: '4px',
      [tokens.semantic.spacing.sm]: '8px',
      [tokens.semantic.spacing.md]: '16px',
      [tokens.semantic.spacing.lg]: '24px',
      [tokens.semantic.spacing.xl]: '32px',
      [tokens.semantic.spacing['2xl']]: '48px',
      [tokens.semantic.spacing['3xl']]: '64px',

      // Typography tokens
      [tokens.semantic.typography.fontSize.caption]: '12px',
      [tokens.semantic.typography.fontSize.body]: '16px',
      [tokens.semantic.typography.fontSize.heading3]: '18px',
      [tokens.semantic.typography.fontSize.heading2]: '20px',
      [tokens.semantic.typography.fontSize.heading1]: '24px',
      [tokens.semantic.typography.lineHeight.tight]: '1.2',
      [tokens.semantic.typography.lineHeight.normal]: '1.5',
      [tokens.semantic.typography.lineHeight.relaxed]: '1.8',
      [tokens.semantic.typography.fontWeight.normal]: '400',
      [tokens.semantic.typography.fontWeight.medium]: '500',
      [tokens.semantic.typography.fontWeight.semibold]: '600',
      [tokens.semantic.typography.fontWeight.bold]: '700',

      // Border radius tokens
      [tokens.semantic.borderRadius.sm]: '4px',
      [tokens.semantic.borderRadius.md]: '8px',
      [tokens.semantic.borderRadius.lg]: '12px',
      [tokens.semantic.borderRadius.xl]: '16px',
      [tokens.semantic.borderRadius.full]: '9999px',

      // Shadow tokens
      [tokens.semantic.shadow.card]: darkMode
        ? '0 2px 4px rgba(0, 0, 0, 0.3)'
        : '0 2px 4px rgba(0, 0, 0, 0.1)',
      [tokens.semantic.shadow.cardHover]: darkMode
        ? '0 4px 8px rgba(0, 0, 0, 0.4)'
        : '0 4px 8px rgba(0, 0, 0, 0.15)',
      [tokens.semantic.shadow.cardActive]: darkMode
        ? '0 1px 2px rgba(0, 0, 0, 0.5)'
        : '0 1px 2px rgba(0, 0, 0, 0.2)',
      [tokens.semantic.shadow.toolbar]: t.shadowColor ?? defaultShadow,
      [tokens.semantic.shadow.modal]: darkMode
        ? '0 8px 16px rgba(0, 0, 0, 0.6)'
        : '0 8px 16px rgba(0, 0, 0, 0.12)',

      // Motion tokens
      [tokens.semantic.motion.duration.fast]: '150ms',
      [tokens.semantic.motion.duration.normal]: '300ms',
      [tokens.semantic.motion.duration.slow]: '500ms',
      [tokens.semantic.motion.easing.standard]: 'cubic-bezier(0.4, 0, 0.2, 1)',
      [tokens.semantic.motion.easing.emphasized]: 'cubic-bezier(0.2, 0, 0, 1)',

      // Z-index tokens
      [tokens.semantic.zIndex.timelineCard]: '10',
      [tokens.semantic.zIndex.controls]: '1000',
      [tokens.semantic.zIndex.popover]: '1100',
      [tokens.semantic.zIndex.outline]: '50',

      // Toolbar tokens
      [tokens.component.toolbar.height]: '56px',
      [tokens.component.toolbar.padding]: '16px',
      [tokens.component.toolbar.background]:
        t.toolbarBgColor ?? defaultToolbarBg,
      [tokens.component.toolbar.button.size]: '32px',
      [tokens.component.toolbar.button.spacing]: '4px',

      // Maintain backward compatibility with old vars system
      [vars.color.background]:
        t.timelineBgColor ?? t.cardBgColor ?? defaultBackground,
      [vars.color.text]: t.textColor ?? defaultText,
      [vars.color.primary]: t.primary ?? '#3b82f6',
      [vars.color.secondary]: t.secondary ?? (darkMode ? '#94a3b8' : '#64748b'),
      [vars.color.muted]: defaultMuted,
      [vars.color.cardBg]: t.cardBgColor ?? defaultCardBg,
      [vars.color.cardTitle]: t.cardTitleColor ?? t.titleColor ?? defaultText,
      [vars.color.cardSubtitle]:
        t.cardSubtitleColor ?? (darkMode ? '#d1d5db' : '#374151'),
      [vars.color.cardDetails]:
        t.cardDetailsColor ?? (darkMode ? '#9ca3af' : '#4b5563'),
      [vars.color.toolbarBg]: t.toolbarBgColor ?? defaultToolbarBg,
      [vars.color.toolbarBtnBg]: t.toolbarBtnBgColor ?? defaultToolbarBtnBg,
      [vars.color.toolbarText]: t.toolbarTextColor ?? defaultToolbarText,
      [vars.color.icon]: t.iconColor ?? t.primary ?? '#3b82f6',
      [vars.color.buttonBorder]: t.buttonBorderColor ?? defaultButtonBorder,
      [vars.color.buttonHoverBorder]:
        t.buttonHoverBorderColor ?? t.primary ?? '#3b82f6',
      [vars.color.buttonHoverBg]: t.buttonHoverBgColor ?? defaultButtonHoverBg,
      [vars.color.buttonActiveBg]:
        t.buttonActiveBgColor ?? t.primary ?? '#3b82f6',
      [vars.color.shadow]: t.shadowColor ?? defaultShadow,
    }),
    // Additional CSS custom properties for compatibility
    ...({
      '--timeline-bg-color':
        t.timelineBgColor ?? t.cardBgColor ?? defaultBackground,
      '--timeline-text-color': t.textColor ?? defaultText,
      '--timeline-primary-color': t.primary ?? '#3b82f6',
      '--timeline-secondary-color':
        t.secondary ?? (darkMode ? '#94a3b8' : '#64748b'),
      '--timeline-card-bg-color': t.cardBgColor ?? defaultCardBg,
      '--timeline-muted-color': defaultMuted,
      '--timeline-toolbar-bg-color': t.toolbarBgColor ?? defaultToolbarBg,
      '--timeline-shadow-color': t.shadowColor ?? defaultShadow,

      // Nested card custom properties
      '--nested-card-bg-color':
        t.nestedCardBgColor ?? (darkMode ? '#1f2937' : '#f8fafc'),
      '--nested-card-title-color':
        t.nestedCardTitleColor ?? (darkMode ? '#93c5fd' : '#1e40af'),
      '--nested-card-subtitle-color':
        t.nestedCardSubtitleColor ?? (darkMode ? '#cbd5e1' : '#475569'),
      '--nested-card-details-color':
        t.nestedCardDetailsColor ?? (darkMode ? '#9ca3af' : '#64748b'),

      // Icon custom properties
      '--icon-bg-color':
        t.iconBackgroundColor ?? (darkMode ? '#374151' : '#e2e8f0'),
      '--icon-color': t.iconColor ?? t.primary ?? '#3b82f6',

      // Active state custom properties
      '--title-active-color':
        t.titleColorActive ?? (darkMode ? '#60a5fa' : '#1d4ed8'),
      '--details-color': t.detailsColor ?? (darkMode ? '#cbd5e1' : '#475569'),

      // Dark mode specific custom properties
      '--search-highlight-color':
        t.searchHighlightColor ?? (darkMode ? '#451a03' : '#fef3c7'),
      '--glow-color': t.glowColor ?? 'rgba(37, 99, 235, 0.2)',
    } as any),
  };
}
