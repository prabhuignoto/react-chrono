/**
 * Context index file - exports all context-related functionality
 */
export { StableContext, type StableContextProps } from './StableContext';
export { DynamicContext, type DynamicContextProps } from './DynamicContext';
export {
  useStableContext,
  useDynamicContext,
  useGlobalContext,
  useTimelineContext,
  type CombinedContextProps,
} from './hooks';

// Import and re-export to work around module resolution issue
import {
  OptimizedContextProvider,
  type ContextProps,
} from './OptimizedContextProvider';
export { OptimizedContextProvider };
export type { ContextProps };
