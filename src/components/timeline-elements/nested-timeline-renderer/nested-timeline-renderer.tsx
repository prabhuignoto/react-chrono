import React from 'react';
import { TimelineModel } from '@models/TimelineModel';

interface NestedTimelineRendererProps {
  items: any[];
  nestedCardHeight?: number;
  mode?: string;
  isChild?: boolean;
}

// This component will be used to dynamically load the Timeline component
// to avoid circular dependency issues
const NestedTimelineRenderer: React.FC<NestedTimelineRendererProps> = ({
  items,
  nestedCardHeight,
  mode = 'HORIZONTAL',
  isChild,
}) => {
  const [TimelineComponent, setTimelineComponent] =
    React.useState<React.ComponentType<TimelineModel> | null>(null);

  // Dynamically import the Timeline component only when needed
  React.useEffect(() => {
    import('../../timeline/timeline').then((module) => {
      setTimelineComponent(() => module.default);
    });
  }, []);

  if (!TimelineComponent) {
    return <div>Loading nested timeline...</div>;
  }

  return (
    <TimelineComponent
      items={items}
      mode={mode as any}
      nestedCardHeight={nestedCardHeight}
      isChild={isChild}
    />
  );
};

export default NestedTimelineRenderer;
