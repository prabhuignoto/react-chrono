import React from 'react';
import { controlsWrapper } from './timeline-controls-wrapper.css';

/**
 * Wraps timeline controls and provides proper z-index stacking context
 */
const ControlsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={controlsWrapper}>{children}</div>
);

interface TimelineControlsWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that ensures proper z-index stacking of timeline controls
 * This helps prevent z-index conflicts between timeline points and controls/menus
 */
const TimelineControlsWrapper: React.FC<TimelineControlsWrapperProps> = ({
  children,
}) => {
  return <ControlsWrapper>{children}</ControlsWrapper>;
};

export default TimelineControlsWrapper;
