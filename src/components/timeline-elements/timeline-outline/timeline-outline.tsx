import React, {
  useCallback,
  useEffect,
  useState,
  PropsWithChildren,
  memo,
} from 'react';
import { useTimelineContext } from '../../contexts';
import CloseIcon from '../../icons/close';
import MenuIcon from '../../icons/menu';
import { OutlineItemList } from './timeline-outline-item-list';
import { TimelineOutlineModel } from './timeline-outline.model';
import {
  outlineButton,
  buttonLeft,
  buttonRight,
  outlinePane,
  outlineWrapper,
  outlineWrapperClosed,
  outlineWrapperOpen,
  outlineLeft,
  outlineRight,
} from './timeline-outline.css';
import { computeCssVarsFromTheme } from '../../../styles/theme-bridge';
import { useOutlinePosition } from './hooks/useOutlinePosition';

class TimelineOutlineError extends React.Component<
  PropsWithChildren<{ onError?: (error: Error) => void }>
> {
  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    return this.props.children;
  }
}

// Separate loading and error components to improve code organization
const OutlineLoading = memo(() => <div role="status">Loading outline...</div>);
const OutlineError = memo(({ error }: { error: Error }) => (
  <div role="alert">Error: {error.message}</div>
));

/**
 * TimelineOutline component
 * This component renders the outline pane of a timeline, including a list of items and corresponding selection functionality.
 * It provides an interface to toggle the outline pane and select items within the timeline.
 * The component leverages memoization to prevent unnecessary re-renders and optimizes the rendering process.
 */
const TimelineOutline: React.FC<TimelineOutlineModel> = ({
  items = [],
  onSelect,
  mode,
  theme,
  isLoading,
  error,
  onError,
}: TimelineOutlineModel) => {
  const [openPane, setOpenPane] = useState(false);
  const [showList, setShowList] = useState(false);

  const { theme: globalTheme } = useTimelineContext();
  const mergedTheme = theme || globalTheme;

  // Extract position logic to a custom hook
  const position = useOutlinePosition(mode);

  const togglePane = useCallback(() => setOpenPane((prev) => !prev), []);

  // Optimize effect to only run when openPane changes
  useEffect(() => {
    // Use a timeout to create a smooth animation effect
    let timer: number;
    if (openPane) {
      setShowList(true);
    } else {
      timer = window.setTimeout(() => {
        setShowList(false);
      }, 300); // Match this with CSS transition time
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [openPane]);

  const handleSelection = useCallback(
    (index: number, id?: string) => {
      onSelect?.(index);
    },
    [onSelect],
  );

  if (error) {
    return <OutlineError error={error} />;
  }

  if (isLoading) {
    return <OutlineLoading />;
  }

  return (
    <TimelineOutlineError onError={onError as (error: Error) => void}>
      <div
        className={[
          outlineWrapper,
          openPane ? outlineWrapperOpen : outlineWrapperClosed,
          position === 0 ? outlineLeft : outlineRight,
        ].join(' ')}
        aria-expanded={openPane}
        role="complementary"
        style={computeCssVarsFromTheme(mergedTheme)}
      >
        <button
          onPointerDown={togglePane}
          className={[
            outlineButton,
            position === 0 ? buttonLeft : buttonRight,
          ].join(' ')}
        >
          {openPane ? <CloseIcon /> : <MenuIcon />}
        </button>
        <div className={outlinePane}>
          {showList && (
            <OutlineItemList
              items={items}
              handleSelection={handleSelection}
              theme={mergedTheme}
            />
          )}
        </div>
      </div>
    </TimelineOutlineError>
  );
};

export { TimelineOutline };
