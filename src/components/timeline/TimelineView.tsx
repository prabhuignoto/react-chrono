import React from 'react';
import { TimelineMode } from '@models/TimelineModel';
import TimelineHorizontal from '../timeline-horizontal/timeline-horizontal';
import TimelineVertical from '../timeline-vertical/timeline-vertical';
import { Scroll } from '@models/TimelineHorizontalModel';
import { outline as outlineStyle, timelineMain } from './timeline.css';

interface TimelineViewProps {
  timelineMode: string;
  activeTimelineItem: number;
  autoScroll: (scroll: Partial<Scroll>) => void;
  contentDetailsChildren?: React.ReactNode;
  hasFocus: boolean;
  iconChildren?: React.ReactNode;
  items: any[]; // Using any to avoid type conflicts
  handleTimelineItemClick: (itemId?: string) => void;
  handleTimelineItemElapsed: (itemId?: string) => void;
  slideShowRunning?: boolean;
  id: string;
  theme?: any;
  lineWidth?: number;
  onOutlineSelection: (index: number) => void;
  nestedCardHeight: number;
}

const TimelineView: React.FC<TimelineViewProps> = ({
  timelineMode,
  activeTimelineItem,
  autoScroll,
  contentDetailsChildren,
  hasFocus,
  iconChildren,
  items,
  handleTimelineItemClick,
  handleTimelineItemElapsed,
  slideShowRunning,
  id,
  theme,
  lineWidth,
  onOutlineSelection,
  nestedCardHeight,
}) => {
  // Horizontal Timeline (regular or "all cards" mode)
  if (timelineMode === 'HORIZONTAL' || timelineMode === 'HORIZONTAL_ALL') {
    return (
      <>
        <div 
          className={outlineStyle}
          style={{
            backgroundColor: theme?.primary,
            height: `${lineWidth}px`,
          }}
        />
        <TimelineHorizontal
          autoScroll={autoScroll}
          contentDetailsChildren={contentDetailsChildren}
          handleItemClick={handleTimelineItemClick}
          hasFocus={hasFocus}
          iconChildren={iconChildren}
          items={items}
          mode={timelineMode as TimelineMode}
          onElapsed={handleTimelineItemElapsed}
          slideShowRunning={slideShowRunning}
          wrapperId={id}
          nestedCardHeight={nestedCardHeight}
        />
      </>
    );
  }

  // Vertical Alternating Timeline
  if (timelineMode === 'VERTICAL_ALTERNATING') {
    return (
      <TimelineVertical
        activeTimelineItem={activeTimelineItem}
        alternateCards={true}
        autoScroll={autoScroll}
        contentDetailsChildren={contentDetailsChildren}
        hasFocus={hasFocus}
        iconChildren={iconChildren}
        items={items}
        mode={timelineMode as TimelineMode}
        onClick={handleTimelineItemClick}
        onElapsed={handleTimelineItemElapsed}
        onOutlineSelection={onOutlineSelection}
        slideShowRunning={slideShowRunning}
        theme={theme}
        nestedCardHeight={nestedCardHeight}
      />
    );
  }

  // Vertical Timeline (default)
  return (
    <TimelineVertical
      activeTimelineItem={activeTimelineItem}
      alternateCards={false}
      autoScroll={autoScroll}
      contentDetailsChildren={contentDetailsChildren}
      hasFocus={hasFocus}
      iconChildren={iconChildren}
      items={items}
      mode={timelineMode as TimelineMode}
      onClick={handleTimelineItemClick}
      onElapsed={handleTimelineItemElapsed}
      onOutlineSelection={onOutlineSelection}
      slideShowRunning={slideShowRunning}
      theme={theme}
      nestedCardHeight={nestedCardHeight}
    />
  );
};

export default React.memo(TimelineView);
