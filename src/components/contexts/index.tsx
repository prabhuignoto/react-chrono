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

// Legacy context exports for backward compatibility
export { StableContext, type StableContextProps } from './StableContext';
export { DynamicContext, type DynamicContextProps } from './DynamicContext';
export {
  useStableContext,
  useDynamicContext,
  useGlobalContext,
  useTimelineContext as useTimelineContextLegacy,
  type CombinedContextProps,
} from './hooks';

// Import and re-export to work around module resolution issue
import {
  OptimizedContextProvider,
  type ContextProps,
} from './OptimizedContextProvider';
export { OptimizedContextProvider };
export type { ContextProps };
