import React from 'react';
import NestedTimelineCards from './nested-timeline-cards';

interface NestedTimelineRendererProps {
  items: any[];
  nestedCardHeight?: number;
  mode?: string;
  isChild?: boolean;
}

/**
 * Renders nested timeline items using a card-based layout with center connecting line
 * instead of full timeline rendering to avoid complex nested timeline layouts
 */
const NestedTimelineRenderer: React.FC<NestedTimelineRendererProps> = ({
  items,
  nestedCardHeight,
}) => {
  // Always use the card-based layout for nested timelines
  return (
    <NestedTimelineCards
      items={items}
      {...(nestedCardHeight !== undefined && { nestedCardHeight })}
    />
  );
};

export default NestedTimelineRenderer;
