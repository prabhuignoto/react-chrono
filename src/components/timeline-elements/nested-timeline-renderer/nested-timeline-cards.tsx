import React, { useMemo } from 'react';
import { useTimelineContext } from '../../contexts';
import TimelineCard from '../timeline-card-content/timeline-card-content';
import { computeCssVarsFromTheme } from '../../../styles/theme-bridge';

interface NestedTimelineCardsProps {
  items: any[];
  nestedCardHeight?: number;
}

/**
 * Specialized component for rendering nested timelines as simple cards
 * with a center connecting line instead of a full timeline layout
 */
const NestedTimelineCards: React.FC<NestedTimelineCardsProps> = ({
  items,
  nestedCardHeight,
}) => {
  const { theme, isDarkMode } = useTimelineContext();

  // Memoize CSS variables to prevent re-creation on every render
  const themeCssVars = useMemo(
    () => computeCssVarsFromTheme(theme, isDarkMode),
    [theme, isDarkMode],
  );

  // Memoize container styles
  const containerStyles = useMemo(
    () => ({
      ...themeCssVars,
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      padding: '1rem 0',
    }),
    [themeCssVars],
  );

  // Memoize center line styles
  const centerLineStyles = useMemo(
    () => ({
      position: 'absolute' as const,
      left: '50%',
      top: '0',
      bottom: '0',
      width: '2px',
      background: theme?.primary || '#2563eb',
      transform: 'translateX(-50%)',
      zIndex: 1,
    }),
    [theme?.primary],
  );

  // Memoize item wrapper styles
  const itemWrapperStyles = useMemo(
    () => ({
      position: 'relative' as const,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    }),
    [],
  );

  // Memoize card container styles
  const cardContainerStyles = useMemo(
    () => ({
      width: '100%',
      maxWidth: '600px',
      background:
        theme?.nestedCardBgColor ||
        theme?.cardBgColor ||
        (isDarkMode ? '#1f2937' : '#ffffff'),
      border: `1px solid ${theme?.buttonBorderColor || (isDarkMode ? '#4b5563' : '#e2e8f0')}`,
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: isDarkMode
        ? '0 2px 4px rgba(0, 0, 0, 0.3)'
        : '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative' as const,
    }),
    [
      theme?.nestedCardBgColor,
      theme?.cardBgColor,
      theme?.buttonBorderColor,
      isDarkMode,
    ],
  );

  // Memoize title styles
  const titleStyles = useMemo(
    () => ({
      margin: '0 0 0.5rem 0',
      color:
        theme?.nestedCardTitleColor ||
        theme?.cardTitleColor ||
        (isDarkMode ? '#60a5fa' : '#1e3a8a'),
      fontSize: '1.1rem',
      fontWeight: '600',
    }),
    [theme?.nestedCardTitleColor, theme?.cardTitleColor, isDarkMode],
  );

  // Memoize subtitle styles
  const subtitleStyles = useMemo(
    () => ({
      margin: '0 0 0.75rem 0',
      color:
        theme?.nestedCardSubtitleColor ||
        theme?.cardSubtitleColor ||
        (isDarkMode ? '#d1d5db' : '#64748b'),
      fontSize: '0.95rem',
    }),
    [theme?.nestedCardSubtitleColor, theme?.cardSubtitleColor, isDarkMode],
  );

  // Memoize details text styles with nested card height
  const getDetailsStyles = useMemo(
    () => ({
      color:
        theme?.nestedCardDetailsColor ||
        theme?.cardDetailsColor ||
        (isDarkMode ? '#9ca3af' : '#475569'),
      fontSize: '0.9rem',
      lineHeight: '1.5',
      ...(nestedCardHeight && {
        maxHeight: `${nestedCardHeight}px`,
        overflow: 'auto' as const,
      }),
    }),
    [
      theme?.nestedCardDetailsColor,
      theme?.cardDetailsColor,
      isDarkMode,
      nestedCardHeight,
    ],
  );

  // Memoize link styles
  const linkStyles = useMemo(
    () => ({
      display: 'inline-block',
      marginTop: '0.75rem',
      color: theme?.primary || '#2563eb',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '500',
    }),
    [theme?.primary],
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div style={containerStyles}>
      {/* Center connecting line */}
      <div style={centerLineStyles} />

      {/* Render nested timeline items as simple cards */}
      {items.map((item, index) => (
        <div key={item.id || index} style={itemWrapperStyles}>
          {/* Card container */}
          <div style={cardContainerStyles}>
            {/* Card content */}
            <div>
              {item.cardTitle && <h3 style={titleStyles}>{item.cardTitle}</h3>}

              {item.cardSubtitle && (
                <p style={subtitleStyles}>{item.cardSubtitle}</p>
              )}

              {item.cardDetailedText && (
                <div
                  style={getDetailsStyles}
                  dangerouslySetInnerHTML={{ __html: item.cardDetailedText }}
                />
              )}

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyles}
                >
                  Learn more →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NestedTimelineCards;
