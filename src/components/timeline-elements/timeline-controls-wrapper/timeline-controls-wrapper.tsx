import React from 'react';
import styled from 'styled-components';
import { zIndex } from '../../../styles/z-index';

/**
 * Wraps timeline controls and provides proper z-index stacking context
 */
const ControlsWrapper = styled.div`
  position: relative;
  z-index: ${zIndex.controls};
`;

interface TimelineControlsWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that ensures proper z-index stacking of timeline controls
 * This helps prevent z-index conflicts between timeline points and controls/menus
 */
const TimelineControlsWrapper: React.FC<TimelineControlsWrapperProps> = ({ children }) => {
  return <ControlsWrapper>{children}</ControlsWrapper>;
};

export default TimelineControlsWrapper;
