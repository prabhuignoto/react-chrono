import React from 'react';
import { shapeWrapper, timelinePoint } from './timeline-point.css';
import { computeCssVarsFromTheme } from '../../../../styles/theme-bridge';
import { useTimelineContext } from '../../../contexts';

interface TimelinePointProps {
  circleClass: string;
  handleClick: () => void;
  circleRef: React.RefObject<HTMLButtonElement>;
  title?: string;
  theme?: any;
  timelinePointDimension?: number;
  timelinePointShape?: 'circle' | 'square' | 'diamond';
  iconChild?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  itemId?: string;
}

const TimelinePoint: React.FC<TimelinePointProps> = ({
  circleClass,
  handleClick,
  circleRef,
  title,
  theme,
  timelinePointDimension,
  timelinePointShape,
  iconChild,
  active = false,
  disabled = false,
  itemId,
}) => {
  // Get disableTimelinePoint from context to match vertical timeline behavior
  const { disableTimelinePoint } = useTimelineContext();

  // Focus is now handled by useTimelineNavigation hook
  // Only during keyboard navigation, not toolbar navigation

  const usingIcon = !!iconChild;

  // If timeline points are disabled, don't render anything
  if (disableTimelinePoint) {
    return null;
  }

  return (
    <div className={shapeWrapper}>
      <button
        className={`${circleClass} ${timelinePoint({
          shape: timelinePointShape,
          usingIcon,
          active,
          disabled,
        })} ${usingIcon ? 'using-icon' : ''} ${active ? 'active' : ''}`}
        onClick={handleClick}
        ref={circleRef}
        data-testid="timeline-circle"
        data-item-id={itemId}
        aria-label={title ?? 'Timeline point'}
        aria-selected={active}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        type="button"
        style={{
          ...computeCssVarsFromTheme(theme),
          height: timelinePointDimension
            ? `${timelinePointDimension}px`
            : '2rem', // Fallback height to ensure visibility
          width: timelinePointDimension
            ? `${timelinePointDimension}px`
            : '2rem', // Fallback width to ensure visibility
          background: usingIcon
            ? theme?.iconBackgroundColor || theme?.primary
            : active
              ? theme?.secondary || theme?.primary
              : theme?.primary || '#2563eb', // Fallback color
          border: active
            ? `${timelinePointDimension ? Math.round(timelinePointDimension * 0.2) : 3}px solid ${theme?.primary || '#2563eb'}`
            : `2px solid ${theme?.primary || '#2563eb'}`, // Fallback border
          color: theme?.primary || '#2563eb', // Ensure color is set for CSS currentColor
        }}
      >
        {iconChild ?? null}
      </button>
    </div>
  ) as React.ReactElement;
};

export default TimelinePoint;
