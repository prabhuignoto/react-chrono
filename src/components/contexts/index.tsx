/**
 * Context index file - exports the new unified context system
 */

// New unified context system (recommended)
export {
  TimelineContextProvider,
  useTimelineContext,
  useTimelineStaticConfig,
  useTimelineDynamicState,
  useTimelineMemoizedObjects,
  type TimelineContextValue,
  type TimelineStaticConfig,
  type TimelineDynamicState,
  type TimelineMemoizedObjects,
  type TimelineContextProviderProps,
} from './TimelineContextProvider';
