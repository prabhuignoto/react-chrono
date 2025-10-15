import React, { useMemo } from 'react';
import { useTimelineContext } from '../../contexts';
import TimelineCard from '../timeline-card-content/timeline-card-content';
import { vars } from '../../../styles/tokens.css';

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
  const { isDarkMode } = useTimelineContext();

  // Memoize container styles
  const containerStyles = useMemo(
    () => ({
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      padding: '1rem 0',
    }),
    [],
  );

  // Memoize center line styles
  const centerLineStyles = useMemo(
    () => ({
      position: 'absolute' as const,
      left: '50%',
      top: '0',
      bottom: '0',
      width: '2px',
      background: vars.color.primary,
      transform: 'translateX(-50%)',
      zIndex: 1,
    }),
    [],
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
      background: vars.color.nestedCardBg,
      border: `1px solid ${vars.color.buttonBorder}`,
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: isDarkMode
        ? '0 2px 4px rgba(0, 0, 0, 0.3)'
        : '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative' as const,
    }),
    [],
  );

  // Memoize title styles
  const titleStyles = useMemo(
    () => ({
      margin: '0 0 0.5rem 0',
      color: vars.color.nestedCardTitle,
      fontSize: '1.1rem',
      fontWeight: '600',
    }),
    [],
  );

  // Memoize subtitle styles
  const subtitleStyles = useMemo(
    () => ({
      margin: '0 0 0.75rem 0',
      color: vars.color.nestedCardSubtitle,
      fontSize: '0.95rem',
    }),
    [],
  );

  // Memoize details text styles with nested card height
  const getDetailsStyles = useMemo(
    () => ({
      color: vars.color.nestedCardDetails,
      fontSize: '0.9rem',
      lineHeight: '1.5',
      ...(nestedCardHeight && {
        maxHeight: `${nestedCardHeight}px`,
        overflow: 'auto' as const,
      }),
    }),
    [nestedCardHeight],
  );

  // Memoize link styles
  const linkStyles = useMemo(
    () => ({
      display: 'inline-block',
      marginTop: '0.75rem',
      color: vars.color.primary,
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '500',
    }),
    [],
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
