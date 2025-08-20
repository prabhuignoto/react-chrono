import React from 'react';
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
  const { theme } = useTimelineContext();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        ...computeCssVarsFromTheme(theme),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem 0',
      }}
    >
      {/* Center connecting line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: theme?.primary || '#2563eb',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      />

      {/* Render nested timeline items as simple cards */}
      {items.map((item, index) => (
        <div
          key={item.id || index}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}
        >

          {/* Card container */}
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              background: theme?.nestedCardBgColor || theme?.cardBgColor || '#ffffff',
              border: `1px solid ${(theme as any)?.buttonBorderColor || '#e2e8f0'}`,
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginLeft: '1rem', // Space for the center line
              position: 'relative',
            }}
          >
            {/* Card content */}
            <div>
              {item.cardTitle && (
                <h3
                  style={{
                    margin: '0 0 0.5rem 0',
                    color: theme?.nestedCardTitleColor || theme?.cardTitleColor || '#1e3a8a',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                  }}
                >
                  {item.cardTitle}
                </h3>
              )}
              
              {item.cardSubtitle && (
                <p
                  style={{
                    margin: '0 0 0.75rem 0',
                    color: theme?.nestedCardSubtitleColor || theme?.cardSubtitleColor || '#64748b',
                    fontSize: '0.95rem',
                  }}
                >
                  {item.cardSubtitle}
                </p>
              )}

              {item.cardDetailedText && (
                <div
                  style={{
                    color: theme?.nestedCardDetailsColor || theme?.cardDetailsColor || '#475569',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    ...(nestedCardHeight && { maxHeight: `${nestedCardHeight}px`, overflow: 'auto' }),
                  }}
                  dangerouslySetInnerHTML={{ __html: item.cardDetailedText }}
                />
              )}

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '0.75rem',
                    color: theme?.primary || '#2563eb',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                  }}
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